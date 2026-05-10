"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Evaluation = {
  created_at: string;
  overall_score: number;
};

export function ProgressChart({ evaluations }: { evaluations: Evaluation[] }) {
  if (!evaluations || evaluations.length === 0) {
    return (
      <div className="h-[300px] w-full mt-4 flex items-center justify-center rounded-xl bg-muted/20 border border-dashed">
        <p className="text-muted-foreground text-center">Belum ada data evaluasi. Yuk mulai latihan writing pertamamu!</p>
      </div>
    );
  }

  const data = evaluations.map((evalRecord) => {
    const date = new Date(evalRecord.created_at);
    return {
      date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      score: Number(evalRecord.overall_score)
    };
  });

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            domain={[0, 9]} 
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--card)', 
              borderColor: 'var(--border)',
              borderRadius: '0.75rem',
              color: 'var(--foreground)'
            }}
            itemStyle={{ color: 'var(--color-electric)' }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#2563eb" 
            strokeWidth={3}
            dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "var(--background)" }}
            activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 0 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
