"use client"

import React, { HTMLAttributes } from "react"
import { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"
import { CopyButton } from "@/components/copy-button"
import PackageManagerTabs, {
	PackageManagerTabsProps,
} from "@/components/package-manager-tabs"
import { cn } from "@/lib/utils"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertProps,
	AlertTitle,
} from "@/registry/ui/alert"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"

export const BlogComponents: MDXComponents = {
	h1: ({
		id,
		children,
		className,
		...props
	}: HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			id={id}
			className={cn(
				"heading-4 text-fg mt-10 mb-4 scroll-mt-24 font-bold tracking-tight",
				className
			)}
			{...props}>
			{children}
		</h1>
	),
	h2: ({
		id,
		children,
		className,
		...props
	}: HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			id={id}
			className={cn(
				"heading-5 text-fg mt-10 mb-4 scroll-mt-24 font-semibold tracking-tight",
				className
			)}
			{...props}>
			{children}
		</h2>
	),
	h3: ({
		id,
		children,
		className,
		...props
	}: HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			id={id}
			className={cn(
				"text-fg mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight",
				className
			)}
			{...props}>
			{children}
		</h3>
	),
	h4: ({
		id,
		children,
		className,
		...props
	}: HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			id={id}
			className={cn(
				"text-fg mt-6 mb-2 scroll-mt-24 text-lg font-medium tracking-tight",
				className
			)}
			{...props}>
			{children}
		</h4>
	),
	p: ({
		children,
		className,
		...props
	}: HTMLAttributes<HTMLParagraphElement>) => (
		<p
			className={cn("text-fg-secondary my-4 text-base leading-7", className)}
			{...props}>
			{children}
		</p>
	),
	a: ({
		href,
		children,
		className,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		const isExternal = href?.startsWith("http")
		if (href && !isExternal) {
			return (
				<Link
					href={href}
					className={cn(
						"text-primary-text font-medium underline underline-offset-4 transition-colors hover:opacity-80",
						className
					)}
					{...props}>
					{children}
				</Link>
			)
		}
		return (
			<a
				href={href}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
				className={cn(
					"text-primary-text font-medium underline underline-offset-4 transition-colors hover:opacity-80",
					className
				)}
				{...props}>
				{children}
			</a>
		)
	},
	strong: ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => (
		<strong className={cn("text-fg font-semibold", className)} {...props}>
			{children}
		</strong>
	),
	em: ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => (
		<em className={cn("text-fg-secondary italic", className)} {...props}>
			{children}
		</em>
	),
	ul: ({
		children,
		className,
		...props
	}: React.HTMLAttributes<HTMLUListElement>) => (
		<ul
			className={cn(
				"text-fg-secondary my-4 ml-6 list-disc space-y-2 [&>li]:leading-7",
				className
			)}
			{...props}>
			{children}
		</ul>
	),
	ol: ({
		children,
		className,
		...props
	}: React.OlHTMLAttributes<HTMLOListElement>) => (
		<ol
			className={cn(
				"text-fg-secondary my-4 ml-6 list-decimal space-y-2 [&>li]:leading-7",
				className
			)}
			{...props}>
			{children}
		</ol>
	),
	li: ({
		children,
		className,
		...props
	}: React.LiHTMLAttributes<HTMLLIElement>) => (
		<li
			className={cn("text-fg-secondary pl-1 leading-7", className)}
			{...props}>
			{children}
		</li>
	),
	blockquote: ({
		children,
		className,
		...props
	}: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className={cn(
				"border-border text-fg-secondary my-6 border-l-2 pl-4 italic [&_p]:my-2",
				className
			)}
			{...props}>
			{children}
		</blockquote>
	),
	hr: () => <Divider className="my-8" />,
	pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => (
		<pre
			className={cn(
				"bg-bg no-scrollbar border-border my-6 min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain rounded-lg border p-4 text-sm outline-none",
				className
			)}
			{...props}>
			{children}
		</pre>
	),
	code: ({
		className,
		__raw__,
		__src__,
		__npm__,
		__yarn__,
		__pnpm__,
		__bun__,
		...props
	}: React.ComponentProps<"code"> & {
		__raw__?: string
		__src__?: string
		__npm__?: string
		__yarn__?: string
		__pnpm__?: string
		__bun__?: string
	}) => {
		// Inline code
		if (
			typeof props.children === "string" &&
			!className?.includes("language-")
		) {
			return (
				<code
					className={cn(
						"bg-fill2 text-fg rounded-md px-1.5 py-0.5 font-mono text-sm wrap-break-word",
						className
					)}
					{...props}
				/>
			)
		}

		// Code block with copy button
		return (
			<div className="relative">
				{__raw__ && <CopyButton value={__raw__} src={__src__} />}
				<code className={cn(className)} {...props} />
			</div>
		)
	},
	table: ({ className, ...props }: React.ComponentProps<"table">) => (
		<div className="no-scrollbar border-border my-6 w-full overflow-y-auto rounded-lg border">
			<table
				className={cn(
					"relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
					className
				)}
				{...props}
			/>
		</div>
	),
	tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
		<tr
			className={cn("border-border m-0 border-b transition-colors", className)}
			{...props}
		/>
	),
	th: ({ className, ...props }: React.ComponentProps<"th">) => (
		<th
			className={cn(
				"text-fg bg-fill1 px-4 py-3 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right",
				className
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.ComponentProps<"td">) => (
		<td
			className={cn(
				"text-fg-secondary px-4 py-3 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className
			)}
			{...props}
		/>
	),
	Image: ({
		src,
		alt,
		className,
		width,
		height,
		...props
	}: {
		src: string
		alt?: string
		className?: string
		width?: number
		height?: number
	} & Omit<
		React.ComponentProps<typeof Image>,
		"src" | "alt" | "className" | "width" | "height"
	>) => (
		<Image
			src={src}
			alt={alt || ""}
			className={cn(
				"border-border my-6 h-auto w-full max-w-full rounded-xl border object-cover",
				className
			)}
			height={height ?? 500}
			width={width ?? 800}
			{...props}
		/>
	),
	img: ({
		src,
		alt,
		className,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<img
			src={src}
			alt={alt || ""}
			className={cn(
				"border-border my-6 h-auto w-full max-w-full rounded-xl border object-cover",
				className
			)}
			{...props}
		/>
	),
	Alert: (props: AlertProps) => (
		<Alert variant="soft" color="warning" className="my-6" {...props} />
	),
	AlertTitle,
	AlertDescription,
	AlertIcon,
	AlertContent,
	Badge,
	Button,
	Divider,
	PackageManagerTabs: ({
		commands,
		className,
		withIcon = true,
	}: PackageManagerTabsProps) => (
		<div className="my-6">
			<PackageManagerTabs
				commands={commands}
				className={className}
				withIcon={withIcon}
			/>
		</div>
	),
}
