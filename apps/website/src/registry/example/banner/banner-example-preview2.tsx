import { RocketIcon } from "lucide-react"

import { Banner } from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerExamplePreview2 = () => {
	return (
		<Tabs className="mb-10" defaultValue="preview">
			<TabsList>
				<TabsTrigger value="preview">Preview</TabsTrigger>
				<TabsTrigger value="code">Code</TabsTrigger>
			</TabsList>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border">
					<Banner variant="soft" color="neutral">
						<div className="w-full">
							<div className="flex gap-2 md:items-center">
								<div className="flex grow gap-3 md:items-center">
									<div className="bg-bg flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5" aria-hidden="true">
										<RocketIcon className="opacity-80" size={16} />
									</div>
									<div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
										<div className="space-y-0.5">
											<p className="text-sm font-medium">Boost your experience with RadianOS UI</p>
											<p className="text-fg-tertiary text-sm">The new feature is live! Try it out and let us know what you think.</p>
										</div>
										<div className="flex gap-2 max-md:flex-wrap">
											<Button size="28" className="text-sm">
												Try now
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					className="h-[420px]"
					code={`<Banner variant="soft" color="neutral">
	<div className="w-full">
		<div className="flex gap-2 md:items-center">
			<div className="flex grow gap-3 md:items-center">
				<div className="bg-primary-accent flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5" aria-hidden="true">
					<RocketIcon className="opacity-80" size={16} />
				</div>
				<div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
					<div className="space-y-0.5">
						<p className="text-sm font-medium">Boost your experience with RadianOS UI</p>
						<p className="text-sm">The new feature is live! Try it out and let us know what you think.</p>
					</div>
					<div className="flex gap-2 max-md:flex-wrap">
						<Button size="28" className="text-sm">
							Try now
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</Banner>`}
					language="tsx"
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BannerExamplePreview2
