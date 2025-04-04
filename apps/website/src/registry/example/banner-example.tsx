"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Banner } from "@/registry/ui/banner"
import { Button } from "../ui/button"

// import { useState } from "react"

const BannerExample = () => {
	// const [showBanner, setShowBanner] = useState(true);
	return (
		<div className="mx-auto mb-2 flex max-w-3xl flex-col gap-4 py-2">
			<Banner closable variant="dark">
				<Sparkles size={20} className="stroke-warning" />
				<p>This is a sample banner for design</p>
				<Link className="underline" href="#">
					Upgrade
				</Link>
			</Banner>
			<Banner variant="dark">
				<Sparkles size={20} className="stroke-warning" />
				<p>This is a sample banner for design</p>
				<Link className="underline" href="#">
					Upgrade
				</Link>
			</Banner>
			<Banner closable variant="transparent">
				<Sparkles size={20} className="stroke-warning" />
				<p>This is a sample banner for design</p>
				<Link className="underline" href="#">
					Upgrade
				</Link>
			</Banner>
			<Banner variant="transparent">
				<Sparkles size={20} className="stroke-warning" />
				<p>This is a sample banner for design</p>
				<Link className="underline" href="#">
					Upgrade
				</Link>
			</Banner>
			<Banner closable variant="soft">
				<Sparkles size={20} className="stroke-warning" />
				<p>This is a sample banner for design</p>
				<Link className="underline" href="#">
					Upgrade
				</Link>
			</Banner>
			<Banner variant="soft">
				<Sparkles size={20} className="stroke-warning" />
				<p>This is a sample banner for design</p>
				<Link className="underline" href="#">
					Upgrade
				</Link>
			</Banner>
			<Banner closable variant="soft">
				<div className="flex gap-2">
					<Sparkles size={20} className="stroke-warning" />
					<p>This is a sample banner for design</p>
				</div>
				<div className="flex gap-2">
					<Button size="32">Download</Button>
					<Button size="32" variant="neutral-soft">
						Learn More
					</Button>
				</div>
			</Banner>
		</div>
	)
}
export default BannerExample
