import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// theme
export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
