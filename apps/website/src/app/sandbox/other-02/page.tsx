import React from "react"
import { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/styles/default/ui/sidebar"
import { CrisplyAppSidebar } from "./app-sidebar"
import { CrisplyProfileSection } from "./profile-section"
import { CrisplySecuritySection } from "./security-section"
import { CrisplySettingsNav } from "./settings-nav"
import { CrisplySupportAccessSection } from "./support-access-section"
import { CrisplyTopHeader } from "./top-header"

export const metadata: Metadata = {
	title: "Crisply — Account Settings CRM Dashboard",
	description:
		"Manage your profile, account security, and support access settings in Crisply CRM.",
}

export default function CrisplyPage() {
	return (
		<div className="bg-bg text-fg min-h-screen">
			<SidebarProvider defaultWidth="15rem">
				<CrisplyAppSidebar />

				<SidebarInset className="bg-bg flex min-h-screen flex-1 flex-col">
					{/* Top Header Bar */}
					<CrisplyTopHeader />

					{/* Settings Body Layout */}
					<div className="flex flex-1 flex-col md:flex-row">
						{/* Secondary Settings Sidebar */}
						<CrisplySettingsNav />

						{/* Main Content Area */}
						<main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
							<div className="divide-border/60 mx-auto max-w-2xl space-y-8 divide-y">
								<CrisplyProfileSection />
								<CrisplySecuritySection />
								<CrisplySupportAccessSection />
							</div>
						</main>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
