import Link from "next/link";
import { Headphones, BookOpen, PenTool, Mic, ArrowRight, Sparkles, Target, TrendingUp, Users, Star, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  { title: "Listening", description: "Train your ear with real IELTS audio scenarios", icon: Headphones, href: "/modules/listening", gradient: "from-blue-500 to-cyan-400", delay: "0.1s" },
  { title: "Reading", description: "Master academic and general reading passages", icon: BookOpen, href: "/modules/reading", gradient: "from-purple-500 to-pink-400", delay: "0.2s" },
  { title: "Writing", description: "Craft essays and reports with AI feedback", icon: PenTool, href: "/modules/writing", gradient: "from-emerald-500 to-teal-400", delay: "0.3s" },
  { title: "Speaking", description: "Practice speaking with intelligent conversation AI", icon: Mic, href: "/modules/speaking", gradient: "from-orange-500 to-amber-400", delay: "0.4s" },
];

const stats = [
  { value: "50K+", label: "Active Learners", icon: Users },
  { value: "8.0+", label: "Avg. Band Score", icon: Star },
  { value: "2000+", label: "Practice Tests", icon: Target },
  { value: "95%", label: "Success Rate", icon: TrendingUp },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-electric/20">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">IELTSPrep</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#modules" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Modules</Link>
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth"><Button variant="ghost" className="text-sm font-medium">Sign In</Button></Link>
              <Link href="/auth"><Button className="gradient-primary text-white border-0 shadow-lg shadow-electric/25 hover:shadow-electric/40 transition-all text-sm">Get Started</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-electric/10 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 text-electric text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />AI-Powered IELTS Preparation
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            Ace Your IELTS<br /><span className="gradient-text">With Confidence</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Practice all four modules with intelligent feedback, track your progress, and reach your target band score faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/auth">
              <Button size="lg" className="gradient-primary text-white border-0 shadow-xl shadow-electric/25 text-base px-8 h-12 rounded-xl">
                Start Free Trial<ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#modules">
              <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-xl border-2">Explore Modules</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl gradient-subtle card-hover">
              <s.icon className="h-6 w-6 text-electric mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Four Modules, <span className="gradient-text">One Platform</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Comprehensive preparation for every section of the IELTS exam.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((m) => (
              <Link key={m.title} href={m.href} className="group">
                <div className="relative p-6 rounded-2xl border bg-card card-hover overflow-hidden animate-slide-up" style={{ animationDelay: m.delay }}>
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r ${m.gradient} text-white mb-4 shadow-lg`}>
                    <m.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-electric transition-colors">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
                  <div className="flex items-center text-sm font-medium text-electric opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Practice<ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 gradient-subtle">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 text-center">Why Choose <span className="gradient-text">IELTSPrep</span>?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "AI-Powered Feedback", desc: "Get instant, personalized feedback on your writing and speaking practice." },
              { icon: Target, title: "Adaptive Learning", desc: "Our system adapts to your level and targets your weak areas." },
              { icon: TrendingUp, title: "Progress Tracking", desc: "Detailed analytics to measure your journey to your target band." },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border card-hover">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg gradient-primary text-white mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl gradient-primary relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to Start Your IELTS Journey?</h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto relative z-10">Join thousands of successful test-takers.</p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-electric-dark hover:bg-white/90 font-semibold text-base px-8 h-12 rounded-xl shadow-xl relative z-10">
              Create Free Account<ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center"><Globe className="h-4 w-4 text-white" /></div>
            <span className="font-bold gradient-text">IELTSPrep</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 IELTSPrep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
