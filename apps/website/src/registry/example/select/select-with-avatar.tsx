import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/registry/ui/select"
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
					<Select indicatorPosition="right">
						<SelectTrigger className="w-60">
							<SelectValue placeholder="Select a user" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel className="text-muted-foreground py-1 ps-2 text-xs font-normal">Select a user</SelectLabel>
								<SelectItem value="1">
									<span className="flex items-center gap-2">
										<Avatar size="24">
											<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
										</Avatar>
										<span>Alan Bold</span>
									</span>
								</SelectItem>
								<SelectItem value="2">
									<span className="flex items-center gap-2">
										<Avatar size="24">
											<AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" />
										</Avatar>
										<span>Ethan James</span>
									</span>
								</SelectItem>
								<SelectItem value="3">
									<span className="flex items-center gap-2">
										<Avatar size="24">
											<AvatarImage src="https://randomuser.me/api/portraits/men/3.jpg" />
										</Avatar>
										<span>Nina Clark</span>
									</span>
								</SelectItem>
								<SelectItem value="4">
									<span className="flex items-center gap-2">
										<Avatar size="24">
											<AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" />
										</Avatar>
										<span>Sean Otto</span>
									</span>
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="select-with-avatar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SelectWithBadge() {
	return (
	<Select indicatorPosition="right">
		<SelectTrigger className="w-60">
			<SelectValue placeholder="Select a user" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel className="text-muted-foreground py-1 ps-2 text-xs font-normal">Select a user</SelectLabel>
				<SelectItem value="1">
					<span className="flex items-center gap-2">
						<Avatar size="24">
							<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
						</Avatar>
						<span>Alan Bold</span>
					</span>
				</SelectItem>
				<SelectItem value="2">
					<span className="flex items-center gap-2">
						<Avatar size="24">
							<AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" />
						</Avatar>
						<span>Ethan James</span>
					</span>
				</SelectItem>
				<SelectItem value="3">
					<span className="flex items-center gap-2">
						<Avatar size="24">
							<AvatarImage src="https://randomuser.me/api/portraits/men/3.jpg" />
						</Avatar>
						<span>Nina Clark</span>
					</span>
				</SelectItem>
				<SelectItem value="4">
					<span className="flex items-center gap-2">
						<Avatar size="24">
							<AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" />
						</Avatar>
						<span>Sean Otto</span>
					</span>
				</SelectItem>
			</SelectGroup>
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
