import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerPreview() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-5">
			<Spinner variant="activity" />
			<Spinner variant="default" />
			<Spinner variant="simple" />
			<Spinner variant="wave" />
		</div>
	)
}
