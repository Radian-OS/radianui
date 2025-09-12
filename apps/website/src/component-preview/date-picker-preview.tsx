"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, EyeIcon, SquareTerminal, X } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function DatePickerDemo() {
	const [date, setDate] = React.useState<Date>()

	const handleReset = (e: React.MouseEvent<HTMLElement>) => {
		setDate(undefined)
		e.preventDefault()
	}

	return (
		<Tabs defaultValue="preview">
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

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Popover>
						<PopoverTrigger asChild>
							<div className="relative w-[250px]">
								<Button type="button" variant="outline" color="neutral" className="text-fg hover:bg-elevation-level1 w-full justify-start gap-2">
									<CalendarIcon className="text-fg-secondary size-4" />
									{date ? format(date, "PPP") : <span className="text-fg-secondary">Pick a date</span>}
								</Button>
								{date && (
									<IconButton
										size="32"
										type="button"
										variant="ghost"
										color="neutral"
										className="hover:text-fg-secondary absolute -end-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
										onClick={handleReset}>
										<X className="size-4" />
									</IconButton>
								)}
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar mode="single" className="border-0" selected={date} onSelect={setDate} autoFocus />
						</PopoverContent>
					</Popover>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="date-picker.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { Button, IconButton } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function DatePickerDemo() {
	const [date, setDate] = React.useState<Date>()

	const handleReset = (e: React.MouseEvent<HTMLElement>) => {
		setDate(undefined)
		e.preventDefault()
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="relative w-[250px]">
					<Button type="button" variant="outline" color="neutral" className="text-fg hover:bg-elevation-level1 w-full justify-start gap-2">
						<CalendarIcon className="text-fg-secondary size-4" />
						{date ? format(date, "PPP") : <span className="text-fg-secondary">Pick a date</span>}
					</Button>
					{date && (
						<IconButton
							size="32"
							type="button"
							variant="ghost"
							color="neutral"
							className="hover:text-fg-secondary absolute -end-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
							onClick={handleReset}>
							<X className="size-4" />
						</IconButton>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar mode="single" className="border-0" selected={date} onSelect={setDate} autoFocus />
			</PopoverContent>
		</Popover>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
