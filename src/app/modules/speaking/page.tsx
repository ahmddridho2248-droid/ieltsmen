'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2 } from 'lucide-react';

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
  const recognitionRef = useRef<any>(null);

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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">IELTS Speaking Practice</h1>
          <p className="text-muted-foreground mt-2">Practice speaking with real-time transcription</p>
        </div>
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="flex items-center gap-3 text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
              {currentPart}
            </span>
            Part {currentPart}: Let's talk about your hometown. Where are you from?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="min-h-[200px] rounded-xl border bg-muted/20 p-4 relative">
            {!transcript && !isRecording && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Press 'Start Recording' and begin speaking...
              </div>
            )}
            {!transcript && isRecording && (
              <div className="absolute inset-0 flex items-center justify-center text-primary text-sm gap-2 font-medium">
                <Loader2 className="h-4 w-4 animate-spin" /> Listening...
              </div>
            )}
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{transcript}</p>
          </div>

          <div className="flex justify-center pt-4">
            {isRecording ? (
              <Button 
                onClick={stopRecording} 
                variant="destructive" 
                size="lg" 
                className="gap-2 rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Square className="h-5 w-5 fill-current" />
                Stop Recording
              </Button>
            ) : (
              <Button 
                onClick={startRecording} 
                size="lg" 
                className="gap-2 rounded-full px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Mic className="h-5 w-5" />
                Start Recording
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
