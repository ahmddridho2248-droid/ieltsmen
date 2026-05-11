import { Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ListeningModulePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in px-4">
      <Card className="max-w-md w-full border-2 shadow-sm text-center overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        <CardContent className="p-10 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
            <Headphones className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 tracking-tight">Coming Soon:<br/>Listening Module</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We are currently building this area to match the real IELTS test environment with authentic audio tracks and interactive questions.
          </p>
          <Link href="/dashboard" className="w-full">
            <Button className="w-full rounded-xl" variant="outline">
              Return to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
