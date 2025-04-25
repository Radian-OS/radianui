import { useState } from "react"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Input } from "@/registry/ui/input"
import { Select, SelectItem } from "@/registry/ui/select"
import { Label } from "@/registry/ui/label"
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

export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const booleanOptions = ["true", "false"]
export type domainOption = ".com" | ".org" | ".net"


const UrlPreview = () => {
    const [domain, setDomain] = useState<domainOption>(".com")
    const [suffixIcon, setSuffixIcon] = useState<boolean>(false)
    const [prefixIcon, setPrefixIcon] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)



    return (
        <Tabs defaultValue="preview" className="mb-10 mt-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dropdown>
                        <DropdownTrigger>Properties</DropdownTrigger>
                        <DropdownContent>
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
                        <Label>Url</Label>
                        <div className="flex rounded-md shadow-xs">
                            <Input
                                size="36"
                                custom={true}
                                placeholder="radianos"
                                type="url"
                                lead="https://"
                            />

                            <Select
                                selectedValues={[domain]}
                                onSelectedChange={(values) => setDomain(values[0] as domainOption)}
                                disableOpenStyle={true}
                                size="36"
                                className=" -ms-0 w-fit">
                                <SelectItem value=".com">.com</SelectItem>
                                <SelectItem value=".org">.org</SelectItem>
                                <SelectItem value=".net">.net</SelectItem>
                            </Select>

                        </div>
                    </div>
                </div>

            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={`<div className="*:not-first:mt-2">
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
</div>`}
                />
            </TabsContent>
        </Tabs>
    )
}

export default UrlPreview
