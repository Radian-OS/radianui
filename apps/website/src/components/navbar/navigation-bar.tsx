"use client"

import React, { useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { MobileNavigation } from "@/components/navbar/mobile-tablet-navigation"
import { SearchDocs } from "@/components/navbar/search"
import { DesktopThemeToggler } from "@/components/theme-toggler"
import { cn } from "@/lib/utils"
import { IconButton } from "@/styles/default/ui/button"
import { DesktopNavigation } from "./desktop-navigation"
import EarlyAccessButton from "./early-access-button"
import FigmaPreviewButton from "./figma-preview-button"
import { WebsiteLogo } from "./website-logo"

export interface NavigationBarProps {
	sticky?: boolean
	className?: string
}

export function NavigationBar({
	sticky = true,
	className,
}: NavigationBarProps = {}) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<>
			<nav
				className={cn(
					"border-soft bg-bg/90 z-50 box-content w-full border-b backdrop-blur-sm",
					sticky ? "sticky top-0" : "relative",
					className
				)}>
				<div className="max-w-368 mx-auto flex w-full items-center justify-between px-4 py-4 md:px-5 lg:gap-4">
					<div className="flex h-9 flex-shrink-0 items-center">
						<WebsiteLogo />
					</div>

					{/* Central navigation items */}
					<DesktopNavigation />

					<div className="flex items-center gap-2">
						{/* Search Components */}
						<SearchDocs />

						<FigmaPreviewButton className="not-xl:hidden" />

						<EarlyAccessButton className="not-xl:hidden gap-1.5" />

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
