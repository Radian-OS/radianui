import React, { useState } from "react"
import CommonCard from "@/components/common/common-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

const ColorPlayground = () => {
	const [color, setColor] = useState("primary")

	return (
		<div className="flex flex-col gap-4">
			<Select value={color} onValueChange={(values) => setColor(values as string)}>
				<SelectTrigger className="w-fit">
					<span className={`border-border inline-block h-4 w-4 rounded-sm border bg-${color}`}></span> <SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="primary">Violet Blue</SelectItem>
					<SelectItem value="success">Emerald</SelectItem>
					<SelectItem value="error">Red</SelectItem>
					<SelectItem value="warning">Amber</SelectItem>
					<SelectItem value="info">Light Blue</SelectItem>
				</SelectContent>
			</Select>
			<div className={`bg-elevation-negative flex flex-col items-center gap-4 sm:flex-row sm:items-start color-${color} border-soft rounded-2xl border p-3`}>
				<CommonCard />
			</div>
		</div>
	)
}

export default ColorPlayground
