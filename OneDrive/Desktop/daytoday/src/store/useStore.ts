import { create } from "zustand"
import { persist } from "zustand/middleware"
import { format, isSameDay, parseISO } from "date-fns"

export interface Habit {
  id: string;
  name: string;
  description: string;
  iconName: string;
  isCompleted: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface UserState {
  name: string;
  hasCompletedOnboarding: boolean;
  startDate: string | null;
  lastActiveDate: string | null;
  
  // Daily State
  waterGoal: number;
  waterCurrent: number;
  habits: Habit[];
  exercises: Exercise[];
  
  // History & Stats
  history: Record<string, number>; // date 'yyyy-MM-dd' -> score percentage (0-100)
  currentStreak: number;
  longestStreak: number;
  
  // Actions
  setName: (name: string) => void;
  completeOnboarding: () => void;
  toggleHabit: (id: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'isCompleted'>) => void;
  removeHabit: (id: string) => void;
  toggleExercise: (id: string) => void;
  addExercise: (name: string) => void;
  removeExercise: (id: string) => void;
  addWater: (amount: number) => void;
  saveDailyProgress: () => void;
  checkAndResetDaily: () => void;
}

const DEFAULT_HABITS: Habit[] = [];
const DEFAULT_EXERCISES: Exercise[] = [];

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: "",
      hasCompletedOnboarding: false,
      startDate: null,
      lastActiveDate: null,
      
      waterGoal: 3000,
      waterCurrent: 0,
      habits: DEFAULT_HABITS,
      exercises: DEFAULT_EXERCISES,
      
      history: {},
      currentStreak: 0,
      longestStreak: 0,

      setName: (name) => set({ name }),
      completeOnboarding: () => set({ 
        hasCompletedOnboarding: true, 
        startDate: new Date().toISOString(),
        lastActiveDate: new Date().toISOString()
      }),
      
      toggleHabit: (id) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, isCompleted: !h.isCompleted } : h
          ),
        }));
        get().saveDailyProgress();
      },

      addHabit: (habit) => {
        set((state) => ({
          habits: [...state.habits, { ...habit, id: Date.now().toString(), isCompleted: false }]
        }));
      },

      removeHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter(h => h.id !== id)
        }));
      },
      
      toggleExercise: (id) => {
        set((state) => ({
          exercises: state.exercises.map((e) =>
            e.id === id ? { ...e, isCompleted: !e.isCompleted } : e
          ),
        }));
        get().saveDailyProgress();
      },

      addExercise: (name) => {
        set((state) => ({
          exercises: [...state.exercises, { id: Date.now().toString(), name, isCompleted: false }]
        }));
      },

      removeExercise: (id) => {
        set((state) => ({
          exercises: state.exercises.filter(e => e.id !== id)
        }));
      },
      
      addWater: (amount) => {
        set((state) => ({
          waterCurrent: Math.min(state.waterCurrent + amount, state.waterGoal),
        }));
        get().saveDailyProgress();
      },
      
      saveDailyProgress: () => {
        const state = get();
        if (!state.startDate) return;
        
        const completedHabits = state.habits.filter(h => h.isCompleted).length;
        const isWorkoutDone = state.exercises.length > 0 && state.exercises.every(e => e.isCompleted);
        const isWaterDone = state.waterCurrent >= state.waterGoal;
        
        const totalScore = state.habits.length + (state.exercises.length > 0 ? 1 : 0) + 1; // 1 for water
        if (totalScore === 0) return; // Prevent NaN

        const currentScore = completedHabits + (isWorkoutDone ? 1 : 0) + (isWaterDone ? 1 : 0);
        const percentage = Math.round((currentScore / totalScore) * 100);
        
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        
        set((prev) => {
          const newHistory = { ...prev.history, [todayStr]: percentage };
          
          let newStreak = prev.currentStreak;
          if (percentage > 0 && newStreak === 0) {
            newStreak = 1;
          }
          
          return {
            history: newHistory,
            currentStreak: newStreak,
            longestStreak: Math.max(prev.longestStreak, newStreak),
            lastActiveDate: new Date().toISOString()
          };
        });
      },
      
      checkAndResetDaily: () => {
        const state = get();
        if (!state.lastActiveDate) return;
        
        const lastDate = parseISO(state.lastActiveDate);
        if (!isSameDay(lastDate, new Date())) {
          set((prev) => ({
            waterCurrent: 0,
            habits: prev.habits.map((h) => ({ ...h, isCompleted: false })),
            exercises: prev.exercises.map((e) => ({ ...e, isCompleted: false })),
            lastActiveDate: new Date().toISOString()
          }));
        }
      }
    }),
    {
      name: "90day-storage",
    }
  )
)
