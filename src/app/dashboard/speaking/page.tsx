import { createClient } from "@/lib/supabase/server";
import { ProgressChart } from "../components/progress-chart";
import { HistoryList } from "./history-list";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";

export default async function SpeakingDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch speaking evaluations
  const { data: evaluations } = await supabase
    .from('speaking_evaluations')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: true });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10 px-4 mt-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:shadow transition-all">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-orange-500/10 rounded-xl">
               <Mic className="h-6 w-6 text-orange-500" />
            </div>
            Speaking Progress
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Track your IELTS speaking scores and history</p>
        </div>
      </div>

      <div className="space-y-8">
        <Card className="border bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Score Progression</CardTitle>
            <CardDescription>Your overall speaking band progress over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart evaluations={evaluations || []} />
          </CardContent>
        </Card>
        
        <HistoryList history={evaluations || []} />
      </div>
    </div>
  );
}
