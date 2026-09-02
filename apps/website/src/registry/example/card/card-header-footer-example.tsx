import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"

export default function CardHeaderFooterPreview() {
	return (
		<Card className="w-full max-w-95 gap-0 p-0">
			<div className="flex flex-col py-5">
				<span className="border border-x-0 border-t-0 border-b px-5 pb-2.5 text-base font-semibold">
					Analytics Overview
				</span>
				<section className="text-fg-secondary px-5 pt-5 text-sm">
					Your dashboard refreshes every 15 minutes with live metrics, giving
					you a clear picture of what&apos;s moving and what needs your
					attention.
				</section>
			</div>
			<section className="bg-fill1 flex items-center justify-center border border-x-0 border-t border-b-0 p-5">
				<Button color="neutral" variant="outline" className="w-full">
					View Dashboard
				</Button>
			</section>
		</Card>
	)
}
