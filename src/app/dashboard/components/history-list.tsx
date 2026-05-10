"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteHistory } from "../actions";

type HistoryItem = {
  id: string;
  created_at: string;
  question: string;
  overall_score: number;
};

export function HistoryList({ history }: { history: HistoryItem[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await deleteHistory(id);
      toast.success("Riwayat berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus riwayat");
    } finally {
      setIsDeleting(null);
    }
  };

  if (!history || history.length === 0) {
    return null; // The chart already shows an empty state, no need to duplicate
  }

  // Sort newest first for the list view
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="mt-6 space-y-4 animate-fade-in">
      <h3 className="text-xl font-bold tracking-tight">Riwayat Evaluasi Writing</h3>
      <div className="space-y-3">
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
            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border bg-card shadow-sm transition-all hover:border-destructive/30">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-xs text-muted-foreground mb-1 font-medium">{formattedDate}</p>
                <p className="font-medium text-sm text-foreground/90 truncate" title={item.question}>
                  {item.question.split('\n')[0]}
                </p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5 font-bold">Skor</p>
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    {Number(item.overall_score).toFixed(1)}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting === item.id}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  {isDeleting === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
