import { Lock } from "lucide-react"
import Link from "next/link"
import { Banner } from "@/registry/ui/banner"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerExamplePreview1 = () => {
	return (
		<Tabs className="mb-10" defaultValue="preview">
			<TabsList>
				<TabsTrigger value="preview">Preview</TabsTrigger>
				<TabsTrigger value="code">Code</TabsTrigger>
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
				<CodeArea
					className="h-[420px]"
					code={`<Banner variant="destructive" >
Subscription Expired. Please upgrade your account to Pro Subscription 
<Link className="underline" href="#" >Upgrade</Link>
</Banner>`}
					language="tsx"
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BannerExamplePreview1
