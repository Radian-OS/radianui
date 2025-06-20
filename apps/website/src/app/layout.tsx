import type { Metadata } from "next"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "@/css/globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
	title: `${"Radian"} - Ship next generation of world class products and solutions`,
	description: "Welcome to Radian—your go-to React & Tailwind CSS lib.",
	openGraph: {
		title: "Radian Landing Page",
		description: "Discover Radian, the ultimate React & Tailwind component lib.",
		url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/static-og.png`,
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Radian Landing Page",
		description: "Discover Radian, the ultimate React & Tailwind component lib.",
		images: [`${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/static-og.png`],
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
