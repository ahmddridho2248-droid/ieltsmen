import Link from "next/link";
import { Headphones, BookOpen, PenTool, Mic, ArrowRight, TrendingUp, Clock, Target, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const moduleCards = [
  { title: "Listening", desc: "Audio comprehension practice", icon: Headphones, href: "/modules/listening", gradient: "from-blue-500 to-cyan-400", progress: 65, band: "7.0", sessions: 24 },
  { title: "Reading", desc: "Passage analysis & questions", icon: BookOpen, href: "/modules/reading", gradient: "from-purple-500 to-pink-400", progress: 48, band: "6.5", sessions: 18 },
  { title: "Writing", desc: "Task 1 & Task 2 essays", icon: PenTool, href: "/modules/writing", gradient: "from-emerald-500 to-teal-400", progress: 32, band: "6.0", sessions: 12 },
  { title: "Speaking", desc: "Conversation & monologue", icon: Mic, href: "/modules/speaking", gradient: "from-orange-500 to-amber-400", progress: 55, band: "7.0", sessions: 20 },
];

const recentActivity = [
  { module: "Listening", task: "Cambridge 18 Test 3", score: "32/40", time: "2h ago" },
  { module: "Writing", task: "Task 2: Technology Essay", score: "6.5", time: "5h ago" },
  { module: "Reading", task: "Academic Passage: Climate", score: "28/40", time: "1d ago" },
  { module: "Speaking", task: "Part 2: Describe a place", score: "7.0", time: "2d ago" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Welcome back, <span className="gradient-text">John</span> 👋</h1>
        <p className="text-muted-foreground">Keep up the great work! You&apos;re on a 7-day streak.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Band", value: "6.5", icon: Target, color: "text-electric" },
          { label: "Study Streak", value: "7 days", icon: Flame, color: "text-orange-500" },
          { label: "Hours This Week", value: "12.5", icon: Clock, color: "text-purple" },
          { label: "Improvement", value: "+0.5", icon: TrendingUp, color: "text-emerald-500" },
        ].map((s) => (
          <Card key={s.label} className="border bg-card card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <Badge variant="secondary" className="text-xs">{s.label}</Badge>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Progress Cards */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Your Modules</h2>
          <Badge variant="outline" className="text-xs">4 Active</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moduleCards.map((m) => (
            <Link key={m.title} href={m.href} className="group">
              <Card className="border bg-card card-hover overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-xl bg-gradient-to-r ${m.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <m.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-electric transition-colors">{m.title}</h3>
                        <p className="text-xs text-muted-foreground">{m.desc}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">Band {m.band}</Badge>
                  </div>
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{m.sessions} sessions completed</span>
                      <span>{m.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${m.gradient} transition-all duration-500`} style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-5">Recent Activity</h2>
        <Card className="border bg-card">
          <CardContent className="p-0 divide-y">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-electric" />
                  <div>
                    <p className="text-sm font-medium">{a.task}</p>
                    <p className="text-xs text-muted-foreground">{a.module}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{a.score}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Start */}
      <Card className="border-0 gradient-primary overflow-hidden">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-1">Ready for a quick practice?</h3>
            <p className="text-white/70 text-sm">Jump into a timed mini-test across all modules.</p>
          </div>
          <Button className="bg-white text-electric-dark hover:bg-white/90 font-semibold rounded-xl shadow-xl shrink-0">
            Start Mini-Test <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
