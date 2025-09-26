import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const CreditCardPreview = () => {
	return (
		<div className="flex flex-col gap-4 md:w-80">
			<div className="flex flex-col gap-1.5">
				<Label>Card Number</Label>
				<div className="flex gap-1 md:w-80">
					<Input placeholder="0000 0000 0000 0000" className="sm:w-44.5 w-30" />
					<Input placeholder="MM / YY" />
					<Input placeholder="CVC" className="md:w-14" />
				</div>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Credit Card</Label>
				<div className="md:w-80">
					<Input placeholder="Card Number" className={`-ms rounded-b-none border-b-0 focus-within:z-30 focus-within:border-b`} />
					<div className="flex">
						<Input placeholder="MM / YY" className={`rounded-r-none rounded-t-none border-r-0 focus-within:z-30 focus-within:border-r`} />
						<Input placeholder="CVC" className="rounded-l-none rounded-t-none" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreditCardPreview
