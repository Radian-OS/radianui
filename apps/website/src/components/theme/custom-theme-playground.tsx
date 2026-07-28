"use client"

import React from "react"
import CommonCard from "@/components/common/common-card"
import { darkThemeVars, lightThemeVars } from "@/components/theme/theme-vars"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"

const CustomThemePlayground = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light")

	return (
		<div className="flex flex-col gap-4 rounded-2xl">
			<Select
				value={theme}
				onValueChange={(value: "light" | "dark") => setTheme(value)}>
				<SelectTrigger className="w-fit">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">Light</SelectItem>
					<SelectItem value="dark">Dark</SelectItem>
				</SelectContent>
			</Select>

			<div
				className="rounded-2xl"
				style={{
					...(theme === "light" ? lightThemeVars : darkThemeVars),
					backgroundColor: "var(--color-elevation-negative)",
					borderColor: "1px solid var(--color-border)",
					color: "var(--color-fg)",
				}}>
				<CommonCard />
			</div>
		</div>
	)
}

export default CustomThemePlayground
