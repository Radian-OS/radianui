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
				<svg className="not-xl:hidden absolute bottom-[50%] left-0 z-0" width="1593" height="775" fill="none" viewBox="0 0 1593 775" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="var(--color-bg)" stopOpacity="1" />
							<stop offset="20%" stopColor="var(--color-soft)" stopOpacity="1" />
							<stop offset="100%" stopColor="var(--color-soft)" stopOpacity="1" />
						</linearGradient>
					</defs>

					<path
						d="M 0 775 L 1326 775 C 1355 768 1352 749 1351 721 L 1351 613 C 1351 608 1349 592 1360 585 L 1583 412 C 1594 399 1592 400 1592 374 L 1593 0"
						stroke="url(#beamGradient)"
						strokeWidth={1}
					/>
					<path
						id="beamPath"
						d="M 0 775 L 1326 775 C 1355 768 1352 749 1351 721 L 1351 613 C 1351 608 1349 592 1360 585 L 1583 412 C 1594 399 1592 400 1592 374 L 1593 0"
						fill="none"
						stroke="var(--color-primary)"
						strokeWidth="1"
						strokeLinecap="round"
						className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:20_1000] [stroke-dashoffset:0]"
						vectorEffect="non-scaling-stroke"
						pathLength="1000"
					/>
				</svg>

				<svg className="not-xl:hidden absolute -left-[50px] top-[50%] z-0 max-h-[341px]" viewBox="-80 0 350 341" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M 0 0 L -65 0 C -76 5 -81 15 -80 32 L -80 231 C -75 248 -64 258 -48 256 L 178 256 C 200 256 212 262 220 272 L 276 341"
						stroke="var(--color-soft)"
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
