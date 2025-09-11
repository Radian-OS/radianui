import React, { useState } from "react"
import { EyeIcon, RotateCw, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Fade } from "@/registry/animated/fade"
import { Button } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function BlurFadeExample() {
	const [counter, setCounter] = useState(0)
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-start">
				<div className="flex gap-1">
					<Button variant="outline" color="neutral" iconOnly onClick={() => setCounter((prev) => prev + 1)}>
						<RotateCw />
					</Button>
					<TabsList variant="outline-ghost" size="md">
						<TabsTrigger value="preview">
							<EyeIcon />
							Preview
						</TabsTrigger>
						<TabsTrigger value="code">
							<SquareTerminal />
							Code
						</TabsTrigger>
					</TabsList>
				</div>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
					<div className="flex flex-col" key={counter}>
						<Fade blur="6px" inView>
							<span className="text-5xl font-semibold">Radian</span>
						</Fade>
						<Fade blur="6px" delay={0.6} inView>
							<p className="text-lg">Components that just work</p>
						</Fade>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="blur-fade-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="flex flex-col">
    <Fade blur="6px" inView>
        <span className="text-5xl font-semibold">Radian</span>
    </Fade>
    <Fade blur="6px" delay={0.6} inView>
        <p className="text-lg">Components that just work</p>
    </Fade>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
