import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/button"
import { FileTreeNode, FileTreeWrapper } from "../file-tree-wrapper"
import { BlockCode } from "./block-code"

export function BlockCodeTree({
	nodes,
	showLeftOverlay,
	setShowLeftOverlay,
	highlightedFiles,
}: {
	nodes: FileTreeNode[]
	showLeftOverlay: boolean
	setShowLeftOverlay: React.Dispatch<React.SetStateAction<boolean>>
	highlightedFiles: Array<{
		path: string
		target?: string
		content: string
		highlightedContent: string
	}>
}) {
	return (
		<div className="bg-fill2 h-200 w-full overflow-hidden rounded-xl">
			<div className="bg-bg border-soft-alpha relative flex h-full w-full overflow-hidden rounded-xl border">
				<div
					className={cn(
						"bg-bg border-r-soft-alpha absolute top-0 left-0 z-40 block h-full min-w-[280px] border-r transition-all duration-300 ease-out",
						{
							"-translate-x-full": !showLeftOverlay,
							"translate-x-0 shadow-xl": showLeftOverlay,
						}
					)}
					onClick={(e) => e.stopPropagation()}>
					<div className="border-soft-alpha text-fg-secondary flex h-13 items-center gap-2.5 border-b px-4 py-3">
						<IconButton
							variant="ghost"
							color="neutral"
							onClick={() => {
								setShowLeftOverlay(false)
							}}>
							<Menu />
						</IconButton>

						<span className="text-sm">Files</span>
					</div>
					<FileTreeWrapper
						setShowLeftOverlay={setShowLeftOverlay}
						nodes={nodes}
					/>
				</div>
				<BlockCode
					setShowLeftOverlay={setShowLeftOverlay}
					highlightedFiles={highlightedFiles}
				/>
			</div>
		</div>
	)
}
