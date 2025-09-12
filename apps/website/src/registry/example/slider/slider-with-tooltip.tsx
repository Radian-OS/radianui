import * as React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function SlideWithTooltip() {
	const [value, setValue] = React.useState(50)
	const [open, setOpen] = React.useState(false)

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
						<Slider
							value={[value]}
							onValueChange={([value]) => {
								setValue(value)
								setOpen(true)
							}}
							onValueCommit={() => setOpen(false)}>
							<Tooltip open={open}>
								<TooltipTrigger asChild>
									<SliderThumb />
								</TooltipTrigger>
								<TooltipContent>{value}</TooltipContent>
							</Tooltip>
						</Slider>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="slider-with-tooltip.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Slider, SliderThumb } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function SlideWithTooltip() {
	const [value, setValue] = React.useState(50)
	const [open, setOpen] = React.useState(false)

	return (
        <Slider
            value={[value]}
            onValueChange={([value]) => {
                setValue(value)
                setOpen(true)
            }}
            onValueCommit={() => setOpen(false)}>
            <Tooltip open={open}>
                <TooltipTrigger asChild>
                    <SliderThumb />
                </TooltipTrigger>
                <TooltipContent>{value}</TooltipContent>
            </Tooltip>
        </Slider>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
