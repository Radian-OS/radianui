import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function SliderWithMarks() {
	const marks = [0, 25, 50, 75, 100]

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
					<div className="relative w-[320px]">
						<Slider defaultValue={[50]}>
							<SliderThumb />
						</Slider>

						<div className="absolute left-0 right-0 top-full flex justify-between px-2">
							{marks.map((mark) => (
								<span key={mark} className="text-muted-foreground relative flex flex-col items-center text-xs">
									<span className="bg-muted-foreground h-2 w-[2px]"></span>
									<span className="mt-1">{mark}</span>
								</span>
							))}
						</div>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="range-slider.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { Slider, SliderThumb } from "@/components/ui/slider"

export default function SliderWithMarks() {
	const marks = [0, 25, 50, 75, 100]

	return (
        <div className="relative w-[320px]">
            <Slider defaultValue={[50]}>
                <SliderThumb />
            </Slider>

            <div className="absolute left-0 right-0 top-full mt-2 flex justify-between px-2">
                {marks.map((mark) => (
                    <span key={mark} className="text-muted-foreground relative flex flex-col items-center text-xs">
                        <span className="bg-muted-foreground h-2 w-[2px]"></span>
                        <span className="mt-1">{mark}</span>
                    </span>
                ))}
            </div>
        </div>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
