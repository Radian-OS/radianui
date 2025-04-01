"use client"

import React, { useEffect, useRef, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { ChevronRight, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sideBarItems } from "@/config/sidebar-config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Drawer, DrawerClose } from "@/registry/ui/drawer"
import { Modal, ModalClose, ModalContent, ModalTitle, ModalTrigger } from "@/registry/ui/modal"
import { DesktopThemeToggler, TabletMobileThemeToggler } from "./theme-toggler"
import VersionDisplay from "./version-display"

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [selectedIndex, setSelectedIndex] = useState(-1) // Track selected item

	const itemRefs = useRef<(HTMLLIElement | null)[]>([]) // Store refs for items

	// Filter sidebar items based on the search term
	const filteredItems = sideBarItems
		.map((section) => ({
			...section,
			items: section.items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
		}))
		.filter((section) => section.items.length > 0)
	const getTotalItems = React.useCallback(() => filteredItems.reduce((acc, section) => acc + section.items.length, 0), [filteredItems])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "k") {
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
		{ name: "Components", link: "/documentation/components" },
		{ name: "Documentation", link: "/documentation" },
		{ name: "Blog", link: "/blog" },
		{ name: "Roadmap", link: "/roadmap" },
		{ name: "Figma", link: "/documentation/figma" },
	]

	return (
		<nav className="bg-bg1 border-stroke-decorative flex items-center justify-between border-b px-4 py-[12px] lg:h-[3.875rem]">
			<div className="flex h-9 flex-shrink-0 items-center gap-2">
				<Link href="/" style={{ fill: "white", color: "white" }}>
					<img src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
					<img src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
				</Link>
				<VersionDisplay />
			</div>

			<div className="flex w-full items-center justify-end gap-2 md:w-fit md:justify-between">
				<section className="hidden items-center px-10 lg:flex">
					<ul className="body-sm text-fg2 flex items-center gap-9 font-medium">
						{navLinks.map((item) => (
							<li key={item.link}>
								<Link className={`${pathname === item.link ? "text-fg1" : ""} text-fg2`} href={item.link}>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</section>

				<Modal open={isOpen} onOpenChange={setIsOpen} closeIconVisibility="hidden">
					<ModalTrigger asChild>
						<Button isIcon variant="neutral-outline" className="gap-2">
							<Search />
							<span className="text-fg2 hidden grow text-start text-sm font-normal xl:inline xl:w-28">Search</span>
							<Badge className="bg-bg4 text-fg2 hidden items-center justify-center border-none lg:flex" size="20">
								CTRL + K
							</Badge>
						</Button>
					</ModalTrigger>
					<ModalContent className="px-0 py-2">
						<ModalTitle className="hidden">Plain</ModalTitle>
						<div className="flex h-[400px] flex-col overflow-y-scroll rounded-lg">
							<div className="bg-bg1 sticky top-0 flex flex-col">
								<div className="flex items-center gap-2 px-[0.875rem] py-[0.375rem]">
									<Search className="h-5 w-5 shrink-0 opacity-50" />
									<input
										type="text"
										placeholder="Search the docs"
										value={searchTerm}
										onChange={(e) => {
											setSearchTerm(e.target.value)
											const newFilteredItems = filteredItems
												.map((section) => ({
													...section,
													items: section.items.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())),
												}))
												.filter((section) => section.items.length > 0) // Remove empty sections

											// If there are results, move hover (selectedIndex) to the first item
											setSelectedIndex(newFilteredItems.length > 0 ? 0 : -1)
										}}
										className="body-sm placeholder:text-fg3 flex w-full rounded-md bg-transparent py-1 font-normal outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
									/>
								</div>
								<Divider />
							</div>
							{filteredItems.length > 0 ? (
								filteredItems.map((section, sectionIndex) => (
									<main key={section.title} className="text-[0.875rem] font-normal">
										<div className="px-[10px]">
											<h1 className="text-fg3 flex items-center gap-[0.375rem] px-[7px] py-[0.375rem]">{section.title}</h1>
											<ul className="flex flex-col gap-[5px]">
												{section.items.map((item, itemIndex) => {
													const globalIndex = filteredItems.slice(0, sectionIndex).reduce((acc, sec) => acc + sec.items.length, 0) + itemIndex

													return (
														<ModalClose asChild key={item.link}>
															<Link href={item.link}>
																<li
																	ref={(el) => {
																		itemRefs.current[globalIndex] = el
																	}}
																	className={`body-sm text-fg1 hover:bg-border flex h-[40px] items-center rounded-md px-2 ${
																		selectedIndex === globalIndex ? "bg-border" : ""
																	}`}>
																	{item.name}
																</li>
															</Link>
														</ModalClose>
													)
												})}
											</ul>
										</div>
										{sectionIndex !== filteredItems.length - 1 && <Divider />}
									</main>
								))
							) : (
								<div className="text-fg2 flex h-full items-center justify-center">No items found</div>
							)}
						</div>
					</ModalContent>
				</Modal>

				<DesktopThemeToggler />

				<Drawer
					type="default"
					direction="right"
					handle
					backdrop="overlay"
					trigger={
						<Button isIcon variant="neutral-soft" className="lg:hidden">
							<HamburgerMenuIcon className="size-6" />
						</Button>
					}>
					<nav className="bg-bg1 fixed top-0 left-0 z-0 flex h-screen w-full flex-col gap-3 overflow-y-scroll px-4 md:px-5">
						<div className="flex min-h-[5rem] items-center justify-between">
							<Link href="/" style={{ fill: "white", color: "white" }}>
								<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
								<Image src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
							</Link>
							<DrawerClose>
								<Button isIcon variant="neutral-soft">
									<X className="size-5" />
								</Button>
							</DrawerClose>
						</div>

						<div className="flex flex-col gap-3">
							<Button>Sign up for early access</Button>
							<TabletMobileThemeToggler />
						</div>

						<ul className="body-sm text-fg2 flex flex-col items-start gap-2 px-3 font-medium">
							{navLinks.map((item) => (
								<li key={item.link}>
									<DrawerClose>
										<Link className={`${pathname === item.link ? "text-fg1" : ""} text-fg2`} href={item.link}>
											{item.name}
										</Link>
									</DrawerClose>
								</li>
							))}
						</ul>

						<Accordion collapsible>
							{sideBarItems.map((section) => (
								<AccordionItem value={section.title} key={section.title}>
									<section>
										<AccordionTrigger className="py-2 [&[data-state=closed]>h1>svg]:rotate-0 [&[data-state=open]>h1>svg]:rotate-90">
											<h1 className="body-sm flex items-center gap-[0.375rem] px-[6px] font-medium">
												<ChevronRight className="duration-300 ease-in-out" size={12} />
												{section.title}
											</h1>
										</AccordionTrigger>
										<div className="flex flex-col justify-center">
											{section.items.map((item) => (
												<AccordionContent
													key={item.link}
													className={` ${pathname === item.link ? "bg-bg2 rounded-[0.375rem] font-medium" : ""} body-sm w-full py-2 pl-6 text-start transition-all data-[state=closed]:ease-out data-[state=open]:ease-in`}>
													<DrawerClose>
														<Link className={`${pathname === item.link ? "text-fg1" : ""} text-fg2`} href={item.link}>
															{item.name}
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

export default Navbar
