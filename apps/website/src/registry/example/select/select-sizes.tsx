import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const Sizes = ["28", "32", "36", "40", "44", "48"] as const

function SelectComponent({ size }: { size: (typeof Sizes)[number] }) {
	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor={`select-${size}`}>Size - {size}</Label>
			<Select>
				<SelectTrigger id={`select-${size}`} size={size} className="w-80">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="cherry">Cherry</SelectItem>
					<SelectItem value="orange">Orange</SelectItem>
					<SelectItem value="grape">Grape</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default function SelectSizes() {
	return (
		<div className="flex flex-col gap-5">
			{Sizes.map((size) => (
				<SelectComponent size={size} key={size} />
			))}
		</div>
	)
}
