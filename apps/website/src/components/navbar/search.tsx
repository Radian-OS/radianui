"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { navigationItems } from "@/config/navigation-config"
import { Badge } from "@/registry/ui/badge"
import { Button, IconButton } from "@/registry/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"
import SearchCommand from "../search-command"

export function SearchDocs() {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [selectedIndex, setSelectedIndex] = useState(-1)
	const itemRefs = useRef<(HTMLLIElement | null)[]>([])
	const drawerRef = useRef<HTMLDivElement | null>(null)

	// Filter sidebar items based on the search term
	const filteredItems = navigationItems
		.filter((section) => section.title !== "Animations") // 👈 Add this line
		.map((section) => ({
			...section,
			items: section.items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())),
		}))
		.filter((section) => section.items.length > 0)

	const getTotalItems = useCallback(() => filteredItems.reduce((acc, section) => acc + section.items.length, 0), [filteredItems])

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
				itemRefs.current[selectedIndex]?.click()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [getTotalItems, isOpen, selectedIndex])

	useEffect(() => {
		if (selectedIndex !== -1) {
			itemRefs.current[selectedIndex]?.scrollIntoView({
				block: "end",
				behavior: "instant",
			})
		}
	}, [selectedIndex])

	// To prevent the drawer being pushed up when keyboard is open on mobile
	useEffect(() => {
		const handleResize = () => {
			if (drawerRef.current) {
				drawerRef.current.style.setProperty("bottom", `env(safe-area-inset-bottom)`)
			}
		}

		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", handleResize)
			handleResize()
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener("resize", handleResize)
			}
		}
	}, [])

	const searchCommandProps = {
		filteredItems,
		itemRefs,
		searchTerm,
		selectedIndex,
		setSearchTerm,
		setSelectedIndex,
	}

	return (
		<>
			{/* Mobile Search */}
			<Drawer direction="bottom" variant="rounded" handle={true} modal={true} preventScrollRestoration={true}>
				<DrawerTrigger asChild>
					<IconButton aria-label="Search Components" variant="outline" color="neutral" className="md:hidden">
						<Search />
					</IconButton>
				</DrawerTrigger>
				<DrawerContent ref={drawerRef} className="bg-fill3 h-[90dvh] p-3">
					<DrawerHeader>
						<DrawerTitle className="sr-only">Search command</DrawerTitle>
					</DrawerHeader>
					<div className="h-full">
						<SearchCommand {...searchCommandProps} />
					</div>
				</DrawerContent>
			</Drawer>

			{/* Desktop Search */}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button className="not-md:hidden gap-1" variant={"outline"} color={"neutral"}>
						<Search className="text-fg-tertiary" />
						<span className="text-fg-tertiary w-43 flex-1 px-1 text-start">Search</span>
						<Badge className="text-fg-secondary" size="20" variant="outline" color="neutral">
							⌘K
						</Badge>
					</Button>
				</DialogTrigger>
				<DialogContent closeButton="hidden" className="h-150 w-125 bg-fill3 border-alpha gap-0 rounded-2xl border p-1">
					<DialogTitle className="hidden">Command Search</DialogTitle>
					<SearchCommand {...searchCommandProps} />
				</DialogContent>
			</Dialog>
		</>
	)
}
