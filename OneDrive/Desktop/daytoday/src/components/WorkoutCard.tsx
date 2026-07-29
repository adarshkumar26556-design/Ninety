"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dumbbell, ChevronDown, Plus, Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface Exercise {
  id: string;
  name: string;
  isCompleted: boolean;
}

interface WorkoutCardProps {
  exercises: Exercise[];
  onToggleExercise: (id: string) => void;
  onAddExercise?: () => void;
  onRemoveExercise?: (id: string) => void;
}

export function WorkoutCard({ exercises, onToggleExercise, onAddExercise, onRemoveExercise }: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const completedCount = exercises.filter((e) => e.isCompleted).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader 
        className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Today's Workout</CardTitle>
              <p className="text-sm text-text-secondary mt-1">
                {completedCount} / {exercises.length} Completed
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <ChevronDown className="w-6 h-6 text-text-secondary" />
          </motion.div>
        </div>
      </CardHeader>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CardContent className="pt-2 border-t border-text-secondary/10">
              <div className="space-y-3 mt-4">
                {exercises.length === 0 ? (
                  <p className="text-center text-sm text-text-secondary py-4">No exercises added.</p>
                ) : (
                  exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
                    >
                      <label className="flex-1 flex items-center justify-between cursor-pointer pr-10">
                        <span className={cn(
                          "text-lg font-medium transition-colors",
                          exercise.isCompleted ? "text-success line-through opacity-70" : "text-text-primary"
                        )}>
                          {exercise.name}
                        </span>
                        <input
                          type="checkbox"
                          checked={exercise.isCompleted}
                          onChange={() => onToggleExercise(exercise.id)}
                          className="w-6 h-6 rounded-md border-text-secondary/30 text-accent focus:ring-accent accent-accent transition-all cursor-pointer"
                        />
                      </label>
                    </div>
                  ))
                )}
              </div>
              
              {onAddExercise && (
                <Button 
                  variant="outline" 
                  className="w-full mt-6 gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddExercise();
                  }}
                >
                  <Plus className="w-5 h-5" />
                  Add Exercise
                </Button>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
