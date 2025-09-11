import { useState } from "react"
import { EyeIcon, Minus, Plus, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function SliderWithStepper() {
	const [value, setValue] = useState(50)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
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
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="w-100 flex gap-2">
						<IconButton className="size-8" variant="outline" onClick={() => setValue((prev) => Math.max(prev - 10, 0))}>
							<Minus size={16} />
						</IconButton>
						<Slider value={[value]} onValueChange={([value]) => setValue(value)}>
							<SliderThumb />
						</Slider>
						<IconButton className="size-8" variant="outline" onClick={() => setValue((prev) => Math.min(prev + 10, 100))}>
							<Plus size={16} />
						</IconButton>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="slider-with-stepper.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function SliderWithStepper() {
	const [value, setValue] = useState(50)

	return (
        <div className="w-100 flex gap-2">
            <IconButton  className="size-8" variant="outline" onClick={() => setValue((prev) => Math.max(prev - 10, 0))}>
                <Minus size={16} />
            </IconButton>
            <Slider value={[value]} onValueChange={([value]) => setValue(value)} />
            <IconButton  className="size-8" variant="outline" onClick={() => setValue((prev) => Math.min(prev + 10, 100))}>
                <Plus size={16} />
            </IconButton>
        </div>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
