"use client"

import React, { useEffect, useState } from "react"
import { ChevronRight, Ellipsis, Slash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "./dropdown"

type BaseProps = React.HTMLAttributes<HTMLElement> & {
	className?: string
	children?: React.ReactNode
}

type BreadcrumbProps = BaseProps & {
	separatorType?: "default" | "slash"
	maxItems?: number
}

type BreadcrumbItemProps = BaseProps & {
	href?: string
	isCurrent?: boolean
	showSeparator?: boolean
	separatorType?: "default" | "slash"
}

function Breadcrumb({ children, className = "", separatorType = "default", maxItems: maxItemsProp = 5, ...props }: BreadcrumbProps) {
	const [maxItems, setMaxItems] = useState(maxItemsProp)

	useEffect(() => {
		const handleResize = () => {
			setMaxItems(window.innerWidth <= 640 ? 2 : window.innerWidth <= 768 ? 3 : window.innerWidth <= 1024 ? 4 : maxItemsProp)
		}

		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [maxItemsProp])

	const childArray = React.Children.toArray(children)
	const shouldShowEllipsis = childArray.length > maxItems
	const visibleItems = shouldShowEllipsis ? [childArray[0], ...childArray.slice(-maxItems + 1)] : childArray
	const invisibleItems = shouldShowEllipsis ? childArray.slice(1, -maxItems + 1) : []

	return (
		<nav className={cn("flex items-center", className)} {...props}>
			<ol className="flex items-center justify-center gap-1.5">
				{visibleItems.map((child, index, array) => {
					if (!React.isValidElement<BreadcrumbItemProps>(child)) return child

					const isLast = index === array.length - 1
					const showEllipsis = shouldShowEllipsis && index === 0

					return (
						<React.Fragment key={child.key ?? index}>
							{React.cloneElement(child, {
								...child.props,
								showSeparator: !isLast || showEllipsis,
								separatorType,
							})}
							{showEllipsis && (
								<>
									<BreadcrumbItem className="cursor-default hover:no-underline">
										<Dropdown>
											<DropdownTrigger asChild>
												<Badge className="cursor-pointer" size="20" rounded>
													<Ellipsis size={16} />
												</Badge>
											</DropdownTrigger>
											<DropdownContent>
												<DropdownGroup>
													{invisibleItems.map((hiddenChild, hiddenIndex) =>
														React.isValidElement<BreadcrumbItemProps>(hiddenChild) ? (
															<DropdownItem key={hiddenChild.key ?? hiddenIndex}>
																<a className="flex items-center justify-start gap-0.5" href={hiddenChild.props.href}>
																	{hiddenChild.props.children}
																</a>
															</DropdownItem>
														) : null
													)}
												</DropdownGroup>
											</DropdownContent>
										</Dropdown>
									</BreadcrumbItem>
									{separatorType === "slash" ? <Slash size={14} className="stroke-fg2" /> : <ChevronRight size={14} className="stroke-fg2" />}
								</>
							)}
						</React.Fragment>
					)
				})}
			</ol>
		</nav>
	)
}
Breadcrumb.displayName = "Breadcrumb"

function BreadcrumbItem({
	children,
	href,
	isCurrent = false,
	className = "",
	showSeparator = false,
	separatorType = "default",
	...props
}: BreadcrumbItemProps) {
	const Comp = href ? "a" : "span"
	const SeparatorIcon = separatorType === "slash" ? Slash : ChevronRight

	return (
		<>
			<li className="flex items-center justify-center" {...props}>
				<Comp
					href={href}
					className={cn(
						"text-sm flex items-center gap-1 font-medium transition-colors",
						isCurrent ? "font-medium" : "text-fg1",
						href && "hover:underline",
						"[&>svg]:h-full [&>svg]:max-h-5 [&>svg]:w-auto",
						className
					)}>
					{children}
				</Comp>
			</li>
			{showSeparator && <SeparatorIcon size={14} className="stroke-fg2" />}
		</>
	)
}

BreadcrumbItem.displayName = "BreadcrumbItem"

export { Breadcrumb, BreadcrumbItem }
