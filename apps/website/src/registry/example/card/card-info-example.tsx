import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"

export default function CardPreview() {
	return (
		<Card className="w-full max-w-95 gap-0 p-0">
			<div className="flex flex-col p-5">
				<span className="text-base font-semibold">Your Workspace</span>
				<section className="text-fg-secondary pt-2 text-sm">
					Organize projects, assign ownership, and track progress in real time -
					all from one shared workspace built around your team&apos;s workflow.
					<br />
					<br />
					The workspace component supports a size prop that defaults to
					&quot;default&quot; for standard spacing and layout.
				</section>
			</div>
			<div className="bg-fill1 flex items-center justify-center border border-x-0 border-t border-b-0 p-5">
				<Button color="neutral" className="w-full" variant="outline">
					Open Workspace
				</Button>
			</div>
		</Card>
	)
}
