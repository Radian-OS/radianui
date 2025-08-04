import { EyeIcon, Lock, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerExamplePreview1 = () => {
	return (
		<Tabs className="mb-10 pb-6" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<TabsList>
				<TabsTrigger value="preview" icon={<EyeIcon />}>
					Preview
				</TabsTrigger>
				<TabsTrigger value="code" icon={<SquareTerminal />}>
					Code
				</TabsTrigger>
			</TabsList>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<Banner variant="destructive">
						<Lock size={20} />
						Subscription Expired. Please upgrade your account to Pro Subscription{" "}
						<Link className="underline" href="#">
							Upgrade
						</Link>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="banner-example-preview1.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Banner variant="destructive" >
Subscription Expired. Please upgrade your account to Pro Subscription 
<Link className="underline" href="#" >Upgrade</Link>
</Banner>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BannerExamplePreview1
