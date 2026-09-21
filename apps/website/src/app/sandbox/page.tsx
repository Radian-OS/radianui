import fs from "fs"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import path from "path"
import { getCurrentUser } from "@/lib/auth"
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

export default async function PlaygroundPage() {
	const user = await getCurrentUser()
	if (!user) {
		redirect("/sandbox/auth/sign-in?callbackUrl=/sandbox")
	}

	const omrixDir = path.join(process.cwd(), "src/app/sandbox/omrix")
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
	const aiworkDir = path.join(process.cwd(), "src/app/sandbox/aiwork")
	const verseoDir = path.join(process.cwd(), "src/app/sandbox/verseo")
	const agentlabDir = path.join(process.cwd(), "src/app/sandbox/agentlab")
	const crisplyDir = path.join(process.cwd(), "src/app/sandbox/crisply")
	const hero04Dir = path.join(process.cwd(), "src/app/sandbox/hero-04")
	const linearDir = path.join(process.cwd(), "src/app/sandbox/linear")
	const intercomDir = path.join(process.cwd(), "src/app/sandbox/intercom")
	const blog1Dir = path.join(process.cwd(), "src/app/sandbox/blog-1")
	const blog02Dir = path.join(process.cwd(), "src/app/sandbox/blog-02")
	const zentraDir = path.join(process.cwd(), "src/app/sandbox/zentra")
	const contact2Dir = path.join(process.cwd(), "src/app/sandbox/contact-2")
	const contact06Dir = path.join(process.cwd(), "src/app/sandbox/contact-06")
	const contact01Dir = path.join(process.cwd(), "src/app/sandbox/contact-01")

	const contact01Files = [
		"page.tsx",
		"info-panel.tsx",
		"inquiry-form.tsx",
		"types.ts",
	]

	const contact06Files = [
		"page.tsx",
		"info-panel.tsx",
		"quote-form.tsx",
		"file-dropzone.tsx",
		"types.ts",
	]

	const contact2Files = [
		"page.tsx",
		"contact-form.tsx",
		"scope-desk-panel.tsx",
		"types.ts",
	]

	const zentraFiles = [
		"page.tsx",
		"navbar.tsx",
		"hero-section.tsx",
		"featured-card.tsx",
		"category-filter.tsx",
		"article-card.tsx",
		"articles-section.tsx",
		"newsletter-section.tsx",
		"footer.tsx",
		"types.ts",
	]

	const blog02Files = [
		"page.tsx",
		"blog-header.tsx",
		"blog-card.tsx",
		"blog-grid.tsx",
		"types.ts",
	]

	const blog1Files = [
		"page.tsx",
		"blog-header.tsx",
		"blog-card.tsx",
		"blog-grid.tsx",
		"types.ts",
	]

	const intercomFiles = [
		"page.tsx",
		"trial-banner.tsx",
		"icon-rail.tsx",
		"inbox-nav.tsx",
		"conversation-list.tsx",
		"chat-area.tsx",
		"details-sidebar.tsx",
		"types.ts",
	]

	const linearFiles = [
		"page.tsx",
		"sidebar.tsx",
		"top-header.tsx",
		"board-header.tsx",
		"kanban-column.tsx",
		"issue-card.tsx",
		"hidden-columns-sidebar.tsx",
		"create-issue-dialog.tsx",
		"bottom-bar.tsx",
		"types.ts",
	]

	const hero04Files = [
		"page.tsx",
		"announcement-banner.tsx",
		"navbar.tsx",
		"hero-section.tsx",
		"logo-strip.tsx",
	]

	const crisplyFiles = [
		"page.tsx",
		"app-sidebar.tsx",
		"top-header.tsx",
		"settings-nav.tsx",
		"profile-section.tsx",
		"security-section.tsx",
		"support-access-section.tsx",
	]

	const agentlabFiles = [
		"page.tsx",
		"announcement-bar.tsx",
		"navbar.tsx",
		"hero-section.tsx",
		"logo-marquee.tsx",
		"problem-section.tsx",
		"solution-section.tsx",
		"roi-section.tsx",
		"multi-model-section.tsx",
		"industry-section.tsx",
		"testimonials-section.tsx",
		"security-section.tsx",
		"faq-section.tsx",
		"cta-banner.tsx",
		"footer.tsx",
	]

	const omrixFiles = [
		"page.tsx",
		"navbar.tsx",
		"hero-section.tsx",
		"dashboard-mockup.tsx",
		"logos-strip.tsx",
	]
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
	const aiworkFiles = [
		"page.tsx",
		"navbar.tsx",
		"hero-section.tsx",
		"dashboard-mockup.tsx",
		"logos-strip.tsx",
		"solutions-section.tsx",
		"agents-section.tsx",
		"automation-section.tsx",
		"integrations-section.tsx",
		"how-it-works-section.tsx",
		"testimonials-section.tsx",
		"pricing-section.tsx",
		"faq-section.tsx",
		"cta-banner.tsx",
		"footer.tsx",
	]
	const verseoFiles = [
		"page.tsx",
		"navbar.tsx",
		"hero-section.tsx",
		"client-logos.tsx",
		"problem-difference-section.tsx",
		"features-section.tsx",
		"use-cases-section.tsx",
		"how-it-works-section.tsx",
		"results-section.tsx",
		"examples-section.tsx",
		"testimonials-section.tsx",
		"pricing-section.tsx",
		"faq-section.tsx",
		"cta-section.tsx",
		"footer.tsx",
	]

	const omrixData: Record<string, string> = {}
	const motionData: Record<string, string> = {}
	const beamHeaderData: Record<string, string> = {}
	const jamboPricingData: Record<string, string> = {}
	const klarheitFaqData: Record<string, string> = {}
	const klarheitTestimonialData: Record<string, string> = {}
	const hero21Data: Record<string, string> = {}
	const aiworkData: Record<string, string> = {}
	const verseoData: Record<string, string> = {}
	const agentlabData: Record<string, string> = {}
	const crisplyData: Record<string, string> = {}
	const hero04Data: Record<string, string> = {}
	const linearData: Record<string, string> = {}
	const intercomData: Record<string, string> = {}
	const blog1Data: Record<string, string> = {}
	const blog02Data: Record<string, string> = {}
	const zentraData: Record<string, string> = {}
	const contact2Data: Record<string, string> = {}
	const contact06Data: Record<string, string> = {}
	const contact01Data: Record<string, string> = {}

	for (const file of omrixFiles) {
		omrixData[file] = readFileContent(omrixDir, file)
	}

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

	for (const file of aiworkFiles) {
		aiworkData[file] = readFileContent(aiworkDir, file)
	}

	for (const file of verseoFiles) {
		verseoData[file] = readFileContent(verseoDir, file)
	}

	for (const file of agentlabFiles) {
		agentlabData[file] = readFileContent(agentlabDir, file)
	}

	for (const file of crisplyFiles) {
		crisplyData[file] = readFileContent(crisplyDir, file)
	}

	for (const file of hero04Files) {
		hero04Data[file] = readFileContent(hero04Dir, file)
	}

	for (const file of linearFiles) {
		linearData[file] = readFileContent(linearDir, file)
	}

	for (const file of intercomFiles) {
		intercomData[file] = readFileContent(intercomDir, file)
	}

	for (const file of blog1Files) {
		blog1Data[file] = readFileContent(blog1Dir, file)
	}

	for (const file of blog02Files) {
		blog02Data[file] = readFileContent(blog02Dir, file)
	}

	for (const file of zentraFiles) {
		zentraData[file] = readFileContent(zentraDir, file)
	}

	for (const file of contact2Files) {
		contact2Data[file] = readFileContent(contact2Dir, file)
	}

	for (const file of contact06Files) {
		contact06Data[file] = readFileContent(contact06Dir, file)
	}

	for (const file of contact01Files) {
		contact01Data[file] = readFileContent(contact01Dir, file)
	}

	const files = {
		"contact-01": contact01Data,
		"contact-06": contact06Data,
		"contact-2": contact2Data,
		zentra: zentraData,
		"blog-02": blog02Data,
		"blog-1": blog1Data,
		intercom: intercomData,
		linear: linearData,
		"hero-04": hero04Data,
		crisply: crisplyData,
		agentlab: agentlabData,
		omrix: omrixData,
		motion: motionData,
		"beam-header": beamHeaderData,
		"jambo-pricing": jamboPricingData,
		"klarheit-faq": klarheitFaqData,
		"klarheit-testimonial": klarheitTestimonialData,
		"hero-21": hero21Data,
		aiwork: aiworkData,
		verseo: verseoData,
	}

	return <PlaygroundClient files={files} />
}
