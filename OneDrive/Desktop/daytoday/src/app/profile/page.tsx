"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Settings, LogOut, Download, Moon, Bell, ChevronRight, User, Trash2 } from "lucide-react"

import { useStore } from "@/store/useStore"

export default function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const { name, startDate } = useStore();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <section className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-4 border-background shadow-lg relative overflow-hidden">
          <User className="w-12 h-12 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{name || "Challenger"}</h1>
          <p className="text-text-secondary mt-1">Challenge 1 / 90 Days</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full">
            Longest Streak: 12 Days
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-text-primary px-2">Settings</h2>
        <Card className="overflow-hidden">
          <div className="flex flex-col">
            <button 
              className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-text-secondary/10"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-text-secondary/10 flex items-center justify-center text-text-primary">
                  <Moon className="w-5 h-5" />
                </div>
                <span className="font-medium">Dark Mode</span>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-text-secondary/30 transition-colors">
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6 bg-accent' : 'translate-x-1'}`} />
              </div>
            </button>
            
            <button className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-text-secondary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-text-secondary/10 flex items-center justify-center text-text-primary">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-medium">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>

            <button className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-text-secondary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-text-secondary/10 flex items-center justify-center text-text-primary">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="font-medium">General Preferences</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>

            <button className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-text-secondary/10 flex items-center justify-center text-text-primary">
                  <Download className="w-5 h-5" />
                </div>
                <span className="font-medium">Export Data (PDF)</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-danger px-2">Danger Zone</h2>
        <Card className="border-danger/20 overflow-hidden bg-danger/5">
          <div className="flex flex-col">
            <button className="flex items-center justify-between p-4 hover:bg-danger/10 transition-colors border-b border-danger/10">
              <div className="flex items-center gap-3 text-danger">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </div>
            </button>
            <button className="flex items-center justify-between p-4 hover:bg-danger/10 transition-colors">
              <div className="flex items-center gap-3 text-danger">
                <Trash2 className="w-5 h-5" />
                <span className="font-medium">Delete Account</span>
              </div>
            </button>
          </div>
        </Card>
      </section>
    </div>
  )
}
