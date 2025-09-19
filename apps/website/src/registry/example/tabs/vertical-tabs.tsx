import React from "react"
import { AppWindow, Film, Music2, Image as Picture } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
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
		count: 4,
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

export default function VerticalTabs() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()} className="w-full" orientation="vertical">
			<TabsList>
				{data.map((item) => (
					<TabsTrigger className="justify-start" key={item.id} value={item.trigger.toLowerCase()}>
						{item.icon}
						{item.trigger}
						{item.count && (
							<Badge color="error" size="20" variant="strong" className="rounded-full">
								{item.count}
							</Badge>
						)}
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
