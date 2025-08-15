import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import Link from "next/link"

import CodeSnippet from "@/components/code-snippet"
import { Breadcrumb, BreadcrumbItem } from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BreadCrumbPreview = () => {
	const [separator, setSeparatorType] = useState<"default" | "slash">("default")
	const [maxItems, setMaxItems] = useState<"2" | "3" | "4" | "5">("5")
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
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Separator</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									onSelectedChange={(keys) => setSeparatorType(Array.from(keys)[0] as "default" | "slash")}
									selectedValues={[separator]}>
									<DropdownItem value="default">Default</DropdownItem>
									<DropdownItem value="slash">Slash</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Max items</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									onSelectedChange={(keys) => setMaxItems(Array.from(keys)[0] as "2" | "3" | "4" | "5")}
									selectedValues={[maxItems]}>
									<DropdownItem value="2">2</DropdownItem>
									<DropdownItem value="3">3</DropdownItem>
									<DropdownItem value="4">4</DropdownItem>
									<DropdownItem value="5">5</DropdownItem>
									{/* <DropdownItem value="6">6</DropdownItem> */}
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Breadcrumb separator={separator} maxItems={parseInt(maxItems)}>
						<BreadcrumbItem asChild>
							<Link href="/">Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link href="/docs/installation/next">Installation</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link href="/docs/components">Components</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link href="/docs/animations/animated-list">Animations</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link href="/docs/getting-started/cli">CLI</Link>
						</BreadcrumbItem>
					</Breadcrumb>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="breadcrumb.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Breadcrumb separator="${separator}" maxItems={${maxItems}} >

<BreadcrumbItem asChild >
 <Link href="/" >Home</Link>
</BreadcrumbItem>

<BreadcrumbItem asChild >
 <Link href="/docs/installation/next" >Installation</Link>
</BreadcrumbItem>

<BreadcrumbItem asChild >
 <Link href="/docs/components" >Components</Link>
</BreadcrumbItem>

<BreadcrumbItem asChild >
 <Link href="/docs/animations/animated-list" >Animations</Link>
</BreadcrumbItem>

<BreadcrumbItem asChild >
 <Link href="/docs/getting-started/cli" >CLI</Link>
</BreadcrumbItem>

</Breadcrumb>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BreadCrumbPreview
