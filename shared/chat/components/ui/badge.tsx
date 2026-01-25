import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border w-5 h-5 text-xs font-semibold",
        "border-transparent bg-primary text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
