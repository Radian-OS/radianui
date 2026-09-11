import { Flag } from "@radianui/flags"

export default function FlagShapes() {
	return (
		<div className="flex items-center justify-center gap-8">
			<div className="flex flex-col items-center gap-2">
				<Flag country="GB" size={56} />
				<span className="text-muted-foreground text-sm">Flat</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Flag country="GB" shape="circle" size={56} />
				<span className="text-muted-foreground text-sm">Circle</span>
			</div>
		</div>
	)
}
