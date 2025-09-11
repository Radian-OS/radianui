import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FooterCalendarPreview = () => {
	return (
		<Tabs defaultValue="preview">
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
				<div className={`flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10`}>
					<div className="border-alpha bg-fill2 rounded-xl border">
						<Calendar mode="single" className="border-0 bg-transparent pb-2" />
						<div className="border-border flex justify-end gap-2 border-t px-2 py-3">
							<Button variant="outline" color="neutral">
								Cancel
							</Button>
							<Button>Apply</Button>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function CalendarFooter() {
	return (
		<div className="border-alpha bg-fill2 rounded-xl border">
			<Calendar mode="single" className="border-0 bg-transparent pb-2" />
			<div className="border-border flex justify-end gap-2 border-t px-2 py-3">
				<Button variant="outline" color="neutral">
					Cancel
				</Button>
				<Button>Apply</Button>
			</div>
		</div>
	)
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FooterCalendarPreview
