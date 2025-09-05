"use client"

import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Banner, BannerAction, BannerDescription, BannerTitle } from "@/registry/ui/banner"
import { IconButton, LinkButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerPreview = () => {
	const [color, setColor] = useState<"primary" | "neutral" | "success" | "warning" | "error" | "info">("primary")
	const [variant, setVariant] = useState<"strong" | "outline" | "soft">("strong")

	const generateCode = () => {
		const code = `<Banner color='${color}' variant='${variant}'>
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
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as typeof variant)}>
									<DropdownRadioItem value="strong" onSelect={(e) => e.preventDefault()}>
										Strong
									</DropdownRadioItem>
									<DropdownRadioItem value="outline" onSelect={(e) => e.preventDefault()}>
										Outline
									</DropdownRadioItem>
									<DropdownRadioItem value="soft" onSelect={(e) => e.preventDefault()}>
										Soft
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={color} onValueChange={(value) => setColor(value as typeof color)}>
									<DropdownRadioItem value="primary" onSelect={(e) => e.preventDefault()}>
										Primary
									</DropdownRadioItem>
									<DropdownRadioItem value="neutral" onSelect={(e) => e.preventDefault()}>
										Neutral
									</DropdownRadioItem>
									<DropdownRadioItem value="success" onSelect={(e) => e.preventDefault()}>
										Success
									</DropdownRadioItem>
									<DropdownRadioItem value="error" onSelect={(e) => e.preventDefault()}>
										Error
									</DropdownRadioItem>
									<DropdownRadioItem value="warning" onSelect={(e) => e.preventDefault()}>
										Warning
									</DropdownRadioItem>
									<DropdownRadioItem value="info" onSelect={(e) => e.preventDefault()}>
										Info
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border">
					<Banner color={color} variant={variant}>
						<BannerTitle>Banner Title Here</BannerTitle>
						<BannerDescription>Enter your banner message here</BannerDescription>
						<BannerAction>
							<LinkButton className="text-inverse-white" href="#">
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

export default BannerPreview
