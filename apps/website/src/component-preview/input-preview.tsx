import { useState } from "react"
import { Alert } from "@/registry/ui/alert"
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
import { CircleUserRound } from "lucide-react"


export type SizeOptions = "32" | "36" | "40" | "44" | "48" | "56"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["32", "36", "40", "44", "48", "56"]
const booleanOptions = ["true", "false"]

const InputPreview = () => {
    const [rounded, setRounded] = useState<RoundedOptions>("lg")
    const [size, setSize] = useState<SizeOptions>("40")
    const [disabled, setDisabled] = useState<boolean>(false)
    const [suffixIcon, setSuffixIcon] = useState<boolean>(false)
    const [prefixIcon, setPrefixIcon] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const [label, setLabel] = useState<boolean>(true)


    return (
        <Tabs defaultValue="preview" className="mb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dropdown>
                        <DropdownTrigger>Properties</DropdownTrigger>
                        <DropdownContent>
                            <DropdownSub>
                                <DropdownSubTrigger>Rounded</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[rounded]}
                                        onSelectedChange={(values) => setRounded(values[0] as RoundedOptions)}
                                        minSelectionCount={1}>
                                        {roundedOptions.map((roundedOption) => (
                                            <DropdownItem value={roundedOption} key={roundedOption}>
                                                {roundedOption}
                                            </DropdownItem>
                                        ))}
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
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
                                <DropdownSubTrigger>SuffixIcon</DropdownSubTrigger>
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
                                <DropdownSubTrigger>PrefixIcon</DropdownSubTrigger>
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
                        rounded={rounded}
                        size={size}
                        disabled={disabled}
                        label={label ? "Username" : undefined}
                        placeholder="Enter your username here"
                        prefixIcon={prefixIcon ? <CircleUserRound /> : null}
                        suffixIcon={suffixIcon ? <CircleUserRound /> : null}
                        hasError={hasError}
                        errorMsg={hasError ? "There is an error" : undefined} />
                </div>
            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={`<Input 
    rounded="${rounded}"
    size="${size}"
    disabled="${disabled}"
    label="${label ? "Username" : undefined}"
    placeholder="Enter your username here"
    prefixIcon="${prefixIcon ? <CircleUserRound /> : null}"
    suffixIcon="${suffixIcon ? <CircleUserRound /> : null}"
    hasError="${hasError}"
    errorMsg="${hasError ? "There is an error" : undefined}"
/>`}
                />
            </TabsContent>
        </Tabs>
    )
}

export default InputPreview
