"use client"

import React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, InputClassNames, InputProps } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type SearchProps = Omit<InputProps, "prefixIcon" | "suffixIcon"> & {
	renderSearchResults?: () => React.ReactNode
	showSearchResults?: boolean /* Manually control to show the search results popover */
	defaultShowSearchResults?: boolean
	classNames?: InputClassNames & {
		searchResults?: string /* The search results container */
	}
}
// Defines the SearchInput functional component
function SearchInput({
	label,
	errorMsg = "",
	hasError = false,
	size = "40",
	rounded = "md",
	id,
	renderSearchResults,
	value,
	showSearchResults,
	defaultShowSearchResults = false,
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
					<Input
						lead={<Search size={20} className="stroke-text-tertiary" />}
						label={label}
						errorMsg={errorMsg}
						hasError={hasError}
						size={size}
						rounded={rounded}
						id={id}
						value={value}
						{...props}
					/>
				</div>
			</PopoverTrigger>
			<PopoverContent
				onOpenAutoFocus={function (e) {
					e.preventDefault()
				}}
				className={cn("no-scrollbar max-h-88 z-50 overflow-y-scroll p-0", props.classNames?.searchResults)}
				onInteractOutside={function () {
					setShowResults(false)
				}}>
				{renderSearchResults && renderSearchResults()}
			</PopoverContent>
		</Popover>
	)
}
SearchInput.displayName = "Search"

export default SearchInput
