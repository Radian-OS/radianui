"use client"

import { Settings } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
// Assuming you have Avatar components
import { Badge } from "@/styles/default/ui/badge"
// Assuming you have a Badge component
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/styles/default/ui/card"

// User data
const users = [
	{
		id: "1",
		name: "Kathryn Campbell",
		availability: "online",
		avatar: "1.png",
		status: "active",
		email: "kathryn@apple.com",
	},
	{
		id: "2",
		name: "Robert Smith",
		availability: "away",
		avatar: "2.png",
		status: "inactive",
		email: "robert@openai.com",
	},
	{
		id: "3",
		name: "Sophia Johnson",
		availability: "busy",
		avatar: "3.png",
		status: "active",
		email: "sophia@meta.com",
	},
	{
		id: "4",
		name: "Lucas Walker",
		availability: "offline",
		avatar: "4.png",
		status: "inactive",
		flag: "🇦🇺",
		email: "lucas@tesla.com",
	},
	{
		id: "5",
		name: "Emily Davis",
		availability: "online",
		avatar: "5.png",
		status: "active",
		email: "emily@sap.com",
	},
]

export default function CardWithList() {
	return (
		<Card className="w-[400px]">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Recent Users</CardTitle>
					<IconButton
						aria-label="Settings Button"
						color="neutral"
						variant="outline"
						size="28">
						<Settings />
					</IconButton>
				</div>
			</CardHeader>
			<CardContent>
				{users.map((user) => {
					return (
						<div
							key={user.id}
							className="flex items-center justify-between gap-2 border-b border-dashed py-2 last:border-none">
							{/* Left: Avatar and User Info */}
							<div className="flex items-center gap-3">
								<Avatar className="size-8">
									<AvatarImage
										src={`/media/avatars/${user.avatar}`}
										alt={user.name}
									/>
									<AvatarFallback>SA</AvatarFallback>
								</Avatar>
								<div>
									<Link
										href="#"
										className="text-fg hover:text-primary text-sm font-medium">
										{user.name}
									</Link>
									<div className="text-fg-tertiary text-sm font-normal">
										{user.email}
									</div>
								</div>
							</div>
							{/* Right: Status Badge */}
							<Badge
								color={user.status === "active" ? "success" : "neutral"}
								variant={user.status === "active" ? "strong" : "outline"}>
								{user.status.charAt(0).toUpperCase() + user.status.slice(1)}
							</Badge>
						</div>
					)
				})}
			</CardContent>
			<CardFooter className="justify-center">
				<Button variant="link">
					<Link href="#">Learn more</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
