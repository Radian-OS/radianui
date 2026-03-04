"use client"

import { Moon, Sun } from "lucide-react"
import { useThemeForColorTable } from "@/contexts/theme-context"

export default function ColorTableThemeToggle() {
	const { isDark, toggleTheme } = useThemeForColorTable()
	return (
		<div
			onClick={toggleTheme}
			className="bg-fill2 relative mb-2 flex h-8 cursor-pointer items-center rounded-md p-1 transition-all duration-300"
			style={{ width: "88px" }}>
			<div
				className={`bg-elevation-level1 absolute h-6 w-10 rounded-md shadow-sm transition-all duration-300 ease-out ${isDark ? "translate-x-10" : "translate-x-0"}`}
			/>
			<div className="relative z-10 flex h-6 w-10 items-center justify-center">
				<Sun size={14} className="text-fg-secondary" />
			</div>
			<div className="relative z-10 flex h-6 w-10 items-center justify-center">
				<Moon size={14} className="text-fg-secondary" />
			</div>
		</div>
	)
}
