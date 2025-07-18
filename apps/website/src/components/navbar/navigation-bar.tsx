"use client"

import React, { useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { MobileNavigation } from "@/components/navbar/mobile-tablet-navigation"
import { SearchDocs } from "@/components/navbar/search"
import { DesktopThemeToggler } from "@/components/theme-toggler"
import { Button } from "@/registry/ui/button"
import { DesktopNavigation } from "./desktop-navigation"
import EarlyAccessButton from "./early-access-button"
import FigmaPreviewButton from "./figma-preview-button"
import { VersionDisplayBadge } from "./version-badge"
import { WebsiteLogo } from "./website-logo"

export function NavigationBar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<>
			<nav className="border-soft bg-bg-base/80 sticky top-0 z-50 box-content w-full border-b backdrop-blur-sm">
				<div className="max-w-368 mx-auto flex w-full items-center justify-between px-4 py-4 md:px-5 lg:gap-2">
					{/* Left-hand side containing the logo and version badge */}
					<div className="flex h-9 flex-shrink-0 items-center gap-2">
						<WebsiteLogo />
						<VersionDisplayBadge />
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
						<Button iconOnly color="neutral" variant="soft" className="xl:hidden" onClick={() => setIsMobileMenuOpen(true)}>
							<HamburgerMenuIcon className="size-6" />
						</Button>
					</div>
				</div>
			</nav>
			<MobileNavigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
		</>
	)
}
