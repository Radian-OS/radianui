import { BookOpenText, Braces, Handshake, LucideIcon, MessageCircleQuestionIcon, Moon, Orbit, ShieldCheck } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"

interface FAQItem {
	title: string
	content: string
	icon: LucideIcon
}

const CONTENT: FAQItem[] = [
	{
		title: "What is RadianOS?",
		content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam consectetur quia reprehenderit esse delectus.",
		icon: Orbit,
	},
	{
		title: "Is RadianOS open-source?",
		content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam consectetur quia reprehenderit esse delectus.",
		icon: BookOpenText,
	},
	{
		title: "Can I use it with React or Next.js?",
		content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam consectetur quia reprehenderit esse delectus.",
		icon: Braces,
	},
	{
		title: "Does RadianOS support theming and dark mode?",
		content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam consectetur quia reprehenderit esse delectus.",
		icon: Moon,
	},
	{
		title: "How can I contribute?",
		content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam consectetur quia reprehenderit esse delectus.",
		icon: Handshake,
	},
	{
		title: "Is it production ready?",
		content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam consectetur quia reprehenderit esse delectus.",
		icon: ShieldCheck,
	},
]

export default function FAQSection() {
	return (
		<div className="py-15 flex w-full flex-col items-center gap-8 px-5 xl:py-36">
			<div className="max-w-360 relative w-full">
				<Badge className="relative z-10" variant="soft" color="neutral" size="28">
					<MessageCircleQuestionIcon className="text-primary-text" />
					<span className="text-fg-secondary">FAQ&apos;s</span>
				</Badge>
				<svg className="not-xl:hidden absolute bottom-[50%] left-[60px] z-0 max-h-[775px]" fill="none" viewBox="0 0 1939 775" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M 0 775 L 1691 775 C 1715 771 1722 763 1721 740 L 1721 540 C 1721 534 1720 529 1724 526 L 1926 325 C 1936 318 1939 309 1939 298 L 1939 0"
						stroke="var(--color-border)"
						strokeWidth="1"
					/>
					<path
						id="beamPath"
						d="M 0 775 L 1691 775 C 1715 771 1722 763 1721 740 L 1721 540 C 1721 534 1720 529 1724 526 L 1926 325 C 1936 318 1939 309 1939 298 L 1939 0"
						fill="none"
						stroke="var(--color-primary)"
						strokeWidth="1"
						strokeLinecap="round"
						className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:30_1000] [stroke-dashoffset:0]"
						vectorEffect="non-scaling-stroke"
						pathLength="1000"
					/>
				</svg>

				<svg className="not-xl:hidden absolute -left-[50px] top-[50%] z-0 max-h-[341px]" viewBox="-80 0 350 341" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M 0 0 L -65 0 C -76 5 -81 15 -80 32 L -80 231 C -75 248 -64 258 -48 256 L 178 256 C 200 256 212 262 220 272 L 276 341"
						stroke="var(--color-border)"
						strokeWidth="1"
						fill="none"
					/>
				</svg>
			</div>
			<div className="max-w-360 flex w-full flex-col gap-12 lg:flex-row">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<h2 className="heading-2 from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">Frequently Asked Questions.</h2>
						<p className="text-fg-secondary">
							Got questions? We&apos;ve got answers. <br />
							Find everything you need to know about Radian here.
						</p>
					</div>
				</div>

				<div className="w-full max-w-full xl:max-w-[640px]">
					<Accordion size="lg" type="single" className="w-full" collapsible variant="open">
						{CONTENT.map(({ title, content, icon: Icon }) => (
							<AccordionItem key={title} value={title}>
								<AccordionTrigger>
									<div className="flex items-center gap-3">
										<Icon size={24} strokeWidth={1.5} className="text-fg-secondary shrink-0" aria-hidden="true" />
										<span>{title}</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>{content}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	)
}
