"use client"

import { useState } from "react"
import { type CountryCode, Flag } from "@radianui/flags"
import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const countries = [
	{ code: "US", name: "United States" },
	{ code: "IN", name: "India" },
	{ code: "CN", name: "China" },
	{ code: "GB", name: "United Kingdom" },
	{ code: "JP", name: "Japan" },
] as const satisfies ReadonlyArray<{ code: CountryCode; name: string }>

export default function FlagCountrySelect() {
	const [country, setCountry] = useState<CountryCode>("US")

	return (
		<div className="flex w-full max-w-64 flex-col gap-2">
			<Label htmlFor="country">Country</Label>
			<Select
				value={country}
				onValueChange={(value) => setCountry(value as CountryCode)}>
				<SelectTrigger id="country" className="w-full">
					<SelectValue placeholder="Select a country" />
				</SelectTrigger>
				<SelectContent>
					{countries.map((item) => (
						<SelectItem key={item.code} value={item.code}>
							<span className="flex items-center gap-2">
								<Flag country={item.code} size={20} />
								{item.name}
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
