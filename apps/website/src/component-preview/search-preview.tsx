import { useEffect, useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import SearchInput from "@/registry/ui/search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

const SearchPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	type booleanType = "true" | "false"

	const [disabled, setDisabled] = useState<booleanType>("false")
	const [label, setLabel] = useState<booleanType>("true")
	const [suggestion, setSuggestion] = useState<booleanType>("false")
	const [searchResults, setSearchResults] = useState<{ id: string; title: string }[]>([])
	const [searchValue, setSearchValue] = useState("")
	const [hint, setHint] = useState<booleanType>("false")

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
	const codeString = `const [searchResults, setSearchResults] = useState<{ id: string; title: string }[]>([]);
const [searchValue, setSearchValue] = useState("");

useEffect(() => {
  const fetchResults = async () => {
    try {
      const results = await fetch("https://dummyjson.com/products/search?q=" + searchValue);
      const data = await results.json();
      if (data.products.length > 0) setSearchResults(data.products);
    } catch (err) {
      console.log(err);
    }
  };
  fetchResults();
}, [searchValue]);

const handleSearchChange = (value: string) => {
  setSearchValue(value);
};

const renderSearchResults = () => {
  if (searchResults.length == 0) return <div className="px-[12px] py-[10px]">Not Found</div>;
  const items = searchResults.map((result) => (
    <div
      key={result.id}
      className="hover:bg-border outline-hidden relative flex cursor-pointer select-none items-center 
      gap-2 rounded-sm px-[0.625rem] py-[0.375rem] text-sm font-normal [&_svg]:shrink-0">
      <p>{result.title}</p>
    </div>
  ));
  return <div className="px-[8px] py-[6px]">{items}</div>;
};
`

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
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Rounded</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={rounded} onValueChange={(value: string) => setRounded(value as RoundedOptions)}>
									{roundedOptions.map((roundedOption) => (
										<DropdownRadioItem value={roundedOption} key={roundedOption}>
											{roundedOption}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value: string) => setSize(value as SizeOptions)}>
									{sizes.map((size) => (
										<DropdownRadioItem value={size} key={size}>
											{size}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={label} onValueChange={(value: string) => setLabel(value as booleanType)}>
									<DropdownRadioItem value="true">True</DropdownRadioItem>
									<DropdownRadioItem value="false">False</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value: string) => setDisabled(value as booleanType)}>
									<DropdownRadioItem value="true">True</DropdownRadioItem>
									<DropdownRadioItem value="false">False</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Suggestion</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={suggestion} onValueChange={(value: string) => setSuggestion(value as booleanType)}>
									<DropdownRadioItem value="true">True</DropdownRadioItem>
									<DropdownRadioItem value="false">False</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Hint</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={hint} onValueChange={(value: string) => setHint(value as booleanType)}>
									<DropdownRadioItem value="true">True</DropdownRadioItem>
									<DropdownRadioItem value="false">False</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<SearchInput
						label={label === "true" ? "Search" : undefined}
						placeholder="Search"
						size={size}
						hint={hint === "true" ? "Hint text to help the user with input" : ""}
						disabled={disabled === "true"}
						onChange={(e) => handleSearchChange(e.target.value)}
						value={searchValue}
						id="search-input"
						suggestion={suggestion === "true"}
						renderSearchResults={renderSearchResults}
						className="w-80"
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="search.tsx"
					showLineNumber
					className="h-[420px]"
					code={`${suggestion ? codeString : ""}<SearchInput 
    rounded="${rounded}"
    size="${size}"
    disabled={${disabled}}
    label="${label ? "Search" : ""}"
	placeholder="Search"
	suggestion={${suggestion}}
	${hint ? `hint="Hint text to help the user with input"` : ""}
	${suggestion ? "onChange={(e) => handleSearchChange(e.target.value)}" : ""}
	${suggestion ? "renderSearchResults={renderSearchResults}" : ""}
	${suggestion ? "value={searchValue}" : ""}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SearchPreview
