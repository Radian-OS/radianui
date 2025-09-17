import { useState } from "react"
import { Input, InputGroup } from "@/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

type domainOption = ".com" | ".org" | ".net"

const UrlPreview = () => {
	const [domain, setDomain] = useState<domainOption>(".com")

	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex">
				<InputGroup className="w-80">
					<Input className="w-fit rounded-r-none border-r-0 focus-within:border-r" placeholder="radianos.com" type="url" />
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
	)
}

export default UrlPreview
