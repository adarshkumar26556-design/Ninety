"use client"

import * as React from "react"
import { X, Check } from "lucide-react"
import { Button } from "./ui/Button"
import { cn } from "@/lib/utils"

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: { name: string, description: string, iconName: string }) => void;
}

const ICONS = ["Ban", "Flame", "Cookie", "Moon", "Smile", "Brain", "Smartphone", "Heart", "Dumbbell", "Droplets"];

export function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [iconName, setIconName] = React.useState(ICONS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name, description, iconName });
    setName("");
    setDescription("");
    setIconName(ICONS[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-background w-full max-w-md rounded-3xl p-6 shadow-xl animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">New Habit</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-primary mb-1 block">Habit Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Read 10 Pages"
              className="w-full h-12 px-4 rounded-xl border border-text-secondary/20 bg-transparent text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary mb-1 block">Description</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Learn something new every day"
              className="w-full h-12 px-4 rounded-xl border border-text-secondary/20 bg-transparent text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">Select Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setIconName(icon)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-lg border transition-colors",
                    iconName === icon ? "bg-accent text-white border-accent" : "border-text-secondary/20 text-text-secondary hover:bg-text-secondary/10"
                  )}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full h-12 mt-6 rounded-xl">
            Create Habit
          </Button>
        </form>
      </div>
    </div>
  )
}
