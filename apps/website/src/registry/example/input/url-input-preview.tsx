import { useState } from "react"
import { CodeArea } from "@/registry/ui/code"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectItem } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type domainOption = ".com" | ".org" | ".net"
export type typeOptions = "trail" | "lead" | "default"
const sizes = ["28", "32", "36", "40", "44", "48"]

const UrlPreview = () => {
	const [domain, setDomain] = useState<domainOption>(".com")
	const [types, setType] = useState<typeOptions>("default")
	const [size, setSize] = useState<SizeOptions>("36")

	return (
		<Tabs defaultValue="preview" className="mb-10 mt-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[size]}
										onSelectedChange={(values) => setSize(values[0] as SizeOptions)}
										minSelectionCount={1}>
										{sizes.map((size) => (
											<DropdownItem value={size} key={size}>
												{size}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Examples</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(types)]}
										onSelectedChange={(values) => setType(values[0] as typeOptions)}
										minSelectionCount={1}>
										<DropdownItem value="default">Default</DropdownItem>
										<DropdownItem value="trail">Trail</DropdownItem>
										<DropdownItem value="lead">Lead</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						<Label>Url</Label>
						<div className="flex rounded-md">
							<Input
								className={`w-80 ${types === "trail" ? "border-r-0 focus-within:border-r" : ""} `}
								size={size}
								custom={types === "trail" ? true : false}
								placeholder="radianos.com"
								type="url"
								lead={types === "lead" ? "https://" : ""}
								// hasError={hasError}
								// hint={hint ? "There is an error" : ""}
							/>

							{types === "trail" ? (
								<Select
									minSelectionCount={1}
									selectedValues={[domain]}
									onSelectedChange={(values) => setDomain(values[0] as domainOption)}
									disableOpenStyle={true}
									size={size}
									className="-ms-0 w-fit">
									<SelectItem value=".com">.com</SelectItem>
									<SelectItem value=".org">.org</SelectItem>
									<SelectItem value=".net">.net</SelectItem>
								</Select>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={
						types === "trail"
							? `<div className="flex gap-1.5 flex-col">
    <Label>Url</Label>
    <div className="flex rounded-md shadow-xs">
        <Input
			className="w-80 border-r-0 focus-within:border-r"
            size="${size}"
            placeholder="radianos"
            type="url"
            lead="https://"

        />

        <Select
            selectedValues={[domain]}
            onSelectedChange={(values) => setDomain(values[0] as domainOption)}
            size="${size}"
            className="-ms-0 w-fit">
            <SelectItem value=".com">.com</SelectItem>
            <SelectItem value=".org">.org</SelectItem>
            <SelectItem value=".net">.net</SelectItem>
        </Select>

    </div>
</div>`
							: types === "lead"
								? `<Input
    size="36"
    placeholder="radianos.com"
    type="url"
    lead="https://"
/>`
								: `<Input
    size="36"
    placeholder="radianos.com"
    type="url"
/>`
					}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default UrlPreview
