import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
// import Banner from "@/components/under-development-banner"
import "@/css/globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
	title: "Radian",
	description: "Component Library",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("relative min-h-svh", "antialiased")}>
				<PostHogProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<header className="sticky top-0 z-50 w-full">
							{/* <Banner /> */}
							<Navbar />
						</header>
						{children}
					</ThemeProvider>
				</PostHogProvider>
			</body>
		</html>
	)
}
