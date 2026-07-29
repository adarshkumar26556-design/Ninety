"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Trophy, Star, Medal, Award, Crown, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"

const achievements = [
  { id: 1, name: "First Step", description: "Complete Day 1", icon: CheckCircle2, color: "text-success", isUnlocked: true },
  { id: 2, name: "3 Day Streak", description: "Maintain a 3 day streak", icon: Flame, color: "text-orange-500", isUnlocked: true },
  { id: 3, name: "7 Day Streak", description: "Maintain a 7 day streak", icon: Star, color: "text-yellow-500", isUnlocked: false },
  { id: 4, name: "15 Days", description: "Complete 15 days total", icon: Medal, color: "text-blue-500", isUnlocked: false },
  { id: 5, name: "30 Days", description: "Complete 30 days total", icon: Award, color: "text-purple-500", isUnlocked: false },
  { id: 6, name: "Halfway There", description: "Complete 45 days", icon: Trophy, color: "text-[#0ea5e9]", isUnlocked: false },
  { id: 7, name: "75 Days", description: "Complete 75 days total", icon: Crown, color: "text-rose-500", isUnlocked: false },
  { id: 8, name: "Champion", description: "Complete the 90 Day Challenge", icon: Trophy, color: "text-yellow-500", isUnlocked: false },
];

// Placeholder for missing icon imported above
function Flame(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
}

export default function AchievementsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <h1 className="text-3xl font-bold text-text-primary">Achievements</h1>
        <p className="text-text-secondary mt-1">Unlock badges as you progress.</p>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-none ${achievement.isUnlocked ? 'bg-primary shadow-sm hover:shadow-md' : 'bg-primary/50 opacity-60 grayscale'}`}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${achievement.isUnlocked ? 'bg-background shadow-inner' : 'bg-text-secondary/10'}`}>
                  <achievement.icon className={`w-8 h-8 ${achievement.isUnlocked ? achievement.color : 'text-text-secondary'}`} />
                </div>
                <h3 className="text-sm font-bold text-text-primary mb-1">{achievement.name}</h3>
                <p className="text-xs text-text-secondary">{achievement.description}</p>
                
                {achievement.isUnlocked && (
                  <div className="mt-3 px-3 py-1 bg-success/10 text-success text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Unlocked
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
