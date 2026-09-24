import { Flag } from "@radianui/flags"
import {
	ArrowUpDown,
	ChevronUp,
	CircleUserRound,
	Columns3,
	Filter,
	Globe2,
	Mail,
	MessageSquare,
	MoreVertical,
	Phone,
	Search,
	UsersRound,
	X,
} from "lucide-react"
import { getAvatarUrl } from "@/constants/avatar-playground-utils"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Card } from "@/registry/ui/card"
import { Input, InputWrapper } from "@/registry/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

const directoryRows = [
	{
		avatar: getAvatarUrl(30, true),
		initials: "LS",
		name: "Liam Smith",
		country: "US" as const,
		label: "United States",
		team: "Growth",
	},
	{
		avatar: getAvatarUrl(8, true),
		initials: "OR",
		name: "Olivia Brown",
		country: "AU" as const,
		label: "Australia",
		team: "Core Infra",
		selected: true,
	},
	{
		avatar: getAvatarUrl(70, true),
		initials: "NJ",
		name: "Noah Jones",
		country: "BE" as const,
		label: "Belgium",
		team: "People",
	},
	{
		avatar: getAvatarUrl(10, true),
		initials: "ED",
		name: "Emma Davis",
		country: "BT" as const,
		label: "Bhutan",
		team: "UI Systems",
	},
	{
		avatar: getAvatarUrl(21, true),
		initials: "AM",
		name: "Ava Miller",
		country: "GB" as const,
		label: "England",
		team: "Growth",
	},
	{
		avatar: getAvatarUrl(26, true),
		initials: "IM",
		name: "Isabella Moore",
		country: "CA" as const,
		label: "Canada",
		team: "Core Infra",
	},
	{
		avatar: getAvatarUrl(71, true),
		initials: "JT",
		name: "Jack Taylor",
		country: "CN" as const,
		label: "China",
		team: "UI Systems",
	},
	{
		avatar: getAvatarUrl(77, true),
		initials: "MA",
		name: "Mason Anderson",
		country: "GB" as const,
		label: "England",
		team: "People",
	},
]

const profileAvatar = getAvatarUrl(8, true)

const previewClassName =
	"border-soft bg-fill1 relative aspect-4/3 h-auto w-[70vw] shrink-0 overflow-hidden rounded-[10px] border p-0 shadow-none sm:w-[45vw] sm:rounded-xl md:w-[35vw] md:rounded-[20px] lg:w-[28vw]"

export default function FlagUseCasesMarquee() {
	return (
		<div className="-mx-5 sm:-mx-6">
			<InfiniteScroll
				duration={60}
				pauseOnHover={false}
				className="[--gap:2rem]">
				<DirectoryPreview />
				<ProfilePreview />
				<WorkspacePreview />
			</InfiniteScroll>
		</div>
	)
}

function DirectoryPreview() {
	return (
		<Card aria-hidden="true" className={previewClassName}>
			<Card className="border-soft absolute top-14 right-0 bottom-0 w-[calc(100%-2rem)] gap-3 rounded-t-xl rounded-b-none border-r-0 p-4 pb-0 shadow-sm [&_[data-slot=table-wrapper]]:overflow-hidden">
				<p className="text-xs font-medium">Customer Directory</p>
				<div className="flex gap-2">
					<Button
						tabIndex={-1}
						size="28"
						variant="outline"
						color="neutral"
						className="text-[10px]">
						<Filter /> Filter
					</Button>
					<Button
						tabIndex={-1}
						size="28"
						variant="outline"
						color="neutral"
						className="text-[10px]">
						<Columns3 /> Columns
					</Button>
					<Button
						tabIndex={-1}
						size="28"
						variant="outline"
						color="neutral"
						className="text-[10px]">
						<ArrowUpDown /> Sort
					</Button>
				</div>
				<Table className="table-fixed text-[10px]">
					<TableHeader>
						<TableRow>
							<TableHead className="h-7 w-7 bg-transparent px-2 py-1" />
							<TableHead className="h-7 bg-transparent px-2 py-1 text-[9px]">
								User
							</TableHead>
							<TableHead className="h-7 bg-transparent px-2 py-1 text-[9px]">
								Country
							</TableHead>
							<TableHead className="h-7 bg-transparent px-2 py-1 text-[9px]">
								Team Name
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{directoryRows.map((row) => (
							<TableRow key={row.name}>
								<TableCell className="h-8 px-2 py-1">
									<Checkbox
										tabIndex={-1}
										size="sm"
										checked={"selected" in row && row.selected}
										aria-label={"Select " + row.name}
										className="pointer-events-none"
									/>
								</TableCell>
								<TableCell className="h-8 px-2 py-1">
									<span className="flex items-center gap-2">
										<Avatar size="20">
											<AvatarImage src={row.avatar} alt="" />
											<AvatarFallback color="amber" className="text-[7px]">
												{row.initials}
											</AvatarFallback>
										</Avatar>
										{row.name}
									</span>
								</TableCell>
								<TableCell className="h-8 px-2 py-1">
									<span className="flex items-center gap-1.5">
										<Flag country={row.country} size={16} />
										{row.label}
									</span>
								</TableCell>
								<TableCell className="h-8 px-2 py-1">
									<span className="flex items-center gap-1.5">
										<span className="bg-primary-accent text-primary-text flex size-4 items-center justify-center rounded-full">
											<UsersRound className="size-2.5" />
										</span>
										{row.team}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</Card>
	)
}

function ProfilePreview() {
	return (
		<Card aria-hidden="true" className={previewClassName}>
			<Card className="border-soft absolute inset-x-12 top-14 bottom-0 gap-0 rounded-t-xl rounded-b-none p-0 shadow-sm">
				<div className="bg-info-accent h-30 shrink-0" />
				<div className="relative px-6 pt-5 pb-5">
					<Avatar
						size="120"
						className="border-bg bg-fill3 absolute -top-14 overflow-hidden border-[6px]">
						<AvatarImage src={profileAvatar} alt="" />
						<AvatarFallback color="amber">AR</AvatarFallback>
					</Avatar>
					<div className="ml-30 flex items-start justify-between">
						<div>
							<p className="flex items-center gap-2 text-base font-medium">
								Alexia Rivas <Flag country="US" size={24} />
							</p>
							<p className="text-fg-secondary mt-1 text-sm">
								Lead Product Designer
							</p>
						</div>
						<MoreVertical className="text-fg-tertiary size-5" />
					</div>
					<div className="mt-6 grid grid-cols-4 gap-2">
						<IconButton
							tabIndex={-1}
							size="40"
							aria-label="Call"
							className="w-full">
							<Phone />
						</IconButton>
						<IconButton
							tabIndex={-1}
							size="40"
							aria-label="Message"
							variant="soft"
							color="neutral"
							className="w-full">
							<MessageSquare />
						</IconButton>
						<IconButton
							tabIndex={-1}
							size="40"
							aria-label="Email"
							variant="soft"
							color="neutral"
							className="w-full">
							<Mail />
						</IconButton>
						<IconButton
							tabIndex={-1}
							size="40"
							aria-label="Search"
							variant="soft"
							color="neutral"
							className="w-full">
							<Search />
						</IconButton>
					</div>
					<div className="mt-8 flex items-center justify-between text-sm font-medium">
						<span className="flex items-center gap-2">
							<CircleUserRound className="text-fg-secondary size-5" />
							Contact Info
						</span>
						<ChevronUp className="size-4" />
					</div>
					<div className="border-soft mt-4 flex justify-between border-t pt-4 text-xs">
						<span className="text-fg-secondary">Email</span>
						<span>alex.rivas@radian.io</span>
					</div>
				</div>
			</Card>
		</Card>
	)
}

function WorkspacePreview() {
	return (
		<Card aria-hidden="true" className={previewClassName}>
			<Card className="border-soft absolute inset-x-18 top-14 bottom-0 gap-4 rounded-t-xl rounded-b-none p-4 pb-0 shadow-sm">
				<div className="flex items-start gap-3">
					<span className="bg-primary-accent text-primary-text flex size-8 shrink-0 items-center justify-center rounded-full">
						<Globe2 className="size-4" />
					</span>
					<div className="min-w-0 flex-1">
						<p className="text-xs font-medium">Global Workspace</p>
						<p className="text-fg-secondary mt-0.5 text-[10px] leading-4">
							Configure your workspace locations and communication preferences
							for a global team.
						</p>
					</div>
					<X className="text-fg-tertiary size-4" />
				</div>
				<div className="grid gap-1.5">
					<p className="text-[10px] font-medium">Workspace Name</p>
					<Input
						tabIndex={-1}
						readOnly
						value="Global Operations"
						size="32"
						className="text-[10px]"
					/>
				</div>
				<div className="grid gap-1.5">
					<p className="text-[10px] font-medium">Team Locations</p>
					<InputWrapper
						size="32"
						className="border-primary ring-primary-focus h-8 gap-1 overflow-hidden px-1.5 ring-2">
						<LocationChip country="US" label="United States" />
						<LocationChip country="DE" label="Germany" />
						<LocationChip country="JP" label="Japan" />
						<span className="text-[10px]">Phili</span>
					</InputWrapper>
				</div>
				<div className="border-soft mt-1 border-t pt-4">
					<p className="text-[10px] font-medium">Workspace Preferences</p>
					<div className="border-soft mt-3 flex items-start justify-between rounded-lg border p-3">
						<div>
							<p className="text-[10px] font-medium">Regional Notifications</p>
							<p className="text-fg-secondary mt-1 text-[9px] leading-3">
								Receive updates and announcements relevant to your selected team
								locations.
							</p>
						</div>
						<span className="border-soft size-4 shrink-0 rounded border" />
					</div>
				</div>
			</Card>
		</Card>
	)
}

function LocationChip({
	country,
	label,
}: {
	country: "US" | "DE" | "JP"
	label: string
}) {
	return (
		<span className="border-soft flex shrink-0 items-center gap-1 rounded border px-1 text-[9px]">
			<Flag country={country} size={12} />
			{label}
			<X className="size-2.5" />
		</span>
	)
}
