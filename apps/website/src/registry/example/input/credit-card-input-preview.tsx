import Image from "next/image"
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

const CreditCardPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Card Number</Label>
				<div className="flex w-full gap-1">
					<InputWrapper>
						<Input placeholder="0000 0000 0000 0000" />
						<Image
							src="/creditcard.png"
							height={12.88}
							width={20}
							alt="Creditimg1"
						/>
					</InputWrapper>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<Label>Card Number</Label>
				<div className="flex w-full gap-1">
					<InputWrapper>
						<Input placeholder="0000 0000 0000 0000" />
						<Image
							height={12.88}
							width={20}
							alt="Creditimg2"
							src="/creditcard.png"
						/>
					</InputWrapper>
					<Input placeholder="MM / YY" />
					<Input placeholder="CVC" />
				</div>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Credit Card</Label>
				<div className="w-full">
					<InputWrapper
						className={`-ms rounded-b-none border-b-0 focus-within:z-30 focus-within:border-b`}>
						<Input placeholder="Card Number" />
						<Image
							height={12.88}
							width={20}
							alt="Creditimg3"
							src="/creditcard.png"
						/>
					</InputWrapper>
					<div className="flex">
						<Input
							placeholder="MM / YY"
							className={`rounded-r-none rounded-t-none border-r-0 focus-within:z-30 focus-within:border-r`}
						/>
						<Input
							placeholder="CVC"
							className="rounded-l-none rounded-t-none"
						/>
					</div>
				</div>
				<div className="text-fg-tertiary text-xs font-normal">
					Hint text to help with input
				</div>
			</div>
		</div>
	)
}

export default CreditCardPreview
