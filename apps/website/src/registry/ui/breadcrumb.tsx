"use client"

import React, { useEffect, useState } from "react"
import { ChevronRight, Ellipsis } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "./dropdown"

type BaseProps = React.HTMLAttributes<HTMLElement> & {
	className?: string
	children?: React.ReactNode
}

type BreadcrumbProps = BaseProps & {
	separator?: "default" | "slash"
	maxItems?: number
}

type BreadcrumbItemProps = BaseProps & {
	href?: string
	isCurrent?: boolean
	showSeparator?: boolean
	separator?: "default" | "slash"
}

function Breadcrumb({ children, className = "", separator = "default", maxItems: maxItemsProp = 5, ...props }: BreadcrumbProps) {
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
								separator,
							})}
							{showEllipsis && (
								<>
									<BreadcrumbItem className="cursor-default hover:no-underline">
										<Dropdown>
											<DropdownTrigger asChild>
												<Badge className="cursor-pointer" size="20">
													<Ellipsis size={16} />
												</Badge>
											</DropdownTrigger>
											<DropdownContent>
												<DropdownGroup>
													{invisibleItems.map((hiddenChild, hiddenIndex) =>
														React.isValidElement<BreadcrumbItemProps>(hiddenChild) ? (
															<DropdownItem key={hiddenChild.key ?? hiddenIndex}>
																<Link className="flex items-center justify-start gap-0.5" href={hiddenChild.props.href || "#"}>
																	{hiddenChild.props.children}
																</Link>
															</DropdownItem>
														) : null
													)}
												</DropdownGroup>
											</DropdownContent>
										</Dropdown>
									</BreadcrumbItem>
									{separator === "slash" ? <span className="text-text-tertiary text-sm">/</span> : <ChevronRight size={14} className="stroke-text-tertiary" />}
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

function BreadcrumbItem({ children, href, isCurrent = false, className = "", showSeparator = false, separator = "default", ...props }: BreadcrumbItemProps) {
	return (
		<>
			<li className="flex items-center justify-center" {...props}>
				{href ? (
					<Link
						href={href}
						className={cn(
							"flex items-center gap-1 text-sm font-medium transition-colors",
							isCurrent ? "font-medium" : "text-text-secondary",
							"hover:underline",
							"[&>svg]:h-full [&>svg]:max-h-5 [&>svg]:w-auto",
							className
						)}>
						{children}
					</Link>
				) : (
					<span
						className={cn(
							"flex items-center gap-1 text-sm font-medium transition-colors",
							isCurrent ? "font-medium" : "text-text-secondary",
							"[&>svg]:h-full [&>svg]:max-h-5 [&>svg]:w-auto",
							className
						)}>
						{children}
					</span>
				)}
			</li>
			{showSeparator && (separator === "slash" ? <span className="text-text-tertiary text-sm">/</span> : <ChevronRight size={14} className="stroke-text-tertiary" />)}
		</>
	)
}

BreadcrumbItem.displayName = "BreadcrumbItem"

export { Breadcrumb, BreadcrumbItem }
