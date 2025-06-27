"use client"

import React, { useEffect, useRef, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { ArrowDown, ArrowUp, ChevronRight, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DesktopThemeToggler, TabletMobileThemeToggler } from "@/components/theme-toggler"
import VersionDisplay from "@/components/version-display"
import { navigationItems } from "@/config/navigation-config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerClose } from "@/registry/ui/drawer"
import { Modal, ModalClose, ModalContent, ModalTitle, ModalTrigger } from "@/registry/ui/modal"

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(true)
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

				<Modal open={isOpen} onOpenChange={setIsOpen} closeIcon="hidden">
					<ModalTrigger asChild>
						<Button isIcon variant="outline" color="neutral" className="gap-2">
							<Search />
							<span className="text-fg1 hidden grow text-start text-sm font-normal xl:inline xl:w-28">Search</span>
							<Badge className="bg-bg-level3 text-fg1 hidden items-center justify-center border-none lg:flex" size="20">
								CTRL + K
							</Badge>
						</Button>
					</ModalTrigger>
					<ModalContent className="h-150 w-125 bg-fill-level3 border-border-alpha gap-0 rounded-2xl border p-1">
						<ModalTitle className="hidden">Command Search</ModalTitle>
						<div className="bg-fill-level1 rounded-b-none rounded-t-2xl p-1.5">
							<div className="flex items-center gap-2 px-2 py-3">
								<Search size={20} className="text-text-tertiary" />
								<input
									type="text"
									placeholder="Search Documentation"
									value={searchTerm}
									onChange={(e) => {
										setSearchTerm(e.target.value)
										const newFilteredItems = filteredItems
											.map((section) => ({
												...section,
												items: section.items.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase())),
											}))
											.filter((section) => section.items.length > 0) // Remove empty sections

										// If there are results, move hover (selectedIndex) to the first item
										setSelectedIndex(newFilteredItems.length > 0 ? 0 : -1)
									}}
									className="outline-hidden placeholder:text-text-tertiary flex-1 text-sm font-normal focus:outline-0"
								/>
								{/* <Button isIcon size="28" variant="ghost"> */}
								<X size={20} className="text-text-tertiary cursor-pointer" onClick={() => setSearchTerm("")} />
								{/* </Button> */}
							</div>
						</div>
						<div className="h-0.25 border-border-alpha w-full" />
						<div className="no-scrollbar bg-fill-level1 h-full flex-1 overflow-y-auto rounded-b-2xl">
							{filteredItems.length > 0 ? (
								filteredItems.map((section, sectionIndex) => (
									<main key={section.title} className="text-sm font-normal">
										<div className="px-1.5 py-1">
											<h3 className="text-text-tertiary p-2 text-xs font-medium uppercase">{section.title}</h3>
											<ul className="gap-1.25 flex flex-col">
												{section.items.map((item, itemIndex) => {
													const globalIndex = filteredItems.slice(0, sectionIndex).reduce((acc, sec) => acc + sec.items.length, 0) + itemIndex

													return (
														<ModalClose asChild key={item.title}>
															<Link href={item.url}>
																<li
																	ref={(el) => {
																		itemRefs.current[globalIndex] = el
																	}}
																	className={`hover:bg-fill-level2 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium ${selectedIndex === globalIndex ? "bg-fill-level2" : ""}`}>
																	<img src={section.searchIcon} alt="Search icon" />
																	{item.title}
																</li>
															</Link>
														</ModalClose>
													)
												})}
											</ul>
										</div>
										{sectionIndex !== filteredItems.length - 1 && <div className="h-0.25 bg-border-alpha w-full" />}
									</main>
								))
							) : (
								<div className="text-fg1 flex h-full items-center justify-center">No items found</div>
							)}
						</div>
						<div className="text-text-tertiary hidden items-center gap-4 p-4 text-sm md:flex">
							<div className="flex items-center gap-2">
								<Badge size="20" className="text-text-secondary uppercase">
									<ArrowUp size={16} />
								</Badge>
								<Badge size="20" className="text-text-secondary uppercase">
									<ArrowDown size={16} />
								</Badge>
								<span>Navigate</span>
							</div>
							<div className="flex w-full justify-between">
								<div className="flex items-center gap-2">
									<Badge size="20" className="text-text-secondary uppercase">
										Enter
									</Badge>
									<span>Select</span>
								</div>
								<div className="flex items-center gap-2">
									<span>Close</span>
									<Badge size="20" className="text-text-secondary uppercase">
										ESC
									</Badge>
								</div>
							</div>
						</div>
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
