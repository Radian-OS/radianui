import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Password } from "@/registry/ui/password"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { useState } from "react"

export type SizeOptions = "32" | "36" | "40" | "44" | "48"
export type LabelOptions = "true" | "false"
export type DisabledOptions = "true" | "false"
export type ErrorOptions = "true" | "false"



const PasswordInputPreview = () => {

    const [size, setSize] = useState<SizeOptions>("36")
    const [disabled, setDisabled] = useState<DisabledOptions>("false")
    const [label, setLabel] = useState<LabelOptions>("true")
    const [error, setError] = useState<ErrorOptions>("true")


    const code = `<Password
    ${label === "true" ? 'label="Password"' : ''}
    ${disabled === "true" ? 'disabled={true}' : ''}
    ${size !== "36" ? `size="${size}"` : ''}
    ${error === "true" ? 'hasError={true}\n  errorMsg="Error Occurred"' : ''}
  />`



    return (
        <Tabs defaultValue="preview" className="mb-10 mt-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dropdown>
                        <DropdownTrigger>Properties</DropdownTrigger>
                        <DropdownContent className="min-w-20">
                            <DropdownSub>
                                <DropdownSubTrigger>Size</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setSize(Array.from(keys)[0] as SizeOptions)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[size]}>
                                        <DropdownItem value="32">32</DropdownItem>
                                        <DropdownItem value="36">36</DropdownItem>
                                        <DropdownItem value="40">40</DropdownItem>
                                        <DropdownItem value="44">44</DropdownItem>
                                        <DropdownItem value="48">48</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>

                            <DropdownSub>
                                <DropdownSubTrigger>Disabled</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setDisabled(Array.from(keys)[0] as DisabledOptions)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[disabled]}>
                                        <DropdownItem value="true">True</DropdownItem>
                                        <DropdownItem value="false">False</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>

                            <DropdownSub>
                                <DropdownSubTrigger>Error</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setError(Array.from(keys)[0] as ErrorOptions)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[error]}>
                                        <DropdownItem value="true">True</DropdownItem>
                                        <DropdownItem value="false">False</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>

                            <DropdownSub>
                                <DropdownSubTrigger>Label</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setLabel(Array.from(keys)[0] as LabelOptions)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[label]}>
                                        <DropdownItem value="true">True</DropdownItem>
                                        <DropdownItem value="false">False</DropdownItem>
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
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-col items-center gap-5 w-full">
                            <Password
                                label={label === "true" ? "Password" : ''}
                                disabled={disabled === "true"}
                                size={size}
                                hasError={error === "true"}
                                errorMsg="Error Occoured"
                            />
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={code}
                />
            </TabsContent>
        </Tabs>
    )
}

export default PasswordInputPreview