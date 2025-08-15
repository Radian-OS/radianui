import React, { useState } from "react"

import { EyeIcon, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Fade } from "@/registry/animated/fade"
import { Button } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function FadeOutExample() {
	const [show, setShow] = useState(true)

	return (
		<Tabs variant={"outline-ghost"} defaultValue="preview" className="mb-10">
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
					<div className="flex flex-col items-center gap-10">
						<Button variant="outline" color="neutral" onClick={() => setShow((prev) => !prev)}>
							{show ? `Fade In` : `Fade Out`}
						</Button>

						<Fade isVisible={show} blur="6px">
							<span className="text-5xl font-semibold">Hello World</span>
						</Fade>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="fade-out-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`const [show, setShow] = useState(true)

<div className="flex flex-col items-center gap-10">
    <Button variant="outline" color="neutral" onClick={() => setShow((prev) => !prev)}>
        {show ? 'Fade In' : 'Fade Out'}
    </Button>

    <Fade isVisible={show} blur="6px">
        <span className="text-5xl font-semibold">Hello World</span>
    </Fade>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
