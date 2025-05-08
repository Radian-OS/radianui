"use client"

import { useState } from "react"
import { Camera, Heart, Star } from "lucide-react"
import { Badge } from "@/registry/ui/badge"

interface SelectOption {
	value: string
	label: string
}

interface CustomSelectProps {
	label: string
	value: string
	onChange: (value: string) => void
	options: SelectOption[]
}

const CustomSelect = ({ label, value, onChange, options }: CustomSelectProps) => (
	<div className="flex flex-col">
		<label className="mb-2 text-sm font-medium">{label}</label>
		<select value={value} onChange={(e) => onChange(e.target.value)} className="bg-bg-level0 rounded-md border p-2">
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	</div>
)

const BadgeDemo = () => {
	const [variant, setVariant] = useState<"outline" | "strong">("outline")
	const [size, setSize] = useState<"20" | "24" | "28" | "32">("24")
	const [rounded, setRounded] = useState(false)
	const [closable, setClosable] = useState(false)
	const [icon, setIcon] = useState("none")

	const getIcon = () => {
		switch (icon) {
			case "camera":
				return <Camera size={16} />
			case "heart":
				return <Heart size={16} />
			case "star":
				return <Star size={16} />
			default:
				return null
		}
	}

	const handleVariantChange = (value: string) => {
		setVariant(value as "outline" | "strong")
	}

	const handleSizeChange = (value: string) => {
		setSize(value as "20" | "24" | "28" | "32")
	}

	return (
		<div className="w-full max-w-2xl space-y-6 p-6">
			<div className="grid grid-cols-2 gap-4">
				<CustomSelect
					label="Variant"
					value={variant}
					onChange={handleVariantChange}
					options={[
						{ value: "outline", label: "Outline" },
						{ value: "strong", label: "Strong" },
					]}
				/>

				<CustomSelect
					label="Size"
					value={size}
					onChange={handleSizeChange}
					options={[
						{ value: "20", label: "20" },
						{ value: "24", label: "24" },
						{ value: "28", label: "28" },
						{ value: "32", label: "32" },
					]}
				/>

				<CustomSelect
					label="Icon"
					value={icon}
					onChange={setIcon}
					options={[
						{ value: "none", label: "None" },
						{ value: "camera", label: "Camera" },
						{ value: "heart", label: "Heart" },
						{ value: "star", label: "Star" },
					]}
				/>

				<div className="flex flex-col gap-4">
					<label className="flex items-center gap-2">
						<input type="checkbox" checked={rounded} onChange={(e) => setRounded(e.target.checked)} className="h-4 w-4" />
						<span className="text-sm font-medium">Rounded</span>
					</label>

					<label className="flex items-center gap-2">
						<input type="checkbox" checked={closable} onChange={(e) => setClosable(e.target.checked)} className="h-4 w-4" />
						<span className="text-sm font-medium">Closable</span>
					</label>
				</div>
			</div>

			<div className="space-y-4">
				<div className="text-sm font-medium">Preview:</div>
				<div className="flex items-center justify-center rounded-lg border p-8">
					<Badge variant={variant} size={size} closable={closable}>
						{getIcon()}
						Badge Example
					</Badge>
				</div>
			</div>
		</div>
	)
}

export default BadgeDemo
