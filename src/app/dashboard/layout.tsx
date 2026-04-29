import type { Metadata } from "next";
import Link from "next/link";
import { Globe, LayoutDashboard, Headphones, BookOpen, PenTool, Mic, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";
import { signout } from "@/app/auth/actions";

export const metadata: Metadata = { title: "Dashboard | IELTSPrep" };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const userName = user?.user_metadata?.full_name || "Student";
  const initials = userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sleek Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-xl shadow-sm">
        <div className="flex h-16 items-center px-4 max-w-7xl mx-auto w-full gap-4 sm:gap-8">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-electric/20 group-hover:shadow-electric/40 transition-shadow">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:inline-block text-xl font-bold gradient-text">IELTSPrep</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 flex-1 overflow-x-auto no-scrollbar mask-edges">
            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-foreground bg-muted transition-colors whitespace-nowrap">
              <LayoutDashboard className="h-4 w-4 text-electric" />
              <span>Dashboard</span>
            </Link>
            
            <div className="h-4 w-px bg-border mx-2 shrink-0 hidden md:block" />
            
            <Link href="/modules/listening" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap">
              <Headphones className="h-4 w-4" />
              <span className="hidden lg:inline">Listening</span>
            </Link>
            <Link href="/modules/reading" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap">
              <BookOpen className="h-4 w-4" />
              <span className="hidden lg:inline">Reading</span>
            </Link>
            <Link href="/modules/writing" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap">
              <PenTool className="h-4 w-4" />
              <span className="hidden lg:inline">Writing</span>
            </Link>
            <Link href="/modules/speaking" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap">
              <Mic className="h-4 w-4" />
              <span className="hidden lg:inline">Speaking</span>
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Button variant="ghost" size="icon" className="relative rounded-xl hidden sm:flex">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-electric animate-pulse" />
            </Button>
            
            <div className="h-8 w-px bg-border hidden sm:block" />
            
            <Avatar className="h-9 w-9 border-2 border-electric/20 cursor-pointer">
              <AvatarFallback className="gradient-primary text-white text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>

            <form action={signout}>
              <Button type="submit" variant="ghost" size="icon" className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Sign Out">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
