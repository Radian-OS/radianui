import { Menu } from "lucide-react"
import { useCodeTreeContext } from "@/contexts/code-tree-context"
import { IconButton } from "@/registry/ui/button"

export function BlockCode({
	setShowLeftOverlay,
	highlightedFiles,
}: {
	setShowLeftOverlay: React.Dispatch<React.SetStateAction<boolean>>
	highlightedFiles: Array<{
		path: string
		target?: string
		content: string
		highlightedContent: string
	}>
}) {
	const { selectedFile } = useCodeTreeContext()
	// const { copy, copied } = useClipboard(selectedFile?.content || "")

	return (
		<div className="flex min-w-0 flex-1 flex-col overflow-hidden">
			<div className="border-soft-alpha flex h-13 items-center justify-between border-b px-4 py-3">
				<div className="text-fg-secondary flex items-center gap-2.5">
					<IconButton
						variant="ghost"
						color="neutral"
						onClick={(e) => {
							e.stopPropagation()

							setShowLeftOverlay(true)
						}}>
						<Menu />
					</IconButton>

					<span className="text-sm">{selectedFile?.path}</span>
				</div>
				{/* <IconButton variant="ghost" color="neutral" onClick={copy}>
					{copied ? <Check /> : <Clipboard />}
				</IconButton> */}
			</div>
			<div className="flex-1 overflow-x-auto">
				{selectedFile && (
					<div
						className="bg-bg h-full"
						dangerouslySetInnerHTML={{
							__html:
								highlightedFiles.find((file) => file.path === selectedFile.path)
									?.highlightedContent || "",
						}}
					/>
				)}
			</div>
		</div>
	)
}
