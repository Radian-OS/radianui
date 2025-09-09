import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SliderPreview = () => {
	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<TabsList>
				<TabsTrigger value="preview" icon={<EyeIcon />}>
					Preview
				</TabsTrigger>
				<TabsTrigger value="code" icon={<SquareTerminal />}>
					Code
				</TabsTrigger>
			</TabsList>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border p-10">
					<Slider className="w-[320px]">
						<SliderThumb />
					</Slider>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="slider.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { Slider, SliderThumb } from "@/components/ui/slider"

const SliderPreview = () => {
	return (
		<Slider className="w-[320px]">
			<SliderThumb />
		</Slider>
	)
}

export default SliderPreview
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SliderPreview
