"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/ui/dialog"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const paymentMethods = [
	{
		id: "mastercard",
		name: "MasterCard",
		description: "Primary card used for recurring payments.",
		logo: "/mastercard.svg",
	},
	{
		id: "visa",
		name: "Visa",
		description: "Backup payment method for failed charges.",
		logo: "/visa.svg",
	},
	{
		id: "paypal",
		name: "PayPal",
		description: "Available for one-time purchases and checkout.",
		logo: "/paypal.svg",
	},
]

export default function DialogWithRadioCards() {
	const [selected, setSelected] = useState("visa")

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Payment Method
				</Button>
			</DialogTrigger>
			<DialogContent className="w-130">
				<DialogHeader>
					<div className="flex gap-3">
						<IconButton className="rounded-full" variant="soft">
							<CreditCard />
						</IconButton>
						<div className="flex w-full flex-col gap-1">
							<DialogTitle>Payment Method</DialogTitle>
							<DialogDescription>
								Update your billing information.
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<DialogBody>
					<RadioGroup
						value={selected}
						onValueChange={setSelected}
						className="flex flex-col gap-2">
						{paymentMethods.map((method) => (
							<Label
								key={method.id}
								htmlFor={method.id}
								className={cn(
									"flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors",
									selected === method.id
										? "border-primary-border"
										: "border-soft-alpha"
								)}>
								<Image
									src={method.logo}
									alt={method.name}
									width={46}
									height={30}
								/>
								<div className="flex flex-1 flex-col gap-1 text-sm">
									<span className="text-fg font-medium">{method.name}</span>
									<span className="text-fg-tertiary font-normal">
										{method.description}
									</span>
								</div>
								<RadioGroupItem value={method.id} id={method.id} />
							</Label>
						))}
					</RadioGroup>
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button color="neutral" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button variant="strong">Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
