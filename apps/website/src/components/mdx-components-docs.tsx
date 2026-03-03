import React, { HTMLAttributes } from "react"
import { Link as LinkIcon, TerminalIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ColorPlayground from "@/components/color/color-playground"
import { ColorTable } from "@/components/color/color-table"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import FigmaCard from "@/components/figma/figma-card"
import Installation from "@/components/installation"
import {
	InstallTabsContent,
	InstallTabsList,
	InstallTabsTrigger,
	InstallationTabs,
} from "@/components/installation-tabs"
import PackageManagerTabs from "@/components/package-manager-tabs"
import { PropsTable } from "@/components/props-table"
import SocialLinkCards from "@/components/social-link-cards"
import CustomThemePlayground from "@/components/theme/custom-theme-playground"
import DarkModeFramework from "@/components/theme/dark-mode-framework"
import DarkModePlayground from "@/components/theme/dark-mode-playground"
import BodyFontSpecs from "@/components/typography/body-font-specs"
import HeadingFontSpecs from "@/components/typography/heading-font-specs"
import TypographyPlayground from "@/components/typography/typography-playground"
import { cn } from "@/lib/utils"
import BadgeExamplePreview from "@/registry/example/badge/badge-color-example"
import DatePickerPresetsExample from "@/registry/example/date-picker/date-picker-range-example"
import DatePickerWithTimeExample from "@/registry/example/date-picker/date-picker-with-time"
import examples from "@/registry/example/example.json"
import ProgressPreview from "@/registry/example/progress/progress-preview"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionProps,
	AccordionTrigger,
	AccordionTriggerProps,
} from "@/registry/ui/accordion"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertProps,
	AlertTitle,
} from "@/registry/ui/alert"
import { Divider } from "@/registry/ui/divider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { CodeBlockCommandServer } from "./code-block-command-server"
import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper"
import ColorTableThemeToggle from "./color/color-table-theme-toggle"
import { CopyButton } from "./copy-button"

export const components = {
	PropsTable,
	ColorTable,
	ColorTableThemeToggle,
	ColorPlayground,
	DarkModeFramework,
	PropsTableWrapper: ({
		children,
	}: {
		children: React.ReactNode | React.ReactNode[]
	}) => (
		<div className="bg-elevation-negative mt-3 flex flex-col gap-2 rounded-xl p-1.5">
			{children}
		</div>
	),
	Installation,
	BadgeExamplePreview,
	TypographyPlayground,
	DatePickerPresetsExample,
	DatePickerWithTimeExample,
	HeadingFontSpecs,
	BodyFontSpecs,
	DarkModePlayground,
	CustomThemePlayground,
	// Animation components
	ProgressPreview,
	PackageManagerTabs,
	InstallationTabs,
	InstallTabsList,
	InstallTabsTrigger,
	InstallTabsContent,
	ComponentPreview: ({
		path,
		height,
		align,
		type,
	}: {
		path: string
		height: number
		align: "center" | "start" | "end"
		type?: "component" | "block"
	}) => {
		const code =
			examples
				?.find((e) => e.files.some((file) => file.name === path))
				?.files.find((file) => file.name === path)?.content || ""

		return (
			<ComponentPreview
				type={type}
				path={path}
				code={code}
				height={height}
				align={align}
			/>
		)
	},
	ComponentSource,
	FigmaCard,
	h1: ({
		children,
		className,
		...props
	}: HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className={cn("heading-4", className)} {...props}>
			{children}
		</h1>
	),
	h2: ({
		children,
		className,
		...props
	}: HTMLAttributes<HTMLHeadingElement>) => {
		const text = typeof children === "string" ? children : ""
		const id = text
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]/g, "")
		return (
			<h2
				className={cn(
					"heading-5 font-semibold! scroll-mt-26 group mb-3 mt-10 flex items-center",
					className
				)}
				{...props}>
				<Link href={`#${id}`} className="flex items-center gap-2">
					{children}
					<LinkIcon
						size={16}
						className="text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100"
					/>
				</Link>
			</h2>
		)
	},
	h3: ({
		children,
		className,
		...props
	}: HTMLAttributes<HTMLHeadingElement>) => {
		const text = typeof children === "string" ? children : ""
		const id = text
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]/g, "")
		return (
			<h3
				className={cn(
					"scroll-mt-26 group mb-3 mt-6 flex items-center text-lg font-medium leading-7",
					className
				)}
				{...props}>
				<Link href={`#${id}`} className="flex items-center gap-2">
					{children}
					<LinkIcon
						size={16}
						className="text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100"
					/>
				</Link>
			</h3>
		)
	},
	a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a
			aria-label="Link"
			rel="noopener noreferrer"
			target="_blank"
			className={cn(
				"text-primary-text font-medium underline underline-offset-4 transition-colors duration-200",
				className
			)}
			{...props}
		/>
	),
	p: ({
		children,
		className,
		...props
	}: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-fg text-base leading-7", className)} {...props}>
			{children}
		</p>
	),
	strong: ({
		children,
		className,
		...props
	}: HTMLAttributes<HTMLBodyElement>) => (
		<strong className={cn("text-fg font-semibold", className)} {...props}>
			{children}
		</strong>
	),
	hr: () => <Divider orientation={"horizontal"} className="mt-10" />,

	ul: ({
		children,
		className,
	}: {
		children: React.ReactNode
		className?: string
	}) => {
		return (
			<ul
				className={cn(
					"my-6 ml-1 list-inside list-disc space-y-4 pb-6",
					className
				)}>
				{children}
			</ul>
		)
	},
	ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
		<ol
			className={cn(
				"marker:text-fg my-6 ml-6 list-decimal space-y-4 marker:font-bold",
				className
			)}
			{...props}
		/>
	),

	li: ({
		children,
		className,
	}: {
		children: React.ReactNode
		className?: string
	}) => {
		return <li className={cn("text-fg-secondary", className)}>{children}</li>
	},
	blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
		<blockquote
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		/>
	),

	Alert: (props: AlertProps) => {
		return <Alert variant="soft" color="warning" {...props} />
	},
	AlertIcon,
	AlertContent,
	AlertTitle,
	AlertDescription,

	Accordion: (props: AccordionProps) => {
		return <Accordion {...props} size="lg" variant="open" />
	},
	AccordionItem,
	AccordionTrigger: (props: AccordionTriggerProps) => {
		return <AccordionTrigger className="gap-2" {...props} />
	},
	AccordionContent,

	Tabs,
	TabsList: (props: React.ComponentProps<typeof TabsList>) => {
		return <TabsList width="full" variant="default" size="md" {...props} />
	},
	TabsTrigger,
	TabsContent,
	Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"mb-3 mt-6 scroll-m-20 text-lg font-medium first:mt-0 last:mb-0",
				"relative [counter-increment:step]",
				"before:absolute before:-left-10 before:top-0 before:flex before:size-7 before:items-center before:justify-center",
				"before:border-soft-alpha before:bg-elevation-level1 before:text-fg before:rounded-lg before:border before:text-sm before:font-medium",
				"before:content-[counter(step)]",
				className
			)}
			{...props}
		/>
	),
	Steps: ({ ...props }) => (
		<div
			className={cn(
				"border-dashed [counter-reset:step] md:ml-4 md:border-l-2 md:pl-6"
			)}
			{...props}
		/>
	),
	SocialLinkCards,
	Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
		<Link
			className={cn(
				"font-medium text-amber-300 underline underline-offset-4",
				className
			)}
			{...props}
		/>
	),
	Image: ({
		src,
		className,
		width,
		height,
		alt,
		...props
	}: React.ComponentProps<"img">) => (
		<Image
			unoptimized
			className={cn(
				"bg-fill2 border-soft mb-6 mt-4 rounded-2xl border-8 object-cover",
				className
			)}
			src={src || ""}
			width={Number(width)}
			height={Number(height)}
			alt={alt || ""}
			{...props}
			quality={85}
		/>
	),
	table: ({ className, ...props }: React.ComponentProps<"table">) => (
		<div className="no-scrollbar my-6 w-full overflow-y-auto rounded-xl border">
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
		<tr className={cn("m-0 border-b", className)} {...props} />
	),
	th: ({ className, ...props }: React.ComponentProps<"th">) => (
		<th
			className={cn(
				"px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.ComponentProps<"td">) => (
		<td
			className={cn(
				"whitespace-nowrap px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className
			)}
			{...props}
		/>
	),
	figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
		return <figure className={cn(className)} {...props} />
	},
	figcaption: ({ className, ...props }: React.ComponentProps<"figcaption">) => {
		const isCodeTitle = "data-language" in props

		return (
			<figcaption className={cn(className)} {...props}>
				{isCodeTitle && (
					<span className="bg-bg text-fg-tertiary rounded-md p-1">
						<TerminalIcon size={16} />
					</span>
				)}
				{props.children}
			</figcaption>
		)
	},
	pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
		return (
			<pre
				className={cn(
					"bg-bg no-scrollbar has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0 min-w-0 overflow-x-auto overflow-y-auto overscroll-y-auto overscroll-x-contain rounded-lg px-5 py-4 pb-5 outline-none",
					className
				)}
				{...props}>
				{children}
			</pre>
		)
	},
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
		// Inline Code.
		if (typeof props.children === "string") {
			return (
				<code
					className={cn(
						"bg-fill2 wrap-break-word relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none",
						className
					)}
					{...props}
				/>
			)
		}

		// npm command.
		const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__
		if (isNpmCommand) {
			return (
				<CodeBlockCommandServer
					__npm__={__npm__}
					__yarn__={__yarn__}
					__pnpm__={__pnpm__}
					__bun__={__bun__}
				/>
			)
		}

		// Default codeblock.
		return (
			<>
				{__raw__ && <CopyButton value={__raw__} src={__src__} />}
				<code className={cn(className)} {...props} />
			</>
		)
	},
	CodeCollapsibleWrapper,
}
