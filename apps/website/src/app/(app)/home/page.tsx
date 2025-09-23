import { Box, Code, SearchCode } from "lucide-react"
import Background from "@/components/effects/background"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function Page() {
	return (
		<div className="h-fit min-h-screen w-full">
			<Background>
				<div className="pt-30 flex flex-col items-center justify-center gap-12">
					<div className="max-w-250 flex flex-col items-center justify-center gap-6">
						<Badge size="28">
							<Box size={16} />
							Under Development - Alpha Release
						</Badge>
						<h1 className="heading-1 from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-center text-transparent">Build next gen of world class products and solutions</h1>
						<p className="text-fg-secondary text-center text-lg font-normal">
							Radian is a high-quality, flexible and open-source, design and development library built using React and Tailwind. Start your next product here
						</p>
					</div>
					<div className="flex items-center justify-center gap-4">
						<Button className="bg-elevation-negative hover:bg-elevation-negative/90" variant="outline" color="neutral">
							<SearchCode />
							Browse Components
						</Button>
						<Button className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
							<Code />
							Copy Terminal Command
						</Button>
					</div>
				</div>

				<div className="max-w-328 bg-fill2/60 mt-27 mx-auto aspect-[2/1] rounded-xl px-4 backdrop-blur-2xl md:px-5">1</div>
			</Background>
		</div>
	)
}
