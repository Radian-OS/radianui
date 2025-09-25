import React, { useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

const inputVariants = cva(
	`
    flex w-full bg-bg border border-alpha transition-[color,box-shadow] text-fg placeholder:text-fg-tertiary
    focus-visible:ring-primary-focus focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2
    disabled:cursor-not-allowed disabled:opacity-60 disabled:text-fg-disabled disabled:bg-fill1
    [&[readonly]]:bg-fill1 [&[readonly]]:cursor-not-allowed
    file:h-full [&[type=file]]:py-0 file:border-solid file:border-alpha file:bg-transparent
    file:font-medium file:not-italic file:text-fg file:p-0 file:border-0 file:border-e
    aria-invalid:border-error aria-invalid:ring-error-focus
  `,
	{
		variants: {
			size: {
				"28": "h-7 text-xs p-1.5 rounded-md file:pe-1.5 file:me-1.5",
				"32": "h-8 text-sm px-3 py-1.5 rounded-md file:pe-3 file:me-3",
				"36": "h-9 text-sm px-2.5 py-2 rounded-lg file:pe-2.5 file:me-2.5",
				"40": "h-10 text-sm px-3 py-2.5 rounded-lg file:pe-3 file:me-3",
				"44": "h-11 text-base py-2.5 px-3.5 rounded-[10px] file:pe-3.5 file:me-3.5",
				"48": "h-12 text-base py-3 px-3.5 rounded-[10px] file:pe-3.5 file:me-3.5",
			},
		},
		defaultVariants: {
			size: "36",
		},
	}
)

const passwordToggleVariants = cva(
	"absolute inset-y-0 end-0 flex items-center justify-center text-fg-secondary hover:text-fg disabled:hover:text-fg-secondary disabled:cursor-not-allowed disabled:opacity-60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-1 rounded-sm",
	{
		variants: {
			size: {
				"28": "w-7 [&_svg:not([class*=size-])]:size-3.5",
				"32": "w-8 [&_svg:not([class*=size-])]:size-3.5",
				"36": "w-9 [&_svg:not([class*=size-])]:size-4",
				"40": "w-10 [&_svg:not([class*=size-])]:size-4",
				"44": "w-11 [&_svg:not([class*=size-])]:size-4.5",
				"48": "w-12 [&_svg:not([class*=size-])]:size-4.5",
			},
		},
		defaultVariants: {
			size: "36",
		},
	}
)

interface PasswordProps extends Omit<React.ComponentProps<"input">, "size" | "type">, VariantProps<typeof inputVariants> {
	toggleVisibility?: "always" | "focus" | "never"
	ref?: React.Ref<HTMLInputElement>
}

const Password: React.FC<PasswordProps> = ({ toggleVisibility = "focus", className, size = "36", placeholder = "Enter password", ref, onFocus, onBlur, ...props }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

	const togglePasswordVisibility = () => {
		setIsVisible(!isVisible)
	}

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(true)
		onFocus?.(event)
	}

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		// Only hide if blur is not caused by clicking the toggle button
		const relatedTarget = event.relatedTarget as HTMLElement
		const isToggleButton = relatedTarget?.getAttribute("aria-label")?.includes("password")

		if (!isToggleButton) {
			setIsFocused(false)
		}
		onBlur?.(event)
	}

	const handleToggleMouseDown = (event: React.MouseEvent) => {
		// Prevent the input from losing focus when clicking the toggle
		event.preventDefault()
	}

	// Calculate padding adjustment for toggle button
	const paddingMap: Record<"28" | "32" | "36" | "40" | "44" | "48", string> = {
		"28": "pe-7",
		"32": "pe-8",
		"36": "pe-9",
		"40": "pe-10",
		"44": "pe-11",
		"48": "pe-12",
	}

	const paddingClass = toggleVisibility !== "never" ? (paddingMap[size as keyof typeof paddingMap] ?? "") : ""

	// Determine if toggle should be shown
	const showToggle = toggleVisibility === "always" || (toggleVisibility === "focus" && isFocused)

	return (
		<div className="relative">
			<input
				ref={ref}
				data-slot="input"
				type={isVisible ? "text" : "password"}
				placeholder={placeholder}
				className={cn(inputVariants({ size }), paddingClass, className)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...props}
			/>
			{showToggle && (
				<button
					type="button"
					onClick={props.disabled ? undefined : togglePasswordVisibility}
					onMouseDown={handleToggleMouseDown}
					disabled={props.disabled}
					className={cn(passwordToggleVariants({ size }))}
					aria-label={isVisible ? "Hide password" : "Show password"}
					tabIndex={-1}>
					{isVisible ? <EyeOff className="cursor-pointer" /> : <Eye className="cursor-pointer" />}
				</button>
			)}
		</div>
	)
}

Password.displayName = "Password"

export { Password }
