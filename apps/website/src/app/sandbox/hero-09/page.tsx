import type { Metadata } from "next"
import { HeroSection } from "./hero-section"

export const metadata: Metadata = {
	title: "Hero 21 — Product Showcase Hero Section",
	description:
		"Turning Great Ideas Into Strong Brand Identities. A strategic brand experience crafted to shape bold ideas into powerful, recognizable identities that grow with your business.",
}

export default function Page() {
	return <HeroSection />
}
