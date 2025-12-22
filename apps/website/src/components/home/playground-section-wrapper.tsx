"use client"

import dynamic from "next/dynamic"
import { PlaygroundProvider } from "@/contexts/playground"

const PlaygroundSection = dynamic(() => import("@/components/home/playground-section"), {
	ssr: false,
})

export default function PlaygroundSectionWrapper() {
	return (
		<PlaygroundProvider>
			<PlaygroundSection />
		</PlaygroundProvider>
	)
}
