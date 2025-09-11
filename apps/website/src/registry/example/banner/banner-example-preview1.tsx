"use client"

import { Eclipse, EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Banner, BannerAction, BannerDescription, BannerTitle } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerPreview1 = () => {
	const generateCode = () => {
		const code = `<Banner color="neutral" variant="strong">
 <BannerTitle>
  Banner Title Here
 </BannerTitle>
 <BannerDescription>
  Enter your banner message here
 </BannerDescription>
 <BannerAction>
  <Button variant="soft">Button label</Button>
 </BannerAction>
</Banner>`

		return code
	}

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border">
					<Banner color="neutral" variant="strong">
						<BannerTitle>
							<Eclipse size={16} />
						</BannerTitle>
						<BannerDescription>We just added something awesome to make your experience even better</BannerDescription>
						<BannerAction>
							<LinkButton className="text-white-inverse" href="#">
								Button label
							</LinkButton>
						</BannerAction>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="banner.tsx" showLineNumber className="h-[420px]" code={generateCode()} />
			</TabsContent>
		</Tabs>
	)
}

export default BannerPreview1
