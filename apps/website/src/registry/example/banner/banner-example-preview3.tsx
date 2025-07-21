import { EyeIcon, SquareTerminal, Trophy } from "lucide-react"
import { Banner } from "@/registry/ui/banner"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerExamplePreview3 = () => {
	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
						<span className="bg-inverse-white flex h-9 w-9 items-center justify-center rounded-full">
							<Trophy size={20} className="text-text-tertiary" />
						</span>
						<span>
							<p>Radian is now available at 20% for all users in Nepal. Claim your subscription now</p>
							<p className="text-text-secondary">Offer is valid only up to January 31, 2025</p>
						</span>
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
export default BannerExamplePreview3
