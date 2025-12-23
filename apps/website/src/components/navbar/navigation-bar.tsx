"use client"

import React, { useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { MobileNavigation } from "@/components/navbar/mobile-tablet-navigation"
import { SearchDocs } from "@/components/navbar/search"
import { DesktopThemeToggler } from "@/components/theme-toggler"
import { IconButton } from "@/registry/ui/button"
import { DesktopNavigation } from "./desktop-navigation"
import EarlyAccessButton from "./early-access-button"
import FigmaPreviewButton from "./figma-preview-button"
import { VersionDisplayBadge } from "./version-badge"
import { WebsiteLogo } from "./website-logo"

type NavigationBarProps = {
	version: string
}

export function NavigationBar({ version }: NavigationBarProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<>
			<nav className="border-soft bg-bg/90 z-100 sticky top-0 box-content w-full border-b backdrop-blur-sm">
				<div className="max-w-368 mx-auto flex w-full items-center justify-between px-4 py-4 md:px-5 lg:gap-2">
					{/* Left-hand side containing the logo and version badge */}
					<div className="flex h-9 flex-shrink-0 items-center gap-2">
						<WebsiteLogo />
						<VersionDisplayBadge version={version} />
					</div>

					{/* Central navigation items */}
					<DesktopNavigation />

					<div className="flex items-center gap-2">
						{/* Search Components */}
						<SearchDocs />

						<FigmaPreviewButton className="not-xl:hidden" />

						<EarlyAccessButton className="not-xl:hidden" />

						<DesktopThemeToggler />

						{/* Mobile Navigation */}
						<IconButton aria-label="Open mobile navigation" color="neutral" variant="soft" className="xl:hidden" onClick={() => setIsMobileMenuOpen(true)}>
							<HamburgerMenuIcon className="size-6" />
						</IconButton>
					</div>
				</div>
			</nav>
			<MobileNavigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
		</>
	)
}
