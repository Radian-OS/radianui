"use client"

import { useState } from "react"
import { EyeIcon, SquareTerminal, Star, X } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Banner, BannerAction, BannerDescription, BannerTitle } from "@/registry/ui/banner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerCloseExamplePreview = () => {
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = () => {
		setIsVisible(false)
	}

	return (
		<Tabs className="" defaultValue="preview" variant="outline-ghost" size="md">
			<TabsList>
				<TabsTrigger onClick={() => setIsVisible(true)} value="preview" icon={<EyeIcon />}>
					Preview
				</TabsTrigger>
				<TabsTrigger onClick={() => setIsVisible(true)} value="code" icon={<SquareTerminal />}>
					Code
				</TabsTrigger>
			</TabsList>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border">
					{isVisible && (
						<Banner variant="outline">
							<BannerTitle>
								<Star size={20} />
							</BannerTitle>

							<BannerTitle>Banner Title Here</BannerTitle>
							<BannerDescription>Banner description goes here</BannerDescription>
							<BannerAction onClick={handleClose}>
								<X className="cursor-pointer" size={16} />
							</BannerAction>
						</Banner>
					)}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="banner-close-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { useState } from "react"
import { Star, X } from "lucide-react"
import { Banner, BannerAction, BannerDescription, BannerTitle } from "@/registry/ui/banner"

export default function BannerOnCloseExample() {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => setIsVisible(false)

  return (
    <div className="p-4">
      {isVisible && (
       <Banner variant="outline">
        <BannerTitle>
         <Star size={20} />
	    </BannerTitle>
        <BannerTitle>Banner Title Here</BannerTitle>
        <BannerDescription>Banner description goes here</BannerDescription>
        <BannerAction onClick={handleClose}>
          <X className="cursor-pointer" size={16} />
        </BannerAction>
        </Banner>
    )}
    </div>
  )
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default BannerCloseExamplePreview
