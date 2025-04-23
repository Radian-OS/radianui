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
import { ArrowRight, Mail } from "lucide-react"


export type SizeOptions = "32" | "36" | "40" | "44" | "48" | "56"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const booleanOptions = ["true", "false"]
export type iconOptions = "Mail" | "Arrow" | "Default"

const EmailPreview = () => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const [suffixIcon, setSuffixIcon] = useState<iconOptions>("Default")
    const [hasError, setHasError] = useState<boolean>(false)
    const [label, setLabel] = useState<boolean>(true)


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
                                <DropdownSubTrigger>Variant</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[String(suffixIcon)]}
                                        onSelectedChange={(values) => setSuffixIcon(values[0] as iconOptions)}
                                        minSelectionCount={1}>
                                        <DropdownItem value="Default">Default</DropdownItem>
                                        <DropdownItem value="Mail">Mail</DropdownItem>
                                        <DropdownItem value="Arrow">Arrow</DropdownItem>
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
                    <Input classNames={{ base: "w-[320px]" }}
                        type="email"
                        disabled={disabled}
                        label={label ? "Email" : undefined}
                        placeholder="designer@radianos.com"
                        trial={
                            suffixIcon === "Mail" ? (
                                <Mail />
                            ) : suffixIcon === "Arrow" ? (
                                <ArrowRight />
                            ) : (
                                ""
                            )
                        } hasError={hasError}
                        errorMsg={hasError ? "Invalid Email" : undefined} />
                </div>
            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={`<Input 
    type="email"
    disabled="${disabled}"
    label="${label ? "Email" : undefined}"
    placeholder="Enter your email here"
    trialIcon="${suffixIcon === "Mail" ? "<Mail />" : "<ArrowRight />"}"
    hasError="${hasError}"
    errorMsg="${hasError ? "There is an error" : undefined}"
/>`}
                />
            </TabsContent>
        </Tabs>
    )
}

export default EmailPreview
