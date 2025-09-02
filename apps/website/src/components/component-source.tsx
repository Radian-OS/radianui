import { Check, Clipboard, Terminal } from "lucide-react"
import { useTheme } from "next-themes"
import components from "@/app/api/components/components.json"
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const component = components.find((comp: any) => comp.name === name)

	if (!component) {
		throw new Error(`Component "${name}" not found in registry`)
	}

	// Get the first file's content (most components have one file)
	const code = component.files[0]?.content

	if (!code) {
		throw new Error(`No source code found for component "${name}"`)
	}

	const { copied, copy } = useCopyPaste({
		code,
		eventName: "block_cli_copy",
		title: "CodeSnippet",
		category: "CodeSnippet",
	})

	return (
		<div className={cn("bg-fill2 flex flex-col gap-2 rounded-xl p-1.5", className)}>
			<div className="inline-flex items-center gap-3 px-1 py-0.5">
				<span className="bg-bg text-fg-tertiary rounded-md p-1">
					<Terminal className="size-4" />
				</span>
				<span className="text-fg-secondary flex-1 text-sm">{title}</span>
				<Button variant="ghost" color="neutral" size={"28"} iconOnly aria-label="Copy command" onClick={copy}>
					{copied ? <Check size={20} /> : <Clipboard size={20} />}
				</Button>
			</div>
			{collapsible && (
				<CodeCollapsibleWrapper>
					<CodeArea
						language="tsx"
						theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
						code={code}
						lineNumbers={true}
						className={cn("border-soft flex-1 rounded-[10px] border", className)}
					/>
				</CodeCollapsibleWrapper>
			)}
			{!collapsible && (
				<CodeArea
					language="tsx"
					theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
					code={code}
					lineNumbers={true}
					className={cn("border-soft flex-1 rounded-[10px] border", className)}
				/>
			)}
		</div>
	)
}

export { ComponentSource }
