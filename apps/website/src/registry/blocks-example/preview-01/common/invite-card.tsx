import React from "react"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		label: "Email",
		value: "emails",
		content:
			"Manage your product listings, inventory levels, and pricing. Easily add new items or update existing ones.",
	},
	{
		label: "Smart app",
		value: "smartapp",
		content:
			"View and track recent orders, check fulfillment status, and manage shipping or cancellations of the orders.",
	},
]

// Email team members data
const emailMembers = [
	{ name: "John Doe", fallback: "JD", email: "john@gmail.com" },
	{ name: "Sarah Wilson", fallback: "SW", email: "sarah@gmail.com" },
	{ name: "Mike Johnson", fallback: "MJ", email: "mike@gmail.com" },
]

const InviteCard = () => {
	return (
		<div className="bg-bg border-border flex w-full flex-col gap-3 rounded-2xl border p-5">
			<span>
				<p className="text-fg text-base font-medium">Invite team members</p>
				<p className="text-fg-secondary text-sm font-normal">
					Send instructions to join your workspace
				</p>
			</span>
			<Tabs defaultValue={data[0].value}>
				<TabsList width="full">
					{data.map((dataItem) => (
						<TabsTrigger
							key={dataItem.value}
							className="cursor-pointer"
							value={dataItem.value}>
							{dataItem.label}
						</TabsTrigger>
					))}
				</TabsList>
				{data.map(({ value }) => (
					<TabsContent key={value} value={value}>
						{value === "emails" ? (
							<div>
								{emailMembers.map((member, index) => (
									<div key={index}>
										<div className="flex items-center gap-3">
											<Avatar size="36" rounded="circle">
												<AvatarFallback>{member.fallback}</AvatarFallback>
											</Avatar>
											<span className="grow">
												<p className="text-fg text-sm font-medium">
													{member.name}
												</p>
												<p className="text-fg-secondary text-[13px] font-normal">
													{member.email}
												</p>
											</span>
											<Button variant="link">
												Can View <ChevronDown />
											</Button>
										</div>
										{index < emailMembers.length - 1 && (
											<Divider className="my-2" />
										)}
									</div>
								))}
							</div>
						) : (
							<div>
								{emailMembers.map((member, index) => (
									<div key={index}>
										<div className="flex items-center gap-3">
											<Avatar size="36" rounded="circle">
												<AvatarFallback>{member.fallback}</AvatarFallback>
											</Avatar>
											<span className="grow">
												<p className="text-fg text-sm font-medium">
													{member.name}
												</p>
												<p className="text-fg-secondary text-[13px] font-normal">
													{member.email}
												</p>
											</span>
										</div>
										{index < emailMembers.length - 1 && (
											<Divider className="my-2" />
										)}
									</div>
								))}
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	)
}

export default InviteCard
