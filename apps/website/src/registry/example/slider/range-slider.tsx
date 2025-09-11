import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function RangeSlider() {
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
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<Slider className="w-[420px]" defaultValue={[20, 60]}>
						<SliderThumb />
						<SliderThumb />
					</Slider>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="range-slider.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { Slider } from "@/components/ui/slider"

export default function RangeSlider() {
	return (
        <Slider defaultValue={[20, 60]} />
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
