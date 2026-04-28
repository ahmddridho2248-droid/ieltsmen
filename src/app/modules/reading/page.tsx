import type { Metadata } from "next";
import { BookOpen, Clock, ArrowRight, CheckCircle2, BarChart3, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Reading Module" };

const passages = [
  { id: 1, title: "The Impact of Climate Change on Coral Reefs", type: "Academic", questions: 13, duration: "20 min", difficulty: "Hard", completed: true, score: "11/13" },
  { id: 2, title: "Urban Planning in Modern Cities", type: "Academic", questions: 14, duration: "20 min", difficulty: "Medium", completed: true, score: "12/14" },
  { id: 3, title: "The History of Printing", type: "Academic", questions: 13, duration: "20 min", difficulty: "Medium", completed: false, score: null },
  { id: 4, title: "Employee Handbook — TechCorp", type: "General", questions: 14, duration: "20 min", difficulty: "Easy", completed: false, score: null },
  { id: 5, title: "Renewable Energy Technologies", type: "Academic", questions: 13, duration: "20 min", difficulty: "Hard", completed: false, score: null },
];

const strategies = [
  "Skim the passage first before reading questions",
  "Identify keywords in questions and locate them in text",
  "Pay attention to paragraph headings and topic sentences",
  "Manage your time — 20 minutes per passage",
];

export default function ReadingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
            <BookOpen className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Reading Module</h1>
            <p className="text-muted-foreground text-sm">Master academic and general reading passages</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><BarChart3 className="h-3.5 w-3.5" />Band 6.5</Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><CheckCircle2 className="h-3.5 w-3.5" />2/5 Complete</Badge>
        </div>
      </div>

      {/* Resume Card */}
      <Card className="border-0 bg-gradient-to-r from-purple-500 to-pink-400 overflow-hidden">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"><FileText className="h-6 w-6" /></div>
            <div>
              <h3 className="font-semibold text-lg">Continue reading</h3>
              <p className="text-white/80 text-sm">The History of Printing — Question 5/13</p>
            </div>
          </div>
          <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold rounded-xl shadow-xl shrink-0">Resume<ArrowRight className="ml-2 h-4 w-4" /></Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold mb-1">Reading Passages</h2>
          {passages.map((p) => (
            <Card key={p.id} className="border bg-card card-hover">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${p.completed ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                    {p.completed ? <CheckCircle2 className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{p.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <Badge variant="secondary" className="text-[10px] py-0 h-5">{p.type}</Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.duration}</span>
                      <span>{p.questions} questions</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {p.score && <span className="text-sm font-semibold text-emerald-500">{p.score}</span>}
                  <Button size="sm" variant={p.completed ? "outline" : "default"} className={`rounded-lg text-xs ${!p.completed ? "gradient-primary text-white border-0" : ""}`}>
                    {p.completed ? "Retry" : "Start"}<ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">📖 Reading Strategies</h3>
              <ul className="space-y-2.5">
                {strategies.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="h-5 w-5 rounded-full bg-purple/10 text-purple flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-2">Your Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Passages Read</span><span className="font-medium">18</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg Score</span><span className="font-medium">28/40</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Best Score</span><span className="font-medium">35/40</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time Spent</span><span className="font-medium">9h 15m</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
