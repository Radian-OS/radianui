"use client"

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
import Switch from "@/registry/ui/switch"

const SwitchPreview = () => {
    type sizeProps = "20" | "24"
    type disabledType = "true" | "false"
    const [size, setSize] = useState<sizeProps>("20")
    const [disabled, setDisabled] = useState<disabledType>("false")

    return (
        <Tabs defaultValue="preview" className="mb-10">
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
                                            setSize(Array.from(keys)[0] as sizeProps)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[size]}>
                                        <DropdownItem value="20">20</DropdownItem>
                                        <DropdownItem value="24">24</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>Disabled</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setDisabled(Array.from(keys)[0] as disabledType)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[disabled]}>
                                        <DropdownItem value="true">true</DropdownItem>
                                        <DropdownItem value="false">false</DropdownItem>
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
                <div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
                    <Switch size={size} disabled={disabled === "true"} >
                        Switch Label
                    </Switch>
                </div>
            </TabsContent>
            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={``}
                />
            </TabsContent>
        </Tabs>
    )
}

export default SwitchPreview
