import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Password } from "@/registry/ui/password"
import Link from "next/link"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { useState } from "react"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type LabelOptions = "true" | "false"
export type DisabledOptions = "true" | "false"
export type ErrorOptions = "true" | "false"
export type TrialOptions = "true" | "false" | "visibilityIcon"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ExampleOptions = "default" | "disabled"

const PasswordInputPreview2 = () => {
    const [size, setSize] = useState<SizeOptions>("36")
    const [disabled, setDisabled] = useState<DisabledOptions>("false")
    const [label, setLabel] = useState<LabelOptions>("true")
    const [error, setError] = useState<ErrorOptions>("false")
    const [trial, setTrial] = useState<TrialOptions>("true")

    const code = `<div className="relative w-full">
  <Link href="#" className="text-primary text-sm absolute right-0">Forgot Password ?</Link>
  <Password
    ${label === "true" ? 'label="Password"' : ''}
    ${disabled === "true" ? 'disabled={true}' : ''}
    ${size !== "36" ? `size="${size}"` : ''}
    ${trial === "false" ? 'trial={false}' : trial === "visibilityIcon" ? 'trial="visibilityIcon"' : ''}
    ${error === "true" ? 'hasError={true}\n  errorMsg="Error Occurred"' : ''}
  />
</div>`

    return (
        <Tabs defaultValue="preview" className="mb-10 mt-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dropdown>
                        <DropdownTrigger>Interact</DropdownTrigger>
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
                                        <DropdownItem value="28">28</DropdownItem>
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

                            <DropdownSub>
                                <DropdownSubTrigger>Trial</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setTrial(Array.from(keys)[0] as TrialOptions)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[trial]}>
                                        <DropdownItem value="true">True</DropdownItem>
                                        <DropdownItem value="false">False</DropdownItem>
                                        <DropdownItem value="visibilityIcon">Visibility Icon</DropdownItem>
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
                    <div className="relative">
                        <Link href="#" className="text-primary text-sm absolute right-0">Forgot Password ?</Link>
                        <Password
                            label={label === "true" ? "Password" : ''}
                            disabled={disabled === "true"}
                            size={size}
                            hasError={error === "true"}
                            errorMsg={error === "true" ? "Error Occurred" : undefined}
                            className="w-80"
                            {...(trial === "false" ? { trial: false } : trial === "visibilityIcon" ? { trial: "visibilityIcon" } : {})}
                        />
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

export default PasswordInputPreview2