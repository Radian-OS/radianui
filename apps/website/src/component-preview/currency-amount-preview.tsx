"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
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
import { CodeArea } from "@/registry/ui/code"
import { CurrencyInput } from "@/registry/ui/currency"

const CurrencyInputPreview = () => {
    const [currency, setCurrency] = useState("usd")
    const [value, setValue] = useState("100")
    const [placeholder, setPlaceholder] = useState("Enter amount")
    const [disabled, setDisabled] = useState("false")
    const [key, setKey] = useState(0)

    return (
        <Tabs defaultValue="preview" className="mb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dropdown>
                        <DropdownTrigger>Properties</DropdownTrigger>
                        <DropdownContent className="min-w-20">
                            <DropdownSub>
                                <DropdownSubTrigger>Currency</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setCurrency(Array.from(keys)[0])
                                            setKey((k) => k + 1)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[currency]}>
                                        <DropdownItem value="usd">USD</DropdownItem>
                                        <DropdownItem value="eur">EUR</DropdownItem>
                                        <DropdownItem value="gbp">GBP</DropdownItem>
                                        <DropdownItem value="jpy">JPY</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>

                            <DropdownSub>
                                <DropdownSubTrigger>Value</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setValue(Array.from(keys)[0])
                                            setKey((k) => k + 1)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[value]}>
                                        <DropdownItem value="100">$100</DropdownItem>
                                        <DropdownItem value="1000">$1,000</DropdownItem>
                                        <DropdownItem value="10000">$10,000</DropdownItem>
                                        <DropdownItem value="">Empty</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>

                            <DropdownSub>
                                <DropdownSubTrigger>Placeholder</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setPlaceholder(Array.from(keys)[0])
                                            setKey((k) => k + 1)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[placeholder]}>
                                        <DropdownItem value="Enter amount">Enter amount</DropdownItem>
                                        <DropdownItem value="0.00">0.00</DropdownItem>
                                        <DropdownItem value="Payment amount">Payment amount</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>

                            <DropdownSub>
                                <DropdownSubTrigger>Disabled</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        onSelectedChange={(keys) => {
                                            setDisabled(Array.from(keys)[0])
                                            setKey((k) => k + 1)
                                        }}
                                        minSelectionCount={1}
                                        selectedValues={[disabled]}>
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
                <div className="flex h-[420px] flex-col items-center justify-center p-10 rounded-xl border">
                    {/* <div className="w-full max-w-sm"> */}
                    <CurrencyInput
                        key={key}
                        currency={currency}
                        value={value}
                        placeholder={placeholder}
                        disabled={disabled === "true"}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-80"
                    />
                    {/* </div> */}
                </div>
            </TabsContent>
            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={`<CurrencyInput
  currency="${currency}"
  value="${value}"
  placeholder="${placeholder}"
  disabled={${disabled}}
  onChange={(e) => setValue(e.target.value)}
/>`}
                />
            </TabsContent>
        </Tabs>
    )
}

export default CurrencyInputPreview