import { useEffect, useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import SearchInput from "@/registry/ui/search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

const SearchInputExample = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)
	const [suggestion, setSuggestion] = useState<boolean>(true)
	const [searchResults, setSearchResults] = useState<{ id: string; title: string }[]>([])
	const [searchValue, setSearchValue] = useState("")
	const [hint, setHint] = useState<boolean>(false)

	useEffect(() => {
		const fetchResults = async () => {
			try {
				const results = await fetch("https://dummyjson.com/products/search?q=" + searchValue)
				const data = await results.json()
				if (data.products.length > 0) setSearchResults(data.products)
			} catch (err) {
				console.log(err)
			}
		}
		fetchResults()
	}, [searchValue])

	const handleSearchChange = (value: string) => {
		setSearchValue(value)
	}

	const renderSearchResults = () => {
		if (searchResults.length == 0) return <div className="px-[12px] py-[10px]">Not Found</div>

		const items = searchResults.map((result) => (
			<div
				key={result.id}
				className="hover:bg-border outline-hidden relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-[0.625rem] py-[0.375rem] text-sm font-normal [&_svg]:shrink-0">
				<p>{result.title}</p>
			</div>
		))

		return <div className="px-[8px] py-[6px]">{items}</div>
	}

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Rounded</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={rounded} onValueChange={(value) => setRounded(value as RoundedOptions)}>
									{roundedOptions.map((roundedOption) => (
										<DropdownRadioItem value={roundedOption} key={roundedOption} onSelect={(e) => e.preventDefault()}>
											{roundedOption}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
									{sizes.map((size) => (
										<DropdownRadioItem value={size} key={size} onSelect={(e) => e.preventDefault()}>
											{size}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(label)} onValueChange={(value) => setLabel(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(disabled)} onValueChange={(value) => setDisabled(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Suggestion</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(suggestion)} onValueChange={(value) => setSuggestion(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Hint</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(hint)} onValueChange={(value) => setHint(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<SearchInput
						label={label ? "Search" : undefined}
						end={<Badge size="20">Ctrl + K</Badge>}
						placeholder="Search"
						size={size}
						disabled={disabled}
						onChange={(e) => handleSearchChange(e.target.value)}
						value={searchValue}
						id="search-input"
						hint={hint ? "Hint text to help the user with input" : ""}
						suggestion={suggestion}
						renderSearchResults={renderSearchResults}
						className="w-80"
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="search-input-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<SearchInput 
    rounded="${rounded}"
	trail={<Badge size="20">Ctrl + K</Badge>}
    size="${size}"
    disabled="${disabled}"
    label="${label ? "Search" : ""}"
    placeholder="Search"
	${hint ? `hint="Hint text to help the user with input"` : ""}
    suggestion={${suggestion}}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SearchInputExample
