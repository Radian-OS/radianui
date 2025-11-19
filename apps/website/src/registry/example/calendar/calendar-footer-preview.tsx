import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"

const FooterCalendarPreview = () => {
	return (
		<div className="border-alpha bg-elevation-level1 rounded-xl border">
			<Calendar mode="single" className="border-0 bg-transparent pb-2" />
			<div className="border-border flex justify-end gap-2 border-t p-3">
				<Button variant="outline" color="neutral">
					Cancel
				</Button>
				<Button>Apply</Button>
			</div>
		</div>
	)
}

export default FooterCalendarPreview
