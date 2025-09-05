"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type SearchProps = {
	renderSearchResults?: () => React.ReactNode
	showSearchResults?: boolean /* Manually control to show the search results popover */
	defaultShowSearchResults?: boolean
	suggestion?: boolean
}
// Defines the SearchInput functional component
function SearchInput({ renderSearchResults, showSearchResults, defaultShowSearchResults = false, suggestion = false }: SearchProps) {
	const [showResultsInternal, setShowResults] = React.useState(defaultShowSearchResults)
	const showResults = showSearchResults ? showSearchResults : showResultsInternal
	// Effect to control visibility of search results based on the input value
	// React.useEffect(
	// 	function () {
	// 		const newValue = value?.toString().trim() || ""
	// 		if (newValue.length > 0 && renderSearchResults) {
	// 			setShowResults(true)
	// 		} else if (newValue.length === 0) {
	// 			setShowResults(false)
	// 		}
	// 	},
	// 	[value, renderSearchResults]
	// )

	return (
		<Popover open={showResults}>
			<PopoverTrigger asChild>
				<div>{/* <Input size={size} id={id} value={value} {...props} /> */}</div>
			</PopoverTrigger>
			{suggestion && (
				<PopoverContent
					align="start"
					onOpenAutoFocus={function (e) {
						e.preventDefault()
					}}
					className={cn("no-scrollbar max-h-88 bg-elevation-level1 z-50 overflow-y-scroll p-0")}
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
