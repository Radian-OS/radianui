import { Spinner } from "@/styles/default/ui/spinner"

const sizes = [28, 32, 36, 40, 44, 48]

export default function SpinnerSizes() {
	return (
		<div className="flex flex-col items-center gap-6">
			{sizes.map((size) => (
				<div className="flex gap-5" key={size}>
					<Spinner variant="activity" size={size} />
					<Spinner variant="default" size={size} />
					<Spinner variant="simple" size={size} />
					<Spinner variant="wave" size={size} />
				</div>
			))}
		</div>
	)
}
