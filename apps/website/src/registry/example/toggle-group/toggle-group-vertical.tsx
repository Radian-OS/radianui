import { Bluetooth, MapPin, Plane, Wifi } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleGroupVertical() {
	return (
		<div className="flex items-center justify-center">
			<ToggleGroup
				type="multiple"
				orientation="vertical"
				spacing={1}
				defaultValue={["wifi", "bluetooth"]}>
				<ToggleGroupItem value="wifi" aria-label="Wi-Fi" className="w-full">
					<Wifi className="text-fg-secondary" />
					Wi-Fi
				</ToggleGroupItem>
				<ToggleGroupItem
					value="bluetooth"
					aria-label="Bluetooth"
					className="w-full">
					<Bluetooth className="text-fg-secondary" />
					Bluetooth
				</ToggleGroupItem>
				<ToggleGroupItem
					value="airplane"
					aria-label="Airplane Mode"
					className="w-full">
					<Plane className="text-fg-secondary" />
					Airplane Mode
				</ToggleGroupItem>
				<ToggleGroupItem
					value="location"
					aria-label="Location"
					className="w-full">
					<MapPin className="text-fg-secondary" />
					Location
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
