"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, BarChart2, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Stats", href: "/stats", icon: BarChart2 },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Profile", href: "/profile", icon: User },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-text-secondary/10 md:sticky md:top-0 md:h-screen md:w-20 md:border-t-0 md:border-r flex md:flex-col md:justify-center">
      <div className="flex items-center justify-around md:flex-col md:gap-8 w-full h-20 md:h-auto px-4 md:px-0 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-16 md:w-full md:h-20"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-accent/10 rounded-2xl md:rounded-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  "w-6 h-6 transition-colors duration-200 z-10",
                  isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={cn(
                  "text-[10px] font-medium mt-1 z-10 transition-colors duration-200 md:hidden",
                  isActive ? "text-accent" : "text-text-secondary"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
