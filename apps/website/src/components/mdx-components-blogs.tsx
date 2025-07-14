"use client"

import { HTMLAttributes, useMemo } from "react"
import { Box } from "lucide-react"
import { getMDXComponent } from "mdx-bundler/dist/client"
import { MDXComponents } from "mdx/types"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Alert } from "@/registry/ui/alert"
import CommandLineTabs, { InstallMode } from "./cli-tabs"
import CodeSnippet from "./code-snippet"

type MdxBlogProps = {
	code: string
}

const BlogComponents: MDXComponents = {
	CodeSnippet: ({ code, title, showLineNumbers }: { code: string; title: string; showLineNumbers: boolean }) => (
		<CodeSnippet className="my-5" code={code} title={title} showLineNumber={showLineNumbers} />
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("heading-5 font-semibold! pb-4 pt-10", className)} {...props}>
			{children}
		</h2>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-text-secondary text-base", className)} {...props}>
			{children}
		</p>
	),
	Image: ({ src, alt, className, ...props }: { src: string; alt?: string; className?: string } & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "className">) => (
		<Image src={src} alt={alt || ""} className={cn("max-w-200 max-h-100 my-5 h-full w-full rounded-lg object-cover", className)} height={500} width={500} {...props} />
	),
	Alert: ({ children, className }: HTMLAttributes<HTMLDivElement>) => (
		<Alert icon={<Box className="size-5" />} color="neutral" variant="bordered" className={cn("text-text-secondary my-5 text-sm", className)}>
			{children}
		</Alert>
	),
	MessageBox: ({ title, message }: { title?: string; message?: string }) => (
		<Alert color="warning" variant="default" icon={<Box className="size-5" />} title={title} message={message} />
	),
	CLI: ({ code, mode = "execute" }: { code: string; mode: InstallMode }) => {
		return (
			<div className="mb-6">
				<CommandLineTabs icon mode={mode} code={code} />
			</div>
		)
	},
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
