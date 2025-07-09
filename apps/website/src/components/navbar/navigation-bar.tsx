"use client"

import React, { useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { MobileNavigation } from "@/components/navbar/mobile-tablet-navigation"
import { SearchDocs } from "@/components/navbar/search"
import { DesktopThemeToggler } from "@/components/theme-toggler"
import { Button } from "@/registry/ui/button"
import { DesktopNavigation } from "./desktop-navigation"
import { VersionDisplayBadge } from "./version-badge"
import { WebsiteLogo } from "./website-logo"

export function NavigationBar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<>
			<nav className="border-soft bg-bg-base sticky top-0 z-50 box-content w-full border-b backdrop-blur-sm">
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

						{/* Figma Preview Button */}
						<Button className="text-text-secondary not-xl:hidden" variant="outline" color="neutral">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path
									d="M9.72266 10.0001C9.72266 8.3893 11.0285 7.08344 12.6393 7.08344C14.2501 7.08344 15.556 8.3893 15.556 10.0001C15.556 11.6109 14.2501 12.9168 12.6393 12.9168C11.0285 12.9168 9.72266 11.6109 9.72266 10.0001Z"
									fill="#1ABCFE"
								/>
								<path
									d="M3.88867 15.8332C3.88867 14.2224 5.19451 12.9166 6.80534 12.9166H9.722V15.8332C9.722 17.4441 8.41618 18.7499 6.80534 18.7499C5.19451 18.7499 3.88867 17.4441 3.88867 15.8332Z"
									fill="#0ACF83"
								/>
								<path d="M9.72266 1.25V7.08331H12.6393C14.2502 7.08331 15.556 5.77749 15.556 4.16666C15.556 2.55584 14.2502 1.25 12.6393 1.25H9.72266Z" fill="#FF7262" />
								<path d="M3.88867 4.16667C3.88867 5.77749 5.19451 7.08332 6.80534 7.08332H9.722V1.25H6.80534C5.19451 1.25 3.88867 2.55583 3.88867 4.16667Z" fill="#F24E1E" />
								<path d="M3.88867 10.0001C3.88867 11.6109 5.19451 12.9168 6.80534 12.9168H9.722V7.08344H6.80534C5.19451 7.08344 3.88867 8.3893 3.88867 10.0001Z" fill="#A259FF" />
							</svg>
							Figma Preview
						</Button>

						{/* Early Access Button */}
						<Link href={`#`} tabIndex={-1}>
							<span className="sr-only">Early Access</span>
							<Button className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
								Early Access
							</Button>
						</Link>

						<DesktopThemeToggler />

						{/* Mobile Navigation */}
						<Button isIcon color="neutral" variant="soft" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
							<HamburgerMenuIcon className="size-6" />
						</Button>
					</div>
				</div>
			</nav>
			<MobileNavigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
		</>
	)
}
