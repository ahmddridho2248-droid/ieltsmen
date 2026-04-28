import type { Metadata } from "next";
import { Mic, Clock, ArrowRight, CheckCircle2, BarChart3, MessageSquare, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Speaking Module" };

const sessions = [
  { id: 1, title: "Part 1: Introduction — Work & Studies", part: "Part 1", duration: "5 min", difficulty: "Easy", completed: true, band: "7.0" },
  { id: 2, title: "Part 2: Describe a Book You Read", part: "Part 2", duration: "4 min", difficulty: "Medium", completed: true, band: "7.0" },
  { id: 3, title: "Part 3: Discussion — Reading Habits", part: "Part 3", duration: "5 min", difficulty: "Hard", completed: true, band: "6.5" },
  { id: 4, title: "Part 1: Introduction — Hobbies", part: "Part 1", duration: "5 min", difficulty: "Easy", completed: false, band: null },
  { id: 5, title: "Part 2: Describe a Journey", part: "Part 2", duration: "4 min", difficulty: "Medium", completed: false, band: null },
  { id: 6, title: "Full Mock Interview", part: "Full", duration: "14 min", difficulty: "Hard", completed: false, band: null },
];

const fluencyCriteria = [
  { name: "Fluency & Coherence", score: 7.0, max: 9 },
  { name: "Lexical Resource", score: 6.5, max: 9 },
  { name: "Pronunciation", score: 7.0, max: 9 },
  { name: "Grammar Range", score: 6.5, max: 9 },
];

export default function SpeakingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
            <Mic className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Speaking Module</h1>
            <p className="text-muted-foreground text-sm">Practice with AI-powered conversation partner</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><BarChart3 className="h-3.5 w-3.5" />Band 7.0</Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3"><CheckCircle2 className="h-3.5 w-3.5" />3/6 Complete</Badge>
        </div>
      </div>

      {/* Live Practice Banner */}
      <Card className="border-0 bg-gradient-to-r from-orange-500 to-amber-400 overflow-hidden">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"><Video className="h-6 w-6" /></div>
            <div>
              <h3 className="font-semibold text-lg">Live AI Interview</h3>
              <p className="text-white/80 text-sm">Simulate a real IELTS speaking test with instant feedback</p>
            </div>
          </div>
          <Button className="bg-white text-orange-600 hover:bg-white/90 font-semibold rounded-xl shadow-xl shrink-0">
            <Mic className="mr-2 h-4 w-4" />Start Interview
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold mb-1">Practice Sessions</h2>
          {sessions.map((s) => (
            <Card key={s.id} className="border bg-card card-hover">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.completed ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                    {s.completed ? <CheckCircle2 className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{s.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <Badge variant="secondary" className="text-[10px] py-0 h-5">{s.part}</Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{s.duration}</span>
                      <Badge variant="secondary" className="text-[10px] py-0 h-5">{s.difficulty}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {s.band && <span className="text-sm font-semibold text-emerald-500">Band {s.band}</span>}
                  <Button size="sm" variant={s.completed ? "outline" : "default"} className={`rounded-lg text-xs ${!s.completed ? "gradient-primary text-white border-0" : ""}`}>
                    {s.completed ? "Review" : "Practice"}<ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">🎯 Speaking Scores</h3>
              <div className="space-y-3">
                {fluencyCriteria.map((c) => (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{c.name}</span>
                      <span className="font-medium">{c.score}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400" style={{ width: `${(c.score / c.max) * 100}%` }} />
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
                <div className="flex justify-between"><span className="text-muted-foreground">Sessions Done</span><span className="font-medium">20</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg Band</span><span className="font-medium">6.8</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Best Band</span><span className="font-medium">7.5</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Practice Time</span><span className="font-medium">5h 40m</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
