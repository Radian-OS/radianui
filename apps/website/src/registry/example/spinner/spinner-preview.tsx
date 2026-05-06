import { Spinner } from "@/styles/default/ui/spinner"

export default function SpinnerPreview() {
	return (
		<div className="flex gap-5">
			<Spinner variant="activity" />
			<Spinner variant="default" />
			<Spinner variant="simple" />
			<Spinner variant="wave" />
		</div>
	)
}
