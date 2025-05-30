import { Moon } from "lucide-react"
import { Banner } from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerExamplePreview2 = () => {
	return (
		<Tabs className="mb-10" defaultValue="preview">
			<TabsList>
				<TabsTrigger value="preview">Preview</TabsTrigger>
				<TabsTrigger value="code">Code</TabsTrigger>
			</TabsList>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<Banner className="flex flex-col items-center justify-center gap-3 sm:flex-row" variant="primary">
						<Moon />
						Radian is now available at 20% for all users in Nepal. Claim your subscription now
						<Button size="32" variant="outline" className="text-static-white outline-static-white hover:text-static-white hover:bg-primary-hover outline">
							Learn More
						</Button>
						<Button size="32" className="text-primary hover:bg-static-white bg-white">
							Claim Offer
						</Button>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					className="h-[420px]"
					code={` <Banner className="flex items-center justify-center gap-3" variant="primary">
<Moon />
Radian is now available at 20% for all users in Nepal. Claim your subscription now
<Button variant="outline" className="text-static-white outline outline-static-white hover:text-static-white hover:bg-primary-hover" >
Learn More
</Button>
<Button className="bg-white text-primary hover:bg-static-white" >
Claim Offer
</Button>
</Banner>`}
					language="tsx"
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BannerExamplePreview2
