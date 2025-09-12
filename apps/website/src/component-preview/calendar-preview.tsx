import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Calendar } from "@/registry/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function CalendarPreview() {
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Calendar mode="single" />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPreview() {
	return (
		<Calendar mode="single" />
	)
}

`}
				/>
			</TabsContent>
		</Tabs>
	)
}
