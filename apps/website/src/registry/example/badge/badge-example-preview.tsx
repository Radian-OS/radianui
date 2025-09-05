import { useState } from "react"
import { EyeIcon, SquareTerminal, X } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BadgeExamplePreview = () => {
	const initialFrameworks = ["Nextjs", "Vite", "Angular", "Vue"]
	const [frameworks, setFrameworks] = useState(initialFrameworks)

	const removeBadge = (framework: string) => {
		setFrameworks((prev) => prev.filter((f) => f !== framework))
	}

	const closeIconCode = `
import { useState } from "react"
import { Badge } from "@/registry/ui/badge"
import { X } from "lucide-react"

const BadgeCloseExample = () => {
  const [frameworks, setFrameworks] = useState(${JSON.stringify(initialFrameworks)})

  return (
    <div className="flex gap-2">
      {frameworks.map((framework) => (
        <Badge key={framework} variant="default">
          {framework}
          <X size={16} className="cursor-pointer" onClick={() => setFrameworks(prev => prev.filter(f => f !== framework))} />
        </Badge>
      ))}
    </div>
  )
}

export default BadgeCloseExample
`

	const badgeExamples = [
		{
			name: "Close Icon",
			component: (
				<div className="flex gap-2">
					{frameworks.map((framework) => (
						<Badge key={framework} variant="default">
							{framework}
							<X className="cursor-pointer" size={16} onClick={() => removeBadge(framework)} />
						</Badge>
					))}
				</div>
			),
			code: closeIconCode,
		},
		{
			name: "Dot",
			component: (
				<Badge size="28" className="py-1 pl-1 pr-2" color="primary" variant="outline">
					<div className="flex h-4 w-4 items-center justify-center">
						<div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
					</div>
					<span>Label</span>
				</Badge>
			),
			code: `<Badge size="28" className="py-1 pl-1 pr-2" color="primary" variant="outline">
  <div className="flex h-4 w-4 items-center justify-center">
    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
  </div>
  <span>Label</span>
</Badge>`,
		},
		{
			name: "Avatar",
			component: (
				<Badge variant="strong" color="info" size="24">
					<Avatar size="16">
						<AvatarImage src="/avatar.webp" />
						<AvatarFallback>RS</AvatarFallback>
					</Avatar>
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
	]

	return (
		<div className="mt-6 space-y-8">
			{badgeExamples.map((example, index) => (
				<div key={index} className="overflow-hidden rounded-lg">
					<h6 className="heading-6 mb-3 font-semibold">{example.name}</h6>
					<Tabs
						defaultValue="preview"
						variant="outline-ghost"
						size="md"
						onValueChange={(val) => {
							// Reset badges whenever switching back to preview
							if (val === "preview") setFrameworks(initialFrameworks)
						}}>
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
