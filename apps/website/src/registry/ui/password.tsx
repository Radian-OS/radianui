import React, { useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

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

const passwordInputVariants = cva("", {
	variants: {
		size: {
			"28": "",
			"32": "",
			"36": "",
			"40": "",
			"44": "",
			"48": "",
		},
		hasToggle: {
			true: "",
			false: "",
		},
	},
	compoundVariants: [
		{ size: "28", hasToggle: true, class: "pe-7" },
		{ size: "32", hasToggle: true, class: "pe-8" },
		{ size: "36", hasToggle: true, class: "pe-9" },
		{ size: "40", hasToggle: true, class: "pe-10" },
		{ size: "44", hasToggle: true, class: "pe-11" },
		{ size: "48", hasToggle: true, class: "pe-12" },
	],
	defaultVariants: {
		size: "36",
		hasToggle: false,
	},
})

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
		const relatedTarget = event.relatedTarget as HTMLElement
		const isToggleButton = relatedTarget?.getAttribute("aria-label")?.includes("password")
		if (!isToggleButton) {
			setIsFocused(false)
		}
		onBlur?.(event)
	}

	const handleToggleMouseDown = (event: React.MouseEvent) => {
		event.preventDefault()
	}

	const showToggle = toggleVisibility === "always" || (toggleVisibility === "focus" && isFocused)
	const hasToggle = toggleVisibility !== "never"

	return (
		<div className="relative">
			<input
				ref={ref}
				data-slot="input"
				type={isVisible ? "text" : "password"}
				placeholder={placeholder}
				className={cn(inputVariants({ size }), passwordInputVariants({ size, hasToggle }), className)}
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
