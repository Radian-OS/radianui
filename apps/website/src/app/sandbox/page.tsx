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
	const cta10Dir = path.join(process.cwd(), "src/app/sandbox/cta-10")
	const cta08Dir = path.join(process.cwd(), "src/app/sandbox/cta-08")
	const cta07Dir = path.join(process.cwd(), "src/app/sandbox/cta-07")
	const faq4Dir = path.join(process.cwd(), "src/app/sandbox/faq-4")
	const faq5Dir = path.join(process.cwd(), "src/app/sandbox/faq-5")
	const faq03Dir = path.join(process.cwd(), "src/app/sandbox/faq-03")
	const form1Dir = path.join(process.cwd(), "src/app/sandbox/form-1")
	const checkoutFormDir = path.join(
		process.cwd(),
		"src/app/sandbox/checkout-form"
	)
	const longFormDir = path.join(process.cwd(), "src/app/sandbox/long-form")
	const hero9Dir = path.join(process.cwd(), "src/app/sandbox/hero-9")
	const hero12Dir = path.join(process.cwd(), "src/app/sandbox/hero-12")
	const folioDir = path.join(process.cwd(), "src/app/sandbox/folio")
	const hero25Dir = path.join(process.cwd(), "src/app/sandbox/hero-25")
	const ordersDir = path.join(process.cwd(), "src/app/sandbox/orders")
	const chatgptSettingsDir = path.join(
		process.cwd(),
		"src/app/sandbox/chatgpt-settings"
	)
	const blog5Dir = path.join(process.cwd(), "src/app/sandbox/blog-5")
	const blog6Dir = path.join(process.cwd(), "src/app/sandbox/blog-6")
	const loginPage03Dir = path.join(
		process.cwd(),
		"src/app/sandbox/login-page-03"
	)
	const loginPage04Dir = path.join(
		process.cwd(),
		"src/app/sandbox/login-page-04"
	)
	const taniaRasciaDir = path.join(
		process.cwd(),
		"src/app/sandbox/tania-rascia"
	)
	const dataGridColumns2Dir = path.join(
		process.cwd(),
		"src/app/sandbox/data-grid-columns-2"
	)
	const dataGridColumns5Dir = path.join(
		process.cwd(),
		"src/app/sandbox/data-grid-columns-5"
	)
	const usersTableDir = path.join(process.cwd(), "src/app/sandbox/users-table")
	const williamsSamuelDir = path.join(
		process.cwd(),
		"src/app/sandbox/williams-samuel"
	)
	const victorEkeDir = path.join(process.cwd(), "src/app/sandbox/victor-eke")
	const projectsTableDir = path.join(
		process.cwd(),
		"src/app/sandbox/projects-table"
	)
	const kishorPortfolioDir = path.join(
		process.cwd(),
		"src/app/sandbox/kishor-portfolio"
	)
	const productTourDir = path.join(
		process.cwd(),
		"src/app/sandbox/product-tour"
	)
	const onboardingChecklistDir = path.join(
		process.cwd(),
		"src/app/sandbox/onboarding-checklist"
	)
	const vcardPortfolioDir = path.join(
		process.cwd(),
		"src/app/sandbox/vcard-portfolio"
	)
	const loginPage01Dir = path.join(
		process.cwd(),
		"src/app/sandbox/login-page-01"
	)
	const integrationsSettingsDir = path.join(
		process.cwd(),
		"src/app/sandbox/integrations-settings"
	)

	const taniaRasciaFiles = [
		"page.tsx",
		"tania-rascia-view.tsx",
		"tania-sidebar.tsx",
		"timeline-section.tsx",
		"latest-posts-section.tsx",
		"shelves-section.tsx",
		"series-section.tsx",
		"projects-grid-section.tsx",
		"portfolio-footer.tsx",
		"types.ts",
	]

	const dataGridColumns2Files = [
		"page.tsx",
		"course-catalog-view.tsx",
		"course-table.tsx",
		"course-table-header.tsx",
		"course-table-tabs.tsx",
		"course-table-toolbar.tsx",
		"course-table-row.tsx",
		"course-table-pagination.tsx",
		"course-completion-ring.tsx",
		"types.ts",
	]

	const dataGridColumns5Files = [
		"page.tsx",
		"companies-data-grid-view.tsx",
		"companies-table.tsx",
		"companies-header.tsx",
		"companies-toolbar.tsx",
		"companies-table-row.tsx",
		"companies-table-pagination.tsx",
		"columns-customizer.tsx",
		"health-progress-bar.tsx",
		"types.ts",
	]

	const usersTableFiles = [
		"page.tsx",
		"users-table-view.tsx",
		"users-table.tsx",
		"users-table-tabs.tsx",
		"users-table-toolbar.tsx",
		"users-table-row.tsx",
		"users-table-pagination.tsx",
		"users-status-badge.tsx",
		"import-export-dropdown.tsx",
		"types.ts",
	]

	const williamsSamuelFiles = [
		"page.tsx",
		"williams-samuel-view.tsx",
		"williams-navbar.tsx",
		"hero-section.tsx",
		"about-section.tsx",
		"skills-section.tsx",
		"featured-projects-section.tsx",
		"featured-project-card.tsx",
		"noteworthy-projects-section.tsx",
		"noteworthy-project-card.tsx",
		"contact-cta-section.tsx",
		"williams-footer.tsx",
		"types.ts",
	]

	const victorEkeFiles = [
		"page.tsx",
		"victor-eke-view.tsx",
		"victor-navbar.tsx",
		"hero-section.tsx",
		"social-links-list.tsx",
		"contribution-graph.tsx",
		"contribution-cell.tsx",
		"experience-section.tsx",
		"experience-card.tsx",
		"portfolio-footer.tsx",
		"types.ts",
	]

	const projectsTableFiles = [
		"page.tsx",
		"projects-table-view.tsx",
		"projects-table.tsx",
		"projects-table-header.tsx",
		"projects-table-toolbar.tsx",
		"projects-table-row.tsx",
		"projects-table-pagination.tsx",
		"project-progress-bar.tsx",
		"project-rating-stars.tsx",
		"types.ts",
	]

	const kishorPortfolioFiles = [
		"page.tsx",
		"kishor-portfolio-view.tsx",
		"portfolio-header.tsx",
		"hero-profile.tsx",
		"social-cards.tsx",
		"personal-projects-section.tsx",
		"about-section.tsx",
		"featured-projects-section.tsx",
		"experience-section.tsx",
		"certifications-section.tsx",
		"work-together-card.tsx",
		"portfolio-footer.tsx",
		"types.ts",
	]

	const productTourFiles = [
		"page.tsx",
		"product-tour-view.tsx",
		"product-tour-card.tsx",
		"tour-card-header.tsx",
		"tour-step-preview.tsx",
		"tour-step-content.tsx",
		"tour-step-dots.tsx",
		"tour-card-footer.tsx",
		"tour-completed-card.tsx",
		"types.ts",
	]

	const onboardingChecklistFiles = [
		"page.tsx",
		"onboarding-checklist-view.tsx",
		"tour-header.tsx",
		"tour-features-list.tsx",
		"tour-feature-item.tsx",
		"checklist-card.tsx",
		"checklist-step-item.tsx",
		"tour-action-buttons.tsx",
		"types.ts",
	]

	const vcardPortfolioFiles = [
		"page.tsx",
		"vcard-portfolio-view.tsx",
		"profile-sidebar.tsx",
		"portfolio-navbar.tsx",
		"about-section.tsx",
		"services-section.tsx",
		"service-card.tsx",
		"testimonials-section.tsx",
		"clients-section.tsx",
		"types.ts",
	]

	const loginPage01Files = [
		"page.tsx",
		"login-card.tsx",
		"login-brand.tsx",
		"login-magic-buttons.tsx",
		"login-form.tsx",
		"login-orbital-background.tsx",
		"types.ts",
	]

	const loginPage04Files = [
		"page.tsx",
		"login-page-view.tsx",
		"login-social-buttons.tsx",
		"login-form.tsx",
		"login-dashboard-card.tsx",
		"types.ts",
	]

	const loginPage03Files = [
		"page.tsx",
		"login-page-view.tsx",
		"login-brand.tsx",
		"login-social-buttons.tsx",
		"login-form.tsx",
		"login-feature-card.tsx",
		"types.ts",
	]

	const blog6Files = [
		"page.tsx",
		"blog-article.tsx",
		"blog-breadcrumbs.tsx",
		"blog-header.tsx",
		"blog-author.tsx",
		"blog-featured-image.tsx",
		"blog-lead.tsx",
		"blog-content.tsx",
		"blog-topics.tsx",
		"blog-author-bio.tsx",
		"blog-read-next.tsx",
		"types.ts",
	]

	const blog5Files = [
		"page.tsx",
		"blog-article.tsx",
		"blog-hero.tsx",
		"blog-author.tsx",
		"blog-content.tsx",
		"blog-topics.tsx",
		"blog-author-bio.tsx",
		"blog-related.tsx",
		"types.ts",
	]

	const integrationsSettingsFiles = [
		"page.tsx",
		"integrations-view.tsx",
		"icon-rail.tsx",
		"settings-sidebar.tsx",
		"integrations-header.tsx",
		"integrations-filters.tsx",
		"integrations-list.tsx",
		"types.ts",
	]

	const chatgptSettingsFiles = [
		"page.tsx",
		"chatgpt-settings.tsx",
		"settings-sidebar.tsx",
		"settings-banner.tsx",
		"settings-general.tsx",
		"types.ts",
	]

	const ordersFiles = [
		"page.tsx",
		"orders-view.tsx",
		"orders-sidebar.tsx",
		"orders-header.tsx",
		"orders-metrics.tsx",
		"orders-filters.tsx",
		"orders-table.tsx",
		"orders-pagination.tsx",
		"types.ts",
	]

	const hero25Files = [
		"page.tsx",
		"hero-25.tsx",
		"hero-header.tsx",
		"hero-cta.tsx",
		"hero-preview.tsx",
		"hero-background.tsx",
		"types.ts",
	]

	const folioFiles = [
		"page.tsx",
		"folio-hero.tsx",
		"hero-badge.tsx",
		"hero-header.tsx",
		"hero-cta.tsx",
		"hero-preview.tsx",
		"types.ts",
	]

	const hero12Files = [
		"page.tsx",
		"hero-12.tsx",
		"hero-badge.tsx",
		"hero-header.tsx",
		"hero-cta.tsx",
		"hero-logos.tsx",
		"hero-preview.tsx",
		"types.ts",
	]

	const hero9Files = [
		"page.tsx",
		"hero-9.tsx",
		"hero-header.tsx",
		"hero-actions.tsx",
		"hero-tabs.tsx",
		"hero-preview.tsx",
		"types.ts",
	]

	const longFormFiles = [
		"page.tsx",
		"registration-header.tsx",
		"long-form.tsx",
		"account-details-section.tsx",
		"personal-info-section.tsx",
		"address-section.tsx",
		"types.ts",
	]

	const checkoutFormFiles = [
		"page.tsx",
		"checkout-form.tsx",
		"checkout-header.tsx",
		"types.ts",
	]

	const form1Files = [
		"page.tsx",
		"profile-form.tsx",
		"profile-header.tsx",
		"types.ts",
	]

	const faq03Files = [
		"page.tsx",
		"faq-header.tsx",
		"faq-accordion.tsx",
		"stats-grid.tsx",
		"types.ts",
	]

	const faq5Files = [
		"page.tsx",
		"faq-accordion.tsx",
		"support-card.tsx",
		"types.ts",
	]

	const faq4Files = [
		"page.tsx",
		"faq-header.tsx",
		"faq-accordion.tsx",
		"types.ts",
	]

	const cta07Files = [
		"page.tsx",
		"cta-header.tsx",
		"animated-cta-button.tsx",
		"types.ts",
	]

	const cta08Files = [
		"page.tsx",
		"hero-content.tsx",
		"action-card.tsx",
		"types.ts",
	]

	const cta10Files = [
		"page.tsx",
		"cta-content.tsx",
		"dashboard-preview.tsx",
		"types.ts",
	]

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
	const cta10Data: Record<string, string> = {}
	const cta08Data: Record<string, string> = {}
	const cta07Data: Record<string, string> = {}
	const faq4Data: Record<string, string> = {}
	const faq5Data: Record<string, string> = {}
	const faq03Data: Record<string, string> = {}
	const form1Data: Record<string, string> = {}
	const checkoutFormData: Record<string, string> = {}
	const longFormData: Record<string, string> = {}
	const hero9Data: Record<string, string> = {}
	const hero12Data: Record<string, string> = {}
	const folioData: Record<string, string> = {}
	const hero25Data: Record<string, string> = {}
	const ordersData: Record<string, string> = {}
	const chatgptSettingsData: Record<string, string> = {}
	const integrationsSettingsData: Record<string, string> = {}
	const blog5Data: Record<string, string> = {}
	const blog6Data: Record<string, string> = {}
	const loginPage03Data: Record<string, string> = {}
	const loginPage04Data: Record<string, string> = {}
	const loginPage01Data: Record<string, string> = {}

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

	for (const file of cta10Files) {
		cta10Data[file] = readFileContent(cta10Dir, file)
	}

	for (const file of cta08Files) {
		cta08Data[file] = readFileContent(cta08Dir, file)
	}

	for (const file of cta07Files) {
		cta07Data[file] = readFileContent(cta07Dir, file)
	}

	for (const file of faq4Files) {
		faq4Data[file] = readFileContent(faq4Dir, file)
	}

	for (const file of faq5Files) {
		faq5Data[file] = readFileContent(faq5Dir, file)
	}

	for (const file of faq03Files) {
		faq03Data[file] = readFileContent(faq03Dir, file)
	}

	for (const file of form1Files) {
		form1Data[file] = readFileContent(form1Dir, file)
	}

	for (const file of checkoutFormFiles) {
		checkoutFormData[file] = readFileContent(checkoutFormDir, file)
	}

	for (const file of longFormFiles) {
		longFormData[file] = readFileContent(longFormDir, file)
	}

	for (const file of hero9Files) {
		hero9Data[file] = readFileContent(hero9Dir, file)
	}

	for (const file of hero12Files) {
		hero12Data[file] = readFileContent(hero12Dir, file)
	}

	for (const file of folioFiles) {
		folioData[file] = readFileContent(folioDir, file)
	}

	for (const file of hero25Files) {
		hero25Data[file] = readFileContent(hero25Dir, file)
	}

	for (const file of ordersFiles) {
		ordersData[file] = readFileContent(ordersDir, file)
	}

	for (const file of chatgptSettingsFiles) {
		chatgptSettingsData[file] = readFileContent(chatgptSettingsDir, file)
	}

	for (const file of integrationsSettingsFiles) {
		integrationsSettingsData[file] = readFileContent(
			integrationsSettingsDir,
			file
		)
	}

	for (const file of blog5Files) {
		blog5Data[file] = readFileContent(blog5Dir, file)
	}

	for (const file of blog6Files) {
		blog6Data[file] = readFileContent(blog6Dir, file)
	}

	for (const file of loginPage03Files) {
		loginPage03Data[file] = readFileContent(loginPage03Dir, file)
	}

	for (const file of loginPage04Files) {
		loginPage04Data[file] = readFileContent(loginPage04Dir, file)
	}

	const williamsSamuelData: Record<string, string> = {}
	for (const file of williamsSamuelFiles) {
		williamsSamuelData[file] = readFileContent(williamsSamuelDir, file)
	}

	const victorEkeData: Record<string, string> = {}
	for (const file of victorEkeFiles) {
		victorEkeData[file] = readFileContent(victorEkeDir, file)
	}

	const projectsTableData: Record<string, string> = {}
	for (const file of projectsTableFiles) {
		projectsTableData[file] = readFileContent(projectsTableDir, file)
	}

	const usersTableData: Record<string, string> = {}
	for (const file of usersTableFiles) {
		usersTableData[file] = readFileContent(usersTableDir, file)
	}

	const dataGridColumns5Data: Record<string, string> = {}
	for (const file of dataGridColumns5Files) {
		dataGridColumns5Data[file] = readFileContent(dataGridColumns5Dir, file)
	}

	const dataGridColumns2Data: Record<string, string> = {}
	for (const file of dataGridColumns2Files) {
		dataGridColumns2Data[file] = readFileContent(dataGridColumns2Dir, file)
	}

	const taniaRasciaData: Record<string, string> = {}
	for (const file of taniaRasciaFiles) {
		taniaRasciaData[file] = readFileContent(taniaRasciaDir, file)
	}

	const kishorPortfolioData: Record<string, string> = {}
	for (const file of kishorPortfolioFiles) {
		kishorPortfolioData[file] = readFileContent(kishorPortfolioDir, file)
	}

	const productTourData: Record<string, string> = {}
	for (const file of productTourFiles) {
		productTourData[file] = readFileContent(productTourDir, file)
	}

	const onboardingChecklistData: Record<string, string> = {}
	for (const file of onboardingChecklistFiles) {
		onboardingChecklistData[file] = readFileContent(
			onboardingChecklistDir,
			file
		)
	}

	const vcardPortfolioData: Record<string, string> = {}
	for (const file of vcardPortfolioFiles) {
		vcardPortfolioData[file] = readFileContent(vcardPortfolioDir, file)
	}

	for (const file of loginPage01Files) {
		loginPage01Data[file] = readFileContent(loginPage01Dir, file)
	}

	const files = {
		"williams-samuel": williamsSamuelData,
		"victor-eke": victorEkeData,
		"projects-table": projectsTableData,
		"users-table": usersTableData,
		"data-grid-columns-5": dataGridColumns5Data,
		"data-grid-columns-2": dataGridColumns2Data,
		"tania-rascia": taniaRasciaData,
		"kishor-portfolio": kishorPortfolioData,
		"product-tour": productTourData,
		"onboarding-checklist": onboardingChecklistData,
		"vcard-portfolio": vcardPortfolioData,
		"login-page-01": loginPage01Data,
		"login-page-04": loginPage04Data,
		"login-page-03": loginPage03Data,
		"blog-6": blog6Data,
		"blog-5": blog5Data,
		"integrations-settings": integrationsSettingsData,
		"chatgpt-settings": chatgptSettingsData,
		orders: ordersData,
		"hero-25": hero25Data,
		folio: folioData,
		"hero-12": hero12Data,
		"hero-9": hero9Data,
		"long-form": longFormData,
		"checkout-form": checkoutFormData,
		"form-1": form1Data,
		"faq-03": faq03Data,
		"faq-5": faq5Data,
		"faq-4": faq4Data,
		"cta-07": cta07Data,
		"cta-08": cta08Data,
		"cta-10": cta10Data,
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
