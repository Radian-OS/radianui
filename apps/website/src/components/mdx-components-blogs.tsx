"use client"

import { HTMLAttributes, useMemo } from "react"

import { Box } from "lucide-react"
import { getMDXComponent } from "mdx-bundler/dist/client"
import { MDXComponents } from "mdx/types"
import Image from "next/image"

import CodeSnippet from "@/components/code-snippet"
import PackageManagerTabs, { PackageManagerTabsProps } from "@/components/package-manager-tabs"
import { cn } from "@/lib/utils"
import { Alert } from "@/registry/ui/alert"

type MdxBlogProps = {
	code: string
}

const BlogComponents: MDXComponents = {
	CodeSnippet: ({ code, title, showLineNumbers }: { code: string; title: string; showLineNumbers: boolean }) => (
		<CodeSnippet className="my-5" code={code} title={title} showLineNumber={showLineNumbers} />
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("heading-5 font-semibold! py-5 pt-10", className)} {...props}>
			{children}
		</h2>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-fg-secondary", className)} {...props}>
			{children}
		</p>
	),
	Image: ({ src, alt, className, ...props }: { src: string; alt?: string; className?: string } & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "className">) => (
		<Image src={src} alt={alt || ""} className={cn("max-w-200 max-h-100 my-5 h-full w-full rounded-lg object-cover", className)} height={500} width={500} {...props} />
	),
	Alert: ({ children, className }: HTMLAttributes<HTMLDivElement>) => (
		<Alert icon={<Box className="size-5" />} color="neutral" variant="bordered" className={cn("text-fg-secondary my-5 text-sm", className)}>
			{children}
		</Alert>
	),
	MessageBox: ({ title, message }: { title?: string; message?: string }) => (
		<Alert className="my-5" color="warning" variant="default" icon={<Box className="size-5" />} title={title} message={message} />
	),
	PackageManagerTabs: ({ commands, className, withIcon = true }: PackageManagerTabsProps) => (
		<div className="my-5">
			<PackageManagerTabs commands={commands} className={className} withIcon={withIcon} />
		</div>
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

export function MdxBlog({ code }: MdxBlogProps) {
	const Component = useMemo(() => {
		if (!code) return () => null
		try {
			return getMDXComponent(code)
		} catch (error) {
			console.log(error)
			return ErrorComponent
		}
	}, [code])

	return <Component className="flex flex-col gap-12" components={BlogComponents} />
}
