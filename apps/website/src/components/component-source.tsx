"use client"

import React, { useEffect, useState } from "react"
import { Check, CopyIcon, Terminal } from "lucide-react"
import { useTheme } from "next-themes"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"

type ComponentSourceProps = {
	name: string
	title: string
	collapsible?: boolean
	className?: string
}

function ComponentSource({ name, title, collapsible = true, className }: ComponentSourceProps) {
	const { theme } = useTheme()
	const [code, setCode] = useState<string>("")
	const { copied, copy } = useCopyPaste({
		code,
		eventName: "block_cli_copy",
		title: "CodeSnippet",
		category: "CodeSnippet",
	})

	async function fetchComponentCode() {
		try {
			const response = await fetch("/api/components")

			if (!response.ok) {
				throw new Error(`Failed to fetch components: ${response.statusText}`)
			}

			const components = await response.json()

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const component = components.find((comp: any) => comp.name === name)

			if (!component) {
				throw new Error(`Component "${name}" not found in registry`)
			}

			// Get the first file's content (most components have one file)
			const fileContent = component.files[0]?.content

			if (!fileContent) {
				throw new Error(`No source code found for component "${name}"`)
			}

			setCode(fileContent)
		} catch (err) {
			throw new Error(err instanceof Error ? err.message : "Failed to load component source code")
		}
	}

	useEffect(() => {
		if (name) {
			fetchComponentCode()
		}
	}, [name])

	return (
		<div className={cn("bg-fill2 flex flex-col gap-2 rounded-xl p-1.5", className)}>
			<div className="inline-flex items-center gap-3 px-1 py-0.5">
				<span className="bg-base text-fg-tertiary rounded-md p-1">
					<Terminal className="size-4" />
				</span>
				<span className="text-fg-secondary flex-1 text-sm">{title}</span>
				<Button variant="ghost" color="neutral" size={"28"} iconOnly aria-label="Copy command" onClick={copy}>
					{copied ? <Check /> : <CopyIcon />}
				</Button>
			</div>
			{collapsible && (
				<CodeCollapsibleWrapper>
					<CodeArea
						language="tsx"
						theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
						code={code}
						copiable={false}
						showLineNumbers={true}
						className={cn("border-soft flex-1 rounded-[10px] border", className)}
					/>
				</CodeCollapsibleWrapper>
			)}
			{!collapsible && (
				<CodeArea
					language="tsx"
					theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
					code={code}
					copiable={false}
					showLineNumbers={true}
					className={cn("border-soft flex-1 rounded-[10px] border", className)}
				/>
			)}
		</div>
	)
}

export { ComponentSource }
