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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Input } from "@/registry/ui/input"
import { Select, SelectItem } from "@/registry/ui/select"
import { Label } from "@/registry/ui/label"


export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const booleanOptions = ["true", "false"]
export type domainOption = ".com" | ".org" | ".net"


const UrlPreview = () => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const [suffixIcon, setSuffixIcon] = useState<boolean>(false)
    const [prefixIcon, setPrefixIcon] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)
    const [label, setLabel] = useState<boolean>(true)
    const [domain, setDomain] = useState<domainOption>(".com")



    return (
        <Tabs defaultValue="preview" className="mb-10 mt-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dropdown>
                        <DropdownTrigger>Properties</DropdownTrigger>
                        <DropdownContent>
                            <DropdownSub>
                                <DropdownSubTrigger>Label</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[String(label)]}
                                        onSelectedChange={(values) => setLabel(values[0] === "true")}
                                        minSelectionCount={1}>
                                        {booleanOptions.map((val) => (
                                            <DropdownItem value={val} key={val}>
                                                {val}
                                            </DropdownItem>
                                        ))}
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>Disabled</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[String(disabled)]}
                                        onSelectedChange={(values) => setDisabled(values[0] === "true")}
                                        minSelectionCount={1}>
                                        {booleanOptions.map((option) => (
                                            <DropdownItem key={option} value={option}>
                                                {option}
                                            </DropdownItem>
                                        ))}
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>LeadOptions</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[String(prefixIcon)]}
                                        onSelectedChange={(values) => setPrefixIcon(values[0] === "true")}
                                        minSelectionCount={1}>
                                        <DropdownItem value="true">Yes</DropdownItem>
                                        <DropdownItem value="false">No</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>TrailOptions</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[String(suffixIcon)]}
                                        onSelectedChange={(values) => setSuffixIcon(values[0] === "true")}
                                        minSelectionCount={1}>
                                        <DropdownItem value="true">Yes</DropdownItem>
                                        <DropdownItem value="false">No</DropdownItem>
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
                        {label && (<Label>Url</Label>)}
                        <div className="flex rounded-md shadow-xs">
                            <Input
                                size="36"
                                disabled={disabled}
                                className="-me-px rounded-e-none shadow-none"
                                placeholder="radianos"
                                type="text"
                                lead={prefixIcon ? "https://" : ""}
                                hasError={hasError}
                                errorMsg={hasError ? "Invalid Email" : undefined}
                            />
                            {
                                suffixIcon && (
                                    <Select
                                        selectedValues={[domain]}
                                        onSelectedChange={(values) => setDomain(values[0] as domainOption)}
                                        disabled={disabled}
                                        disableOpenStyle={true}
                                        size="36"
                                        className=" -ms-2 w-fit">
                                        <SelectItem value=".com">.com</SelectItem>
                                        <SelectItem value=".org">.org</SelectItem>
                                        <SelectItem value=".net">.net</SelectItem>
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                </div>

            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={suffixIcon ? (
                        `
<div className="*:not-first:mt-2">
    {label && <Label>Url</Label>}
    <div className="flex rounded-md shadow-xs">
        <Input
            size="36"
            className="-me-px rounded-e-none shadow-none"
            placeholder="radianos"
            type="text"
            />
                {suffixIcon && (
                    <Select
                        selectedValues={[domain]}
                        onSelectedChange={(values) => setDomain(values[0] as domainOption)}
                        disabled={disabled}
                        disableOpenStyle={true}
                        size="36"
                        className="-ms-2 w-fit"
                    >
                        <SelectItem value=".com">.com</SelectItem>
                        <SelectItem value=".org">.org</SelectItem>
                        <SelectItem value=".net">.net</SelectItem>
                    </Select>
            )}
    </div>
</div>`
                    ) : (
                        `
<Input
    type="url"
    disabled={disabled}
    label={label ? "Url" : undefined}
    placeholder="Enter your url here"
    lead={prefixIcon ? "https://" : undefined}
    hasError={hasError}
    errorMsg={hasError ? "There is an error" : undefined}
/>`
                    )}
                />
            </TabsContent>
        </Tabs>
    )
}

export default UrlPreview
