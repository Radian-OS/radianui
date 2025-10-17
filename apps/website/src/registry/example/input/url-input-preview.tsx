import { useState } from "react"
import { Input, InputGroup, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

type domainOption = ".com" | ".org" | ".net"

const UrlPreview = () => {
	const [domain, setDomain] = useState<domainOption>(".com")

	return (
		<div className="flex w-80 flex-col gap-4">
			{/* Default Url Input */}
			<div className="flex flex-col gap-1.5">
				<Label>Default Url Input</Label>
				<Input type="url" className="w-full" placeholder="radianos.com" />
			</div>

			{/* Input Group */}
			<div className="flex flex-col gap-1.5">
				<Label>Input Group</Label>
				<div className="flex">
					<InputGroup className="w-full">
						<Input className="rounded-r-none border-r-0 focus-within:border-r md:w-fit" placeholder="radianos.com" type="url" />
						<Select value={domain} onValueChange={(values) => setDomain(values as domainOption)}>
							<SelectTrigger className="w-fit rounded-l-none">
								<SelectValue />
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

			{/* Input Wrapper */}
			<div className="flex flex-col gap-1.5">
				<Label>Input Wrapper</Label>
				<InputWrapper className="w-full">
					<p> https://</p>
					<Input type="url" placeholder="designer@radianos.com" />
				</InputWrapper>
			</div>
		</div>
	)
}

export default UrlPreview
