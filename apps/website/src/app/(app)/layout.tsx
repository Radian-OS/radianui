import React, { ReactNode } from "react"
import { Metadata } from "next"
import Navbar from "@/components/navbar"

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

interface Props {
	children: ReactNode
}

export default function LandingLayout({ children }: Props) {
	return (
		<div>
			<header className="sticky top-0 z-50 w-full">
				<Navbar />
			</header>
			{children}
		</div>
	)
}
