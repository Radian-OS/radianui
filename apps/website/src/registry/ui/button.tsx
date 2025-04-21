"use client"

import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: React.ReactNode
  isIcon?: boolean
  color?: "primary" | "information" | "success" | "error" | "warning"
}

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  rounded?: "square" | "rounded" | "full"
  color?: ButtonProps["color"]
}

const buttonVariants = cva(
  "inline-flex items-center justify-center box-border transition duration-200 transform rounded-lg disabled:opacity-50  focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-fit",
  {
    variants: {
      variant: {
        strong: "",
        soft: "",
        outline: "",
        ghost: "",
        "neutral-soft": "bg-bg-base font-medium enabled:hover:bg-fill-level1 focus-visible:outline-none focus-visible:ring-border-alpha disabled:drop-shadow-sm",
        "neutral-outline": "bg-bg-base font-medium outline-1 outline-border-alpha drop-shadow-xs enabled:hover:bg-fill-level2  focus-visible:ring-border-alpha",
      },
      size: {
        "28": "[&>svg]:size-4 text-xs",
        "32": "[&>svg]:size-5 text-sm",
        "36": "[&>svg]:size-5 text-sm",
        "40": "[&>svg]:size-5 text-sm",
        "44": "[&>svg]:size-6 text-base",
        "48": "[&>svg]:size-6 text-base",
      },
      isIcon: {
        true: "",
        false: "",
      },
      color: {
        primary: "",
        information: "",
        success: "",
        error: "",
        warning: "",
      },
    },
    defaultVariants: {
      variant: "strong",
      size: "36",
      isIcon: false,
      color: "primary",
    },
    compoundVariants: [
      // Size variants
      { isIcon: false, size: "28", className: "gap-1.5 h-7 px-2" },
      { isIcon: false, size: "32", className: "gap-1.5 h-8 px-2.5" },
      { isIcon: false, size: "36", className: "gap-1.5 h-9 px-3" },
      { isIcon: false, size: "40", className: "gap-1.5 h-10 px-3.5" },
      { isIcon: false, size: "44", className: "gap-2 h-11 px-4" },
      { isIcon: false, size: "48", className: "gap-2 h-12 px-4.5" },
      { isIcon: true, size: "28", className: "px-1.5 h-7 gap-1.5" },
      { isIcon: true, size: "32", className: "px-1.5 h-8 gap-1.5" },
      { isIcon: true, size: "36", className: "px-2 h-9 gap-1.5" },
      { isIcon: true, size: "40", className: "px-2.5 h-10 gap-1.5" },
      { isIcon: true, size: "44", className: "px-2.5 h-11 gap-2" },
      { isIcon: true, size: "48", className: "px-3 h-12 gap-2" },

      // Strong variant + colors
      { variant: "strong", color: "primary", className: "bg-primary font-semibold text-static-white enabled:hover:bg-primary-hover   focus-visible:ring-primary focus-visible:outline-none" },
      { variant: "strong", color: "information", className: "bg-information font-semibold text-static-white enabled:hover:bg-information-hover   focus-visible:ring-information focus-visible:outline-none" },
      { variant: "strong", color: "success", className: "bg-success font-semibold text-static-white enabled:hover:bg-success-hover   focus-visible:ring-success focus-visible:outline-none" },
      { variant: "strong", color: "error", className: "bg-error font-semibold text-static-white enabled:hover:bg-error-hover   focus-visible:ring-error focus-visible:outline-none" },
      { variant: "strong", color: "warning", className: "bg-warning font-semibold text-static-white enabled:hover:bg-warning-hover   focus-visible:ring-warning focus-visible:outline-none" },

      // Soft variant + colors
      { variant: "soft", color: "primary", className: "bg-primary-accent font-medium text-primary enabled:hover:bg-primary/15   focus-visible:ring-primary-focus focus-visible:outline-none" },
      { variant: "soft", color: "information", className: "bg-information-accent font-medium text-information enabled:hover:bg-information/15   focus-visible:ring-information-focus focus-visible:outline-none" },
      { variant: "soft", color: "success", className: "bg-success-accent font-medium text-success enabled:hover:bg-success/15   focus-visible:ring-success-focus focus-visible:outline-none" },
      { variant: "soft", color: "error", className: "bg-error-accent font-medium text-error enabled:hover:bg-error/15   focus-visible:ring-error-focus focus-visible:outline-none" },
      { variant: "soft", color: "warning", className: "bg-warning-accent font-medium text-warning enabled:hover:bg-warning/15   focus-visible:ring-warning-focus focus-visible:outline-none" },

      // Outline variant + colors (updated to use outline & ring)
      { variant: "outline", color: "primary", className: "bg-bg-base font-medium outline outline-primary-stroke text-primary enabled:hover:bg-primary-accent   focus-visible:ring-primary-stroke" },
      { variant: "outline", color: "information", className: "bg-bg-base font-medium outline outline-information-stroke text-information enabled:hover:bg-information-accent   focus-visible:ring-information-stroke" },
      { variant: "outline", color: "success", className: "bg-bg-base font-medium outline outline-success-stroke text-success enabled:hover:bg-success-accent   focus-visible:ring-success-stroke" },
      { variant: "outline", color: "error", className: "bg-bg-base font-medium outline outline-error-stroke text-error enabled:hover:bg-error-accent   focus-visible:ring-error-stroke" },
      { variant: "outline", color: "warning", className: "bg-bg-base font-medium outline outline-warning-stroke text-warning enabled:hover:bg-warning-accent   focus-visible:ring-warning-stroke" },

      // Ghost variant + colors
      { variant: "ghost", color: "primary", className: "bg-transparent text-primary font-medium enabled:hover:bg-primary/10" },
      { variant: "ghost", color: "information", className: "bg-transparent text-information font-medium enabled:hover:bg-information/10" },
      { variant: "ghost", color: "success", className: "bg-transparent text-success font-medium enabled:hover:bg-success/10" },
      { variant: "ghost", color: "error", className: "bg-transparent text-error font-medium enabled:hover:bg-error/10" },
      { variant: "ghost", color: "warning", className: "bg-transparent text-warning font-medium enabled:hover:bg-warning/10" },
    ],
  }
)

function Button({
  variant = "strong",
  size = "36",
  isIcon = false,
  color = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, isIcon, color }), className)} {...props}>
      {children}
    </button>
  )
}
Button.displayName = "Button"

function ButtonGroup({
  className,
  children,
  variant = "outline",
  size = "36",
  rounded = "rounded",
  color = "primary",
  ...props
}: ButtonGroupProps) {
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const isFirst = index === 0
      const isLast = index === React.Children.count(children) - 1
      const borderRightClass = variant === "outline" || variant === "neutral-outline" ? "border-r" : ""

      let firstButtonRounding = ""
      let lastButtonRounding = ""

      if (rounded === "rounded") {
        firstButtonRounding = "rounded-l-lg"
        lastButtonRounding = "rounded-r-lg"
      } else if (rounded === "square") {
        firstButtonRounding = "rounded-l-xs"
        lastButtonRounding = "rounded-r-xs"
      } else if (rounded === "full") {
        firstButtonRounding = "rounded-l-full"
        lastButtonRounding = "rounded-r-full"
      }

      if (React.isValidElement<ButtonProps>(child)) {
        return React.cloneElement(child, {
          variant,
          size,
          color,
          className: cn(
            child.props.className,
            "relative focus:z-10",
            borderRightClass,
            "rounded-none",
            isFirst && firstButtonRounding,
            isLast && lastButtonRounding,
            !isFirst && "-ml-px"
          ),
        })
      }
    }
    return child
  })

  return (
    <div className={cn("inline-flex", className)} role="group" {...props}>
      {modifiedChildren}
    </div>
  )
}
ButtonGroup.displayName = "ButtonGroup"

export { Button, ButtonGroup }
