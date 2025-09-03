import { useState } from "react"
import { Check, Clipboard, EyeIcon, SquareTerminal, Terminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export function useCopyPaste(code: string) {
	const [copied, setCopied] = useState(false)

	const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		navigator.clipboard.writeText(code)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 1500)
	}

	return { copied, copy }
}

const code = `
function foobar() {
    console.log('Foo Bar');
}`

export default function CodeWithCopyExample() {
	const { copied, copy } = useCopyPaste(code)

	return (
		<Tabs className="mt-3" defaultValue="preview" variant="outline-ghost">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] w-full flex-col items-center justify-center overflow-auto rounded-xl border p-5">
					<div className={cn("bg-fill2 flex w-full flex-col gap-2 rounded-xl p-1.5")}>
						<div className="inline-flex items-center gap-3 px-1 py-0.5">
							<span className="bg-bg text-fg-tertiary rounded-md p-1">
								<Terminal className="size-4" />
							</span>
							<span className="text-fg-secondary flex-1 text-sm">Code area with copy button</span>
							<Button variant="ghost" color="neutral" size={"28"} iconOnly aria-label="Copy command" onClick={copy}>
								{copied ? <Check size={20} /> : <Clipboard size={20} />}
							</Button>
						</div>
						<CodeArea language="tsx" theme="github-dark-high-contrast" code={code} className={cn("border-soft flex-1 rounded-[10px] border")} />
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code" className="p-0">
				<CodeSnippet
					title="avatar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CodeArea } from "@/components/ui/code-area"
import { Check, Clipboard, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

export function useCopyPaste(code: string) {
	const [copied, setCopied] = useState(false)

	const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		navigator.clipboard.writeText(code)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 1500)
	}

	return { copied, copy }
}

const code = \`
function foobar() {
    console.log('Foo Bar');
}\`

export default function CodeWithCopyExample() {
	const { copied, copy } = useCopyPaste(code)	

	return (
		<div className={cn("bg-fill2 flex w-full flex-col gap-2 rounded-xl p-1.5")}>
			<div className="inline-flex items-center gap-3 px-1 py-0.5">
				<span className="bg-bg text-fg-tertiary rounded-md p-1">
					<Terminal className="size-4" />
				</span>
				<span className="text-fg-secondary flex-1 text-sm">Code area with copy button</span>
				<Button variant="ghost" color="neutral" size={"28"} iconOnly aria-label="Copy command" onClick={copy}>
					{copied ? <Check size={20} /> : <Clipboard size={20} />}
				</Button>
			</div>
			<CodeArea language="tsx" theme="github-dark-high-contrast" code={code} className={cn("border-soft flex-1 rounded-[10px] border")} />
		</div>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
