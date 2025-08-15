import React from "react"

import { EyeIcon, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

import { Spinner } from "../ui/spinner"

export default function ColorSpinnerExample() {
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
					<Spinner color="var(--color-primary)" />
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet title="color-spinner-example.tsx" showLineNumber className="h-105" code={`<Spinner color="var(--color-primary)" />`} />
			</TabsContent>
		</Tabs>
	)
}
