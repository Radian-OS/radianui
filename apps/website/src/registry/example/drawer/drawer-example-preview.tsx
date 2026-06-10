import React from "react"
import {
	Bell,
	CircleUserRound,
	File,
	Folder,
	ImageIcon,
	Mail,
	MessageSquare,
	MoreVertical,
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
import { Button, IconButton } from "@/registry/ui/button"
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/registry/ui/drawer"
import { Label } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"

const contactDetails = [
	{ label: "Email", value: "alex.rivas@radian.io" },
	{ label: "Phone", value: "+1 (555) 234-8890" },
	{ label: "Address", value: "San Francisco, CA" },
	{ label: "Joined at", value: "Jan 12, 2024" },
]

const quickActions = [
	{ label: "Call Alexia", icon: PhoneCall, active: true },
	{ label: "Open messages", icon: MessageSquare },
	{ label: "Send email", icon: Mail },
	{ label: "Search profile", icon: Search },
]

const drawerSections = [
	{
		value: "files",
		label: "Files",
		icon: File,
		items: ["Contract.pdf", "Brand assets.zip"],
	},
	{
		value: "projects",
		label: "Projects",
		icon: Folder,
		items: ["Mobile onboarding", "Design system"],
	},
]

const mediaSection = {
	value: "media",
	label: "Media",
	icon: ImageIcon,
	items: ["12 shared images", "4 screen recordings"],
}

type DrawerSection = {
	value: string
	label: string
	icon: React.ComponentType<{ className?: string; size?: number }>
	items: string[]
}

function DrawerAccordionItem({
	value,
	label,
	icon: Icon,
	items,
}: DrawerSection) {
	return (
		<AccordionItem className="border-border border-b-0 border-t" value={value}>
			<AccordionTrigger className="h-[52px] px-5 py-0 [&>.AccordionChevron]:size-[18px]">
				<span className="flex items-center gap-3">
					<Icon className="text-fg-secondary" size={20} />
					<span className="text-fg text-sm font-medium">{label}</span>
				</span>
			</AccordionTrigger>
			<AccordionContent className="px-12 pb-4 text-sm">
				<div className="flex flex-col gap-2">
					{items.map((item) => (
						<span key={item}>{item}</span>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

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
				<DrawerContent className="bg-bg w-[460px] max-w-full gap-0 p-0">
					<DrawerHeader className="relative h-48 shrink-0 gap-0">
						<DrawerTitle className="sr-only">Alexia Rivas profile</DrawerTitle>
						<Image
							alt="Mountain landscape cover"
							className="h-[120px] w-full object-cover"
							height={120}
							src="/drawer-cover.png"
							width={460}
						/>
						<Image
							alt="Alexia Rivas"
							className="border-bg absolute left-5 top-[78px] size-[101px] rounded-full border-8 object-cover"
							height={101}
							src="/drawer-profile.png"
							width={101}
						/>
						<div className="absolute left-[140px] top-[136px] flex flex-col gap-1">
							<p className="text-fg text-lg font-semibold leading-6">
								Alexia Rivas
							</p>
							<p className="text-fg-secondary text-sm leading-5">
								Lead Product Designer
							</p>
						</div>
						<IconButton
							aria-label="Open profile actions"
							className="text-fg-secondary hover:bg-fill1 absolute right-6 top-[146px] flex size-8 items-center justify-center rounded-lg"
							color="neutral"
							size="32"
							variant="ghost">
							<MoreVertical size={20} />
						</IconButton>
					</DrawerHeader>
					<DrawerBody className="flex w-full flex-col overflow-auto pb-8">
						<div className="grid grid-cols-4 gap-2 px-6 pt-4">
							{quickActions.map(({ label, icon: Icon, active }) => (
								<IconButton
									aria-label={label}
									className={
										active
											? "h-10 w-full rounded-lg"
											: "bg-fill1 text-fg-secondary hover:bg-fill2 h-10 w-full rounded-lg"
									}
									color={active ? "primary" : "neutral"}
									key={label}
									size="40"
									variant={active ? "strong" : "ghost"}>
									<Icon size={20} />
								</IconButton>
							))}
						</div>

						<Accordion
							className="mt-10"
							defaultValue={["contact-info"]}
							type="multiple"
							variant="open">
							<AccordionItem
								className="border-border border-b-0"
								value="contact-info">
								<AccordionTrigger className="h-[52px] px-5 py-0 [&>.AccordionChevron]:size-[18px]">
									<span className="flex items-center gap-3">
										<CircleUserRound className="text-fg-secondary" size={20} />
										<span className="text-fg text-sm font-medium">
											Contact Info
										</span>
									</span>
								</AccordionTrigger>
								<AccordionContent className="grid grid-cols-[190px_1fr] gap-y-4 px-5 pb-5 pt-3 text-sm leading-5">
									{contactDetails.map((detail) => (
										<React.Fragment key={detail.label}>
											<span className="text-fg-secondary">{detail.label}</span>
											<span className="text-fg">{detail.value}</span>
										</React.Fragment>
									))}
								</AccordionContent>
							</AccordionItem>
							{drawerSections.map((section) => (
								<DrawerAccordionItem key={section.value} {...section} />
							))}
							<div className="border-border flex h-[52px] items-center gap-3 border-t px-5">
								<Bell className="text-fg-secondary" size={20} />
								<span className="text-fg text-sm font-medium">
									Notifications
								</span>
								<div className="ml-auto flex items-center gap-2">
									<Switch
										id="drawer-notification-label"
										aria-label="Toggle notification label"
										defaultChecked
										size="20"
									/>
									<Label
										className="text-fg text-sm font-normal"
										htmlFor="drawer-notification-label">
										Label
									</Label>
								</div>
							</div>
							<DrawerAccordionItem {...mediaSection} />
						</Accordion>
						<Button
							className="border-border text-fg h-[52px] w-full justify-start rounded-none border-t px-5"
							color="neutral"
							variant="ghost">
							<X className="text-error-text" size={18} />
							Block Alexia
						</Button>
						<Button
							className="border-border text-fg h-[52px] w-full justify-start rounded-none border-y px-5"
							color="neutral"
							variant="ghost">
							<Trash2 className="text-error-text" size={18} />
							Delete Conversation
						</Button>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default DrawerExamplePreview
