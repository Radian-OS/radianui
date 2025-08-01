import React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Skeleton } from "@/registry/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export function ShimmerSkeleton() {
	return (
		<div className="inline-flex h-72 w-96 flex-col items-start justify-start gap-4 rounded-xl border p-5">
			<div className="inline-flex items-center justify-start gap-3">
				<Skeleton animation="shimmer" className="h-10 w-10 rounded-full" />
				<div className="inline-flex w-28 flex-col items-start justify-start gap-2">
					<Skeleton animation="shimmer" className="h-3 self-stretch rounded-lg" />
					<Skeleton animation="shimmer" className="h-3 w-16 rounded-lg" />
				</div>
			</div>
			<div className="flex flex-col items-start justify-start gap-1.5 self-stretch">
				<Skeleton animation="shimmer" className="h-3 self-stretch rounded-full" />
				<Skeleton animation="shimmer" className="h-3 w-24 rounded-full" />
			</div>
			<Skeleton animation="shimmer" className="flex-1 self-stretch rounded-lg" />
		</div>
	)
}

export default function ShimmerSkeletonExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10" variant="outline-ghost">
			<div className="flex items-center justify-between">
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
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<ShimmerSkeleton />
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="shimmer-skeleton-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`export function ShimmerSkeleton() {
    return (
	    <div className="inline-flex h-72 w-96 flex-col items-start justify-start gap-4 rounded-xl border p-5">
		    <div className="inline-flex items-center justify-start gap-3">
			    <Skeleton animation="shimmer" className="h-10 w-10 rounded-full" />
			    <div className="inline-flex w-28 flex-col items-start justify-start gap-2">
				    <Skeleton animation="shimmer" className="h-3 self-stretch rounded-lg" />
				    <Skeleton animation="shimmer" className="h-3 w-16 rounded-lg" />
			    </div>
		    </div>
		    <div className="flex flex-col items-start justify-start gap-1.5 self-stretch">
			    <Skeleton animation="shimmer" className="h-3 self-stretch rounded-full" />
			    <Skeleton animation="shimmer" className="h-3 w-24 rounded-full" />
		    </div>
		    <Skeleton animation="shimmer" className="flex-1 self-stretch rounded-lg" />
	    </div>
    )
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}
