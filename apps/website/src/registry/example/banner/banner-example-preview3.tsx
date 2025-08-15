import { EyeIcon, SquareTerminal, Trophy } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerExamplePreview3 = () => {
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
					<Banner className="flex items-center justify-center">
						<span className="bg-white-inverse flex h-9 w-9 items-center justify-center rounded-full">
							<Trophy size={20} className="text-fg-tertiary" />
						</span>
						<span>
							<p>Radian is now available at 20% for all users in Nepal. Claim your subscription now</p>
							<p className="text-fg-secondary">Offer is valid only up to January 31, 2025</p>
						</span>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="banner-example-preview3.tsx"
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
export default BannerExamplePreview3
