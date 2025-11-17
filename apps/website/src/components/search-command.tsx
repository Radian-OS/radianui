import { useRef } from "react"
import { ArrowDown, ArrowUp, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationItem } from "@/config/navigation-config"
import { Badge } from "@/registry/ui/badge"
import { DialogClose } from "@/registry/ui/dialog"

type Props = {
	searchTerm: string
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>
	filteredItems: {
		items: NavigationItem[]
		title: string
		description?: string
		searchIcon?: string
	}[]
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
	itemRefs: React.RefObject<(HTMLLIElement | null)[]>
	selectedIndex: number
}

export default function SearchCommand({ searchTerm, setSearchTerm, filteredItems, selectedIndex, setSelectedIndex, itemRefs }: Props) {
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<>
			<div className="bg-fill1 rounded-b-none rounded-t-xl p-1.5">
				<div className="flex h-11 items-center gap-2 px-2 py-3">
					<Search size={20} className="text-fg-tertiary" />
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
						ref={inputRef}
						className="outline-hidden placeholder:text-fg-tertiary flex-1 text-sm font-normal focus:outline-0"
					/>
					<X size={20} className="text-fg-tertiary cursor-pointer" onClick={() => setSearchTerm("")} />
				</div>
			</div>
			<div className="h-0.25 border-soft-alpha w-full" />
			<div className="no-scrollbar bg-fill1 h-full flex-1 overflow-y-auto rounded-b-2xl">
				{filteredItems.length > 0 ? (
					filteredItems.map((section, sectionIndex) => (
						<main key={section.title} className="text-sm font-normal">
							<div className="px-1.5 py-1">
								<h3 className="text-fg-tertiary p-2 text-xs font-medium uppercase">{section.title}</h3>
								<ul className="gap-1.25 flex flex-col">
									{section.items.map((item, itemIndex) => {
										const globalIndex = filteredItems.slice(0, sectionIndex).reduce((acc, sec) => acc + sec.items.length, 0) + itemIndex

										return (
											<DialogClose asChild key={item.title}>
												<Link href={item.url}>
													<li
														ref={(el) => {
															itemRefs.current[globalIndex] = el
														}}
														className={`hover:bg-text/4 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium ${selectedIndex === globalIndex ? "bg-fill2" : ""}`}>
														{section.searchIcon ? <Image height={24} width={24} src={section.searchIcon} alt="Search icon" /> : null}
														{item.title}
													</li>
												</Link>
											</DialogClose>
										)
									})}
								</ul>
							</div>
							{sectionIndex !== filteredItems.length - 1 && <div className="h-0.25 bg-soft-alpha w-full" />}
						</main>
					))
				) : (
					<div className="text-fg1 flex h-full items-center justify-center">No items found</div>
				)}
			</div>
			<div className="text-fg-tertiary hidden items-center gap-4 p-4 text-sm md:flex">
				<div className="flex items-center gap-2">
					<Badge size="20" className="text-fg-secondary uppercase">
						<ArrowUp size={16} />
					</Badge>
					<Badge size="20" className="text-fg-secondary uppercase">
						<ArrowDown size={16} />
					</Badge>
					<span>Navigate</span>
				</div>
				<div className="flex w-full justify-between">
					<div className="flex items-center gap-2">
						<Badge size="20" className="text-fg-secondary uppercase">
							Enter
						</Badge>
						<span>Select</span>
					</div>
					<div className="flex items-center gap-2">
						<span>Close</span>
						<Badge size="20" className="text-fg-secondary uppercase">
							ESC
						</Badge>
					</div>
				</div>
			</div>
		</>
	)
}
