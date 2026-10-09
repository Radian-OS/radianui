import { SidebarProvider, SidebarInset } from "@/styles/default/ui/sidebar"
import { ThemerSidebar } from "./_components/themer-sidebar"
import { ThemerTopbar } from "./_components/themer-topbar"

export default function ThemerNewPage() {
	return (
		<SidebarProvider
			style={{ "--sidebar-width": "430px" } as React.CSSProperties}>
			<ThemerSidebar />

			<SidebarInset className="bg-fill1">
				<ThemerTopbar />
				<div
					className="relative flex flex-1 flex-col overflow-auto p-4 md:p-8"
					style={{
						backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
						backgroundSize: "20px 20px",
					}}>
					{/* Canvas placeholder */}
					<div className="border-border bg-bg flex flex-1 items-center justify-center rounded-xl border shadow-sm">
						<span className="text-fg-tertiary">Preview Canvas Placeholder</span>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
