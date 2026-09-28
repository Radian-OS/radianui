import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { logoRegistry, type LogoKey } from "./logos"

export interface BlogExampleCardProps {
	title: string
	description: string
	href?: string
	logo?: LogoKey
	logoNode?: React.ReactNode
	className?: string
}

function DefaultLogo({ name }: { name?: string }) {
	if (!name) {
		return (
			<div className="bg-fill3 text-fg-secondary flex size-5 items-center justify-center rounded text-xs font-semibold">
				•
			</div>
		)
	}

	const key = name.toLowerCase() as LogoKey
	const LogoComponent = key in logoRegistry ? logoRegistry[key] : null

	if (LogoComponent) {
		return <LogoComponent />
	}

	// Fallback for unknown string keys
	return (
		<div className="flex items-center gap-2">
			<div className="bg-fill3 text-fg-secondary flex size-5 items-center justify-center rounded text-xs font-semibold">
				{name.charAt(0).toUpperCase()}
			</div>
			<span className="text-fg text-sm font-semibold tracking-tight">
				{name}
			</span>
		</div>
	)
}

export function BlogExampleCard({
	title,
	description,
	href,
	logo,
	logoNode,
	className,
}: BlogExampleCardProps) {
	const content = (
		<div
			className={cn(
				"group bg-fill1 relative flex flex-row items-start gap-5 rounded-xl p-5",
				href && "cursor-pointer",
				className
			)}>
			{/* Logo Box Container */}
			<div className="bg-bg flex h-32 w-40 shrink-0 items-center justify-center rounded-xl">
				{logoNode ? logoNode : <DefaultLogo name={logo} />}
			</div>

			{/* Text Content */}
			<div className="flex flex-1 flex-col gap-2">
				<h3 className="text-fg text-base leading-6 font-semibold tracking-[-0.16px]">
					{title}
				</h3>
				<p className="text-fg-secondary text-sm leading-6 tracking-[-0.14px]">
					{description}
				</p>
			</div>
		</div>
	)

	if (href) {
		const isExternal = href.startsWith("http")
		if (isExternal) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="block no-underline">
					{content}
				</a>
			)
		}
		return (
			<Link href={href} className="block no-underline">
				{content}
			</Link>
		)
	}

	return content
}

export function BlogExampleCardGroup({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn("my-5 flex flex-col gap-5", className)}>{children}</div>
	)
}
