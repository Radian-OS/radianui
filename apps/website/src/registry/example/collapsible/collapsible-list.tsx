"use client"

import { useState } from "react"
import {
	ChevronDown,
	MessageSquareQuote,
	ReceiptText,
	UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"

const NOTIFICATIONS = [
	{
		id: "1",
		title: "New Message",
		body: "Alex: Hey, let's catch up today!",
		time: "5m ago",
		icon: MessageSquareQuote,
		iconBg: "bg-primary-accent",
		iconColor: "text-primary",
	},
	{
		id: "2",
		title: "New User Signed Up",
		body: "anna.murreum@example.com",
		time: "1h ago",
		icon: UserPlus,
		iconBg: "bg-error-accent",
		iconColor: "text-error",
	},
	{
		id: "3",
		title: "Payment Recieved",
		body: "$120.00 from Invoice #1024",
		time: "7h ago",
		icon: ReceiptText,
		iconBg: "bg-success-accent",
		iconColor: "text-success",
	},
]

function NotificationCard({
	notification,
}: {
	notification: (typeof NOTIFICATIONS)[number]
}) {
	const Icon = notification.icon
	return (
		<div className="bg-bg border-soft flex items-center gap-3 rounded-xl border p-3">
			<div
				className={cn(
					"flex shrink-0 items-center justify-center rounded-lg p-2.5",
					notification.iconBg
				)}>
				<Icon className={cn("size-5", notification.iconColor)} />
			</div>
			<div className="min-w-0 flex-1 flex-col gap-1">
				<p className="text-fg text-sm font-medium leading-5">
					{notification.title}
				</p>
				<p className="text-fg-secondary truncate text-xs font-normal leading-4">
					{notification.body}
				</p>
			</div>
			<span className="text-fg-secondary shrink-0 self-start text-xs font-normal leading-4">
				{notification.time}
			</span>
		</div>
	)
}

export default function CollapsibleList() {
	const [open, setOpen] = useState(false)

	const first = NOTIFICATIONS[0]
	const rest = NOTIFICATIONS.slice(1)

	return (
		<div className="flex items-center justify-center">
			<div className="w-100">
				<Collapsible
					className="flex flex-col"
					open={open}
					onOpenChange={setOpen}>
					<div className="relative">
						<NotificationCard notification={first} />
						{!open && (
							<>
								<div className="bg-bg border-soft absolute -bottom-2 left-3 right-3 -z-10 h-full rounded-xl border opacity-60" />
								<div className="bg-bg border-soft absolute -bottom-4 left-6 right-6 -z-20 h-full rounded-xl border opacity-50" />
							</>
						)}
					</div>

					<CollapsibleContent className="mt-2 flex flex-col gap-2">
						{rest.map((n) => (
							<NotificationCard key={n.id} notification={n} />
						))}
					</CollapsibleContent>

					<div className="mt-6 flex justify-center">
						<CollapsibleTrigger asChild>
							<Button color="neutral" variant="outline">
								{open ? "Show Less" : "Show All"}
								<ChevronDown
									className={cn(
										"text-fg-secondary size-4 transition-transform duration-200",
										open && "rotate-180"
									)}
								/>
							</Button>
						</CollapsibleTrigger>
					</div>
				</Collapsible>
			</div>
		</div>
	)
}
