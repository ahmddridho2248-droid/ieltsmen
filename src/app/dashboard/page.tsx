import Link from "next/link";
import { Headphones, BookOpen, PenTool, Mic, ArrowRight, Clock, Target, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { ProgressChart } from "./components/progress-chart";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "Student";

  const moduleCards = [
    { title: "Listening", desc: "Audio comprehension practice", icon: Headphones, href: "/modules/listening", gradient: "from-blue-500 to-cyan-400" },
    { title: "Reading", desc: "Passage analysis & questions", icon: BookOpen, href: "/modules/reading", gradient: "from-purple-500 to-pink-400" },
    { title: "Writing", desc: "Task 1 & Task 2 essays", icon: PenTool, href: "/modules/writing", gradient: "from-emerald-500 to-teal-400" },
    { title: "Speaking", desc: "Conversation & monologue", icon: Mic, href: "/modules/speaking", gradient: "from-orange-500 to-amber-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      {/* Welcome */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="gradient-text">{userName}</span> 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Ready to hit Band 7.5? Let&apos;s continue your IELTS journey.
        </p>
      </div>

      {/* Modules */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">Your Modules</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moduleCards.map((m) => (
            <Card key={m.title} className="border bg-card card-hover overflow-hidden flex flex-col h-full">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white shadow-lg mb-5`}>
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-electric transition-colors">{m.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 mb-6">{m.desc}</p>
                <Link href={m.href} className="mt-auto block">
                  <Button variant="outline" className="w-full justify-between hover:bg-muted group/btn transition-all">
                    Practice <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/btn:text-foreground group-hover/btn:translate-x-1 transition-all" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <Card className="border bg-card h-full">
            <CardHeader>
              <CardTitle>Score Progression</CardTitle>
              <CardDescription>Simulated overall band progress over your last 5 attempts.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressChart />
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 gradient-primary overflow-hidden text-white shadow-xl shadow-electric/20">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Target className="h-24 w-24" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-white/80" />
                  <span className="font-medium text-white/80">Target Band</span>
                </div>
                <div className="text-4xl font-bold mb-1">7.5</div>
                <p className="text-sm text-white/70">You are on track!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "7-Day Streak", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "Listening Mastery", icon: Headphones, color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "10 Hours Studied", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
              ].map((achieve, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${achieve.bg} ${achieve.color}`}>
                    <achieve.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm">{achieve.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
