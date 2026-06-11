import React from "react"
import {
	Bell,
	CircleUserRound,
	EllipsisVertical,
	File,
	Folder,
	ImageIcon,
	Mail,
	MessageSquareText,
	PhoneCall,
	Search,
	Trash2,
	X,
} from "lucide-react"
import Image from "next/image"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/registry/ui/drawer"

const contents = [
	{
		id: 1,
		trigger: (
			<span className="flex items-center gap-3">
				<CircleUserRound className="text-fg-secondary" size={20} />
				<span className="text-sm font-medium">Contact Info</span>
			</span>
		),
		content: (
			<div className="grid grid-cols-[190px_1fr] gap-y-4 text-sm leading-5">
				<span className="text-fg-secondary">Email</span>
				<span className="text-fg">alex.rivas@radian.io</span>
				<span className="text-fg-secondary">Phone</span>
				<span className="text-fg">+1 (555) 234-8890</span>
				<span className="text-fg-secondary">Address</span>
				<span className="text-fg">San Francisco, CA</span>
				<span className="text-fg-secondary">Joined at</span>
				<span className="text-fg">Jan 12, 2024</span>
			</div>
		),
	},
	{
		id: 2,
		trigger: (
			<span className="flex items-center gap-3">
				<File className="text-fg-secondary" size={20} />
				<span>Files</span>
			</span>
		),
		content: (
			<div className="flex flex-col gap-3 text-sm leading-5">
				<div className="flex items-center justify-between">
					<span className="text-fg">Product strategy.pdf</span>
					<span className="text-fg-secondary">2.4 MB</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">Research notes.docx</span>
					<span className="text-fg-secondary">860 KB</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">Brand assets.zip</span>
					<span className="text-fg-secondary">18 MB</span>
				</div>
			</div>
		),
	},
	{
		id: 3,
		trigger: (
			<span className="flex items-center gap-3">
				<Folder className="text-fg-secondary" size={20} />
				<span>Projects</span>
			</span>
		),
		content: (
			<div className="flex flex-col gap-3 text-sm leading-5">
				<div className="flex items-center justify-between">
					<span className="text-fg">Mobile onboarding</span>
					<span className="text-fg-secondary">Active</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">Design system refresh</span>
					<span className="text-fg-secondary">In review</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">Customer insights</span>
					<span className="text-fg-secondary">Draft</span>
				</div>
			</div>
		),
	},
	{
		id: 4,
		trigger: (
			<span className="flex items-center gap-3">
				<Bell className="text-fg-secondary" size={20} />
				<span>Notifications</span>
			</span>
		),
		content: (
			<div className="flex flex-col gap-3 text-sm leading-5">
				<div className="flex items-center justify-between">
					<span className="text-fg">Mentions</span>
					<span className="text-fg-secondary">On</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">Project updates</span>
					<span className="text-fg-secondary">On</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">File activity</span>
					<span className="text-fg-secondary">Muted</span>
				</div>
			</div>
		),
	},
	{
		id: 5,
		trigger: (
			<span className="flex items-center gap-3">
				<ImageIcon className="text-fg-secondary" size={20} />
				<span>Media</span>
			</span>
		),
		content: (
			<div className="flex flex-col gap-3 text-sm leading-5">
				<div className="flex items-center justify-between">
					<span className="text-fg">Shared images</span>
					<span className="text-fg-secondary">18 files</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">Screen recordings</span>
					<span className="text-fg-secondary">4 clips</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-fg">Design references</span>
					<span className="text-fg-secondary">7 links</span>
				</div>
			</div>
		),
	},
]

function DrawerExamplePreview() {
	return (
		<div className="flex items-center justify-center">
			<Drawer
				variant="default"
				direction="right"
				handle={false}
				backdrop="overlay">
				<DrawerTrigger>
					<Button>Open Trigger</Button>
				</DrawerTrigger>
				<DrawerContent className="p-0">
					<Image
						alt="Mountain landscape cover"
						className="h-30 w-full object-cover"
						height={120}
						src="/drawer-cover.png"
						width={460}
					/>
					<DrawerHeader className="pr-7.5 relative flex flex-row items-center gap-5 pl-5">
						<Avatar
							rounded="circle"
							className="size-25 ring-bg ring-offset-bg ring-offset-10 absolute bottom-0 rounded-full ring-2">
							<AvatarImage src="/drawer-profile.png" />
							<AvatarFallback>AR</AvatarFallback>
						</Avatar>
						<div className="flex w-full items-center justify-end gap-5">
							<div className="pl-30 flex flex-1 flex-col gap-1">
								<DrawerTitle>Alexia Rivas</DrawerTitle>
								<DrawerDescription>Lead Product Designer</DrawerDescription>
							</div>
							<IconButton size="40" color="neutral" variant="ghost">
								<EllipsisVertical />
							</IconButton>
						</div>
					</DrawerHeader>
					<DrawerBody className="w-115 flex flex-col gap-6">
						<div className="flex items-center gap-2 px-6">
							<Button className="w-full" size="40">
								<PhoneCall />
							</Button>
							<Button
								className="w-full"
								color="neutral"
								variant="outline"
								size="40">
								<MessageSquareText />
							</Button>
							<Button
								className="w-full"
								color="neutral"
								variant="outline"
								size="40">
								<MessageSquareText />
							</Button>
							<Button
								className="w-full"
								color="neutral"
								variant="outline"
								size="40">
								<Mail />
							</Button>
							<Button
								className="w-full"
								color="neutral"
								variant="outline"
								size="40">
								<Search />
							</Button>
						</div>
						<div className="py-4">
							<Accordion
								type="single"
								variant="open"
								className="w-full"
								collapsible>
								{contents.map((item) => (
									<AccordionItem
										className="px-5"
										value={item.id.toString()}
										key={item.id}>
										<AccordionTrigger className="py-4">
											{item.trigger}
										</AccordionTrigger>
										<AccordionContent className="py-4">
											{item.content}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
							<span className="hover:bg-fill1-alpha flex cursor-pointer items-center gap-4 border border-x-0 border-b-0 border-t px-5 py-4">
								<X className="text-error" />
								<p className="text-sm font-medium">Block Alexia</p>
							</span>
							<span className="hover:bg-fill1-alpha flex cursor-pointer items-center gap-4 border border-x-0 border-b border-t px-5 py-4">
								<Trash2 className="text-error" />
								<p className="text-sm font-medium">Delete Conversation</p>
							</span>
						</div>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default DrawerExamplePreview
