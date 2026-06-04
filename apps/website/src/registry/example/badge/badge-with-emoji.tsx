import { Badge } from "@/registry/ui/badge"

function BadgeWithEmoji() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge variant="strong" size="28" color="neutral">
				<span>🏠</span>
				House
			</Badge>
		</div>
	)
}

export default BadgeWithEmoji
