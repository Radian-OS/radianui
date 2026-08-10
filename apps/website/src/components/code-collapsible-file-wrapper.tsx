import fs from "fs/promises"
import { TerminalIcon } from "lucide-react"
import path from "path"
import { highlightCode } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"
import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper"
import { CopyButton } from "./copy-button"

export async function CodeCollapsibleFileWrapper({
	file = "globals.css",
	language = "css",
	title,
	className,
}: {
	file?: string
	language?: string
	title?: string
	className?: string
}) {
	const filePath = path.join(process.cwd(), "public", "css", file)
	const code = await fs.readFile(filePath, "utf-8")
	const highlightedCode = await highlightCode(code, language)

	return (
		<CodeCollapsibleWrapper>
			<figure data-rehype-pretty-code-figure="" className={cn(className)}>
				<figcaption data-rehype-pretty-code-title="" data-language={language}>
					<span className="bg-bg text-fg-tertiary rounded-md p-1">
						<TerminalIcon size={16} />
					</span>
					{title ?? file}
				</figcaption>
				<CopyButton value={code} />
				<div
					className="bg-bg border-soft rounded-xl border"
					dangerouslySetInnerHTML={{ __html: highlightedCode }}
				/>
			</figure>
		</CodeCollapsibleWrapper>
	)
}
