import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "IELTS Practice Module" };

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Top Navigation Bar - Exam Portal Style */}
      <header className="h-16 border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Back to Dashboard</span>
              <span className="sm:hidden font-medium">Back</span>
            </Button>
          </Link>
          
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground hidden sm:inline-block mr-2">
              Official Mock Test
            </span>
            <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold gradient-text text-lg">IELTS Practice</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
