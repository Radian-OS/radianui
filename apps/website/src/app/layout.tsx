import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import AhrefsAnalytics from "@/components/ahrefs-analytics"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { websiteMetadata } from "@/config/website-metadata-config"
import { ToastProvider } from "@/contexts/toast-context"
import "@/css/globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
	title: `${websiteMetadata.name} - Ship next generation of world class products and solutions`,
	description: "Welcome to Radian your goto React & Tailwind CSS lib.",
	metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL!),
	keywords: [...websiteMetadata.keywords],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-32x32.png",
		apple: "/apple-touch-icon.png",
	},
	openGraph: {
		title: `${websiteMetadata.name} - Ship next generation of world class products and solutions`,
		description:
			"Discover Radian, the ultimate React & Tailwind component lib.",
		type: "website",
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
		description:
			"Discover Radian, the ultimate React & Tailwind component lib.",
		images: [`${websiteMetadata.ogImage}`],
	},
	alternates: {
		canonical: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL!),
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
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Radian",
		alternateName: ["RadianUI", "RadianOS", "Radianos"],
		description:
			"Open-source React component library with Tailwind CSS. Install with radianui CLI.",
		url: process.env.NEXT_PUBLIC_WEBSITE_URL, // ✅ Evaluated here
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Web",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
	}
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<AhrefsAnalytics />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
			</head>
			<body className={cn("relative min-h-svh antialiased", inter.variable)}>
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
				<Toaster theme="system" richColors />
			</body>
		</html>
	)
}
