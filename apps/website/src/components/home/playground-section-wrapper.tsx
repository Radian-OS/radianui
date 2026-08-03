"use client"

import dynamic from "next/dynamic"
import { PlaygroundProvider } from "@/contexts/playground"

const PlaygroundSection = dynamic(
	() => import("@/components/home/playground-section"),
	{
		ssr: true,
	}
)

export default function PlaygroundSectionWrapper({
	renderBeforeMount = false,
}: {
	renderBeforeMount?: boolean
}) {
	return (
		<PlaygroundProvider>
			<PlaygroundSection renderBeforeMount={renderBeforeMount} />
		</PlaygroundProvider>
	)
}
