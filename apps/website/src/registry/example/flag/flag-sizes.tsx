import { Flag } from "@radianui/flags"

const sizes = [16, 24, 32, 48, 64] as const

export default function FlagSizes() {
	return (
		<div className="flex flex-wrap items-end justify-center gap-6">
			{sizes.map((size) => (
				<div key={size} className="flex flex-col items-center gap-2">
					<Flag country="CN" size={size} />
					<span className="text-muted-foreground text-xs">{size}px</span>
				</div>
			))}
		</div>
	)
}
