import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import AhrefsAnalytics from "@/components/ahrefs-analytics"
import { PostHogProvider } from "@/components/posthog-provider"
import { ReactQueryProvider } from "@/components/react-query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { websiteMetadata } from "@/config/website-metadata-config"
import { ToastProvider } from "@/contexts/toast-context"
import "@/css/globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
	title: `${websiteMetadata.name} - Open Source React Components and Figma Design System`,
	description:
		"A complete production-ready React components library, UI blocks, and Figma UI Kit and design system",
	metadataBase: new URL(websiteMetadata.url),
	keywords: [...websiteMetadata.keywords],
	icons: {
		icon: [
			{
				url: "/favicon.ico",
				type: "image/x-icon",
				sizes: "16x16 32x32 48x48",
			},
			{ url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
			{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
			{ url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
		],
		shortcut: {
			url: "/favicon.ico",
			type: "image/x-icon",
		},
		apple: {
			url: "/apple-touch-icon.png",
			type: "image/png",
			sizes: "180x180",
		},
	},
	openGraph: {
		siteName: websiteMetadata.name,
		title: `${websiteMetadata.name} - Open Source React Components and Figma Design System`,
		description:
			"A complete production-ready React components library, UI blocks, and Figma UI Kit and design system",
		type: "website",
		url: websiteMetadata.url,
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
		title: `${websiteMetadata.name} - Open Source React Components and Figma Design System`,
		description:
			"A complete production-ready React components library, UI blocks, and Figma UI Kit and design system",
		images: [`${websiteMetadata.ogImage}`],
	},
	alternates: {
		canonical: new URL(websiteMetadata.url),
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
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
			<head>
				<AhrefsAnalytics />
			</head>
			<body
				className={cn(
					"style-default relative min-h-svh antialiased",
					inter.variable
				)}>
				<ReactQueryProvider>
					<PostHogProvider>
						<ToastProvider>
							<ThemeProvider
								attribute="class"
								defaultTheme="dark"
								enableSystem
								disableTransitionOnChange>
								{children}
							</ThemeProvider>
						</ToastProvider>
					</PostHogProvider>
				</ReactQueryProvider>
				<Toaster theme="system" richColors />
			</body>
		</html>
	)
}
