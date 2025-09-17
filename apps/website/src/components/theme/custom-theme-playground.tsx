"use client"

import React from "react"
import { SwatchBook } from "lucide-react"
import CommonCard from "@/components/common/common-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

const CustomThemePlayground = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light")

	return (
		<div className="flex flex-col gap-4">
			<Select value={theme} onValueChange={(value: "light" | "dark") => setTheme(value)}>
				<SelectTrigger className="w-fit">
					<SwatchBook className="mr-2 h-4 w-4" />
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">Light</SelectItem>
					<SelectItem value="dark">Dark</SelectItem>
				</SelectContent>
			</Select>

			{/* Isolated theme container */}
			<div data-theme={theme} style={{ isolation: "isolate" }} className="bg-elevation-negative border-soft flex gap-4 rounded-2xl border p-3">
				<CommonCard />
			</div>
		</div>
	)
}

export default CustomThemePlayground
