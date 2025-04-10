"use client"

import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckboxProps = {
	name?: string
	value?: string | number
	checked?: boolean
	defaultChecked?: boolean
	onChange?: (checked: boolean) => void
	disabled?: boolean
	size?: "sm" | "md" | "lg"
	icon?: React.ReactElement
	className?: string
	children?: React.ReactNode
}

type CheckboxGroupProps = {
	label?: string
	defaultValue?: string[]
	value?: string[]
	onChange?: (values: string[]) => void
	size?: CheckboxProps["size"]
	disabled?: boolean
	className?: string
	children?: React.ReactNode
}

function Checkbox({
	name,
	value,
	checked: checkedProp,
	defaultChecked = false,
	onChange,
	disabled = false,
	size = "md",
	icon = <Check />,
	className,
	children,
	...props
}: CheckboxProps) {
	const [isChecked, setIsChecked] = React.useState(defaultChecked)

	const checked = checkedProp !== undefined ? checkedProp : isChecked

	React.useEffect(() => {
		if (checkedProp !== undefined) {
			setIsChecked(checkedProp)
		}
	}, [checkedProp])

	const handleClick = () => {
		if (disabled) return

		const newChecked = !checked
		if (onChange) {
			onChange(newChecked)
		} else {
			setIsChecked(newChecked)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault()
			handleClick()
		}
	}

	const sizeClasses: Record<string, string> = {
		sm: "size-4 rounded-sm",
		md: "size-5 rounded-md",
		lg: "size-6 rounded-lg",
	}

	return (
		<label className={cn("inline-flex w-fit cursor-pointer items-center gap-2 text-sm", disabled ? "text-fg2 cursor-not-allowed" : "cursor-pointer")}>
			<button
				type="button"
				role="checkbox"
				aria-checked={checked}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={cn(
					"relative",
					sizeClasses[size],
					"border outline-hidden transition-all duration-200",
					disabled ? "bg-bg2 cursor-not-allowed" : "cursor-pointer",
					checked && "bg-primary border-none",
					checked && disabled && "bg-fg2 border-none",
					className
				)}
				{...props}>
				<input type="checkbox" checked={checked} name={name} value={value} hidden readOnly />

				<div
					className={cn(
						"absolute inset-[1px] flex items-center justify-center text-white transition-opacity",
						checked ? "opacity-100" : "opacity-0"
					)}>
					{React.isValidElement(icon) &&
						React.cloneElement(icon as React.ReactElement<React.ComponentProps<"svg"> & { size?: number }>, {
							size: size === "sm" ? 12 : size === "md" ? 16 : 20,
							className: "",
						})}
				</div>
			</button>
			{children && <span className={cn("select-none", disabled ? "text-fg2" : "text-primary-foreground")}>{children}</span>}
		</label>
	)
}

function CheckboxGroup({ defaultValue = [], label, value, onChange, size = "md", disabled = false, className, children }: CheckboxGroupProps) {
	const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue)

	React.useEffect(() => {
		if (value !== undefined) {
			setSelectedValues(value)
		}
	}, [value])

	const handleCheckboxChange = (checkboxValue: string, checked: boolean) => {
		const newValues = checked ? [...selectedValues, checkboxValue] : selectedValues.filter((v) => v !== checkboxValue)

		setSelectedValues(newValues)
		onChange?.(newValues)
	}

	const cloneChild = (child: React.ReactNode): React.ReactNode => {
		if (!React.isValidElement(child)) {
			throw new Error("CheckboxGroup only accepts valid React elements.")
		}

		if (child.type !== Checkbox) {
			throw new Error("CheckboxGroup only accepts Checkbox components as children.")
		}
		const childProps = child.props as CheckboxProps
		const childValue = childProps.value?.toString()

		return React.cloneElement(child as React.ReactElement<CheckboxProps>, {
			size,
			disabled: disabled || childProps.disabled,
			checked: selectedValues.includes(childValue as string),
			onChange: (checked: boolean) => {
				if (childValue) {
					handleCheckboxChange(childValue, checked)
				}
				childProps.onChange?.(checked)
			},
		})
	}
	return (
		<div className="flex flex-col gap-3">
			{label && <span className="text-sm font-medium">{label}</span>}
			<div className={cn("flex flex-col gap-2", className)}>{React.Children.map(children, (child) => cloneChild(child))}</div>
		</div>
	)
}

export { Checkbox, CheckboxGroup }
