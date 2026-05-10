"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteSpeakingHistory } from "./actions";

type SpeakingHistoryItem = {
  id: string;
  created_at: string;
  question: string;
  transcript: string;
  overall_score: number;
  fc_score: number;
  lr_score: number;
  gra_score: number;
  pron_score: number;
};

export function HistoryList({ history }: { history: SpeakingHistoryItem[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await deleteSpeakingHistory(id);
      toast.success("Riwayat speaking berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus riwayat speaking");
    } finally {
      setIsDeleting(null);
    }
  };

  if (!history || history.length === 0) {
    return null;
  }

  // Sort newest first for the list view
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="mt-6 space-y-4 animate-fade-in">
      <h3 className="text-xl font-bold tracking-tight">Riwayat Evaluasi Speaking</h3>
      <div className="space-y-4">
        {sortedHistory.map((item) => {
          const date = new Date(item.created_at);
          const formattedDate = date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          
          return (
            <div key={item.id} className="p-5 rounded-xl border bg-card shadow-sm transition-all hover:border-destructive/30 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">{formattedDate}</p>
                  <p className="font-medium text-sm text-foreground/90 line-clamp-2 mb-2" title={item.question}>
                    <span className="font-bold text-xs text-primary mr-2 uppercase tracking-wide">Soal:</span>
                    {item.question.split('\n')[0]}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 italic border-l-2 pl-3 border-orange-500/30 bg-muted/20 p-2 rounded-r-md" title={item.transcript}>
                    "{item.transcript}"
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">Overall</p>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-lg ring-2 ring-emerald-500/20 ring-offset-2 ring-offset-background">
                      {Number(item.overall_score).toFixed(1)}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting === item.id}
                    className="h-8 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    {isDeleting === item.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    <span className="text-xs font-semibold">Hapus</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 pt-4 border-t">
                 <div className="text-center bg-muted/40 rounded-lg p-2 hover:bg-muted transition-colors">
                   <p className="text-[10px] text-muted-foreground font-semibold mb-1 uppercase">Fluency</p>
                   <p className="text-sm font-bold text-primary">{Number(item.fc_score).toFixed(1)}</p>
                 </div>
                 <div className="text-center bg-muted/40 rounded-lg p-2 hover:bg-muted transition-colors">
                   <p className="text-[10px] text-muted-foreground font-semibold mb-1 uppercase">Lexical</p>
                   <p className="text-sm font-bold text-primary">{Number(item.lr_score).toFixed(1)}</p>
                 </div>
                 <div className="text-center bg-muted/40 rounded-lg p-2 hover:bg-muted transition-colors">
                   <p className="text-[10px] text-muted-foreground font-semibold mb-1 uppercase">Grammar</p>
                   <p className="text-sm font-bold text-primary">{Number(item.gra_score).toFixed(1)}</p>
                 </div>
                 <div className="text-center bg-muted/40 rounded-lg p-2 hover:bg-muted transition-colors">
                   <p className="text-[10px] text-muted-foreground font-semibold mb-1 uppercase">Pronunc.</p>
                   <p className="text-sm font-bold text-primary">{Number(item.pron_score).toFixed(1)}</p>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
