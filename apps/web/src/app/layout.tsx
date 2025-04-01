import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import Banner from "@/components/under-development-banner"
// import { fetchAllCategories, fetchFonts, fetchFontsByCategory } from "@/lib/fetchFont"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
	title: "Radian",
	description: "Component Library",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	// await fetchFonts()
	// await fetchAllCategories()
	// await fetchFontsByCategory('serif')
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("relative min-h-svh", "antialiased")}>
				<PostHogProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<header className="sticky top-0 z-50 w-full">
							<Banner />
							<Navbar />
						</header>
						{children}
					</ThemeProvider>
				</PostHogProvider>
			</body>
		</html>
	)
}
