import { SidebarInset, SidebarProvider } from "@/registry/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function page() {
	return (
		<SidebarProvider className="">
			<AppSidebar />
			<div className="flex w-full flex-1 flex-col">
				<div className="px-3.5 py-4">
					<span className="text-base font-medium">Dashboard</span>
				</div>
				<SidebarInset className="bg-fill1 flex-1 pb-5 pr-5">
					<div className="border-soft bg-bg h-full w-full rounded-2xl border"></div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	)
}
