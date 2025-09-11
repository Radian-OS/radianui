import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
const sizes = ["28", "32", "36", "40", "44", "48"]

const CreditCardPreview = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<boolean>(false)

	const [label, setLabel] = useState<boolean>(true)

	return (
		<Tabs className="mt-3" defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
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
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						{label && <Label>Credit Card</Label>}
						<div className="w-80">
							<Input disabled={disabled} size={size} placeholder="Card Number" className={`-ms rounded-b-none border-b-0 focus-within:z-30 focus-within:border-b`} />
							<div className="flex">
								<Input disabled={disabled} size={size} placeholder="MM / YY" className={`rounded-r-none rounded-t-none border-r-0 focus-within:z-30 focus-within:border-r`} />
								<Input disabled={disabled} size={size} placeholder="CVC" className="rounded-l-none rounded-t-none" />
							</div>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="credit-card-input-preview.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="flex flex-col gap-1.5">
	${label ? "<Label>Credit Card</Label>" : ""}
	<div className="w-80">
		<Input
			size={${size}}
			placeholder="Card Number"
			className="-ms rounded-b-none border-b-0 focus-within:z-30 focus-within:border-b"
		/>
		<div className="flex">
			<Input size={${size}} placeholder="MM / YY" className="rounded-r-none rounded-t-none border-r-0 focus-within:z-30 focus-within:border-r" />
			<Input size={${size}} placeholder="CVC" className="rounded-l-none rounded-t-none" />
		</div>
	</div>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CreditCardPreview
