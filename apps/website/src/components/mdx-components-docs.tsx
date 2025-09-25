"use client"

import React, { HTMLAttributes, useMemo } from "react"
import { Link as LinkIcon, Moon, Settings, Sun } from "lucide-react"
import { getMDXComponent } from "mdx-bundler/client"
import Image from "next/image"
import Link from "next/link"
import AnimatedListPreview from "@/component-preview/animations/animated-list-preview"
import BorderBeamPreview from "@/component-preview/animations/border-beam-preview"
import ChangingTextPreview from "@/component-preview/animations/changing-text-preview"
import DraggablePreview from "@/component-preview/animations/draggable-preview"
import FadePreview from "@/component-preview/animations/fade-preview"
import GradientTextPreview from "@/component-preview/animations/gradient-text-preview"
import InfiniteScrollPreview from "@/component-preview/animations/infinite-scroll-preview"
import PointerPreview from "@/component-preview/animations/pointer-preview"
import TextRevealPreview from "@/component-preview/animations/text-reveal-preview"
import TypingTextPreview from "@/component-preview/animations/typing-text-preview"
import Installation from "@/components/installation"
import BodyFontSpecs from "@/components/typography/body-font-specs"
import HeadingFontSpecs from "@/components/typography/heading-font-specs"
import TypographyPlayground from "@/components/typography/typography-playground"
import { useTheme } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"
import BlurFadeExample from "@/registry/example/animated/blur-fade-example"
import CollaborationPointerExample from "@/registry/example/animated/collaboration-pointer-example"
import DragConstraintsExample from "@/registry/example/animated/drag-constraints-example"
import FadeOutExample from "@/registry/example/animated/fade-out-example"
import InfiniteScrollVerticalExample from "@/registry/example/animated/infinite-scroll-vertical"
import BadgeExamplePreview from "@/registry/example/badge/badge-strong-example"
import DatePickerPresetsExample from "@/registry/example/date-picker/date-picker-range-example"
import DatePickerWithTimeExample from "@/registry/example/date-picker/date-picker-with-time"
import Examples from "@/registry/example/example.json"
import ProgressPreview from "@/registry/example/progress/progress-preview"
import {
	Accordion,
	AccordionContent,
	AccordionContentProps,
	AccordionItem,
	AccordionItemProps,
	AccordionProps,
	AccordionTrigger,
	AccordionTriggerProps,
} from "@/registry/ui/accordion"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertProps, AlertTitle } from "@/registry/ui/alert"
import { Divider } from "@/registry/ui/divider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import CodeSnippet from "./code-snippet"
import ColorPlayground from "./color/color-playground"
import { ColorData, ColorTable } from "./color/color-table"
import { ComponentPreview } from "./component-preview"
import { ComponentSource } from "./component-source"
import FigmaCard from "./figma/figma-card"
import AlertLucide from "./icons/alert-lucide"
import PackageManagerTabs, { PackageManagerTabsProps } from "./package-manager-tabs"
import { PropsData, PropsTable } from "./props-table"
import SocialLinkCards from "./social-link-cards"
import CustomThemePlayground from "./theme/custom-theme-playground"
import DarkModePlayground from "./theme/dark-mode-playground"

type MdxProps = {
	code: string
	examples: typeof Examples
}

const components = (examples: typeof Examples | undefined) => ({
	PropsTable: ({ title, data, externalReference }: { title?: string; data: PropsData[]; externalReference?: string }) => (
		<PropsTable title={title} data={data} externalReference={externalReference} />
	),
	ColorTable: ({ data }: { data: ColorData[] }) => {
		const { isDark } = useTheme()
		return <ColorTable data={data} isDark={isDark} />
	},
	ColorTableThemeToggle: () => {
		const { isDark, toggleTheme } = useTheme()

		return (
			<div onClick={toggleTheme} className="bg-fill2 relative mb-2 flex h-8 cursor-pointer items-center rounded-md p-1 transition-all duration-300" style={{ width: "88px" }}>
				<div className={`bg-elevation-level2 absolute h-6 w-10 rounded-md shadow-sm transition-all duration-300 ease-out ${isDark ? "translate-x-10" : "translate-x-0"}`} />
				<div className="relative z-10 flex h-6 w-10 items-center justify-center">
					<Sun size={14} className="text-fg-secondary" />
				</div>
				<div className="relative z-10 flex h-6 w-10 items-center justify-center">
					<Moon size={14} className="text-fg-secondary" />
				</div>
			</div>
		)
	},
	ColorPlayground: () => <ColorPlayground />,
	PropsTableWrapper: ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
		<div className="bg-elevation-negative mt-3 flex flex-col gap-2 rounded-xl p-1.5">{children}</div>
	),
	Installation: () => <Installation />,
	BadgeExamplePreview: () => <BadgeExamplePreview />,
	TypographyPlayground: () => <TypographyPlayground />,
	DatePickerPresetsExample: () => <DatePickerPresetsExample />,
	DatePickerWithTimeExample: () => <DatePickerWithTimeExample />,
	HeadingFontSpecs: () => <HeadingFontSpecs />,
	BodyFontSpecs: () => <BodyFontSpecs />,
	DarkModePlayground: () => <DarkModePlayground />,
	CustomThemePlayground: () => <CustomThemePlayground />,
	AlertLucide: () => <AlertLucide />,
	// Animation components
	TypingTextPreview: () => <TypingTextPreview />,
	GradientTextPreview: () => <GradientTextPreview />,
	DraggablePreview: () => <DraggablePreview />,
	FadePreview: () => <FadePreview />,
	InfiniteScrollPreview: () => <InfiniteScrollPreview />,
	PointerPreview: () => <PointerPreview />,
	BorderBeamPreview: () => <BorderBeamPreview />,
	ChangingTextPreview: () => <ChangingTextPreview />,
	InfiniteScrollVerticalExample: () => <InfiniteScrollVerticalExample />,
	CollaborationPointerExample: () => <CollaborationPointerExample />,
	DragConstraintsExample: () => <DragConstraintsExample />,
	AnimatedListPreview: () => <AnimatedListPreview />,
	TextRevealPreview: () => <TextRevealPreview />,
	BlurFadeExample: () => <BlurFadeExample />,
	FadeOutExample: () => <FadeOutExample />,
	ProgressPreview: () => <ProgressPreview />,
	PackageManagerTabs: ({ commands, className, withIcon = false }: PackageManagerTabsProps) => (
		<PackageManagerTabs commands={commands} className={cn(className)} withIcon={withIcon} />
	),
	CodeSnippet: ({ code, title, showLineNumbers, collapsible }: { code: string; title: string; showLineNumbers: boolean; collapsible?: boolean }) => (
		<CodeSnippet code={code} title={title} showLineNumber={showLineNumbers} collapsible={collapsible} />
	),

	ComponentPreview: ({ path, height, align }: { path: string; height: number; align: "center" | "start" | "end" }) => {
		const code = examples?.[0]?.files.find((file) => file.name === path)?.content || ""

		return <ComponentPreview path={path} code={code} height={height} align={align} />
	},

	ComponentSource: ({ name, title, collapsible }: { name: string; title: string; collapsible: boolean }) => <ComponentSource name={name} title={title} collapsible={collapsible} />,
	// AlertLucide: () => <AlertLucide />,
	FigmaCard: () => <FigmaCard />,
	h1: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className={cn("heading-4", className)} {...props}>
			{children}
		</h1>
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
		const text = typeof children === "string" ? children : ""
		const id = text
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]/g, "")
		return (
			<h2 className={cn("heading-5 font-semibold! group mb-3 mt-10 flex scroll-mt-20 items-center", className)} {...props}>
				<Link href={`#${id}`} className="flex items-center gap-2">
					{children}
					<LinkIcon size={16} className="text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
				</Link>
			</h2>
		)
	},
	h3: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
		const text = typeof children === "string" ? children : ""
		const id = text
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]/g, "")
		return (
			<h3 className={cn("group mb-3 mt-6 flex scroll-mt-20 items-center text-lg font-medium leading-7", className)} {...props}>
				<Link href={`#${id}`} className="flex items-center gap-2">
					{children}
					<LinkIcon size={16} className="text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
				</Link>
			</h3>
		)
	},
	a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a
			aria-label="Link"
			rel="noopener noreferrer"
			target="_blank"
			className={cn("text-primary hover:text-primary-hover font-medium underline underline-offset-4 transition-colors duration-200", className)}
			{...props}
		/>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-fg-secondary", className)} {...props}>
			{children}
		</p>
	),
	strong: ({ children, className, ...props }: HTMLAttributes<HTMLBodyElement>) => (
		<strong className={cn("text-fg font-semibold", className)} {...props}>
			{children}
		</strong>
	),
	hr: () => <Divider orientation={"horizontal"} className="mt-10" />,

	ul: ({ children, className }: { children: React.ReactNode; className?: string }) => {
		return <ul className={cn("list-disc space-y-4 pb-6", className)}>{children}</ul>
	},
	ol: ({ className, ...props }: React.ComponentProps<"ol">) => <ol className={cn("marker:text-fg my-6 ml-6 list-decimal space-y-4 marker:font-bold", className)} {...props} />,

	li: ({ children, className }: { children: React.ReactNode; className?: string }) => {
		return <li className={cn("text-fg-secondary", className)}>{children}</li>
	},
	blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />,

	code: ({ className, ...props }: React.ComponentProps<"code">) => <code className={cn("bg-fill4 break-words rounded-md p-1 font-mono outline-none", className)} {...props} />,

	Alert: (props: AlertProps) => {
		return <Alert variant="soft" color="primary" {...props} />
	},
	AlertIcon: () => {
		return (
			<AlertIcon>
				<Settings className="size-5" />
			</AlertIcon>
		)
	},
	AlertContent: (props: React.ComponentProps<typeof AlertContent>) => {
		return <AlertContent {...props} />
	},
	AlertTitle: (props: React.ComponentProps<typeof AlertTitle>) => {
		return <AlertTitle {...props} />
	},
	AlertDescription: (props: React.ComponentProps<typeof AlertDescription>) => {
		return <AlertDescription {...props} />
	},

	Accordion: (props: AccordionProps) => {
		return <Accordion {...props} size="lg" variant="open" />
	},
	AccordionItem: (props: AccordionItemProps) => {
		return <AccordionItem {...props} />
	},
	AccordionTrigger: (props: AccordionTriggerProps) => {
		return <AccordionTrigger {...props} />
	},
	AccordionContent: (props: AccordionContentProps) => {
		return <AccordionContent {...props} />
	},
	Tabs: (props: React.ComponentProps<typeof Tabs>) => {
		return <Tabs {...props} />
	},
	TabsList: (props: React.ComponentProps<typeof TabsList>) => {
		return <TabsList width="full" variant="default" size="md" {...props} />
	},
	TabsTrigger: (props: React.ComponentProps<typeof TabsTrigger>) => {
		return <TabsTrigger {...props} />
	},
	TabsContent: (props: React.ComponentProps<typeof TabsContent>) => {
		return <TabsContent {...props} />
	},
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
	Steps: ({ ...props }) => <div className={cn("border-dashed [counter-reset:step] md:ml-4 md:border-l-2 md:pl-6")} {...props} />,
	SocialLinkCards: () => <SocialLinkCards />,
	Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => <Link className={cn("font-medium text-amber-300 underline underline-offset-4", className)} {...props} />,
	LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
		<Link
			className={cn("bg-card text-card-foreground hover:bg-muted/50 flex w-full flex-col items-center rounded-xl border p-6 shadow transition-colors sm:p-10", className)}
			{...props}
		/>
	),
	Image: ({ src, className, width, height, alt, ...props }: React.ComponentProps<"img">) => (
		<Image
			unoptimized
			className={cn("bg-fill2 border-soft mb-6 mt-4 rounded-2xl border-8 object-cover", className)}
			src={src || ""}
			width={Number(width)}
			height={Number(height)}
			alt={alt || ""}
			{...props}
			quality={85}
		/>
	),
})

/**
 * @returns A React component that renders an error message
 */

function ErrorComponent() {
	return <div className="text-error-text">Error rendering content</div>
}

/**
 * Mdx component to render MDX content
 * @param code - The MDX code to render
 * @returns A React component that renders the MDX content
 */

export function Mdx({ code, examples }: MdxProps) {
	const Component = useMemo(() => {
		if (!code) return () => null
		try {
			return getMDXComponent(code)
		} catch (error) {
			console.log(error)
			return ErrorComponent
		}
	}, [code])

	return <Component components={components(examples)} />
}
