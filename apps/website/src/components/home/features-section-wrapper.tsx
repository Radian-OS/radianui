"use client"

import dynamic from "next/dynamic"

const FeaturesSection = dynamic(() => import("@/components/home/features-section"), {
	ssr: false,
})

export default function FeaturesSectionWrapper() {
	return <FeaturesSection textAutoHide={true} enableSpotlight={true} enableBorderGlow={true} enableTilt={false} enableMagnetism={false} clickEffect={true} spotlightRadius={573} />
}
