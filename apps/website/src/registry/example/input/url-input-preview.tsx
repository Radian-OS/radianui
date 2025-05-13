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
// const booleanOptions = ["true", "false"]
export type domainOption = ".com" | ".org" | ".net"
export type typeOptions = "trail" | "lead" | "default"

const UrlPreview = () => {
	const [domain, setDomain] = useState<domainOption>(".com")
	const [types, setType] = useState<typeOptions>("default")
	const [hasError, setHasError] = useState<boolean>(false)
	console.log("domain", types)

	return (
		<Tabs defaultValue="preview" className="mb-10 mt-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
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
							<DropdownSub>
								<DropdownSubTrigger>HasError</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(hasError)]}
										onSelectedChange={(values) => setHasError(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">Yes</DropdownItem>
										<DropdownItem value="false">No</DropdownItem>
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
					<div className="*:not-first:mt-2">
						<Label>Url</Label>
						<div className="flex rounded-md">
							<Input
								classNames={{ base: "w-[320px]" }}
								size="36"
								custom={types === "trail" ? true : false}
								placeholder="radianos.com"
								type="url"
								lead={types === "lead" ? "https://" : ""}
								hasError={hasError}
								errorMsg={hasError ? "There is an error" : undefined}
							/>

							{types === "trail" ? (
								<Select
									selectedValues={[domain]}
									onSelectedChange={(values) => setDomain(values[0] as domainOption)}
									disableOpenStyle={true}
									size="36"
									className="-ms-[2px] w-fit">
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
							? `<div className="*:not-first:mt-2">
    <Label>Url</Label>
    <div className="flex rounded-md shadow-xs">
        <Input
            size="36"
            placeholder="radianos"
            type="url"
            lead="https://"
        />

        <Select
            selectedValues={[domain]}
            onSelectedChange={(values) => setDomain(values[0] as domainOption)}
            size="36"
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
