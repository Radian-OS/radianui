"use client"

import React, { useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { MobileNavigation } from "@/components/navbar/mobile-tablet-navigation"
import { SearchDocs } from "@/components/navbar/search"
import { DesktopThemeToggler } from "@/components/theme-toggler"
import { IconButton } from "@/styles/default/ui/button"
import { DesktopNavigation } from "./desktop-navigation"
import EarlyAccessButton from "./early-access-button"
import FigmaPreviewButton from "./figma-preview-button"
import { WebsiteLogo } from "./website-logo"

export function NavigationBar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<>
			<nav className="border-soft bg-bg/90 sticky top-0 z-50 box-content w-full border-b backdrop-blur-sm">
				<div className="mx-auto flex w-full max-w-368 items-center justify-between px-4 py-4 md:px-5 lg:gap-4">
					<div className="flex h-9 flex-shrink-0 items-center">
						<WebsiteLogo />
					</div>

					{/* Central navigation items */}
					<DesktopNavigation />

					<div className="flex items-center gap-2">
						{/* Search Components */}
						<SearchDocs />

						<FigmaPreviewButton className="not-xl:hidden" />

						<EarlyAccessButton className="gap-1.5 not-xl:hidden" />

						<DesktopThemeToggler />

						{/* Mobile Navigation */}
						<IconButton
							aria-label="Open mobile navigation"
							color="neutral"
							variant="soft"
							className="xl:hidden"
							onClick={() => setIsMobileMenuOpen(true)}>
							<HamburgerMenuIcon className="size-6" />
						</IconButton>
					</div>
				</div>
			</nav>
			<MobileNavigation
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
			/>
		</>
	)
}
