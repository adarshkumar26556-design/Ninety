"use client"

import * as React from "react"
import { Flame, Ban, Cigarette, Cookie, Moon, Dumbbell, Droplets, Smile, Brain, Smartphone, Heart, ArrowRight, Plus } from "lucide-react"
import { CircularProgress } from "@/components/ui/CircularProgress"
import { HabitCard } from "@/components/HabitCard"
import { WorkoutCard } from "@/components/WorkoutCard"
import { WaterTracker } from "@/components/WaterTracker"
import { JournalCard } from "@/components/JournalCard"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { useStore } from "@/store/useStore"
import { differenceInDays, parseISO } from "date-fns"
import { AddHabitModal } from "@/components/AddHabitModal"
import { AddExerciseModal } from "@/components/AddExerciseModal"

const iconMap: Record<string, any> = {
  Ban, Flame, Cookie, Moon, Smile, Brain, Smartphone, Heart, Dumbbell, Droplets
};

export default function Home() {
  const { 
    name, setName, hasCompletedOnboarding, completeOnboarding, startDate,
    habits, toggleHabit, addHabit, removeHabit,
    exercises, toggleExercise, addExercise, removeExercise,
    waterCurrent, waterGoal, addWater,
    checkAndResetDaily, currentStreak
  } = useStore();

  const [isClient, setIsClient] = React.useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = React.useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    checkAndResetDaily();
  }, [checkAndResetDaily]);

  if (!isClient) return null; // Prevent hydration mismatch

  if (!hasCompletedOnboarding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in zoom-in duration-500 max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-8">
          <Flame className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-text-primary text-center mb-4">Welcome to Ninety</h1>
        <p className="text-text-secondary text-center mb-8 text-lg">Let's get to know you before we begin this journey to become your best self.</p>
        
        <div className="w-full space-y-4">
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">What should we call you?</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-14 px-4 rounded-xl border border-text-secondary/20 bg-transparent text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-lg transition-all"
            />
          </div>
          <Button 
            className="w-full h-14 text-lg rounded-xl gap-2 mt-4" 
            disabled={!name.trim()}
            onClick={completeOnboarding}
          >
            Start Challenge
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Calculate scores
  const completedHabits = habits.filter(h => h.isCompleted).length;
  const isWorkoutDone = exercises.length > 0 && exercises.every(e => e.isCompleted);
  const isWaterDone = waterCurrent >= waterGoal;
  
  const totalScore = habits.length + (exercises.length > 0 ? 1 : 0) + 1; // 1 for water
  const currentScore = completedHabits + (isWorkoutDone ? 1 : 0) + (isWaterDone ? 1 : 0);
  const completionPercentage = totalScore > 0 ? (currentScore / totalScore) * 100 : 0;

  // Calculate day
  const currentDay = startDate ? differenceInDays(new Date(), parseISO(startDate)) + 1 : 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AddHabitModal isOpen={isHabitModalOpen} onClose={() => setIsHabitModalOpen(false)} onAdd={addHabit} />
      <AddExerciseModal isOpen={isExerciseModalOpen} onClose={() => setIsExerciseModalOpen(false)} onAdd={addExercise} />

      {/* Top Section */}
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Good Morning, {name} 👋</h1>
          <p className="text-text-secondary mt-1 text-lg">Day {currentDay.toString().padStart(2, '0')} / 90</p>
          
          <div className="mt-4 flex gap-4">
            <div className="bg-text-secondary/10 px-4 py-2 rounded-2xl">
              <span className="text-xs text-text-secondary block">Current Streak</span>
              <span className="font-semibold text-text-primary">{currentStreak} Days 🔥</span>
            </div>
            <div className="bg-text-secondary/10 px-4 py-2 rounded-2xl">
              <span className="text-xs text-text-secondary block">Today's Score</span>
              <span className="font-semibold text-text-primary">{currentScore} / {totalScore}</span>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:block">
          <CircularProgress value={completionPercentage} size={140} strokeWidth={12} />
        </div>
      </section>

      {/* Mobile Progress (Visible only on mobile) */}
      <section className="sm:hidden flex justify-center py-4">
        <CircularProgress value={completionPercentage} size={160} strokeWidth={14} />
      </section>

      {/* Habits Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Daily Checklist
          </h2>
          <Button variant="outline" size="sm" onClick={() => setIsHabitModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Habit
          </Button>
        </div>
        
        {habits.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-text-secondary/20 rounded-2xl">
            <p className="text-text-secondary">No habits created yet. Click 'Add Habit' to start tracking!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {habits.map((habit, index) => {
                const Icon = iconMap[habit.iconName] || Ban;
                return (
                  <motion.div
                    key={habit.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HabitCard
                      id={habit.id}
                      name={habit.name}
                      description={habit.description}
                      icon={Icon}
                      isCompleted={habit.isCompleted}
                      onToggle={toggleHabit}
                      onRemove={removeHabit}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <WorkoutCard 
            exercises={exercises} 
            onToggleExercise={toggleExercise}
            onAddExercise={() => setIsExerciseModalOpen(true)}
            onRemoveExercise={removeExercise}
          />
        </section>

        <section>
          <WaterTracker 
            currentAmount={waterCurrent}
            goalAmount={waterGoal}
            onAddWater={addWater}
          />
        </section>
      </div>

      <section>
        <JournalCard />
      </section>
    </div>
  )
}
