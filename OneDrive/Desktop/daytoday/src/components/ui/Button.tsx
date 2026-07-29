import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[14px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-accent text-white hover:bg-accent/90 shadow-sm": variant === "default",
            "border border-text-secondary/20 bg-primary hover:bg-background text-text-primary shadow-sm": variant === "outline",
            "hover:bg-text-secondary/10 text-text-primary": variant === "ghost",
            "text-accent underline-offset-4 hover:underline": variant === "link",
            "bg-danger text-white hover:bg-danger/90 shadow-sm": variant === "danger",
            "h-12 px-6 py-2": size === "default",
            "h-9 rounded-xl px-3": size === "sm",
            "h-14 rounded-2xl px-8 text-base": size === "lg",
            "h-12 w-12": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
