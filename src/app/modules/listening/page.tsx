import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, Play, Clock, BarChart3, ArrowRight, Volume2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Listening Module" };

const tests = [
  { id: 1, title: "Cambridge 18 — Test 1", sections: 4, duration: "30 min", difficulty: "Medium", completed: true, score: "34/40" },
  { id: 2, title: "Cambridge 18 — Test 2", sections: 4, duration: "30 min", difficulty: "Medium", completed: true, score: "30/40" },
  { id: 3, title: "Cambridge 18 — Test 3", sections: 4, duration: "30 min", difficulty: "Hard", completed: false, score: null },
  { id: 4, title: "Cambridge 17 — Test 1", sections: 4, duration: "30 min", difficulty: "Easy", completed: false, score: null },
  { id: 5, title: "Cambridge 17 — Test 2", sections: 4, duration: "30 min", difficulty: "Medium", completed: false, score: null },
  { id: 6, title: "Practice: Map Labelling", sections: 1, duration: "8 min", difficulty: "Hard", completed: false, score: null },
];

const tips = [
  "Read questions before the audio plays",
  "Pay attention to signpost words",
  "Practice note-taking while listening",
  "Watch for distractors in multiple choice",
];

export default function ListeningPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Headphones className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Listening Module</h1>
            <p className="text-muted-foreground text-sm">Train your ear with realistic IELTS audio scenarios</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><BarChart3 className="h-3.5 w-3.5" />Band 7.0</Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><CheckCircle2 className="h-3.5 w-3.5" />2/6 Complete</Badge>
        </div>
      </div>

      {/* Quick Start */}
      <Card className="border-0 bg-gradient-to-r from-blue-500 to-cyan-400 overflow-hidden">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Volume2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Continue where you left off</h3>
              <p className="text-white/80 text-sm">Cambridge 18 — Test 3, Section 2</p>
            </div>
          </div>
          <Button className="bg-white text-blue-600 hover:bg-white/90 font-semibold rounded-xl shadow-xl shrink-0">
            <Play className="mr-2 h-4 w-4" />Resume
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold mb-1">Practice Tests</h2>
          {tests.map((t) => (
            <Card key={t.id} className="border bg-card card-hover">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${t.completed ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                    {t.completed ? <CheckCircle2 className="h-5 w-5" /> : <Headphones className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{t.duration}</span>
                      <span>{t.sections} sections</span>
                      <Badge variant="secondary" className="text-[10px] py-0 h-5">{t.difficulty}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {t.score && <span className="text-sm font-semibold text-emerald-500">{t.score}</span>}
                  <Button size="sm" variant={t.completed ? "outline" : "default"} className={`rounded-lg text-xs ${!t.completed ? "gradient-primary text-white border-0" : ""}`}>
                    {t.completed ? "Retry" : "Start"}<ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Sidebar */}
        <div className="space-y-4">
          <Card className="border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">💡 Listening Tips</h3>
              <ul className="space-y-2.5">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="h-5 w-5 rounded-full bg-electric/10 text-electric flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-2">Your Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tests Taken</span><span className="font-medium">24</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg Score</span><span className="font-medium">32/40</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Best Score</span><span className="font-medium">36/40</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time Spent</span><span className="font-medium">12h 30m</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
