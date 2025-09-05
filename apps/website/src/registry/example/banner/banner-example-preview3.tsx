import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Banner, BannerAction, BannerDescription } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"
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
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border">
					<Banner variant="outline" color="neutral">
						📫
						<BannerDescription>Subscribe to our newsletter and get 10% off your first order! ·</BannerDescription>
						<BannerAction>
							<LinkButton href="#" className="text-fg">
								Subscribe
							</LinkButton>
						</BannerAction>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="banner-example-preview3.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Banner variant="outline" color="neutral">
  📫
  <BannerDescription>
    Subscribe to our newsletter and get 10% off your first order! ·
  </BannerDescription>
  <BannerAction>
    <LinkButton href="#" className="text-fg">
      Subscribe
    </LinkButton>
  </BannerAction>
</Banner>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default BannerExamplePreview3
