import { Bot, ImageUp, WandSparkles } from "lucide-react"
import {
	SidebarMenuButton,
	SidebarMenuSubItem,
} from "@/registry/ui/sidebar-old"

const tools = [
	{
		title: "Image Enhance",
		url: "#",
		icon: ImageUp,
	},
	{
		title: "Image Gen",
		url: "#",
		icon: WandSparkles,
	},
	{
		title: "Chat Bots",
		url: "#",
		icon: Bot,
	},
]

export function AiTools() {
	return (
		<>
			{tools.map((item) => (
				<SidebarMenuSubItem key={item.title}>
					<SidebarMenuButton tooltip={item.title} asChild>
						<a href={item.url} className="flex items-center gap-2">
							<item.icon className="stroke-warning !size-5" />
							<span>{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuSubItem>
			))}
		</>
	)
}
