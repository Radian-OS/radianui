import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="bg-bg p-4.5 flex shrink-0 items-center gap-2 border-b">
					<SidebarTrigger className="-ml-1" />
					<div className="bg-border mr-2 h-4 w-px" />
					<span className="font-medium">Inbox</span>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="bg-fill2 aspect-video rounded-xl" />
						<div className="bg-fill2 aspect-video rounded-xl" />
						<div className="bg-fill2 aspect-video rounded-xl" />
					</div>
					<div className="bg-fill2 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
