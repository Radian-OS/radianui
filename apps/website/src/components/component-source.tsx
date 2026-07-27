import components from "@public/r/styles/default.json"
import fs from "fs/promises"
import { TerminalIcon } from "lucide-react"
import path from "path"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { formatCode } from "@/lib/format-code"
import { highlightCode } from "@/lib/highligh-code"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

type ComponentSourceProps = {
	name?: string
	src?: string
	code?: string
	title?: string
	collapsible?: boolean
	className?: string
	language?: string
	codeAreaClassName?: string
}

async function ComponentSource({
	name,
	src,
	code,
	title,
	collapsible = true,
	language,
	className,
	codeAreaClassName,
}: ComponentSourceProps) {
	if (!code) {
		if (name) {
			// TODO: This can be replaced by reading from the registry-map.ts file

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const component = components.find((comp: any) => comp.name === name)

			if (!component) {
				throw new Error(`Component "${name}" not found in registry`)
			}

			// Get the first file's content (most components have one file)
			code = component.files[0]?.content
		}

		if (src) {
			code = await fs.readFile(path.join(process.cwd(), "src", src), "utf-8")
		}

		if (!code) {
			return null
		}
	}

	code = formatCode(code)

	const lang = language ?? title?.split(".").pop() ?? "tsx"
	const highlightedCode = await highlightCode(code, lang)

	if (!collapsible) {
		return (
			<div className={cn("relative", className)}>
				<ComponentCode
					code={code}
					language={lang}
					title={title}
					highlightedCode={highlightedCode}
					codeAreaClassName={cn("!p-0", codeAreaClassName)}
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
				codeAreaClassName={codeAreaClassName}
			/>
		</CodeCollapsibleWrapper>
	)
}

function ComponentCode({
	highlightedCode,
	title,
	code,
	language,
	codeAreaClassName,
}: {
	code: string
	language: string
	highlightedCode: string
	title?: string
	codeAreaClassName?: string
}) {
	return (
		<figure
			data-rehype-pretty-code-figure=""
			className={cn("[&>pre]:max-h-100 p-2", codeAreaClassName)}>
			{title && (
				<figcaption data-rehype-pretty-code-title="" data-language={language}>
					<span className="bg-bg text-fg-tertiary rounded-md p-1">
						<TerminalIcon size={16} />
					</span>
					{title}
				</figcaption>
			)}
			<CopyButton value={code} />
			<div
				className={cn(
					"bg-bg border-soft rounded-[10px] border",
					codeAreaClassName
				)}
				dangerouslySetInnerHTML={{ __html: highlightedCode }}
			/>
		</figure>
	)
}

export { ComponentSource }
