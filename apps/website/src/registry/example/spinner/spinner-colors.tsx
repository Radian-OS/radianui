import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerColors() {
	return (
		<div className="flex gap-5">
			<Spinner variant="activity" className="text-primary" />
			<Spinner variant="activity" className="text-info" />
			<Spinner variant="activity" className="text-success" />
			<Spinner variant="activity" className="text-error" />
			<Spinner variant="activity" className="text-warning" />
		</div>
	)
}
