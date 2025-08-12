import React from "react"
import { EyeIcon, MousePointer2, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Pointer } from "@/registry/animated/pointer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function CollaborationPointerExample() {
	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} className="mb-10">
			<div className="flex items-center justify-start">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
					<div className="w-100 bg-fill2 flex h-80 items-center justify-center rounded-lg border">
						<span>Collaboration Pointer Example</span>
						<Pointer>
							<div className="w-18 relative h-12">
								<MousePointer2 size={25} className="absolute left-0 top-0 translate-x-0.5 fill-green-500 stroke-green-500" />
								<span className="absolute bottom-0 right-0 rounded-md bg-green-500 px-2 py-1 text-sm text-white">John</span>
							</div>
						</Pointer>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="collaboration-pointer-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="w-100 bg-fill2 flex h-80 items-center justify-center rounded-lg border">
    <span>Collaboration Pointer Example</span>
    <Pointer>
        <div className="w-18 relative h-12">
            <MousePointer2 size={25} className="absolute left-0 top-0 fill-green-600 stroke-green-600" />
            <span className="absolute bottom-0 right-0 rounded-md bg-green-600 px-2 py-1 text-sm text-white">John</span>
        </div>
    </Pointer>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
