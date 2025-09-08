import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BreadCrumbPreview = () => {
	const [separator, setSeparatorType] = useState<"slash" | "chevron">("slash")
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Separator</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={separator} onValueChange={(value) => setSeparatorType(value as "slash" | "chevron")}>
									<DropdownRadioItem value="slash" onSelect={(e) => e.preventDefault()}>
										Slash
									</DropdownRadioItem>
									<DropdownRadioItem value="chevron" onSelect={(e) => e.preventDefault()}>
										Chevron
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Max items</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={maxItems} onValueChange={(value) => setMaxItems(value as "2" | "3" | "4" | "5")}>
									<DropdownRadioItem value="2" onSelect={(e) => e.preventDefault()}>
										2
									</DropdownRadioItem>
									<DropdownRadioItem value="3" onSelect={(e) => e.preventDefault()}>
										3
									</DropdownRadioItem>
									<DropdownRadioItem value="4" onSelect={(e) => e.preventDefault()}>
										4
									</DropdownRadioItem>
									<DropdownRadioItem value="5" onSelect={(e) => e.preventDefault()}>
										5
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/">Home</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbEllipsis />
							</BreadcrumbItem>
							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/docs/components">Components</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="breadcrumb.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator${separator === "chevron" ? '>\n      <ChevronRight size={14} className="stroke-fg-tertiary" />\n    </BreadcrumbSeparator>' : " />"}
    
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator${separator === "chevron" ? '>\n      <ChevronRight size={14} className="stroke-fg-tertiary" />\n    </BreadcrumbSeparator>' : " />"}
    
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/docs/components">Components</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator${separator === "chevron" ? '>\n      <ChevronRight size={14} className="stroke-fg-tertiary" />\n    </BreadcrumbSeparator>' : " />"}
    
    <BreadcrumbItem>
      <BreadcrumbPage>CLI</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default BreadCrumbPreview
