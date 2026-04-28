import type { Metadata } from "next";
import Link from "next/link";
import { Globe, LayoutDashboard, Headphones, BookOpen, PenTool, Mic, Settings, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Dashboard" };

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Listening", href: "/modules/listening", icon: Headphones },
  { label: "Reading", href: "/modules/reading", icon: BookOpen },
  { label: "Writing", href: "/modules/writing", icon: PenTool },
  { label: "Speaking", href: "/modules/speaking", icon: Mic },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-electric/20">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">IELTSPrep</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group">
              <item.icon className="h-4.5 w-4.5 group-hover:text-electric transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator />
        <div className="p-3 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Settings className="h-4.5 w-4.5" />Settings
          </Link>
          <Link href="/auth" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <LogOut className="h-4.5 w-4.5" />Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold gradient-text">IELTSPrep</span>
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-electric animate-pulse" />
            </Button>
            <Avatar className="h-9 w-9 border-2 border-electric/20">
              <AvatarFallback className="gradient-primary text-white text-sm font-medium">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Mobile Nav */}
        <div className="md:hidden border-b overflow-x-auto">
          <div className="flex px-4 py-2 gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">
                <item.icon className="h-3.5 w-3.5" />{item.label}
              </Link>
            ))}
          </div>
        </div>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
