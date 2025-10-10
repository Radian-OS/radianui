import { Rocket } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function CTASection() {
	return (
		<div className="py-28.5 flex w-full flex-col items-center justify-center gap-5">
			<div className="flex flex-col items-center justify-center gap-4">
				<Badge size="28" variant="soft" color="neutral">
					<Rocket className="text-primary" />
					Get Started
				</Badge>
				<h2 className="heading-2">
					Build faster with <span className="text-primary-text">Radian</span>
				</h2>
				<p className="text-fg-secondary text-lg font-normal">Copy, paste, and customize your next feature without starting from scratch.</p>
			</div>
			<div className="flex items-center gap-3">
				<Button variant="outline" color="neutral">
					Start in Design Tool
				</Button>
				<Button className="border-primary-hover w-full border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-lg ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
					Start in Code Editor
				</Button>
			</div>
		</div>
	)
}
