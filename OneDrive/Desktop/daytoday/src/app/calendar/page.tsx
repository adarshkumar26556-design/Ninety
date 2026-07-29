"use client"

import * as React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useStore } from "@/store/useStore"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [isClient, setIsClient] = React.useState(false);
  const { history, habits, exercises, waterCurrent, waterGoal } = useStore();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const currentScore = habits.filter(h => h.isCompleted).length + 
                       (exercises.every(e => e.isCompleted) ? 1 : 0) + 
                       (waterCurrent >= waterGoal ? 1 : 0);
  const totalScore = habits.length + 2;
  const todayPercentage = Math.round((currentScore / totalScore) * 100);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Map percentage to 0-4 score for the heatmap
  const getHeatmapColor = (percentage: number) => {
    if (percentage === 0) return "bg-text-secondary/10";
    if (percentage < 30) return "bg-success/30";
    if (percentage < 60) return "bg-success/60";
    if (percentage < 90) return "bg-success/80";
    return "bg-success";
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <h1 className="text-3xl font-bold text-text-primary">Calendar</h1>
        <p className="text-text-secondary mt-1">Review your daily progress.</p>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">{format(currentDate, 'MMMM yyyy')}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-text-secondary">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Pad empty days at start of month */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-xl bg-transparent" />
            ))}
            
            {/* Days of month */}
            {daysInMonth.map((day, i) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isToday = isSameDay(day, new Date());
              
              // Get percentage for this day
              let percentage = history[dateStr] || 0;
              if (isToday) {
                percentage = todayPercentage;
              }
              
              return (
                <div 
                  key={dateStr}
                  className={cn(
                    "aspect-square rounded-xl flex items-center justify-center text-sm transition-all cursor-pointer hover:ring-2 ring-accent ring-offset-2 ring-offset-background",
                    getHeatmapColor(percentage),
                    isToday ? "border-2 border-accent font-bold" : "border border-transparent",
                    percentage > 0 ? "text-white/90" : "text-text-primary"
                  )}
                  title={`${dateStr}: Score ${percentage}%`}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Challenge Progress</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="relative pt-8 pb-4">
              <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-text-secondary/20 rounded-full" />
              <div className="absolute top-1/2 left-0 w-1/4 h-2 -translate-y-1/2 bg-success rounded-full" />
              
              <div className="flex justify-between relative z-10 px-1">
                {[1, 30, 60, 90].map((day) => (
                  <div key={day} className="flex flex-col items-center">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-4 mb-2 transition-colors",
                      day <= 22 /* mock current day */ ? "border-success bg-background" : "border-text-secondary/20 bg-background"
                    )} />
                    <span className="text-xs font-medium text-text-secondary">Day {day}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
