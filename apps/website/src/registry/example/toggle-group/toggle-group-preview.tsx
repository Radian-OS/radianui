import { Computer, Moon, SunMedium } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleGroupPreview() {
	return (
		<div className="flex items-center justify-center">
			<ToggleGroup
				spacing={0}
				type="single"
				defaultValue="light"
				variant="outline">
				<ToggleGroupItem value="light" aria-label="Light theme">
					<SunMedium className="text-fg-secondary" />
					Light
				</ToggleGroupItem>
				<ToggleGroupItem value="dark" aria-label="Dark theme">
					<Moon className="text-fg-secondary" />
					Dark
				</ToggleGroupItem>
				<ToggleGroupItem value="system" aria-label="System theme">
					<Computer className="text-fg-secondary" />
					System
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
