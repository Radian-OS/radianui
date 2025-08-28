import { useState } from "react"
import { EyeIcon, SquareTerminal, Star } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerCloseExamplePreview = () => {
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = (): void => {
		setIsVisible(false)
	}

	if (!isVisible) return null
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
					{isVisible && <Banner title="Banner Title Here" description="Banner description goes here" start={<Star size={20} />} variant="outline" onClose={handleClose}></Banner>}
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="banner-example-preview1.tsx"
					showLineNumber
					className="h-[420px]"
					code={`export default function BannerOncloseExample() { 
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = (): void => {
		setIsVisible(false)
	}

  return (
	<div>
		{isVisible && (
			<Banner 
				title="Banner Title Here" 
				description="Banner description goes here" 
				start={<Star size={20} />} 
				variant="outline" 
				onClose={handleClose}> 
			</Banner>}
		)}
	</div>
  )`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BannerCloseExamplePreview
