"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Trash2, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface HabitCardProps {
  id: string;
  name: string;
  description?: string;
  icon: LucideIcon;
  isCompleted: boolean;
  onToggle: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function HabitCard({
  id,
  name,
  description,
  icon: Icon,
  isCompleted,
  onToggle,
  onRemove,
}: HabitCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden flex items-center p-4 rounded-[20px] transition-all duration-300 border text-left cursor-pointer",
        isCompleted 
          ? "bg-success/10 border-success/20 shadow-sm" 
          : "bg-primary border-text-secondary/10 hover:shadow-md hover:border-text-secondary/20"
      )}
      onClick={() => onToggle(id)}
    >
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl transition-colors duration-300",
        isCompleted ? "bg-success text-white" : "bg-accent/10 text-accent"
      )}>
        {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
      </div>
      
      <div className="ml-4 flex-1 pr-10">
        <h4 className={cn(
          "text-lg font-semibold transition-colors duration-300",
          isCompleted ? "text-success" : "text-text-primary"
        )}>
          {name}
        </h4>
        {description && (
          <p className="text-sm text-text-secondary line-clamp-1 mt-0.5">
            {description}
          </p>
        )}
      </div>

      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
        isCompleted 
          ? "bg-success border-success" 
          : "border-text-secondary/30 bg-transparent"
      )}>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          className="absolute right-2 top-2 p-2 rounded-full text-danger/0 hover:bg-danger/10 group-hover:text-danger/70 hover:!text-danger transition-all focus:text-danger/100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
