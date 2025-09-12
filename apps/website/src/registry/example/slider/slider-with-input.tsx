import * as React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Input } from "@/registry/ui/input"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function SlideWithInput() {
	const [value, setValue] = React.useState(50)

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
						<Slider value={[value]} onValueChange={([value]) => setValue(value)}>
							<SliderThumb />
						</Slider>
						<Input
							className="w-18"
							size="32"
							value={value}
							onChange={(e) => {
								if (!e.target.value) setValue(0)
								else setValue(parseInt(e.target.value))
							}}
							onBlur={() => setValue((prev) => Math.min(prev, 100))}
						/>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="slider-with-input.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export default function SlideWithInput() {
	const [value, setValue] = React.useState(50)

	return (
        <div className="w-100 flex gap-2">
            <Slider value={[value]} onValueChange={([value]) => setValue(value)} />
            <Input
                className="w-18"
                size="32"
                value={value}
                onChange={(e) => {
                    if (!e.target.value) setValue(0)
                    else setValue(parseInt(e.target.value))
                }}
                onBlur={(e) => setValue((prev) => Math.min(prev, 100))}
            />
        </div>
	)
}

`}
				/>
			</TabsContent>
		</Tabs>
	)
}
