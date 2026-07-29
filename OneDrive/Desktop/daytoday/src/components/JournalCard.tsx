"use client"

import * as React from "react"
import { BookOpen, Smile, Meh, Frown } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function JournalCard() {
  const [mood, setMood] = React.useState<"good" | "neutral" | "bad" | null>(null);
  const [notes, setNotes] = React.useState("");

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center text-warning">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Daily Journal</CardTitle>
            <p className="text-sm text-text-secondary mt-1">Reflect on your day</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">How are you feeling?</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setMood("good")}
                className={cn(
                  "flex-1 py-2 flex justify-center items-center rounded-xl border transition-colors",
                  mood === "good" ? "bg-success/10 border-success/30 text-success" : "bg-transparent border-text-secondary/20 hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <Smile className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setMood("neutral")}
                className={cn(
                  "flex-1 py-2 flex justify-center items-center rounded-xl border transition-colors",
                  mood === "neutral" ? "bg-warning/10 border-warning/30 text-warning" : "bg-transparent border-text-secondary/20 hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <Meh className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setMood("bad")}
                className={cn(
                  "flex-1 py-2 flex justify-center items-center rounded-xl border transition-colors",
                  mood === "bad" ? "bg-danger/10 border-danger/30 text-danger" : "bg-transparent border-text-secondary/20 hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <Frown className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write about your experience today..."
              className="w-full h-32 p-4 rounded-xl border border-text-secondary/20 bg-transparent text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none transition-all"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Clear</Button>
            <Button size="sm">Save Entry</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
