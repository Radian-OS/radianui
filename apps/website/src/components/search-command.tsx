import { useRef } from "react"
import { ArrowDown, ArrowUp, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationItem } from "@/config/navigation-config"
import { Badge } from "@/styles/default/ui/badge"
import { DialogClose } from "@/styles/default/ui/dialog"
import { ResourceIcon } from "./navbar/resource-icons"

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
	itemRefs: React.RefObject<(HTMLElement | null)[]>
	selectedIndex: number
}

export default function SearchCommand({
	searchTerm,
	setSearchTerm,
	filteredItems,
	selectedIndex,
	setSelectedIndex,
	itemRefs,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<>
			<div className="bg-fill1 rounded-t-xl rounded-b-none p-1.5">
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
									items: section.items.filter((item) =>
										item.title
											.toLowerCase()
											.includes(e.target.value.toLowerCase())
									),
								}))
								.filter((section) => section.items.length > 0) // Remove empty sections

							// If there are results, move hover (selectedIndex) to the first item
							setSelectedIndex(newFilteredItems.length > 0 ? 0 : -1)
						}}
						ref={inputRef}
						className="placeholder:text-fg-tertiary flex-1 text-sm font-normal outline-hidden focus:outline-0"
					/>
					<X
						size={20}
						className="text-fg-tertiary cursor-pointer"
						onClick={() => setSearchTerm("")}
					/>
				</div>
			</div>
			<div className="border-soft-alpha h-0.25 w-full" />
			<div className="no-scrollbar bg-fill1 h-full flex-1 overflow-y-auto rounded-b-2xl">
				{filteredItems.length > 0 ? (
					filteredItems.map((section, sectionIndex) => (
						<main key={section.title} className="text-sm font-normal">
							<div className="px-1.5 py-1">
								<h3 className="text-fg-tertiary p-2 text-xs font-medium uppercase">
									{section.title}
								</h3>
								<ul className="flex flex-col gap-1.25">
									{section.items.map((item, itemIndex) => {
										const globalIndex =
											filteredItems
												.slice(0, sectionIndex)
												.reduce((acc, sec) => acc + sec.items.length, 0) +
											itemIndex

										const content = (
											<>
												<span className="flex min-w-0 items-center gap-2">
													{section.searchIcon ? (
														<Image
															height={24}
															width={24}
															src={section.searchIcon}
															alt="Search icon"
														/>
													) : null}
													{!section.searchIcon &&
													item.resourceIcon &&
													!item.disabled ? (
														<span
															className="flex size-6 shrink-0 items-center justify-center"
															aria-hidden="true">
															<ResourceIcon name={item.resourceIcon} />
														</span>
													) : null}
													<span className="truncate">{item.title}</span>
												</span>
												{item.isComingSoon ? (
													<Badge size="20" variant="soft" color="neutral">
														Coming Soon
													</Badge>
												) : null}
											</>
										)
										const itemClassName = `flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm font-medium ${selectedIndex === globalIndex ? "bg-fill2" : ""}`

										return (
											<li key={item.title}>
												{item.disabled ? (
													<div
														ref={(el) => {
															itemRefs.current[globalIndex] = el
														}}
														aria-disabled="true"
														className={`${itemClassName} text-fg-tertiary cursor-not-allowed`}>
														{content}
													</div>
												) : (
													<DialogClose asChild>
														<Link
															ref={(el) => {
																itemRefs.current[globalIndex] = el
															}}
															className={`${itemClassName} hover:bg-text/4 cursor-pointer`}
															href={item.url}
															target={item.isExternal ? "_blank" : "_self"}>
															{content}
														</Link>
													</DialogClose>
												)}
											</li>
										)
									})}
								</ul>
							</div>
							{sectionIndex !== filteredItems.length - 1 && (
								<div className="bg-soft-alpha h-0.25 w-full" />
							)}
						</main>
					))
				) : (
					<div className="text-fg1 flex h-full items-center justify-center">
						No items found
					</div>
				)}
			</div>
			<div className="text-fg-tertiary hidden items-center gap-4 p-4 text-sm md:flex">
				<div className="flex items-center gap-2">
					<Badge
						size="20"
						className="uppercase"
						variant="outline"
						color="neutral">
						<ArrowUp size={16} />
					</Badge>
					<Badge
						size="20"
						className="uppercase"
						variant="outline"
						color="neutral">
						<ArrowDown size={16} />
					</Badge>
					<span>Navigate</span>
				</div>
				<div className="flex w-full justify-between">
					<div className="flex items-center gap-2">
						<Badge
							size="20"
							className="uppercase"
							variant="outline"
							color="neutral">
							Enter
						</Badge>
						<span>Select</span>
					</div>
					<div className="flex items-center gap-2">
						<span>Close</span>
						<Badge
							size="20"
							className="uppercase"
							variant="outline"
							color="neutral">
							ESC
						</Badge>
					</div>
				</div>
			</div>
		</>
	)
}
