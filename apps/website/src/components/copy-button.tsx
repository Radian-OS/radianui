import { Check, Clipboard } from "lucide-react"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { Button } from "@/registry/ui/button"

export function CopyButton({ src }: { value: string; src: string }) {
	const { copied, copy } = useCopyPaste({
		code: src,
		eventName: "block_cli_copy",
		title: "Code",
		category: "CodeSnippet",
	})
	return (
		<Button variant="ghost" color="neutral" size={"28"} aria-label="Copy command" onClick={copy}>
			{copied ? <Check size={20} /> : <Clipboard size={20} />}
		</Button>
	)
}
