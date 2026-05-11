import Link from "next/link";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  Clock,
  Target,
  Flame,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { ProgressChart } from "./components/progress-chart";
import { HistoryList } from "./components/history-list";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userName =
    user?.user_metadata?.full_name?.split(" ")[0] || "Student";

  // Fetch writing evaluations
  const { data: evaluations } = await supabase
    .from("writing_evaluations")
    .select("id, created_at, overall_score, question")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: true });

  // Fetch latest speaking evaluation
  const { data: latestSpeaking } = await supabase
    .from("speaking_evaluations")
    .select("overall_score")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(1);

  // Fetch count of speaking evaluations for stats
  const { count: speakingCount } = await supabase
    .from("speaking_evaluations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id);

  const speakingScore = latestSpeaking?.[0]?.overall_score;
  const writingScore =
    evaluations && evaluations.length > 0
      ? evaluations[evaluations.length - 1].overall_score
      : null;
  const totalAttempts = (evaluations?.length || 0) + (speakingCount || 0);

  const moduleCards = [
    {
      title: "Writing",
      desc: "Task 1 & Task 2 essays with AI band scoring",
      icon: PenTool,
      href: "/modules/writing",
      gradient: "from-emerald-500 to-teal-400",
      shadow: "shadow-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "Speaking",
      desc: "Simulated examiner sessions with Cue Card timer",
      icon: Mic,
      href: "/modules/speaking",
      gradient: "from-orange-500 to-amber-400",
      shadow: "shadow-orange-500/20",
      hoverBorder: "hover:border-orange-500/40",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      title: "Reading",
      desc: "Academic passages with comprehension questions",
      icon: BookOpen,
      href: "/modules/reading",
      gradient: "from-purple-500 to-pink-400",
      shadow: "shadow-purple-500/20",
      hoverBorder: "hover:border-purple-500/40",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Listening",
      desc: "Audio comprehension with real test scenarios",
      icon: Headphones,
      href: "/modules/listening",
      gradient: "from-blue-500 to-cyan-400",
      shadow: "shadow-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-12 px-4 sm:px-6">
      {/* =================== WELCOME HEADER =================== */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Welcome back,{" "}
            <span className="gradient-text">{userName}</span> 👋
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Ready to crush your IELTS today? Pick a module and start
            practicing.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/60 border">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">{totalAttempts}</span>
            <span className="text-xs text-muted-foreground">
              total attempts
            </span>
          </div>
        </div>
      </div>

      {/* =================== QUICK START MODULES =================== */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">Quick Start</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moduleCards.map((m) => (
            <Link key={m.title} href={m.href} className="group block">
              <Card
                className={`border bg-card overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${m.shadow} ${m.hoverBorder}`}
              >
                {/* Top gradient accent */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${m.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
                />
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className={`h-12 w-12 rounded-xl ${m.iconBg} ${m.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <m.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1.5">{m.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-5 leading-relaxed">
                    {m.desc}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full justify-between group/btn transition-all"
                  >
                    Practice
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/btn:text-foreground group-hover/btn:translate-x-1 transition-all" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* =================== RECENT PROGRESS =================== */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">
            Recent Progress
          </h2>
        </div>

        {/* Score Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Writing Score */}
          <Card className="border bg-card hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Writing Score
                  </p>
                  <p className="text-4xl font-bold tracking-tight">
                    {writingScore
                      ? Number(writingScore).toFixed(1)
                      : "—"}
                  </p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <PenTool className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{evaluations?.length || 0} attempts logged</span>
              </div>
            </CardContent>
          </Card>

          {/* Speaking Score */}
          <Card className="border bg-card hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-500/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Speaking Score
                  </p>
                  <p className="text-4xl font-bold tracking-tight">
                    {speakingScore
                      ? Number(speakingScore).toFixed(1)
                      : "—"}
                  </p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <Mic className="h-5 w-5" />
                </div>
              </div>
              <Link
                href="/dashboard/speaking"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                View Speaking History
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Target Band */}
          <Card className="border-0 gradient-primary overflow-hidden text-white shadow-xl shadow-electric/15 hover:shadow-electric/30 transition-shadow">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Target className="h-24 w-24" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-white/80" />
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Target Band
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1.5 tracking-tight">
                  7.5
                </div>
                <p className="text-sm text-white/70">
                  Keep going — you&apos;re on track!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* =================== CHART & SIDEBAR =================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Score Progression</CardTitle>
              <CardDescription>
                Your overall writing band progress over recent attempts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressChart evaluations={evaluations || []} />
            </CardContent>
          </Card>

          {/* History List */}
          <HistoryList history={evaluations || []} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "7-Day Streak",
                  icon: Flame,
                  color: "text-orange-500",
                  bg: "bg-orange-500/10",
                },
                {
                  label: "Listening Mastery",
                  icon: Headphones,
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  label: "10 Hours Studied",
                  icon: Clock,
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
              ].map((achieve, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${achieve.bg} ${achieve.color}`}
                  >
                    <achieve.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm">
                    {achieve.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/dashboard/speaking" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-11 text-sm font-medium"
                >
                  <Mic className="h-4 w-4 text-orange-500" />
                  Speaking Progress
                </Button>
              </Link>
              <Link href="/modules/writing" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-11 text-sm font-medium"
                >
                  <PenTool className="h-4 w-4 text-emerald-500" />
                  Practice Writing
                </Button>
              </Link>
              <Link href="/modules/speaking" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-11 text-sm font-medium"
                >
                  <Mic className="h-4 w-4 text-orange-500" />
                  Practice Speaking
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
