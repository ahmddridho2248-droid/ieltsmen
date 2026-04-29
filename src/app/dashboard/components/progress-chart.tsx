"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { attempt: "Test 1", score: 6.0 },
  { attempt: "Test 2", score: 6.5 },
  { attempt: "Test 3", score: 6.5 },
  { attempt: "Test 4", score: 7.0 },
  { attempt: "Test 5", score: 7.5 },
];

export function ProgressChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
          <XAxis 
            dataKey="attempt" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            domain={[5, 9]} 
            ticks={[5, 6, 7, 8, 9]}
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
