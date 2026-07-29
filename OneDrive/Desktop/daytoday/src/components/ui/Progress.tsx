"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  indicatorColor?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, indicatorColor = "bg-accent", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-text-secondary/10",
          className
        )}
        {...props}
      >
        <motion.div
          className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
          initial={{ x: "-100%" }}
          animate={{ x: `-${100 - percentage}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
