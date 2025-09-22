import type { Metadata } from "next"
import { Toaster } from "sonner"
import AhrefsAnalytics from "@/components/ahrefs-analytics"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { websiteMetadata } from "@/config/website-metadata-config"
import "@/css/globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
	title: `${websiteMetadata.name} - Ship next generation of world class products and solutions`,
	description: "Welcome to Radian—your go-to React & Tailwind CSS lib.",
	metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL!),
	keywords: [...websiteMetadata.keywords],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-32x32.png",
		apple: "/apple-touch-icon.png",
	},
	openGraph: {
		title: `${websiteMetadata.name} - Ship next generation of world class products and solutions`,
		description: "Discover Radian, the ultimate React & Tailwind component lib.",
		type: "article",
		url: `${process.env.NEXT_PUBLIC_WEBSITE_URL!}`,
		images: [
			{
				url: `${websiteMetadata.ogImage}`,
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${websiteMetadata.name} - Ship next generation of world class products and solutions`,
		description: "Discover Radian, the ultimate React & Tailwind component lib.",
		images: [`${websiteMetadata.ogImage}`],
	},
	alternates: {
		canonical: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL!),
	},
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<AhrefsAnalytics />
			</head>
			<body className={cn("relative min-h-svh", "antialiased")}>
				<PostHogProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						{children}
						<Toaster />
					</ThemeProvider>
				</PostHogProvider>
			</body>
		</html>
	)
}
