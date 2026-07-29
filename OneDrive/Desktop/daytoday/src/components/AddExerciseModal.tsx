"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "./ui/Button"

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddExerciseModal({ isOpen, onClose, onAdd }: AddExerciseModalProps) {
  const [name, setName] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-background w-full max-w-sm rounded-3xl p-6 shadow-xl animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-text-primary">Add Exercise</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 50x Pushups"
              className="w-full h-12 px-4 rounded-xl border border-text-secondary/20 bg-transparent text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full h-12 mt-4 rounded-xl">
            Add
          </Button>
        </form>
      </div>
    </div>
  )
}
