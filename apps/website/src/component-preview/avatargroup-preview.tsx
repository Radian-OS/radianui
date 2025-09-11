import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export const people = [
	{
		name: "John Doe",
		image: "https://randomuser.me/api/portraits/men/1.jpg",
	},
	{
		name: "Jane Smith",
		image: "https://randomuser.me/api/portraits/women/1.jpg",
	},
	{
		name: "Michael Brown",
		image: "https://randomuser.me/api/portraits/men/2.jpg",
	},
	{
		name: "Emily Davis",
		image: "https://randomuser.me/api/portraits/women/2.jpg",
	},
	{
		name: "Chris Johnson",
		image: "https://randomuser.me/api/portraits/men/3.jpg",
	},
	{
		name: "Sophia Lee",
		image: "https://randomuser.me/api/portraits/women/3.jpg",
	},
	{
		name: "Daniel Garcia",
		image: "https://randomuser.me/api/portraits/men/4.jpg",
	},
	{
		name: "Olivia Martinez",
		image: "https://randomuser.me/api/portraits/women/4.jpg",
	},
	{
		name: "Ethan Wilson",
		image: "https://randomuser.me/api/portraits/men/5.jpg",
	},
	{
		name: "Mia Taylor",
		image: "https://randomuser.me/api/portraits/women/5.jpg",
	},
]

const AvatargroupPreview = () => {
	return (
		<Tabs className="mt-3" defaultValue="preview">
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex -space-x-2.5">
						<Avatar>
							<AvatarImage src={people[0].image} className="border-bg border-2 hover:z-10" />
							<AvatarFallback>CH</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage src={people[1].image} className="border-bg border-2 hover:z-10" />
							<AvatarFallback>NK</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage src={people[2].image} className="border-bg border-2 hover:z-10" />
							<AvatarFallback>MS</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage src={people[3].image} className="border-bg border-2 hover:z-10" />
							<AvatarFallback>BT</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback className="border-bg border-2 hover:z-10">+7</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="avatargroup.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default AvatargroupPreview
