import { Component, EyeIcon, Home, SquareTerminal, Upload } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { Breadcrumb, BreadcrumbItem } from "@/registry/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BreadCrumbExample1 = () => {
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
					<Breadcrumb separator="default">
						<BreadcrumbItem asChild>
							<Link href="/">
								<Home size={16} /> Home
							</Link>
						</BreadcrumbItem>
						<BreadcrumbItem asChild>
							<Link href="/docs/installation/next">
								<Upload size={16} /> Installation
							</Link>
						</BreadcrumbItem>
						<BreadcrumbItem asChild>
							<Link href="/docs/components">
								<Component size={16} />
								Components
							</Link>
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
					code={`<Breadcrumb separator="default" >

<BreadcrumbItem asChild >
 <Link href="/" ><Home size={16} /> Home</Link>
</BreadcrumbItem>

<BreadcrumbItem asChild >
 <Link href="/docs/installation/next" ><Upload size={16} /> Installation</Link>
</BreadcrumbItem>

<BreadcrumbItem asChild >
 <Link href="/docs/components" ><Component size={16} /> Components</Link>
</BreadcrumbItem>

<BreadcrumbItem >
 <Link href="/docs/animations/animated-list" >Animations</Link>
</BreadcrumbItem>

<BreadcrumbItem >
 <Link href="/docs/getting-started/cli" >CLI</Link>
</BreadcrumbItem>

</Breadcrumb>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BreadCrumbExample1
