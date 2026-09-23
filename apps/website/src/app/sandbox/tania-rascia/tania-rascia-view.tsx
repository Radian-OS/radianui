"use client"

import React from "react"
import { SidebarInset, SidebarProvider } from "@/styles/default/ui/sidebar"
import { LatestPostsSection } from "./latest-posts-section"
import { PortfolioFooter } from "./portfolio-footer"
import { ProjectsGridSection } from "./projects-grid-section"
import { SeriesSection } from "./series-section"
import { ShelvesSection } from "./shelves-section"
import { TaniaSidebar } from "./tania-sidebar"
import { TimelineSection } from "./timeline-section"

export function TaniaRasciaView() {
	return (
		<SidebarProvider defaultOpen className="bg-bg text-fg min-h-screen w-full">
			<TaniaSidebar />
			<SidebarInset className="bg-bg flex min-w-0 flex-1 flex-col overflow-y-auto">
				<div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-8 sm:px-10 sm:py-12">
					<TimelineSection />
					<LatestPostsSection />
					<ShelvesSection />
					<SeriesSection />
					<ProjectsGridSection />
					<PortfolioFooter />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
