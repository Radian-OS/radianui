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
					<SunMedium />
					Light
				</ToggleGroupItem>
				<ToggleGroupItem value="dark" aria-label="Dark theme">
					<Moon />
					Dark
				</ToggleGroupItem>
				<ToggleGroupItem value="system" aria-label="System theme">
					<Computer />
					System
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
