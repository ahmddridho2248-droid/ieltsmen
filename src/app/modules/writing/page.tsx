import type { Metadata } from "next";
import { PenTool, Clock, ArrowRight, CheckCircle2, BarChart3, FileEdit, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Writing Module" };

const tasks = [
  { id: 1, title: "Task 1: Bar Chart — Internet Usage", type: "Task 1", duration: "20 min", difficulty: "Medium", completed: true, band: "6.5" },
  { id: 2, title: "Task 2: Essay — Technology & Education", type: "Task 2", duration: "40 min", difficulty: "Medium", completed: true, band: "6.0" },
  { id: 3, title: "Task 1: Process Diagram — Water Treatment", type: "Task 1", duration: "20 min", difficulty: "Hard", completed: false, band: null },
  { id: 4, title: "Task 2: Essay — Environment vs Economy", type: "Task 2", duration: "40 min", difficulty: "Hard", completed: false, band: null },
  { id: 5, title: "Task 1: Line Graph — Population Growth", type: "Task 1", duration: "20 min", difficulty: "Easy", completed: false, band: null },
  { id: 6, title: "Task 2: Essay — Urbanization Impacts", type: "Task 2", duration: "40 min", difficulty: "Medium", completed: false, band: null },
];

const criteria = [
  { name: "Task Achievement", score: 6.0, max: 9 },
  { name: "Coherence & Cohesion", score: 6.5, max: 9 },
  { name: "Lexical Resource", score: 6.0, max: 9 },
  { name: "Grammar Range", score: 5.5, max: 9 },
];

export default function WritingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
            <PenTool className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Writing Module</h1>
            <p className="text-muted-foreground text-sm">Craft essays and reports with AI-powered feedback</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><BarChart3 className="h-3.5 w-3.5" />Band 6.0</Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><CheckCircle2 className="h-3.5 w-3.5" />2/6 Complete</Badge>
        </div>
      </div>

      {/* AI Feedback Banner */}
      <Card className="border-0 bg-gradient-to-r from-emerald-500 to-teal-400 overflow-hidden">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"><Sparkles className="h-6 w-6" /></div>
            <div>
              <h3 className="font-semibold text-lg">AI Writing Assistant</h3>
              <p className="text-white/80 text-sm">Get instant feedback on grammar, coherence, and task response</p>
            </div>
          </div>
          <Button className="bg-white text-emerald-600 hover:bg-white/90 font-semibold rounded-xl shadow-xl shrink-0">
            <FileEdit className="mr-2 h-4 w-4" />Free Write
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold mb-1">Writing Tasks</h2>
          {tasks.map((t) => (
            <Card key={t.id} className="border bg-card card-hover">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${t.completed ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                    {t.completed ? <CheckCircle2 className="h-5 w-5" /> : <PenTool className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <Badge variant="secondary" className="text-[10px] py-0 h-5">{t.type}</Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{t.duration}</span>
                      <Badge variant="secondary" className="text-[10px] py-0 h-5">{t.difficulty}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {t.band && <span className="text-sm font-semibold text-emerald-500">Band {t.band}</span>}
                  <Button size="sm" variant={t.completed ? "outline" : "default"} className={`rounded-lg text-xs ${!t.completed ? "gradient-primary text-white border-0" : ""}`}>
                    {t.completed ? "Revise" : "Write"}<ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">📊 Score Breakdown</h3>
              <div className="space-y-3">
                {criteria.map((c) => (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{c.name}</span>
                      <span className="font-medium">{c.score}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${(c.score / c.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-2">Your Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Essays Written</span><span className="font-medium">12</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg Band</span><span className="font-medium">6.0</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Best Band</span><span className="font-medium">6.5</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Words Written</span><span className="font-medium">8,400</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
