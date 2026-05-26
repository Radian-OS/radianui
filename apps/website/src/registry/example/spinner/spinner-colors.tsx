import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerColors() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex gap-5">
				<Spinner variant="activity" className="text-primary" />
				<Spinner variant="default" className="text-primary" />
				<Spinner variant="simple" className="text-primary" />
				<Spinner variant="wave" className="text-primary" />
			</div>
			<div className="flex gap-5">
				<Spinner variant="activity" className="text-info" />
				<Spinner variant="default" className="text-info" />
				<Spinner variant="simple" className="text-info" />
				<Spinner variant="wave" className="text-info" />
			</div>
			<div className="flex gap-5">
				<Spinner variant="activity" className="text-success" />
				<Spinner variant="default" className="text-success" />
				<Spinner variant="simple" className="text-success" />
				<Spinner variant="wave" className="text-success" />
			</div>
			<div className="flex gap-5">
				<Spinner variant="activity" className="text-error" />
				<Spinner variant="default" className="text-error" />
				<Spinner variant="simple" className="text-error" />
				<Spinner variant="wave" className="text-error" />
			</div>
			<div className="flex gap-5">
				<Spinner variant="activity" className="text-warning" />
				<Spinner variant="default" className="text-warning" />
				<Spinner variant="simple" className="text-warning" />
				<Spinner variant="wave" className="text-warning" />
			</div>
		</div>
	)
}
