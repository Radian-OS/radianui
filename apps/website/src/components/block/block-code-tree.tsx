import { Menu } from "lucide-react"
import CodeTreeContextProvider from "@/contexts/code-tree-context"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/button"
import { FileTreeNode, FileTreeWrapper, FlatFile } from "../file-tree-wrapper"
import { BlockCode } from "./block-code"

export function BlockCodeTree({
	mappedFiles,
	nodes,
	showLeftOverlay,
	setShowLeftOverlay,
	highlightedFiles,
}: {
	mappedFiles: FlatFile[]
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
		<CodeTreeContextProvider
			initialSelectedFile={{
				...mappedFiles[0],
			}}>
			<div className="bg-fill2 md:border-soft-alpha h-200 w-full overflow-scroll rounded-2xl p-0 md:border md:p-2">
				<div className="bg-bg border-soft-alpha relative flex h-full w-full overflow-hidden rounded-2xl border">
					<div
						className={cn(
							"bg-bg border-r-soft-alpha absolute left-0 top-0 z-40 block h-full min-w-[280px] border-r transition-all duration-300 ease-out",
							{
								"-translate-x-full": !showLeftOverlay,
								"translate-x-0 shadow-xl": showLeftOverlay,
							}
						)}
						onClick={(e) => e.stopPropagation()}>
						<div className="h-13 border-soft-alpha text-fg-secondary flex items-center gap-2.5 border-b px-4 py-3">
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
		</CodeTreeContextProvider>
	)
}
