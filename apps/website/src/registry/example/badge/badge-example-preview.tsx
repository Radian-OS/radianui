import { EyeIcon, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BadgeExamplePreview = () => {
	const badgeExamples = [
		{
			name: "Destructive",
			component: (
				<Badge variant="soft" color="error" size="24">
					Destructive
				</Badge>
			),
			code: `<Badge
variant="soft" 
color="error" 
size="24">
 Destructive
</Badge>`,
		},
		{
			name: "Dot",
			component: (
				<Badge size="24" closable={true}>
					<div className="bg-success h-1.5 w-1.5 rounded-full"></div>
					<span>Label</span>
				</Badge>
			),
			code: `<Badge size="24" closable={true}>
<div className="h-1.5 w-1.5 rounded-full bg-success"></div>
Label
</Badge>`,
		},
		{
			name: "Avatar",
			component: (
				<Badge variant="strong" color="info" size="24">
					<Avatar src="/avatar.webp" name="Roman Shrestha" size="16" />
					Roman Shrestha
				</Badge>
			),
			code: `<Badge
variant="strong"
color="info" size="24">
<Avatar src="/avatar.webp" name="Roman Shrestha" size="16" />
Roman Shrestha
</Badge>`,
		},
		{
			name: "Close Icon",
			component: (
				<Badge variant="soft" color="warning" className="outline-warning outline" closable size="24">
					<Avatar src="/avatar.webp" name="Roman Shrestha" size="16" />
					My Custom Badge
				</Badge>
			),
			code: `<Badge
variant="soft" 
color="warning"
className="outline-warning outline" 
closable 
size="24">
<Avatar src="/avatar.webp" name="Roman Shrestha" size="16" />
My Custom Badge
</Badge>`,
		},
	]

	return (
		<div className="mt-6 space-y-8">
			{badgeExamples.map((example, index) => (
				<div key={index} className="overflow-hidden rounded-lg">
					<h6 className="heading-6 mb-3 font-semibold">{example.name}</h6>
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
							<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">{example.component}</div>
						</TabsContent>
						<TabsContent value="code">
							<CodeSnippet title="badge-example-preview.tsx" showLineNumber className="h-[420px]" code={example.code} />
						</TabsContent>
					</Tabs>
				</div>
			))}
		</div>
	)
}

export default BadgeExamplePreview
