import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import Banner from "@/components/under-development-banner"
import "@/css/globals.css"
import { cn } from "@/lib/utils"
import { generatePalette, PaletteScheme } from "@/lib/rainbow/palette-generator"
import { HSLtoHEX } from "@/lib/rainbow/color-converter"

export const metadata: Metadata = {
	title: "Radian",
	description: "Component Library",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const hex= "#8170ff"
	const palette= generatePalette(hex,PaletteScheme.TRIADIC)
	console.log(JSON.stringify(palette, null, 2))
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("relative min-h-svh", "antialiased")}>
				{palette.colors.map((color,idx)=>(
					<div key={idx} className="relative size-20 rounded border shadow-sm" style={{ backgroundColor: HSLtoHEX(color.shades[0].hue, color.shades[0].saturation, color.shades[0].luminosity) }}>
						<div
							className={cn(
								"absolute inset-0 flex items-center justify-center rounded text-sm font-medium",
								Number(color.shades[0].luminosity) < 500 ? "text-black" : "text-white"
							)}>
							<div className="flex flex-col items-center justify-center">
								<span>{palette.name}</span>
								<span>{HSLtoHEX(color.shades[0].hue, color.shades[0].saturation, color.shades[0].luminosity)}</span>
							</div>
						</div>
					</div>
				))}
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
