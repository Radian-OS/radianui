import type { Metadata } from "next"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "@/css/globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
	description: "Radian: A cutting-edge component library for modern web apps built with React and Tailwind CSS.",
	keywords: ["Radian", "React components", "Tailwind CSS", "UI library", "design system", "developer tools"],
	viewport: "width=device-width, initial-scale=1",
	authors: [{ name: "Radian Team", url: "https://radianos.com" }],
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	openGraph: {
		title: "Radian: Component Library",
		description: "A modern, customizable component library built with React and Tailwind CSS.",
		url: "https://radianos.com",
		siteName: "Radian",
		images: [
			{
				url: "https://dev.radianos.com/radian.svg",
				width: 1200,
				height: 630,
				alt: "Radian component library preview",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@radiandev",
		creator: "@radiandev",
		title: "Radian: Component Library",
		description: "Elevate your web apps with Radian, a React & Tailwind CSS component library.",
		images: ["https://dev.radianos.com/radian.svg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
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
						{children}
					</ThemeProvider>
				</PostHogProvider>
			</body>
		</html>
	)
}
