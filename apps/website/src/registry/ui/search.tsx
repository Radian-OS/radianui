"use client"

import React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type SearchProps = Omit<InputProps, "prefixIcon" | "suffixIcon"> & {
	renderSearchResults?: () => React.ReactNode
	showSearchResults?: boolean /* Manually control to show the search results popover */
	defaultShowSearchResults?: boolean
	suggestion?: boolean
}
// Defines the SearchInput functional component
function SearchInput({
	label,
	hint = "",
	hasError = false,
	size = "40",
	id,
	renderSearchResults,
	value,
	showSearchResults,
	defaultShowSearchResults = false,
	suggestion = false,
	...props
}: SearchProps) {
	const [showResultsInternal, setShowResults] = React.useState(defaultShowSearchResults)
	const showResults = showSearchResults ? showSearchResults : showResultsInternal
	// Effect to control visibility of search results based on the input value
	React.useEffect(
		function () {
			const newValue = value?.toString().trim() || ""
			if (newValue.length > 0 && renderSearchResults) {
				setShowResults(true)
			} else if (newValue.length === 0) {
				setShowResults(false)
			}
		},
		[value, renderSearchResults]
	)

	return (
		<Popover open={showResults} align="start">
			<PopoverTrigger asChild>
				<div>
					<Input start={<Search size={20} className="stroke-fg-tertiary" />} label={label} hint={hint} hasError={hasError} size={size} id={id} value={value} {...props} />
				</div>
			</PopoverTrigger>
			{suggestion && (
				<PopoverContent
					onOpenAutoFocus={function (e) {
						e.preventDefault()
					}}
					className={cn("no-scrollbar max-h-88 bg-elevation-level1 z-50 overflow-y-scroll p-0", props.className)}
					onInteractOutside={function () {
						setShowResults(false)
					}}>
					{renderSearchResults && renderSearchResults()}
				</PopoverContent>
			)}
		</Popover>
	)
}
SearchInput.displayName = "Search"

export default SearchInput
