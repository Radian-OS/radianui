import { ChevronRight, EyeIcon, Home, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BreadCrumbExample2 = () => {
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
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Breadcrumb className="bg-elevation-level1 rounded-md border px-3 py-2">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/">
										<Home size={16} />
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<ChevronRight size={14} className="stroke-fg-tertiary" />
							</BreadcrumbSeparator>

							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/docs/installation/next">Installation</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<ChevronRight size={14} className="stroke-fg-tertiary" />
							</BreadcrumbSeparator>

							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/docs/components">Components</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<ChevronRight size={14} className="stroke-fg-tertiary" />
							</BreadcrumbSeparator>

							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/docs/animations/animated-list">Animations</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<ChevronRight size={14} className="stroke-fg-tertiary" />
							</BreadcrumbSeparator>

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
					code={`<Breadcrumb className="bg-elevation-level1 rounded-md border px-3 py-2">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">
          <Home size={16} />
        </Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={14} className="stroke-fg-tertiary" />
    </BreadcrumbSeparator>

    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/docs/installation/next">Installation</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={14} className="stroke-fg-tertiary" />
    </BreadcrumbSeparator>

    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/docs/components">Components</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={14} className="stroke-fg-tertiary" />
    </BreadcrumbSeparator>

    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/docs/animations/animated-list">Animations</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={14} className="stroke-fg-tertiary" />
    </BreadcrumbSeparator>

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

export default BreadCrumbExample2
