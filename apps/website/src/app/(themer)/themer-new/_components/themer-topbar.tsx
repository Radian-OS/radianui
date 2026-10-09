import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import {
	Monitor,
	Tablet,
	Smartphone,
	Eye,
	Code2,
	Sun,
	Moon,
} from "lucide-react"

export function ThemerTopbar() {
	return (
		<header className="border-border bg-bg flex h-14 shrink-0 items-center justify-between border-b px-4">
			{/* Left side */}
			<div className="flex items-center gap-2">
				<div className="bg-primary text-primary-fg flex size-8 items-center justify-center rounded-lg">
					<span className="font-serif font-bold italic">R</span>
				</div>
				<span className="text-fg text-sm font-medium">
					Radian&apos;s themer
				</span>
			</div>

			{/* Center */}
			<div className="hidden items-center gap-4 md:flex">
				<Select defaultValue="landing-page">
					<SelectTrigger className="w-auto border-none bg-transparent shadow-none focus-visible:ring-0">
						<span className="text-fg-secondary mr-1">Showing:</span>
						<SelectValue placeholder="Select view" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="landing-page">Landing Page</SelectItem>
						<SelectItem value="components">Components</SelectItem>
					</SelectContent>
				</Select>
				<span className="text-fg-tertiary text-sm">|</span>
				<span className="text-fg-secondary text-sm">
					Want a full site?{" "}
					<a href="#" className="text-fg hover:text-primary transition-colors">
						Open Radian&apos;s builder
					</a>
				</span>
			</div>

			{/* Right side */}
			<div className="flex items-center gap-2">
				<div className="border-border bg-fill1-alpha flex items-center rounded-md border p-1">
					<IconButton variant="ghost" size="28" className="text-fg">
						<Monitor className="size-4" />
					</IconButton>
					<IconButton variant="ghost" size="28" className="text-fg-secondary">
						<Tablet className="size-4" />
					</IconButton>
					<IconButton variant="ghost" size="28" className="text-fg-secondary">
						<Smartphone className="size-4" />
					</IconButton>
				</div>
				<div className="bg-border mx-2 h-4 w-px" />
				<div className="border-border bg-fill1-alpha flex items-center rounded-md border p-1">
					<IconButton variant="ghost" size="28" className="text-fg">
						<Eye className="size-4" />
					</IconButton>
					<IconButton variant="ghost" size="28" className="text-fg-secondary">
						<Code2 className="size-4" />
					</IconButton>
				</div>
				<div className="bg-border mx-2 h-4 w-px" />
				<Select defaultValue="light-default">
					<SelectTrigger className="w-auto border-none bg-transparent shadow-none focus-visible:ring-0">
						<Sun className="mr-2 size-4" />
						<SelectValue placeholder="Theme" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light-default">Light by default</SelectItem>
						<SelectItem value="dark-default">Dark by default</SelectItem>
					</SelectContent>
				</Select>
				<IconButton variant="ghost" size="32">
					<Moon className="size-4" />
				</IconButton>
				<Button color="primary" className="ml-2">
					Create Project
				</Button>
			</div>
		</header>
	)
}
