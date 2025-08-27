import { Eclipse, EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerExamplePreview1 = () => {
	return (
		<Tabs className="" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
					<Banner
						start={<Eclipse size={16} />}
						description="We just added something awesome to make your experience even better"
						end={
							<LinkButton href="#" className="text-white-inverse">
								Learn more
							</LinkButton>
						}
						color="neutral"
						variant="strong"></Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="banner-example-preview1.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Banner
	start={<Eclipse size={16}/>}
	description="We just added something awesome to make your experience even better"
	end={
		<LinkButton href="#" className="text-white-inverse">
			Learn more
		</LinkButton>
		}
	color="neutral"
	variant="strong">
</Banner>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BannerExamplePreview1
