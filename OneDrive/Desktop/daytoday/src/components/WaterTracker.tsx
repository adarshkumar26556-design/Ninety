"use client"

import * as React from "react"
import { Droplets, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"

interface WaterTrackerProps {
  currentAmount: number; // in ml
  goalAmount: number; // in ml
  onAddWater: (amount: number) => void;
}

export function WaterTracker({ currentAmount, goalAmount, onAddWater }: WaterTrackerProps) {
  return (
    <Card className="overflow-hidden relative bg-gradient-to-br from-[#0ea5e9]/10 to-transparent border-[#0ea5e9]/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/20 flex items-center justify-center text-[#0ea5e9]">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary">Water Tracker</h3>
              <p className="text-sm text-text-secondary mt-1">
                {currentAmount}ml / {goalAmount}ml Goal
              </p>
            </div>
          </div>
        </div>

        <Progress 
          value={currentAmount} 
          max={goalAmount} 
          indicatorColor="bg-[#0ea5e9]"
          className="mb-6 h-3 bg-[#0ea5e9]/20"
        />

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 gap-2 border-[#0ea5e9]/30 text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
            onClick={() => onAddWater(250)}
          >
            <Plus className="w-4 h-4" />
            250ml
          </Button>
          <Button 
            variant="outline"
            className="flex-1 gap-2 border-[#0ea5e9]/30 text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
            onClick={() => onAddWater(500)}
          >
            <Plus className="w-4 h-4" />
            500ml
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
