"use client"

import React, { useEffect, useRef, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DesktopThemeToggler, TabletMobileThemeToggler } from "@/components/theme-toggler"
import { navigationItems } from "@/config/navigation-config"
import { getPackageVersion } from "@/lib/get-package-info"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "@/registry/ui/modal"
import SearchCommand from "./search-command"

const navLinks = [
	{ name: "Components", link: "/docs/components/accordion" },
	{ name: "Documentation", link: "/docs/getting-started/introduction" },
	{ name: "Blog", link: "/blog" },
	{ name: "Blocks", link: process.env.NEXT_PUBLIC_BLOCKS_URL! },
	{ name: "Figma", link: "/docs/getting-started/figma" },
]

function WebsiteLogo() {
	return (
		<>
			<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
			<Image src="/radian-dark.svg" className="not-dark:hidden" alt="radian-logo" width={112} height={36} />
		</>
	)
}

function VersionDisplayBadge() {
	const version = getPackageVersion()

	return (
		<Badge variant="soft" size="24" color="success" className="not-md:hidden">
			v {version}
		</Badge>
	)
}
export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [selectedIndex, setSelectedIndex] = useState(-1) // Track selected item
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const itemRefs = useRef<(HTMLLIElement | null)[]>([]) //

	// Filter sidebar items based on the search term
	const filteredItems = navigationItems
		.map((section) => ({
			...section,
			items: section.items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())),
		}))
		.filter((section) => section.items.length > 0)
	const getTotalItems = React.useCallback(() => filteredItems.reduce((acc, section) => acc + section.items.length, 0), [filteredItems])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
				event.preventDefault()
				setIsOpen(true)
			}

			if (!isOpen) return

			if (event.key === "ArrowDown") {
				event.preventDefault()
				setSelectedIndex((prevIndex) => (prevIndex < getTotalItems() - 1 ? prevIndex + 1 : prevIndex))
			} else if (event.key === "ArrowUp") {
				event.preventDefault()
				setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
			} else if (event.key === "Enter" && selectedIndex !== -1) {
				event.preventDefault()
				itemRefs.current[selectedIndex]?.click() // Trigger click on selected item
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [getTotalItems, isOpen, selectedIndex])

	// ** Scroll into view when selection changes **
	useEffect(() => {
		if (selectedIndex !== -1) {
			itemRefs.current[selectedIndex]?.scrollIntoView({
				block: "end",
				behavior: "instant",
			})
		}
	}, [selectedIndex])

	const drawerRef = useRef<HTMLDivElement | null>(null)

	// To prevent the drawer being pushed up when keyboard is open on mobile
	useEffect(() => {
		const handleResize = () => {
			if (drawerRef.current) {
				drawerRef.current.style.setProperty("bottom", `env(safe-area-inset-bottom)`)
			}
		}

		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", handleResize)
			handleResize() // Initial call in case the keyboard is already open
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener("resize", handleResize)
			}
		}
	}, [])

	const pathname = usePathname()

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "unset"
		}

		// Cleanup function to reset overflow when component unmounts
		return () => {
			document.body.style.overflow = "unset"
		}
	}, [isMobileMenuOpen])

	useEffect(() => {
		const handleResize = () => {
			// Hide mobile menu when screen becomes lg (1024px) or larger
			if (window.innerWidth >= 1024) {
				setIsMobileMenuOpen(false)
			}
		}

		// Add event listener
		window.addEventListener("resize", handleResize)

		// Call once on mount to handle initial state
		handleResize()

		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<nav className="bg-bg-base max-w-368 mx-auto flex w-full items-center justify-between px-4 py-4 lg:gap-2">
			{/* Left-hand side containing the logo and version badge */}
			<div className="flex h-9 flex-shrink-0 items-center gap-2">
				<WebsiteLogo />
				<VersionDisplayBadge />
			</div>

			{/* Central navigation items */}
			<section className="hidden flex-1 items-center lg:flex">
				<ul className="text-fg1 flex items-center gap-1 text-sm font-medium">
					{navLinks.map((item) => (
						<li key={item.name}>
							<Link href={item.link}>
								<Button variant={"ghost"} color={"neutral"}>
									{item.name}
								</Button>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<div className="flex items-center gap-2">
				{/* For mobile screen */}
				<Drawer direction="bottom" type="rounded" handle={true} modal={true} preventScrollRestoration={true}>
					<DrawerTrigger asChild>
						<Button isIcon variant="outline" color="neutral" className="md:hidden">
							<Search />
						</Button>
					</DrawerTrigger>

					<DrawerContent ref={drawerRef} className="bg-fill-level3 h-[90dvh] p-3">
						<DrawerHeader>
							<DrawerTitle className="sr-only">Search command</DrawerTitle>
						</DrawerHeader>
						<div className="h-full">
							<SearchCommand
								filteredItems={filteredItems}
								itemRefs={itemRefs}
								searchTerm={searchTerm}
								selectedIndex={selectedIndex}
								setSearchTerm={setSearchTerm}
								setSelectedIndex={setSelectedIndex}
							/>
						</div>
					</DrawerContent>
				</Drawer>

				{/* For desktop screen */}
				<Modal open={isOpen} onOpenChange={setIsOpen} closeIcon="hidden">
					<ModalTrigger asChild>
						{/* <Button isIcon variant="outline" color="neutral" className="hidden gap-2 md:flex">
							<Search />
							<span className="text-fg1 hidden grow text-start text-sm font-normal xl:inline xl:w-28">Search</span>
							<Badge className="bg-bg-level3 text-fg1 hidden items-center justify-center border-none lg:flex" size="20">
								CTRL + K
							</Badge>
						</Button> */}
						<Button
							className="not-md:hidden gap-1"
							variant={"outline"}
							color={"neutral"}
							isIcon
							lead={<Search className="text-text-tertiary" />}
							trail={
								<Badge className="text-text-secondary" size="20" variant={"neutral"}>
									⌘K
								</Badge>
							}>
							<span className="text-text-tertiary w-43 flex-1 px-1 text-start">Search</span>
						</Button>
					</ModalTrigger>
					<ModalContent className="h-150 w-125 bg-fill-level3 border-border-alpha gap-0 rounded-2xl border p-1">
						<ModalTitle className="hidden">Command Search</ModalTitle>
						<SearchCommand
							filteredItems={filteredItems}
							itemRefs={itemRefs}
							searchTerm={searchTerm}
							selectedIndex={selectedIndex}
							setSearchTerm={setSearchTerm}
							setSelectedIndex={setSelectedIndex}
						/>
					</ModalContent>
				</Modal>
				{/* Figma Preview Button */}
				<Button className="text-text-secondary not-lg:hidden" variant="outline" color="neutral">
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
				<Link href={`${process.env.NEXT_PUBLIC_WEBAPP_URL!}`} className="not-lg:hidden">
					<span className="sr-only">Early Access</span>
					<Button className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
						Early Access
					</Button>
				</Link>

				<DesktopThemeToggler />

				<Button isIcon color="neutral" variant="soft" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
					<HamburgerMenuIcon className="size-6" />
				</Button>
				<nav
					className={`bg-bg-base fixed right-0 top-0 flex h-screen w-full transform flex-col overflow-y-scroll transition-transform duration-300 ease-in-out md:px-5 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
					<div className="border-border-alpha flex min-h-16 items-center justify-between border-b px-5">
						<Link href="/" style={{ fill: "white", color: "white" }}>
							<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
							<Image src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
						</Link>

						<div className="flex items-center justify-center gap-2">
							<div className="hidden items-center justify-center gap-2 sm:flex">
								<DesktopThemeToggler />
								<Button>Get Started</Button>
							</div>
							<Button isIcon color="primary" variant="soft" onClick={() => setIsMobileMenuOpen(false)}>
								<X className="size-5" />
							</Button>
						</div>
					</div>

					<div className="flex flex-col items-center justify-center gap-2 px-5 pb-4 pt-6 sm:hidden">
						<Button className="w-full">Get Started</Button>
						<TabletMobileThemeToggler />
					</div>

					<div className="text-text px-5">
						<ul className="text-fg1 flex flex-col items-start text-base font-medium">
							{navLinks.map((item) => (
								<li key={item.name} onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center">
									<Link className={`${pathname === item.link ? "text-fg0" : ""} text-fg1 w-full py-3 leading-6`} href={item.link}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>

						<Accordion size="sm" variant="open" collapsible>
							{navigationItems.map((section) => (
								<AccordionItem className="border-none" value={section.title} key={section.title}>
									<section>
										<AccordionTrigger className="py-3 text-base">{section.title}</AccordionTrigger>
										<AccordionContent>
											<div className="flex flex-col items-start">
												{section.items.map((item) => (
													<Link
														onClick={() => setIsMobileMenuOpen(false)}
														key={item.url}
														className={`${pathname === item.url ? "text-fg0" : ""} text-text flex w-full items-center py-3 text-base font-normal`}
														href={item.url}>
														{item.title}
													</Link>
												))}
											</div>
										</AccordionContent>
									</section>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</nav>
			</div>
		</nav>
	)
}
