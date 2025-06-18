import React, { ReactNode } from "react"
import { Metadata } from "next"
import Navbar from "@/components/navbar"

// import SvgIcon from "../SvgIcon"

export const metadata: Metadata = {
	title: `${"Radian"} - Ship next generation of world class products and solutions`,
	description: "Welcome to Radian—your go-to React & Tailwind CSS lib.",
	openGraph: {
		title: "Radian Landing Page",
		description: "Discover Radian, the ultimate React & Tailwind component lib.",
		url: "https://dev.radianos.com",
		images: [
			{
				url: "https://dev.radianos.com/radian.svg",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Radian Landing Page",
		description: "Discover Radian, the ultimate React & Tailwind component lib.",
		images: ["https://dev.radianos.com/radian.svg"],
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
				{/* <SvgIcon/> */}
			</header>
			{children}
		</div>
	)
}
