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
import DatePicker from "@/registry/ui/date-picker"


export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type DatePickerModes = "single" | "multiple" | "range" | "time"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]
const booleanOptions = ["true", "false"]

const DatePickerPreview = () => {
    const [rounded, setRounded] = useState<RoundedOptions>("sm")
    const [size, setSize] = useState<SizeOptions>("40")
    const [disabled, setDisabled] = useState<boolean>(false)
    const [mode, setMode] = useState<DatePickerModes>("single")
    const [showDateRangeShortcut, setShowDateRangeShortcut] = useState<boolean>(false)
    const [doubleCalendar, setDoubleCalendar] = useState<boolean>(false)
    const [navigatorStyle, setNavigatorStyle] = useState<"button" | "selector">("button")


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
                                <DropdownSubTrigger>mode</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[mode]}
                                        onSelectedChange={(values) => setMode(values[0] as DatePickerModes)}
                                        minSelectionCount={1}>
                                        <DropdownItem value="single">Single</DropdownItem>
                                        <DropdownItem value="multiple">Multiple</DropdownItem>
                                        <DropdownItem value="range">Range</DropdownItem>
                                        <DropdownItem value="time">Time</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>showDateRangeShortcut</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[String(showDateRangeShortcut)]}
                                        onSelectedChange={(values) => setShowDateRangeShortcut(values[0] === "true")}
                                        minSelectionCount={1}>
                                        <DropdownItem value="true">Yes</DropdownItem>
                                        <DropdownItem value="false">No</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>doubleCalendar</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[String(doubleCalendar)]}
                                        onSelectedChange={(values) => setDoubleCalendar(values[0] === "true")}
                                        minSelectionCount={1}>
                                        <DropdownItem value="true">Yes</DropdownItem>
                                        <DropdownItem value="false">No</DropdownItem>
                                    </DropdownGroup>
                                </DropdownSubContent>
                            </DropdownSub>
                            <DropdownSub>
                                <DropdownSubTrigger>navigatorStyle</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownGroup
                                        selectionMode="single"
                                        selectedValues={[navigatorStyle]}
                                        onSelectedChange={(values) => setNavigatorStyle(values[0] as "button" | "selector")}
                                        minSelectionCount={1}>
                                        <DropdownItem value="button">Button</DropdownItem>
                                        <DropdownItem value="selector">Selector</DropdownItem>
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
                    <DatePicker
                        mode={mode}
                        placeholder="Select Date"
                        triggerClassName="w-[320px]"
                        showDateRangeShortcut={showDateRangeShortcut}
                        disabled={disabled}
                        doubleCalendar={doubleCalendar}
                        navigatorStyle={navigatorStyle}
                        size={size}
                        rounded={rounded}
                    />
                </div>
            </TabsContent>

            <TabsContent value="code">
                <CodeArea
                    language="tsx"
                    showLineNumbers
                    className="h-[420px]"
                    code={`  
<DatePicker
    mode="${mode}"
    placeholder="Select Date"
    showDateRangeShortcut="${showDateRangeShortcut}"
    disabled="${disabled}"
    doubleCalendar="${doubleCalendar}"
    navigatorStyle="${navigatorStyle}"
    size="${size}"
    rounded="${rounded}"
/>`}
                />
            </TabsContent>
        </Tabs>
    )
}

export default DatePickerPreview
