"use client"

import { ReactNode, createContext, useContext, useState } from "react"

interface ThemeContextType {
	isDark: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDark, setIsDark] = useState(false)

	const toggleTheme = () => {
		setTimeout(() => {
			setIsDark(!isDark)
		}, 150)
	}

	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}
