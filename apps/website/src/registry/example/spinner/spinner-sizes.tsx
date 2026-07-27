import { Spinner } from "@/registry/ui/spinner"

const sizes = [28, 32, 36, 40, 44, 48]

export default function SpinnerSizes() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-6">
			{sizes.map((size) => (
				<div className="flex gap-5" key={size}>
					<Spinner variant="default" size={size} />
				</div>
			))}
		</div>
	)
}
