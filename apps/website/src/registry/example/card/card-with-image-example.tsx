import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"

export default function CardWithImageExample() {
	return (
		<Card className="relative h-125 w-95 justify-between overflow-hidden bg-[url(/media/background-2.jpg)] bg-cover p-5 text-white">
			{/* Top gradient */}
			<div className="absolute top-0 right-0 left-0 z-[1] h-22 w-full bg-gradient-to-b from-black/70 to-transparent" />

			{/* Bottom gradient */}
			<div className="absolute right-0 bottom-0 left-0 z-[1] h-37.5 w-full bg-gradient-to-t from-black/70 to-transparent" />

			{/* Content above gradients */}
			<CardHeader className="relative z-[2] flex items-center justify-center gap-3 p-0">
				<Avatar size="40">
					<AvatarImage src="/media/female-5.jpg" />
					<AvatarFallback>AM</AvatarFallback>
				</Avatar>
				<div className="flex flex-1 flex-col gap-0.5">
					<span className="text-base font-semibold">Anna Murreum</span>
					<span className="text-sm">anna@radian.com</span>
				</div>
				<Badge size="24" variant="soft" color="violet-blue">
					New
				</Badge>
			</CardHeader>

			<CardContent className="relative z-[2] flex flex-col gap-3 p-0">
				<CardTitle className="heading-6">Radian Park</CardTitle>
				<CardDescription className="text-sm text-white">
					Nestled in the heart of the city, Radian Park offers lush gardens,
					winding trails, and vibrant community events year-round.
				</CardDescription>
			</CardContent>
		</Card>
	)
}
