import { TerminalIcon } from "lucide-react"
import components from "@/app/api/components/components.json"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { highlightCode } from "@/lib/highligh-code"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

type ComponentSourceProps = {
	name: string
	title: string
	collapsible?: boolean
	className?: string
	language?: string
}

async function ComponentSource({
	name,
	title,
	collapsible = true,
	language,
	className,
}: ComponentSourceProps) {
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

	const lang = language ?? title?.split(".").pop() ?? "tsx"
	const highlightedCode = await highlightCode(code)

	if (!collapsible) {
		return (
			<div className={cn("relative", className)}>
				<ComponentCode
					code={code}
					language={lang}
					title={title}
					highlightedCode={highlightedCode}
				/>
			</div>
		)
	}

	return (
		<CodeCollapsibleWrapper>
			<ComponentCode
				code={code}
				title={title}
				language={lang}
				highlightedCode={highlightedCode}
			/>
		</CodeCollapsibleWrapper>
	)
}

function ComponentCode({
	highlightedCode,
	title,
	code,
	language,
}: {
	code: string
	language: string
	highlightedCode: string
	title?: string
}) {
	return (
		<figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
			<figcaption data-rehype-pretty-code-title="" data-language={language}>
				{title && (
					<>
						<span className="bg-bg text-fg-tertiary rounded-md p-1">
							<TerminalIcon size={16} />
						</span>
						{title}
					</>
				)}
			</figcaption>
			<CopyButton value={code} />
			<div
				className="bg-bg border-soft rounded-xl border"
				dangerouslySetInnerHTML={{ __html: highlightedCode }}
			/>
		</figure>
	)
}

export { ComponentSource }
