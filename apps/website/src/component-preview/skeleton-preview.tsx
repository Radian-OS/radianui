import React from "react"
import { CodeArea } from "@/registry/ui/code-area"
import { Skeleton } from "@/registry/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

function SkeletonPreview() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="inline-flex w-80 flex-col items-start justify-start gap-5 rounded-xl border p-5">
						{Array.from({ length: 5 }).map((_, index) => (
							<div key={index} className="inline-flex items-center justify-start gap-3 self-stretch">
								<Skeleton className="h-8 w-8 rounded-full" />
								<div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
									<div className="inline-flex h-2 items-start justify-between self-stretch">
										<Skeleton className="w-24 self-stretch rounded-lg" />
										<Skeleton className="w-6 self-stretch rounded-lg" />
									</div>
									<Skeleton className="h-2 w-40 rounded-lg" />
								</div>
							</div>
						))}
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<div className="inline-flex w-80 flex-col items-start justify-start gap-5 rounded-xl border p-5">
	{Array.from({ length: 5 }).map((_, index) => (
		<div key={index} className="inline-flex items-center justify-start gap-3 self-stretch">
			<Skeleton className="h-8 w-8 rounded-full" />
			<div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
				<div className="inline-flex h-2 items-start justify-between self-stretch">
					<Skeleton className="w-24 self-stretch rounded-lg" />
					<Skeleton className="w-6 self-stretch rounded-lg" />
				</div>
				<Skeleton className="h-2 w-40 rounded-lg" />
			</div>
		</div>
	))}
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SkeletonPreview
