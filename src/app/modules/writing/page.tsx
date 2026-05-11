"use client";

import { useState, useEffect } from "react";
import { PenTool, Clock, FileText, Send, AlertCircle, RefreshCw, Loader2, CheckCircle2, XCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type EvaluationResult = {
  overallBand: number;
  scores: {
    taskResponse: number;
    coherence: number;
    lexical: number;
    grammar: number;
  };
  feedback: string;
  strengths: string[];
  weaknesses: string[];
};

export default function WritingModulePage() {
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshQuestion = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/generate-writing-question");
      if (!res.ok) throw new Error("Failed to fetch new question");
      const data = await res.json();
      if (data.question) {
        setCurrentQuestion(data.question);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      toast.error("Failed to generate a new question. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefreshQuestion();
    
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readQuestion = () => {
    if (!currentQuestion) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-Speech is not supported in this browser.");
    }
  };

  const supabase = createClient();

  // Derive word count efficiently (split by whitespace, ignore empty)
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  
  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || evaluation) return;
    const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, evaluation]);

  const handleSubmit = async () => {
    if (wordCount < 50) {
      toast.error("Your essay is too short. Please write at least 50 words before submitting.");
      return;
    }

    setIsSubmitting(true);
    setEvaluation(null);
    const toastId = toast.loading("The Examiner is grading your essay...");

    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to save scores.");

      // 2. Evaluate with Gemini API
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essayText: text, promptText: currentQuestion }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to evaluate essay");
      }

      const result: EvaluationResult = await res.json();
      setEvaluation(result);

      // 3. Save to Supabase
      const { error: dbError } = await supabase.from("ielts_scores").insert({
        user_id: user.id,
        module: "Writing",
        task_title: `Task 2: ${currentQuestion.substring(0, 40)}...`,
        band_score: result.overallBand,
        feedback: JSON.stringify(result) // Save the full result as feedback
      });

      if (dbError) {
        console.error("Supabase Error Detail:", dbError);
        throw new Error(`DB Error: ${dbError.message || dbError.details}`);
      }

      toast.success("Evaluation complete! Your score has been saved.", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem-3rem)] sm:min-h-[calc(100vh-4rem-4rem)] max-w-7xl mx-auto animate-fade-in pb-12">
      {/* Top Bar / Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <PenTool className="h-4 w-4 text-white" />
            </div>
            Writing Task 2
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Aim for at least 250 words.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge 
            variant={wordCount >= 250 ? "default" : "secondary"} 
            className={`text-sm px-3 py-1.5 transition-colors ${wordCount >= 250 ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}`}
          >
            {wordCount} / 250 words
          </Badge>
          <div className={`flex items-center gap-2 font-mono text-lg font-semibold px-4 py-1.5 rounded-xl border shadow-sm transition-colors ${timeLeft < 300 ? 'text-destructive border-destructive/50 bg-destructive/10' : 'bg-card'}`}>
            <Clock className="h-5 w-5" />
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Split Screen Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px] mb-8">
        
        {/* Left Side: Mock Prompt */}
        <Card className="border bg-muted/30 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-400 w-full shrink-0" />
          <CardHeader className="shrink-0 pb-4 flex flex-row items-center justify-between bg-card border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-emerald-500" />
              Essay Prompt
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={readQuestion} 
                disabled={!currentQuestion}
                title="Listen to question"
                className="text-muted-foreground hover:text-emerald-600"
              >
                <Volume2 className="h-4.5 w-4.5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshQuestion} 
                disabled={isRefreshing || isSubmitting || !!evaluation}
                className="h-9"
              >
                {isRefreshing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Refresh Soal
              </Button>
            </div>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-1 pb-6">
            <div className="space-y-6 text-base leading-relaxed">
              <div className="p-5 rounded-2xl bg-muted/50 border relative">
                {isRefreshing && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                  </div>
                )}
                <p className="font-semibold mb-3 text-foreground/80">You should spend about 40 minutes on this task.</p>
                <p className="mb-3 text-muted-foreground">Write about the following topic:</p>
                
                <div className="p-5 bg-background rounded-xl border shadow-sm font-medium text-lg text-foreground/90 border-l-4 border-l-emerald-500 whitespace-pre-wrap">
                  {currentQuestion || "Loading question..."}
                </div>
                
                <p className="mt-4 text-sm text-muted-foreground">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Writing Tips:</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 opacity-90">
                    <li>Structure with a clear introduction, body paragraphs, and conclusion.</li>
                    <li>Use a wide range of vocabulary and complex sentence structures.</li>
                    <li>Ensure your position is clear throughout the response.</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Interactive Editor */}
        <Card className="border bg-card shadow-sm flex flex-col h-full overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/30 transition-shadow">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting || !!evaluation}
            placeholder="Start typing your essay here..."
            className="flex-1 w-full p-6 resize-none outline-none bg-transparent text-base leading-relaxed disabled:opacity-50"
            spellCheck={false}
          />
          
          <div className="p-4 border-t bg-muted/30 shrink-0 flex items-center justify-between backdrop-blur-sm">
            <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={isSubmitting || !!evaluation} className="text-muted-foreground hover:text-destructive">
              <RefreshCw className="h-4 w-4 mr-2" /> Clear
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || wordCount === 0 || !!evaluation}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:from-emerald-600 hover:to-teal-500 border-0 shadow-lg shadow-emerald-500/20 rounded-xl px-6 transition-all"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Grading...</>
              ) : (
                <>Submit Essay <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Evaluation Results Card */}
      {evaluation && (
        <Card className="border-emerald-500/30 shadow-xl shadow-emerald-500/10 overflow-hidden animate-fade-in">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-400 w-full" />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Overall Score Circle */}
              <div className="flex flex-col items-center justify-center shrink-0 mx-auto md:mx-0">
                <div className="h-32 w-32 rounded-full border-8 border-emerald-500/20 flex flex-col items-center justify-center bg-emerald-500/5 relative">
                  <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {evaluation.overallBand ? Number(evaluation.overallBand).toFixed(1) : "N/A"}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Band</span>
                  <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-emerald-500" strokeDasharray={`${(evaluation.overallBand / 9) * 289} 289`} />
                  </svg>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="flex-1 space-y-6 w-full">
                <div>
                  <h3 className="text-xl font-bold mb-3">Examiner Feedback</h3>
                  <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl border">
                    {evaluation.feedback}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50 text-center border">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Task Response</p>
                    <p className="text-2xl font-bold">{evaluation.scores.taskResponse.toFixed(1)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 text-center border">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Coherence</p>
                    <p className="text-2xl font-bold">{evaluation.scores.coherence.toFixed(1)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 text-center border">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Lexical</p>
                    <p className="text-2xl font-bold">{evaluation.scores.lexical.toFixed(1)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 text-center border">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Grammar</p>
                    <p className="text-2xl font-bold">{evaluation.scores.grammar.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t">
              <div>
                <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Key Strengths
                </h4>
                <ul className="space-y-3">
                  {evaluation.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5" /> Areas for Improvement
                </h4>
                <ul className="space-y-3">
                  {evaluation.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                      <span className="leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
