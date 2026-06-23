import { Calendar, MessageCircle, Paperclip, Users } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/registry/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import { Divider } from "@/registry/ui/divider"

export default function CardDashboardExample() {
	return (
		<Card className="w-95 flex flex-col gap-4 p-5">
			<CardHeader className="flex items-center justify-center p-0">
				<Image
					width={3840}
					height={2160}
					className="w-85 h-63.75 rounded-lg"
					src="/media/background-2.jpg"
					alt="card-bg"
				/>
			</CardHeader>
			<CardContent className="flex flex-col gap-1 p-0">
				<CardTitle className="text-base font-semibold">
					Regulatory Submission Deadline 2026
				</CardTitle>
				<CardDescription>
					ABP sets ambitious target for $32.5 billion in ‘impact’ investments to
					drive sustainable growth
				</CardDescription>
			</CardContent>
			<Divider className="border-soft h-0 border-t border-dashed bg-transparent" />
			<CardFooter className="flex justify-between p-0">
				<div className="flex flex-1 items-center gap-2">
					<Badge size="28" variant="soft" color="dark-orchid">
						<Calendar /> Today
					</Badge>
					<Badge
						size="28"
						className="text-fg-secondary"
						variant="soft"
						color="neutral">
						<Users /> 12
					</Badge>
					<Badge
						size="28"
						className="text-fg-secondary"
						variant="soft"
						color="neutral">
						<Paperclip /> 7
					</Badge>
					<Badge
						size="28"
						className="text-fg-secondary"
						variant="soft"
						color="neutral">
						<MessageCircle /> 99+
					</Badge>
				</div>
				<Image
					width={28}
					height={28}
					className="size-7 rounded-full"
					src="/media/card-bg.png"
					alt="card-bg"
				/>
			</CardFooter>
		</Card>
	)
}
