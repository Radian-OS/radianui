"use client"
import { useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & 
  Omit<VariantProps<typeof badgeVariants>, "size"> & { 
    closable?: boolean 
    size?: BadgeSize 
    className?: string 
  }

type BadgeSize = "20" | "24" | "28" | "32"

const badgeVariants = cva("inline-flex items-center font-medium box-border rounded-md", {
  variants: {
    variant: {
      "neutral-outline": "outline outline-border-alpha",
      strong: "bg-primary text-white font-semibold",
      outline: "text-primary-text outline outline-primary"
    },
    size: {
      "20": "h-5 px-1.5 text-xs",
      "24": "h-6 px-2 text-xs",
      "28": "h-7 px-2.5 text-sm",
      "32": "h-8 px-3 text-sm",
    }
  },
  defaultVariants: {
    variant: "neutral-outline",
    size: "24"
  },
})

const iconSizeMap: Record<BadgeSize, string> = {
  "20": "size-3",
  "24": "size-3",
  "28": "size-4",
  "32": "size-4",
}

function Badge({ 
  variant = "neutral-outline", 
  size = "24", 
  closable = false, 
  className, 
  children, 
  ...props 
}: BadgeProps) {
  const [showBadge, setShowBadge] = useState(true)
  
  return (
    showBadge && (
      <div
        className={cn(
          badgeVariants({ variant, size }),
          'flex items-center gap-1',
          className
        )}
        {...props}
      >
        {Array.isArray(children)
          ? children.map((child, index) =>
              typeof child === "object" &&
              "type" in child &&
              (child.type === "svg" || typeof child.type === "function") ? (
                <span key={index}>{child}</span>
              ) : (
                child
              )
            )
          : children}
        {closable && (
          <X
            onClick={() => setShowBadge(false)}
            className={cn(
              iconSizeMap[size],
              "cursor-pointer font-extrabold",
              variant === "neutral-outline" && "text-text-disabled"
            )}
          />
        )}
      </div>
    )
  )
}

export { Badge }