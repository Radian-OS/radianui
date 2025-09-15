import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
type domainOption = ".com" | ".org" | ".net"
type typeOptions = "end" | "start" | "default"
const sizes = ["28", "32", "36", "40", "44", "48"]

const UrlPreview = () => {
	const [types, setType] = useState<typeOptions>("default")
	const [size, setSize] = useState<SizeOptions>("36")
	const [domain, setDomain] = useState<domainOption>(".com")

	return (
		<Tabs className="mt-3" defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
									{sizes.map((size) => (
										<DropdownRadioItem value={size} key={size} onSelect={(e) => e.preventDefault()}>
											{size}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Examples</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={types} onValueChange={(value) => setType(value as typeOptions)}>
									<DropdownRadioItem value="default" onSelect={(e) => e.preventDefault()}>
										Default
									</DropdownRadioItem>
									<DropdownRadioItem value="start" onSelect={(e) => e.preventDefault()}>
										Start
									</DropdownRadioItem>
									<DropdownRadioItem value="end" onSelect={(e) => e.preventDefault()}>
										End
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						<div className="flex">
							<InputGroup className="w-80">
								{types === "start" ? <InputAddon size={size}>https://</InputAddon> : null}
								<Input size={size} className={`${types === "end" ? "w-fit rounded-r-none border-r-0 focus-within:border-r" : ""}`} placeholder="radianos.com" type="url" />
								{types === "end" ? (
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
								) : null}
							</InputGroup>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="url-input-preview.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { Input,InputGroup } from "@/components/ui/input"
${
	types === "end"
		? `import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select"
import { useState } from "react"

type domainOption = ".com" | ".org" | ".net"
	`
		: ""
}
export default function UrlInputExample() {
${
	types === "end"
		? `	
  const [domain, setDomain] = useState<domainOption>(".com")
	`
		: ""
}
  return (    						
	<InputGroup className="w-80">
		${types === "start" ? `<InputAddon size={${size}}>https://</InputAddon>` : ""}
		<Input size={${size}} placeholder="radianos.com" type="url" />
		${
			types === "end"
				? `	
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
									`
				: ""
		}
	</InputGroup>
  );
}
						
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default UrlPreview
