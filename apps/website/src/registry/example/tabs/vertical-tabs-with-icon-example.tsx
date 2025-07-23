import React from "react"
import { AppWindow, EyeIcon, Film, Music2, Image as Picture, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Music",
		icon: <Music2 />,
		content: "Browse your favorite albums and artists.",
	},
	{
		id: 2,
		trigger: "Movies",
		icon: <Film />,
		content: "Watch the latest blockbusters and classics.",
	},
	{
		id: 3,
		trigger: "Apps",
		icon: <AppWindow />,
		content: "Explore featured and recommended apps.",
	},
	{
		id: 4,
		trigger: "Pictures",
		icon: <Picture />,
		content: "Explore the latest pictures you have clicked.",
	},
]

function VerticaTabsWithIcon() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()} orientation="vertical">
			<TabsList>
				{data.map((item) => (
					<TabsTrigger className="justify-start" key={item.id} value={item.trigger.toLowerCase()} icon={item.icon}>
						{item.trigger}
					</TabsTrigger>
				))}
			</TabsList>
			{data.map((item) => (
				<TabsContent key={item.id} value={item.trigger.toLowerCase()}>
					{item.content}
				</TabsContent>
			))}
		</Tabs>
	)
}

function VerticaTabsWithIconExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
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
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<VerticaTabsWithIcon />
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="vertical-tabs-with-icon-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`const data = [
  {
    id: 1,
    trigger: "Music",
    icon: <Music2 />,
    content: "Browse your favorite albums and artists.",
  },
  {
    id: 2,
    trigger: "Movies",
    icon: <Film />,
    content: "Watch the latest blockbusters and classics.",
  },
  {
    id: 3,
    trigger: "Apps",
    icon: <AppWindow />,
    content: "Explore featured and recommended apps.",
  },
]


export default function VerticalTabsWithIcon() {
    return (
        <Tabs defaultValue={data[0].trigger.toLowerCase()} orientation="vertical">
            <TabsList>
                {data.map((item) => (
                    <TabsTrigger className="justify-start" key={item.id} value={item.trigger.toLowerCase()} icon={item.icon}>
                        {item.trigger}
                    </TabsTrigger>
                ))}
            </TabsList>
            {data.map((item) => (
                <TabsContent key={item.id} value={item.trigger.toLowerCase()}>
                    {item.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default VerticaTabsWithIconExample
