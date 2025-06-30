"use client"

import React, { useEffect, useRef, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { ChevronRight, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DesktopThemeToggler, TabletMobileThemeToggler } from "@/components/theme-toggler"
import VersionDisplay from "@/components/version-display"
import { navigationItems } from "@/config/navigation-config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerBody, DrawerClose, DrawerHeader, DrawerTitle } from "@/registry/ui/drawer"
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "@/registry/ui/modal"
import SearchCommand from "./search-command"

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [selectedIndex, setSelectedIndex] = useState(-1) // Track selected item

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
	const pathname = usePathname()

	const navLinks = [
		{ name: "Components", link: "/docs/components/accordion" },
		{ name: "Documentation", link: "/docs/getting-started/introduction" },
		{ name: "Blog", link: "/blog" },
		{ name: "Blocks", link: "/blocks" },
		{ name: "Figma", link: "/docs/getting-started/figma" },
	]

	return (
		<nav className="bg-bg-base border-stroke-decorative lg:h-15.5 flex items-center justify-between border-b px-4 py-3">
			<div className="flex h-9 flex-shrink-0 items-center gap-2">
				<Link href="/" style={{ fill: "white", color: "white" }}>
					<img src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
					<img src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
				</Link>
				<VersionDisplay />
			</div>

			<div className="flex w-full items-center justify-end gap-2 md:w-fit md:justify-between">
				<section className="hidden items-center px-10 lg:flex">
					<ul className="text-fg1 flex items-center gap-9 text-sm font-medium">
						{navLinks.map((item) => (
							<li key={item.name}>
								<Link className={`${pathname === item.link ? "text-fg0" : ""} text-fg1`} href={item.link}>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</section>

				<Drawer
					direction="bottom"
					type="rounded"
					trigger={
						<Button isIcon variant="outline" color="neutral" className="md:hidden">
							<Search />
						</Button>
					}
					handle={true}>
					<DrawerHeader>
						<DrawerTitle className="sr-only">Search command</DrawerTitle>
					</DrawerHeader>
					<DrawerBody className="bg-red-500 p-0">
						<SearchCommand
							filteredItems={filteredItems}
							itemRefs={itemRefs}
							searchTerm={searchTerm}
							selectedIndex={selectedIndex}
							setSearchTerm={setSearchTerm}
							setSelectedIndex={setSelectedIndex}
						/>
					</DrawerBody>
				</Drawer>
				<Modal open={isOpen} onOpenChange={setIsOpen} closeIcon="hidden">
					<ModalTrigger asChild>
						<Button isIcon variant="outline" color="neutral" className="hidden gap-2 md:flex">
							<Search />
							<span className="text-fg1 hidden grow text-start text-sm font-normal xl:inline xl:w-28">Search</span>
							<Badge className="bg-bg-level3 text-fg1 hidden items-center justify-center border-none lg:flex" size="20">
								CTRL + K
							</Badge>
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

				<Link href={`${process.env.NEXT_PUBLIC_WEBAPP_URL!}`}>
					<span className="sr-only">Get Started</span>
					<Button size={"40"}>Get Started</Button>
				</Link>

				<DesktopThemeToggler />

				<Drawer
					type="default"
					direction="right"
					handle
					backdrop="overlay"
					trigger={
						<Button isIcon color="neutral" variant="soft" className="lg:hidden">
							<HamburgerMenuIcon className="size-6" />
						</Button>
					}>
					<nav className="bg-bg-base fixed left-0 top-0 z-0 flex h-screen w-full flex-col gap-3 overflow-y-scroll px-4 md:px-5">
						<div className="flex min-h-[5rem] items-center justify-between">
							<Link href="/" style={{ fill: "white", color: "white" }}>
								<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
								<Image src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
							</Link>
							<DrawerClose>
								<Button isIcon color="neutral" variant="soft">
									<X className="size-5" />
								</Button>
							</DrawerClose>
						</div>

						<div className="flex flex-col gap-3">
							<Button>Sign up for early access</Button>
							<TabletMobileThemeToggler />
						</div>

						<ul className="text-fg1 flex flex-col items-start gap-2 px-3 text-sm font-medium">
							{navLinks.map((item) => (
								<li key={item.name}>
									<DrawerClose>
										<Link className={`${pathname === item.link ? "text-fg0" : ""} text-fg1`} href={item.link}>
											{item.name}
										</Link>
									</DrawerClose>
								</li>
							))}
						</ul>

						<Accordion collapsible>
							{navigationItems.map((section) => (
								<AccordionItem value={section.title} key={section.title}>
									<section>
										<AccordionTrigger className="py-2 [&[data-state=closed]>h1>svg]:rotate-0 [&[data-state=open]>h1>svg]:rotate-90">
											<h1 className="flex items-center gap-[0.375rem] px-[6px] text-sm font-medium">
												<ChevronRight className="duration-300 ease-in-out" size={12} />
												{section.title}
											</h1>
										</AccordionTrigger>
										<div className="flex flex-col justify-center">
											{section.items.map((item) => (
												<AccordionContent
													key={item.title}
													className={` ${pathname === item.url ? "bg-bg-bg-level0 rounded-[0.375rem] font-medium" : ""} w-full py-2 pl-6 text-start text-sm transition-all data-[state=closed]:ease-out data-[state=open]:ease-in`}>
													<DrawerClose>
														<Link className={`${pathname === item.url ? "text-fg0" : ""} text-fg1`} href={item.url}>
															{item.title}
														</Link>
													</DrawerClose>
												</AccordionContent>
											))}
										</div>
									</section>
								</AccordionItem>
							))}
						</Accordion>
					</nav>
				</Drawer>
			</div>
		</nav>
	)
}
