"use client"

import { HTMLAttributes, useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { MDXComponents } from "mdx/types"
import AccordionPreview from "@/component-preview/accordion-preview"
import AlertPreview from "@/component-preview/alert-preview"
import AvatarPreview from "@/component-preview/avatar-preview"
import AvatargroupPreview from "@/component-preview/avatargroup-preview"
import BadgePreview from "@/component-preview/badge-preview"
import BannerPreview from "@/component-preview/banner-preview"
import BreadCrumbPreview from "@/component-preview/breadcrumb-preview"
import ButtonGroupPreview from "@/component-preview/button-group-preview"
import ButtonPreview from "@/component-preview/button-preview"
import CheckboxgroupPreview from "@/component-preview/checkbox-group-preview"
import CheckboxPreview from "@/component-preview/checkbox-preview"
import CodeAreaPreview from "@/component-preview/code-area-preview"
import DividerPreview from "@/component-preview/divider-preview"
import DrawerPreview from "@/component-preview/drawer-preview"
import DropdownPreview from "@/component-preview/dropdown-preview"
import HovercardPreview from "@/component-preview/hover-card-preview"
import ModalPreview from "@/component-preview/modal-preview"
import PaginationPreview from "@/component-preview/pagination-preview"
import PopoverPreview from "@/component-preview/popover-preview"
import RadiogroupPreview from "@/component-preview/radio-group-preview"
import ResizablePreview from "@/component-preview/resizable-preview"
import SonnerPreview from "@/component-preview/sonner-preview"
import TablePreview from "@/component-preview/table-preview"
import TabsPreview from "@/component-preview/tabs-preview"
import TooltipPreview from "@/component-preview/tooltip-preview"
import Cli from "@/components/cli"
import DisplayColor from "@/components/display-color"
import Installation from "@/components/installation"
import Manual from "@/components/manual"
import Nextjs from "@/components/nextjs"
import PackageManagerTabs from "@/components/package-manager-tab"
import { cn } from "@/lib/utils"
import { CodeArea, CodeAreaProps } from "@/registry/ui/code"
import { FrameworkDocs } from "./framework-docs"
import Link from "next/link"
import SocialButtonPreview from "@/component-preview/social-button-preview"
import InputPreview from "@/component-preview/input-preview"

type MdxProps = {
	code: string
}

const components: MDXComponents = {
	AccordionPreview: () => <AccordionPreview />,
	AlertPreview: () => <AlertPreview />,
	AvatarPreview: () => <AvatarPreview />,
	AvatargroupPreview: () => <AvatargroupPreview />,
	BadgePreview: () => <BadgePreview />,
	BreadCrumbPreview: () => <BreadCrumbPreview />,
	BannerPreview: () => <BannerPreview />,
	CheckboxPreview: () => <CheckboxPreview />,
	CheckboxgroupPreview: () => <CheckboxgroupPreview />,
	DividerPreview: () => <DividerPreview />,
	ButtonPreview: () => <ButtonPreview />,
	ButtonGroupPreview: () => <ButtonGroupPreview />,
	ModalPreview: () => <ModalPreview />,
	TooltipPreview: () => <TooltipPreview />,
	CodeAreaPreview: () => <CodeAreaPreview />,
	SonnerPreview: () => <SonnerPreview />,
	PaginationPreview: () => <PaginationPreview />,
	PopoverPreview: () => <PopoverPreview />,
	TablePreview: () => <TablePreview />,
	DrawerPreview: () => <DrawerPreview />,
	RadiogroupPreview: () => <RadiogroupPreview />,
	DisplayColor: () => <DisplayColor />,
	HovercardPreview: () => <HovercardPreview />,
	TabsPreview: () => <TabsPreview />,
	DropdownPreview: () => <DropdownPreview />,
	ResizablePreview: () => <ResizablePreview />,
	Nextjs: () => <Nextjs />,
	Cli: () => <Cli />,
	Installation: () => <Installation />,
	Manual: () => <Manual />,
	SocialButtonPreview: () => <SocialButtonPreview />,
	InputPreview: () => <InputPreview />,
	Code: ({
		language,
		pkg = ["pnpm", "yarn", "npm", "bun"],
		tabs = false,
		code,
		showLineNumbers,
		copiable = true,
		className,
		...props
	}: CodeAreaProps) =>
		tabs ? (
			<PackageManagerTabs language={language} pkg={pkg} code={code} />
		) : (
			<CodeArea language={language} code={code} showLineNumbers={showLineNumbers} copiable={copiable} className={cn("", className)} {...props} />
		),
	h1: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className={cn("heading-1", className)} {...props}>
			{children}
		</h1>
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("heading-2", className)} {...props}>
			{children}
		</h2>
	),
	h3: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className={cn("heading-3", className)} {...props}>
			{children}
		</h3>
	),
	h4: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h4 className={cn("heading-4", className)} {...props}>
			{children}
		</h4>
	),
	h5: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h5 className={cn("heading-5 mt-9 mb-4 font-semibold!", className)} {...props}>
			{children}
		</h5>
	),
	h6: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h6 className={cn("heading-6", className)} {...props}>
			{children}
		</h6>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-primary-foreground text-base", className)} {...props}>
			{children}
		</p>
	),
	table: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
		<div className="no-scrollbar overflow-x-scroll">
			<table className={cn("border-border w-full table-auto border", className)} {...props}>
				{children}
			</table>
		</div>
	),
	th: ({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
		<th className={cn("border-border border px-3 py-2.5 text-left text-sm font-semibold", className)} {...props}>
			{children}
		</th>
	),
	tr: ({ children, className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={cn("border-border border", className)} {...props}>
			{children}
		</tr>
	),
	td: ({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
		<td className={cn("border-border border px-3 py-2.5 text-sm", className)} {...props}>
			{children}
		</td>
	),
	ul: ({ children }: { children?: React.ReactNode }) => (
		<ul className="[&>li>strong]:text-text-secondary mt-2 ml-4 flex list-disc flex-col gap-2 [&>li>strong]:font-medium">{children}</ul>
	),
	Preview: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
		<div className={cn("mb-5 flex min-h-[30rem] items-center justify-center rounded-lg border p-10", className)} {...props}>
			<div className="w-full">{children}</div>
		</div>
	),
	Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"step relative mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				"before:absolute before:left-[-2.9rem] before:top-1/2 before:-translate-y-1/2",
				"before:flex before:h-7 before:w-7 before:items-center before:justify-center",
				"before:rounded-full before:bg-gray-200 before:text-sm before:font-medium before:text-gray-800",
				"before:content-[counter(step)] before:counter-increment-[step]",
				className
			)}
			{...props}
		/>
	),
	Steps: ({ ...props }) => (
		<div
			className="[&>h3]:step steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8"
			{...props}
		/>
	),
	FrameworkDocs: ({
		className,
		...props
	}: React.ComponentProps<typeof FrameworkDocs>) => (
		<FrameworkDocs className={cn(className)} {...props} />
	),
	Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
		<Link
			className={cn("font-medium underline underline-offset-4", className)}
			{...props}
		/>
	),
	LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
		<Link
			className={cn(
				"flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
				className
			)}
			{...props}
		/>
	),
}

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

export function Mdx({ code }: MdxProps) {
	const Component = useMemo(() => {
		if (!code) return () => null
		try {
			return getMDXComponent(code)
		} catch (error) {
			console.log(error)
			return ErrorComponent
		}
	}, [code])

	return <Component className="flex flex-col gap-12" components={components} />
}
