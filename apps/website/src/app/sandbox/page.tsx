import fs from "fs"
import type { Metadata } from "next"
import path from "path"
import { PlaygroundClient } from "./playground-client"

export const metadata: Metadata = {
	title: "Interactive Component Playground — Radian OS",
	description:
		"Explore Radian UI components in our interactive sandbox. Test live previews on mobile, tablet, and desktop viewports, read source code, and toggle light/dark modes.",
}

// Function to read file content safely
function readFileContent(dirPath: string, fileName: string): string {
	try {
		const fullPath = path.join(dirPath, fileName)
		if (fs.existsSync(fullPath)) {
			return fs.readFileSync(fullPath, "utf-8")
		}
		return `// Error: File ${fileName} not found at ${fullPath}`
	} catch (error) {
		console.error(`Error reading ${fileName}:`, error)
		return `// Error reading file ${fileName}`
	}
}

export default function PlaygroundPage() {
	const motionDir = path.join(process.cwd(), "src/app/sandbox/motion")
	const beamHeaderDir = path.join(process.cwd(), "src/app/sandbox/beam-header")
	const jamboPricingDir = path.join(
		process.cwd(),
		"src/app/sandbox/jambo-pricing"
	)
	const klarheitFaqDir = path.join(
		process.cwd(),
		"src/app/sandbox/klarheit-faq"
	)
	const klarheitTestimonialDir = path.join(
		process.cwd(),
		"src/app/sandbox/klarheit-testimonial"
	)
	const hero21Dir = path.join(process.cwd(), "src/app/sandbox/hero-21")

	const motionFiles = [
		"logo-section.tsx",
		"logo-marquee.tsx",
		"logo-icon.tsx",
		"page.tsx",
	]
	const beamHeaderFiles = [
		"beam-header-section.tsx",
		"beam-logo-strip.tsx",
		"beam-dashboard.tsx",
	]
	const jamboPricingFiles = [
		"jambo-pricing-section.tsx",
		"pricing-card.tsx",
		"rating.tsx",
		"logo-strip.tsx",
		"page.tsx",
	]
	const klarheitFaqFiles = [
		"faq-section.tsx",
		"faq-accordion.tsx",
		"stat-card.tsx",
		"page.tsx",
	]
	const klarheitTestimonialFiles = [
		"testimonial-section.tsx",
		"testimonial-card.tsx",
		"page.tsx",
	]
	const hero21Files = [
		"hero-section.tsx",
		"hero-navbar.tsx",
		"review-badge.tsx",
		"testimonial-card.tsx",
		"showcase-grid.tsx",
		"logo-marquee.tsx",
		"page.tsx",
	]

	const motionData: Record<string, string> = {}
	const beamHeaderData: Record<string, string> = {}
	const jamboPricingData: Record<string, string> = {}
	const klarheitFaqData: Record<string, string> = {}
	const klarheitTestimonialData: Record<string, string> = {}
	const hero21Data: Record<string, string> = {}

	for (const file of motionFiles) {
		motionData[file] = readFileContent(motionDir, file)
	}

	for (const file of beamHeaderFiles) {
		beamHeaderData[file] = readFileContent(beamHeaderDir, file)
	}

	for (const file of jamboPricingFiles) {
		jamboPricingData[file] = readFileContent(jamboPricingDir, file)
	}

	for (const file of klarheitFaqFiles) {
		klarheitFaqData[file] = readFileContent(klarheitFaqDir, file)
	}

	for (const file of klarheitTestimonialFiles) {
		klarheitTestimonialData[file] = readFileContent(
			klarheitTestimonialDir,
			file
		)
	}

	for (const file of hero21Files) {
		hero21Data[file] = readFileContent(hero21Dir, file)
	}

	const files = {
		motion: motionData,
		"beam-header": beamHeaderData,
		"jambo-pricing": jamboPricingData,
		"klarheit-faq": klarheitFaqData,
		"klarheit-testimonial": klarheitTestimonialData,
		"hero-21": hero21Data,
	}

	return <PlaygroundClient files={files} />
}
