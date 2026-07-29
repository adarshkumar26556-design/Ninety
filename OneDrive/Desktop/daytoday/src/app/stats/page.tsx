"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Flame, Trophy, CheckCircle2, TrendingUp, Target } from "lucide-react"
import { useStore } from "@/store/useStore"
import { format, subDays, isSameDay } from "date-fns"

export default function StatsPage() {
  const [isClient, setIsClient] = React.useState(false);
  const { currentStreak, longestStreak, history, habits, exercises, waterCurrent, waterGoal } = useStore();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Calculate some stats from history
  const historyEntries = Object.values(history);
  const totalCompletedDays = historyEntries.filter(score => score === 100).length;
  
  const successRate = historyEntries.length > 0 
    ? Math.round(historyEntries.reduce((a, b) => a + b, 0) / historyEntries.length)
    : 0;

  const currentScore = habits.filter(h => h.isCompleted).length + 
                       (exercises.every(e => e.isCompleted) ? 1 : 0) + 
                       (waterCurrent >= waterGoal ? 1 : 0);
  const totalScore = habits.length + 2;

  const stats = [
    { label: "Current Streak", value: `${currentStreak} Days`, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Longest Streak", value: `${longestStreak} Days`, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Total Completed", value: `${totalCompletedDays} Days`, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
    { label: "Success Rate", value: `${successRate}%`, icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
    { label: "Average Score", value: `${currentScore} / ${totalScore}`, icon: Target, color: "text-[#0ea5e9]", bg: "bg-[#0ea5e9]/10" },
  ];

  // Get last 7 days for the chart
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    let score = history[dateStr] || 0;
    if (isSameDay(d, new Date())) {
      score = Math.round((currentScore / totalScore) * 100);
    }
    return {
      label: format(d, 'eeeee'), // M, T, W etc.
      score
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <h1 className="text-3xl font-bold text-text-primary">Statistics</h1>
        <p className="text-text-secondary mt-1">Your Ninety performance.</p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-primary hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">{stat.value}</h3>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-between gap-2 pt-4">
            {last7Days.map((day, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full bg-text-secondary/10 rounded-t-lg relative overflow-hidden h-full">
                  <div 
                    className="absolute bottom-0 w-full bg-accent rounded-t-lg transition-all duration-1000 ease-out group-hover:bg-accent/80"
                    style={{ height: `${day.score}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary font-medium">
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
