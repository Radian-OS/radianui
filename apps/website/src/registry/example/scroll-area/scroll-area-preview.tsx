"use client"

import React from "react"
import { Calendar, Mail, MapPin, Phone, Settings } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { ScrollArea } from "@/registry/ui/scroll-area"

const contacts = [
	{
		id: 1,
		name: "Sarah Johnson",
		email: "sarah.johnson@company.com",
		phone: "+1 (555) 123-4567",
		address: "123 Main St, New York, NY 10001",
		status: "online",
		lastActive: "2 minutes ago",
	},
	{
		id: 2,
		name: "Michael Chen",
		email: "michael.chen@company.com",
		phone: "+1 (555) 234-5678",
		address: "456 Oak Ave, San Francisco, CA 94102",
		status: "away",
		lastActive: "1 hour ago",
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		email: "emily.rodriguez@company.com",
		phone: "+1 (555) 345-6789",
		address: "789 Pine St, Los Angeles, CA 90210",
		status: "online",
		lastActive: "5 minutes ago",
	},
	{
		id: 4,
		name: "David Kim",
		email: "david.kim@company.com",
		phone: "+1 (555) 456-7890",
		address: "321 Elm St, Chicago, IL 60601",
		status: "offline",
		lastActive: "3 hours ago",
	},
	{
		id: 5,
		name: "Lisa Thompson",
		email: "lisa.thompson@company.com",
		phone: "+1 (555) 567-8901",
		address: "654 Maple Dr, Seattle, WA 98101",
		status: "online",
		lastActive: "1 minute ago",
	},
	{
		id: 6,
		name: "Alex Martinez",
		email: "alex.martinez@company.com",
		phone: "+1 (555) 678-9012",
		address: "987 Cedar Ln, Austin, TX 78701",
		status: "away",
		lastActive: "30 minutes ago",
	},
	{
		id: 7,
		name: "Rachel Green",
		email: "rachel.green@company.com",
		phone: "+1 (555) 789-0123",
		address: "147 Birch St, Boston, MA 02101",
		status: "online",
		lastActive: "10 minutes ago",
	},
	{
		id: 8,
		name: "Tom Wilson",
		email: "tom.wilson@company.com",
		phone: "+1 (555) 890-1234",
		address: "258 Spruce Ave, Denver, CO 80201",
		status: "offline",
		lastActive: "2 hours ago",
	},
	{
		id: 9,
		name: "Anna Davis",
		email: "anna.davis@company.com",
		phone: "+1 (555) 901-2345",
		address: "369 Willow Way, Miami, FL 33101",
		status: "online",
		lastActive: "Just now",
	},
	{
		id: 10,
		name: "James Brown",
		email: "james.brown@company.com",
		phone: "+1 (555) 012-3456",
		address: "741 Poplar Blvd, Phoenix, AZ 85001",
		status: "away",
		lastActive: "45 minutes ago",
	},
]

export default function ScrollAreaPreview() {
	return (
		<div className="w-full max-w-sm">
			<div className="border-border bg-elevation-level1 rounded-lg border py-4">
				<div className="flex items-center justify-between px-4">
					<p className="heading-6 font-medium">Contacts</p>
					<Button variant="ghost" color="neutral" size="28" className="h-8 w-8 p-0">
						<Settings className="text-fg-tertiary h-4 w-4" />
					</Button>
				</div>

				<Divider orientation="horizontal" className="bg-border my-4" />

				<ScrollArea className="h-80 px-4">
					<div className="space-y-3">
						{contacts.map((contact) => (
							<div key={contact.id} className="border-border rounded-lg border border-dotted p-4">
								<div className="mb-2 flex items-center justify-between">
									<h4 className="text-fg font-medium">{contact.name}</h4>
									<Badge variant="soft" color={contact.status === "online" ? "success" : contact.status === "away" ? "warning" : "neutral"} size="20">
										{contact.status}
									</Badge>
								</div>

								<div className="space-y-2">
									<div className="text-fg-secondary flex items-center gap-2 text-sm">
										<Mail className="h-3 w-3" />
										<span>{contact.email}</span>
									</div>
									<div className="text-fg-secondary flex items-center gap-2 text-sm">
										<Phone className="h-3 w-3" />
										<span>{contact.phone}</span>
									</div>
									<div className="text-fg-secondary flex items-center gap-2 text-sm">
										<MapPin className="h-3 w-3" />
										<span>{contact.address}</span>
									</div>
									<div className="text-fg-tertiary flex items-center gap-2 text-xs">
										<Calendar className="h-3 w-3" />
										<span>Last active: {contact.lastActive}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>

				<Divider orientation="horizontal" className="bg-border my-4" />

				<div className="text-center">
					<Button variant={"link"} color={"primary"}>
						View all contacts
					</Button>
				</div>
			</div>
		</div>
	)
}
