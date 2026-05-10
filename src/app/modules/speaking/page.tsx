'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2, Volume2, Send, Timer } from 'lucide-react';

// Define SpeechRecognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SpeakingPracticePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentPart, setCurrentPart] = useState(2); // Set to 2 to show Part 2 UI by default for testing
  const recognitionRef = useRef<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<string | null>(null);

  // New state for Part 2
  const [prepTime, setPrepTime] = useState(60);
  const [speakTime, setSpeakTime] = useState(120);
  const [timerPhase, setTimerPhase] = useState<'idle' | 'prep' | 'speak'>('idle');

  const questionText = "Let's talk about your hometown. Where are you from?";

  const handleTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(questionText);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  const submitEvaluation = async () => {
    if (!transcript) return;
    setIsEvaluating(true);
    setEvaluationResult(null);
    try {
      const res = await fetch("/api/evaluate-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, transcript })
      });
      if (!res.ok) throw new Error("Failed to evaluate");
      const data = await res.json();
      setEvaluationResult(data.evaluation);
    } catch (error) {
      console.error(error);
      alert("Error evaluating response. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting recognition", error);
      }
    } else {
      alert('Your browser does not support Speech Recognition. Please use Chrome, Edge, or Safari.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // Timer logic for Part 2
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerPhase === 'prep') {
      interval = setInterval(() => {
        setPrepTime((prev) => {
          if (prev <= 1) {
            setTimerPhase('speak');
            startRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerPhase === 'speak') {
      interval = setInterval(() => {
        setSpeakTime((prev) => {
          if (prev <= 1) {
            setTimerPhase('idle');
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerPhase]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">IELTS Speaking Practice</h1>
          <p className="text-muted-foreground mt-2">Practice speaking with real-time transcription</p>
        </div>
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
          {currentPart === 2 ? (
            <CardTitle className="flex items-center gap-3 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                2
              </span>
              Part 2: Cue Card
            </CardTitle>
          ) : (
            <CardTitle className="flex items-center gap-3 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                {currentPart}
              </span>
              Part {currentPart}: {questionText}
            </CardTitle>
          )}
          <Button variant="ghost" size="icon" onClick={handleTTS} title="Listen to question">
            <Volume2 className="h-5 w-5 text-primary" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {currentPart === 2 && (
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-primary">Describe a memorable journey you have made</h3>
              <p className="mb-2 text-muted-foreground font-medium">You should say:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700 dark:text-slate-300">
                <li>Where you went</li>
                <li>How you traveled</li>
                <li>Why you went on the journey</li>
              </ul>
              <p className="text-muted-foreground font-medium">and explain why it is memorable</p>
            </div>
          )}

          {currentPart === 2 && timerPhase !== 'idle' && (
            <div className="flex flex-col items-center justify-center py-4 bg-muted/10 rounded-xl border border-muted/50">
              <div className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                {timerPhase === 'prep' ? 'Preparation Time' : 'Speaking Time'}
              </div>
              <div className={`text-5xl font-bold tracking-widest flex items-center gap-3 ${
                (timerPhase === 'prep' && prepTime < 10) || (timerPhase === 'speak' && speakTime < 10) 
                ? 'text-red-500 animate-pulse' 
                : 'text-primary'
              }`}>
                <Timer className={`h-8 w-8 ${(timerPhase === 'prep' && prepTime < 10) || (timerPhase === 'speak' && speakTime < 10) ? 'text-red-500' : 'text-primary'}`} />
                {timerPhase === 'prep' ? formatTime(prepTime) : formatTime(speakTime)}
              </div>
            </div>
          )}

          <div className="min-h-[200px] rounded-xl border bg-muted/20 p-4 relative">
            {!transcript && !isRecording && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                {currentPart === 2 
                  ? "Press 'Start 1-Minute Prep' to begin..." 
                  : "Press 'Start Recording' and begin speaking..."}
              </div>
            )}
            {!transcript && isRecording && (
              <div className="absolute inset-0 flex items-center justify-center text-primary text-sm gap-2 font-medium">
                <Loader2 className="h-4 w-4 animate-spin" /> Listening...
              </div>
            )}
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{transcript}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            {isRecording ? (
              <Button 
                onClick={() => {
                  stopRecording();
                  if (currentPart === 2) {
                    setTimerPhase('idle');
                    setSpeakTime(120);
                    setPrepTime(60);
                  }
                }} 
                variant="destructive" 
                size="lg" 
                className="gap-2 rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Square className="h-5 w-5 fill-current" />
                {currentPart === 2 && timerPhase === 'speak' ? 'Finish Early' : 'Stop Recording'}
              </Button>
            ) : (
              currentPart === 2 && timerPhase === 'idle' ? (
                <Button 
                  onClick={() => {
                    setTimerPhase('prep');
                    setPrepTime(60);
                    setSpeakTime(120);
                  }} 
                  size="lg" 
                  className="gap-2 rounded-full px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Timer className="h-5 w-5" />
                  Start 1-Minute Prep
                </Button>
              ) : (
                currentPart === 2 && timerPhase !== 'idle' ? null : (
                  <Button 
                    onClick={startRecording} 
                    size="lg" 
                    className="gap-2 rounded-full px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Mic className="h-5 w-5" />
                    Start Recording
                  </Button>
                )
              )
            )}

            {!isRecording && transcript && (
              <Button
                onClick={submitEvaluation}
                disabled={isEvaluating}
                size="lg"
                className="gap-2 rounded-full px-8 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isEvaluating ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Evaluating...</>
                ) : (
                  <><Send className="h-5 w-5" /> Submit Answer</>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {evaluationResult && (
        <Card className="border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/10 animate-fade-in overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          <CardHeader>
            <CardTitle className="text-xl">Evaluation Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {evaluationResult}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
