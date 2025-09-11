import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Badge } from "@/registry/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function SelectWithBadge() {
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
					<Select defaultValue="1" indicatorPosition="right">
						<SelectTrigger className="w-60">
							Status: <SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">
								<Badge color="info">In Progress</Badge>
							</SelectItem>
							<SelectItem value="2">
								<Badge color="success">Completed</Badge>
							</SelectItem>
							<SelectItem value="3">
								<Badge color="neutral">Pending</Badge>
							</SelectItem>
							<SelectItem value="4">
								<Badge color="warning">Cancelled</Badge>
							</SelectItem>
							<SelectItem value="5">
								<Badge color="error">Rejected</Badge>
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="select-with-badge.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SelectWithBadge() {
	return (
        <Select defaultValue="1" indicatorPosition="right">
            <SelectTrigger className="w-60">
                Status: <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">
                    <Badge color="info">In Progress</Badge>
                </SelectItem>
                <SelectItem value="2">
                    <Badge color="success">Completed</Badge>
                </SelectItem>
                <SelectItem value="3">
                    <Badge color="neutral">Pending</Badge>
                </SelectItem>
                <SelectItem value="4">
                    <Badge color="warning">Cancelled</Badge>
                </SelectItem>
                <SelectItem value="5">
                    <Badge color="error">Rejected</Badge>
                </SelectItem>
            </SelectContent>
        </Select>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
