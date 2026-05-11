'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2, Volume2, Send, Timer, RefreshCw } from 'lucide-react';

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
  const [currentPart, setCurrentPart] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<string | null>(null);

  // New state for Part 2
  const [prepTime, setPrepTime] = useState(60);
  const [speakTime, setSpeakTime] = useState(120);
  const [timerPhase, setTimerPhase] = useState<'idle' | 'prep' | 'speak'>('idle');

  const handleRefreshQuestion = async () => {
    setIsRefreshing(true);
    setTranscript("");
    setEvaluationResult(null);
    try {
      const res = await fetch("/api/generate-speaking-question");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCurrentPart(data.part);
      setQuestionText(data.question);
      setTimerPhase('idle');
      setPrepTime(60);
      setSpeakTime(120);
    } catch (error) {
      console.error(error);
      alert("Failed to refresh question.");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefreshQuestion();

    // Cleanup function to stop TTS when component unmounts (Ghost Voice fix)
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const readQuestion = () => {
    if (!questionText) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
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
        body: JSON.stringify({ question: questionText, transcript, part: currentPart })
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
        if (isRecordingRef.current && recognitionRef.current) {
          // Pause death fix: Restart recognition if it ends while still supposed to be recording
          try { 
            recognitionRef.current.start(); 
          } catch(e) { 
            console.error('Failed to restart recognition:', e); 
          }
        } else {
          setIsRecording(false);
          isRecordingRef.current = false;
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (isRecording) return;
    if (recognitionRef.current) {
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        isRecordingRef.current = true;
      } catch (error: any) {
        if (error.message && error.message.includes("already started")) {
          // Silent fail for already started error, just update state
          setIsRecording(true);
          isRecordingRef.current = true;
        } else {
          console.error("Error starting recognition", error);
        }
      }
    } else {
      alert('Your browser does not support Speech Recognition. Please use Chrome, Edge, or Safari.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      isRecordingRef.current = false;
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
            if (timerPhase === 'prep') {
              setTimerPhase('speak');
              if (!isRecording) startRecording();
            }
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
        <Button 
          variant="outline" 
          onClick={handleRefreshQuestion} 
          disabled={isRefreshing || isRecording}
          className="gap-2 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Soal
        </Button>
      </div>

      <Card className={`border-2 shadow-md transition-all duration-300 mx-auto w-full ${currentPart === 2 ? 'bg-[#fffdf2] border-[#fcd34d]/50 shadow-lg' : 'bg-card'}`}>
        <CardHeader className={`${currentPart === 2 ? 'border-b border-[#fcd34d]/30' : 'bg-muted/30 border-b'} flex flex-row items-center justify-between`}>
          <CardTitle className="flex items-center gap-3 text-lg">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${currentPart === 2 ? 'bg-amber-500 text-white' : 'bg-primary/10 text-primary'}`}>
              {currentPart}
            </span>
            Part {currentPart} {currentPart === 2 && ': Cue Card'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={readQuestion} title="Listen to question" className={currentPart === 2 ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-100/50' : ''}>
            <Volume2 className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className={`${currentPart === 2 ? 'bg-white border-2 border-[#fcd34d]/30 shadow-inner rounded-xl p-8' : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm'} rounded-xl p-6 min-h-[120px] flex items-center justify-center`}>
            {isRefreshing ? (
               <div className="flex items-center justify-center text-muted-foreground font-medium gap-3">
                 <Loader2 className="h-5 w-5 animate-spin" />
                 Generating new question...
               </div>
            ) : (
               <div className={`w-full leading-relaxed font-medium whitespace-pre-wrap ${currentPart === 2 ? 'text-xl text-slate-800' : 'text-lg text-slate-800 dark:text-slate-200'}`}>
                 {questionText}
               </div>
            )}
          </div>

          {currentPart === 2 && timerPhase !== 'idle' && (
            <div className={`flex flex-col items-center justify-center py-6 rounded-2xl border-2 ${timerPhase === 'speak' ? 'bg-orange-500/5 border-orange-500/20' : 'bg-blue-500/5 border-blue-500/20'}`}>
              <div className="text-sm font-bold text-muted-foreground mb-2 uppercase tracking-widest">
                {timerPhase === 'prep' ? 'Preparation Time' : 'Speaking Time'}
              </div>
              <div className={`text-6xl font-black tracking-widest flex items-center gap-4 ${
                (timerPhase === 'prep' && prepTime <= 10) || (timerPhase === 'speak' && speakTime <= 10) 
                ? 'text-red-500 animate-pulse' 
                : (timerPhase === 'speak' ? 'text-orange-500' : 'text-blue-500')
              }`}>
                <Timer className={`h-10 w-10`} />
                {timerPhase === 'prep' ? formatTime(prepTime) : formatTime(speakTime)}
              </div>
            </div>
          )}

          <div className="min-h-[250px] rounded-2xl border-2 bg-muted/10 p-6 relative">
            {!transcript && !isRecording && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-base">
                {currentPart === 2 
                  ? "Press 'Start 1-Minute Prep' to begin..." 
                  : "Press 'Start Recording' and begin speaking..."}
              </div>
            )}
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/10 text-red-600 px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                RECORDING...
              </div>
            )}
            {!transcript && isRecording && (
              <div className="absolute inset-0 flex items-center justify-center text-primary text-base gap-3 font-medium">
                <Loader2 className="h-5 w-5 animate-spin" /> Listening...
              </div>
            )}
            <p className="text-xl sm:text-2xl leading-relaxed whitespace-pre-wrap pt-8">{transcript}</p>
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
                className="gap-2 rounded-full px-8 shadow-lg hover:shadow-xl transition-all h-14 text-base font-bold animate-pulse"
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
