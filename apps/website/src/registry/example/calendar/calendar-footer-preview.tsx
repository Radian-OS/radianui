import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FooterCalendarPreview = () => {
	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
				<div className={`flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10`}>
					<Calendar
						mode={"single"}
						footer={
							<div className="flex gap-2 p-3">
								<Button variant="outline">Cancel</Button>
								<Button>Apply</Button>
							</div>
						}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Calendar
	footer={\n			<div className="flex gap-2 p-3">\n				<Button variant="outline">Cancel</Button>\n				<Button>Apply</Button>\n			</div> \n		}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FooterCalendarPreview
