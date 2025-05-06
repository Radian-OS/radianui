"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { format, isValid, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { ChevronProps, DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { DatePickerProps } from "../ui/date-picker"
import { formatTime, timeOptions, TimeSelector } from "../ui/calendar"

export function TypeableDatePicker({
    // selected,
    size,
    // onSelect,
    label,
    rounded,
    disables,
    hasError,
    // mode = "single",
    // triggerClassName,
    // onSelect: customOnSelect,
    classNames,
    // showShortcut = true,
    components,
    // showOutsideDays = true,
    navigatorStyle = "button",
    showTime = false,
    dualCalendar = false,
    // defaultDateRangeShortcutValue,
    className,
    footer,
    ...props
}: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [inputValue, setInputValue] = useState<string>("")
    const [isEditing, setIsEditing] = useState(false)
    const [open, setOpen] = useState(false)

    // Update input value when date changes (from calendar selection)
    // Only update if we're not currently editing the input
    useEffect(() => {
        if (date && !isEditing) {
            setInputValue(format(date, "MM/dd/yyyy"))
        }
    }, [date, isEditing])

    // Handle input change without immediate date parsing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)

        // Don't try to parse while editing - just update the input value
    }

    // Parse the date when the input loses focus
    const handleInputBlur = () => {
        setIsEditing(false)

        try {
            // Only try to parse if we have something close to a complete date
            if (inputValue.length >= 8) {
                const parsedDate = parse(inputValue, "MM/dd/yyyy", new Date())

                if (isValid(parsedDate)) {
                    setDate(new Date(parsedDate))
                }
            }
        } catch (error) {
            // If parsing fails, don't update the date
            console.log("Invalid date format", error)
        }
    }

    // Set editing mode when input is focused
    const handleInputFocus = () => {
        setIsEditing(true)
    }

    // Function to handle calendar opening
    // const handleCalendarToggle = () => {
    //     setOpen(!open)
    // }

    const mergedClassName = cn(`p-3 bg-bg-level1 ${showTime ? " border-r" : ""}`, className)
    const hideCaption: boolean = false

    // Merged class names for styling
    const mergedClassNames: Record<string, string> = {
        root: cn({ "cursor-not-allowed": props.disabled }),
        months: cn("relative flex flex-col bg-bg-level1 w-full gap-5 p-0", {
            "flex-row pt-10": navigatorStyle === "selector",
            "sm:flex-row": navigatorStyle !== "selector",
        }),
        month_caption: cn("mx-10 flex items-center justify-center z-20 p-0 text-sm font-semibold h-7", {
            hidden: props.hideNavigation || hideCaption || (navigatorStyle === "selector" && !dualCalendar),
        }),
        nav: "absolute top-0 flex w-full justify-between z-10 p-0",
        month: "flex flex-col gap-3",
        month_grid: "flex flex-col gap-1.5 items-center",
        weekdays: "w-full flex gap-1.5",
        weekday: "text-text-tertiary text-sm font-medium size-8 shrink-0 flex items-center justify-center",
        weeks: "w-full flex flex-col gap-1.5",
        week: "w-full flex gap-1.5",
        day: "size-8 p-0 shrink-0 group text-sm aria-selected:opacity-100",
        day_button:
            "text-center rounded-lg text-text text-sm font-medium hover:bg-bg-level1 size-8 p-0 hover:group-data-selected:bg-primary group-data-disabled:pointer-events-none group-data-selected:bg-primary hover:group-[.rdp-outside]:group-data-selected:bg-primary/10 group-[.rdp-outside]:group-data-selected:bg-primary/10 group-[.rdp-outside]:group-data-selected:text-text-tertiary group-data-selected:text-white group-data-disabled:text-text-tertiary group-data-outside:text-text-tertiary group-data-today:border group-data-today:border-primary hover:group-[.range-middle]:group-data-selected:bg-primary/10 group-[.range-middle]:group-data-selected:bg-primary/10 group-[.range-middle]:group-data-selected:text-text group-data-selected:group-data-outside:text-white",
        button_previous: cn("border rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
            "pointer-events-none": props.disabled,
        }),
        button_next: cn("border rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
            "pointer-events-none": props.disabled,
        }),
        range_start: "range-start",
        range_middle: "range-middle",
        range_end: "range-end",
        ...classNames,
    }

    // Merged components including custom ones
    const mergedComponents = {
        Chevron: (props: ChevronProps) => {
            if (props.orientation === "left") return <ChevronLeft size={16} className="stroke-text" />
            return <ChevronRight size={16} className="stroke-text" />
        },
        // ...customComponents,
        ...components,
    }

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);



    return (
        <Popover open={open} onOpenChange={(newOpen) => {
            if (!isEditing) {
                setOpen(newOpen)
            }
        }}>
            <PopoverTrigger disabled={disables}>
                <Input
                    size={size}
                    label={label}
                    value={inputValue}
                    rounded={rounded}
                    disabled={disables}
                    hasError={hasError}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    errorMsg={hasError ? "There is an error" : undefined}
                    placeholder="MM/DD/YYYY"
                    className={cn(
                        "w-[320px]",
                        date && !isEditing ? "border-primary" : "border-input",
                    )}
                    trial={<CalendarIcon className={cn(disables ? "cursor-not-allowed" : "cursor-pointer")}
                    />}
                />
            </PopoverTrigger>


            <PopoverContent className="w-auto p-0 border-none">
                <div className="w-fit rounded-xl bg-bg-level1 border border-border drop-shadow-xs overflow-hidden">
                    <div className={`flex ${footer ? "border-b" : ""} overflow-hidden`}>
                        <DayPicker
                            mode="single"
                            selected={date}
                            month={date}
                            onSelect={(selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate)
                                    setInputValue(format(selectedDate, "MM/dd/yyyy"))
                                    setIsEditing(false)
                                }
                            }}
                            className={mergedClassName}
                            showOutsideDays
                            defaultMonth={date || new Date()}
                            components={mergedComponents}
                            classNames={mergedClassNames}
                        />
                        {
                            showTime && (
                                <TimeSelector
                                    timeOptions={timeOptions}
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                    formatTime={formatTime}
                                    showTime={showTime}
                                />
                            )
                        }
                    </div>
                    <div className=" flex w-full justify-end">
                        {footer && footer}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
