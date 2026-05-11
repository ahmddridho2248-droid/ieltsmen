import Link from "next/link";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Star,
  Zap,
  Globe,
  CheckCircle2,
  Brain,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Writing",
    description:
      "Craft essays evaluated by AI with band-score breakdown and targeted feedback on Task Response, Coherence, Lexical Resource, and Grammar.",
    icon: PenTool,
    href: "/modules/writing",
    gradient: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    color: "text-emerald-500",
    delay: "0.1s",
  },
  {
    title: "Speaking",
    description:
      "Simulate a real examiner session with speech recognition, a Cue Card timer, and AI scoring across Fluency, Lexical, Grammar, and Pronunciation.",
    icon: Mic,
    href: "/modules/speaking",
    gradient: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20",
    bg: "bg-orange-500/10",
    color: "text-orange-500",
    delay: "0.2s",
  },
  {
    title: "Reading",
    description:
      "Master academic passages with timed practice and comprehension questions modeled after the real IELTS reading test.",
    icon: BookOpen,
    href: "/modules/reading",
    gradient: "from-purple-500 to-pink-400",
    shadow: "shadow-purple-500/20",
    bg: "bg-purple-500/10",
    color: "text-purple-500",
    delay: "0.3s",
  },
  {
    title: "Listening",
    description:
      "Train your ear with authentic audio scenarios and improve comprehension with AI-curated listening exercises.",
    icon: Headphones,
    href: "/modules/listening",
    gradient: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20",
    bg: "bg-blue-500/10",
    color: "text-blue-500",
    delay: "0.4s",
  },
];

const stats = [
  { value: "50K+", label: "Active Learners", icon: Users },
  { value: "8.0+", label: "Avg. Band Score", icon: Star },
  { value: "2000+", label: "Practice Tests", icon: Target },
  { value: "95%", label: "Success Rate", icon: TrendingUp },
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Evaluation",
    desc: "Get instant, band-accurate feedback from our Gemini-powered AI examiner on Writing and Speaking tasks.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    desc: "Visualize your score trajectory with interactive charts. Track every attempt and see where you're improving.",
  },
  {
    icon: Zap,
    title: "Dynamic Question Bank",
    desc: "Never run out of practice material. AI generates fresh, authentic IELTS questions every time you refresh.",
  },
  {
    icon: ShieldCheck,
    title: "Exam-Ready Simulation",
    desc: "Timed Cue Card prep, speech recognition, and real exam conditions so test day feels familiar.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    score: "Band 8.0",
    quote: "The AI feedback on my writing was incredibly detailed. I improved from 6.5 to 8.0 in just 6 weeks.",
  },
  {
    name: "David L.",
    score: "Band 7.5",
    quote: "The speaking simulator with the timer is exactly like the real test. It completely removed my anxiety.",
  },
  {
    name: "Anita R.",
    score: "Band 7.0",
    quote: "I love that the questions are always different. It keeps my practice sessions fresh and challenging.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* =================== NAVIGATION =================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-electric/20 group-hover:shadow-electric/40 transition-shadow">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                IELTSPrep
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#modules"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Modules
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button
                  variant="ghost"
                  className="text-sm font-medium hidden sm:inline-flex"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="gradient-primary text-white border-0 shadow-lg shadow-electric/25 hover:shadow-electric/40 transition-all text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* =================== HERO SECTION =================== */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-electric/8 blur-3xl animate-float" />
          <div
            className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple/8 blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-success/5 blur-3xl animate-float"
            style={{ animationDelay: "5s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 text-electric text-sm font-semibold mb-8 animate-fade-in ring-1 ring-electric/20">
            <Sparkles className="h-4 w-4" />
            AI-Powered IELTS Preparation Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up leading-tight">
            Master Your IELTS.
            <br />
            <span className="gradient-text">Achieve Band 7.5+ with AI</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.1s" }}
          >
            Practice all four IELTS modules with an intelligent AI evaluator,
            get real-time feedback on your performance, and track your progress
            toward your dream band score.
          </p>

          {/* Feature pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            {[
              "AI Evaluator",
              "Real-time Feedback",
              "Dynamic Questions",
              "Progress Analytics",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 bg-muted/60 px-3 py-1.5 rounded-full"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/auth">
              <Button
                size="lg"
                className="gradient-primary text-white border-0 shadow-xl shadow-electric/25 hover:shadow-electric/40 text-base px-8 h-13 rounded-xl transition-all hover:scale-105 active:scale-100"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-13 rounded-xl border-2 hover:scale-105 active:scale-100 transition-all"
              >
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* =================== STATS STRIP =================== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl gradient-subtle card-hover border border-transparent hover:border-electric/20"
            >
              <s.icon className="h-6 w-6 text-electric mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================== MODULES GRID =================== */}
      <section id="modules" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Four Modules,{" "}
              <span className="gradient-text">One Platform</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Comprehensive, AI-driven preparation for every section of the
              IELTS exam.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.map((m) => (
              <Link key={m.title} href={m.href} className="group">
                <div
                  className={`relative p-7 rounded-2xl border bg-card card-hover overflow-hidden animate-slide-up`}
                  style={{ animationDelay: m.delay }}
                >
                  {/* Top accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="flex items-start gap-5">
                    <div
                      className={`shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${m.gradient} text-white shadow-lg ${m.shadow}`}
                    >
                      <m.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-electric transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {m.description}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-electric opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                        Start Practice
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FEATURES SECTION =================== */}
      <section id="features" className="py-20 px-4 gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">IELTSPrep</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Built by language experts and engineers to give you every advantage
              on exam day.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border card-hover group"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl gradient-primary text-white mb-5 shadow-lg shadow-electric/15 group-hover:shadow-electric/30 transition-shadow">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== TESTIMONIALS =================== */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">IELTS Test-Takers</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Join thousands who achieved their target scores with IELTSPrep.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border bg-card card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{t.name}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-electric/10 text-electric">
                    {t.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== CTA BANNER =================== */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl gradient-primary relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to Start Your IELTS Journey?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto relative z-10 text-lg">
            Join thousands of successful test-takers. Your target band is
            closer than you think.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-white text-electric-dark hover:bg-white/90 font-bold text-base px-8 h-13 rounded-xl shadow-xl relative z-10 hover:scale-105 active:scale-100 transition-all"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer className="border-t py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold gradient-text">IELTSPrep</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IELTSPrep. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
