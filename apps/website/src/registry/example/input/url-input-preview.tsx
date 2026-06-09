"use client"

import { useState } from "react"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

type domainOption = ".com" | ".org" | ".net"

const UrlPreview = () => {
	const [domain, setDomain] = useState<domainOption>(".com")

	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>URL Input</Label>
				<Input type="url" className="w-full" placeholder="radianos.com" />
			</div>

			<div className="flex flex-col gap-1.5">
				<Label>Input URL w/protocol</Label>
				<InputGroup className="w-full">
					<InputAddon>
						<p className="text-fg-tertiary">https://</p>
					</InputAddon>{" "}
					<Input type="url" placeholder="radianos.com" />
				</InputGroup>
			</div>

			<div className="flex flex-col gap-1.5">
				<Label>Input URL w/domain selector</Label>
				<div className="flex">
					<InputGroup className="w-full">
						<Input
							className="rounded-r-none border-r-0 focus-within:border-r md:w-fit"
							placeholder="radianos"
							type="url"
						/>
						<Select
							value={domain}
							onValueChange={(values) => setDomain(values as domainOption)}>
							<SelectTrigger className="w-fit rounded-l-none">
								<SelectValue placeholder=".com" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value=".com">.com</SelectItem>
								<SelectItem value=".org">.org</SelectItem>
								<SelectItem value=".net">.net</SelectItem>
							</SelectContent>
						</Select>
					</InputGroup>
				</div>
			</div>
		</div>
	)
}

export default UrlPreview
