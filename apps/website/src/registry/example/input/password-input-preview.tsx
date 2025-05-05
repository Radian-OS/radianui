import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { useState } from "react"
import { Password } from "@/registry/ui/password"

export type SizeOptions = "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ExampleOptions = "default" | "disabled"

const PasswordInputPreview = () => {
    const [example, setExample] = useState<ExampleOptions>("default")
    const [hasError, setHasError] = useState<boolean>(false)

    // Determine props based on selected example
    const getPasswordProps = () => {
        const baseProps = {
            rounded: "lg" as RoundedOptions,
            size: "36" as SizeOptions,
            placeholder: "Enter your password",
            hasError: hasError,
            errorMsg: hasError ? "Password must be at least 8 characters" : undefined,
            className: "w-[320px]",
            label: "Password"
        }

        if (example === "disabled") {
            return {
                ...baseProps,
                disabled: true
            }
        }

        return baseProps
    }

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
                                        selectedValues={[String(example)]}
                                        onSelectedChange={(values) => setExample(values[0] as ExampleOptions)}
                                        minSelectionCount={1}>
                                        <DropdownItem value="default">Default</DropdownItem>
                                        <DropdownItem value="disabled">Disabled</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>Has Error</DropdownSubTrigger>
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
                    <div className="flex flex-col items-center">
                        <Password {...getPasswordProps()} />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={`// Example usage of the Password component
${example === "default" ?
                            `<Password
  label="Password"
  placeholder="Enter your password"
  ${hasError ? `hasError={true}
  errorMsg="Password must be at least 8 characters"`: ''}
/>` :
                            `<Password
  label="Password"
  placeholder="Enter your password"
  disabled={true}
  ${hasError ? `hasError={true}
  errorMsg="Password must be at least 8 characters"` : ''}
/>`}`}
                />
            </TabsContent>
        </Tabs>
    )
}

export default PasswordInputPreview