import { ArrowRightIcon, Eclipse, EyeIcon, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<Banner color="neutral" variant="strong">
						<div className="">
							<div className="flex flex-col justify-between gap-2 md:flex-row">
								<div className="flex grow gap-3">
									<Eclipse className="mt-0.5 shrink-0 opacity-60" size={16} aria-hidden="true" />
									<div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
										<p className="text-sm">We just added something awesome to make your experience even better.</p>
										<a href="#" className="group whitespace-nowrap text-sm font-medium">
											Learn more
											<ArrowRightIcon className="-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="banner-example-preview1.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Banner color="neutral" variant="strong">
	<div className="">
		<div className="flex flex-col justify-between gap-2 md:flex-row">
			<div className="flex grow gap-3">
				<Eclipse className="mt-0.5 shrink-0 opacity-60" size={16} aria-hidden="true" />
				<div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
					<p className="text-sm">We just added something awesome to make your experience even better.</p>
					<a href="#" className="group whitespace-nowrap text-sm font-medium">
						Learn more
						<ArrowRightIcon className="-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
					</a>
				</div>
			</div>
		</div>
	</div>
</Banner>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BannerExamplePreview1
