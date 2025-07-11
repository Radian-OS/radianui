"use client"

import { HTMLAttributes, useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/dist/client"
import { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"
import CodeSnippet from "./code-snippet"

type MdxBlogProps = {
	code: string
}

const BlogComponents: MDXComponents = {
	CodeSnippet: ({ code, title, showLineNumbers }: { code: string; title: string; showLineNumbers: boolean }) => (
		<CodeSnippet className="mb-5" code={code} title={title} showLineNumber={showLineNumbers} />
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("heading-5 font-semibold! mb-4", className)} {...props}>
			{children}
		</h2>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-text-secondary mb-5 text-base", className)} {...props}>
			{children}
		</p>
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
