import { useState } from "react"
import { ArrowRight, Mail } from "lucide-react"
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
import { Input } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "32" | "36" | "40" | "44" | "48" | "56"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type iconOptions = "Mail" | "Arrow" | "Default"

const EmailPreview = () => {
	const [trailIcon, setTrailIcon] = useState<iconOptions>("Default")
	const [hasError, setHasError] = useState<boolean>(false)

	return (
		<Tabs defaultValue="preview" className="mb-10 mt-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownSub>
								<DropdownSubTrigger>Example</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(trailIcon)]}
										onSelectedChange={(values) => setTrailIcon(values[0] as iconOptions)}
										minSelectionCount={1}>
										<DropdownItem value="Default">Default</DropdownItem>
										<DropdownItem value="Mail">Mail</DropdownItem>
										<DropdownItem value="Arrow">Arrow</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>HasError</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(hasError)]}
										onSelectedChange={(values) => setHasError(values[0] === "true")}
										minSelectionCount={1}>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Input
						classNames={{ base: "w-[320px]" }}
						type="email"
						label={"Email"}
						placeholder="designer@radianos.com"
						trail={trailIcon === "Mail" ? <Mail className="h-5 w-5" /> : trailIcon === "Arrow" ? <ArrowRight className="h-5 w-5" /> : ""}
						hasError={hasError}
						hint={hasError ? "Invalid Email" : " "}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<Input 
    type="email"
    label="Email"
    placeholder="Enter your email here"
	trailIcon=${trailIcon === "Mail" ? `{<Mail className='h-5 w-5' />"}` : `{<ArrowRight className='h-5 w-5' />}`}
    hasError={${hasError}}
	hint="${hasError ? "Invalid Email" : ""}"
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default EmailPreview
