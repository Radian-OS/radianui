import { Layers } from "lucide-react"
import Link from "next/link"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function VideoSection() {
	return (
		<div className="py-15 flex flex-col items-center gap-10 px-5 min-[1920px]:gap-16 min-[1920px]:px-60 min-[1920px]:py-20">
			<div className="border-soft align-center pt-15 xl:px-15 relative flex justify-center rounded-t-3xl px-5 xl:border-l xl:border-r xl:border-t">
				<div className="bg-bg absolute -bottom-1 z-10 h-2 w-full"></div>
				<BorderBeam size={100} className="not-xl:hidden" />
				<div className="flex flex-col items-center gap-6">
					<div className="bg-bg absolute bottom-full h-fit translate-y-1/2 px-4">
						<div className="border-soft px-7 xl:border-l xl:border-r">
							<Badge size="28" variant="soft">
								<Layers className="text-primary" />
								UI Blocks
							</Badge>
						</div>
					</div>
					<div className="flex max-w-[752px] flex-col items-center gap-5">
						<span className="heading-2 text-center">
							<span className="from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">Multiple Ready to use UI blocks built for </span>
							<span className="bg-gradient-to-b from-[#492EB8] to-[#7655F6] bg-clip-text text-transparent">speed & consistency</span>
						</span>
						<p className="text-fg-secondary max-w-[550px] text-center text-base font-normal">
							Pre-made website & Application UI blocks to simplify your design process and move smoothly from idea to implementation.
						</p>
					</div>
				</div>

				<div className="bg-bg absolute -right-[1px] bottom-0 z-50 h-1/3 w-2" />
				<div className="bg-bg absolute -left-[1px] bottom-0 z-50 h-1/3 w-2" />

				{/* Right curve line */}
				<svg className="not-xl:hidden absolute bottom-1/2 left-[calc(100%+20px)]" xmlns="http://www.w3.org/2000/svg" width={80} height={520} viewBox="0 -503 80 520" fill="none">
					<path d="M 0 0 L 45 0 C 68 0 70 -10 69 -43 L 69 -503" stroke="var(--color-soft)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				{/* Left curve line */}
				<svg
					className="not-xl:hidden absolute bottom-1/2 right-[calc(100%+20px)] scale-x-[-1]"
					xmlns="http://www.w3.org/2000/svg"
					width={80}
					height={520}
					viewBox="0 -503 80 520"
					fill="none">
					<path d="M 0 0 L 45 0 C 68 0 70 -10 69 -43 L 69 -503" stroke="var(--color-soft)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			<div className="border-soft bg-fill1 z-20 h-[400px] w-full max-w-[1440px] rounded-xl border p-4 lg:h-[800px]">
				<div className="bg-bg border-border h-full w-full rounded-2xl border text-center">Video here</div>
			</div>

			<div className="z-20 flex w-full flex-col gap-3 md:w-fit md:flex-row">
				<Button className="w-full" variant="outline" color="neutral" size="40">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M9.72266 10.0001C9.72266 8.3893 11.0285 7.08344 12.6393 7.08344C14.2501 7.08344 15.556 8.3893 15.556 10.0001C15.556 11.6109 14.2501 12.9168 12.6393 12.9168C11.0285 12.9168 9.72266 11.6109 9.72266 10.0001Z"
							fill="#1ABCFE"
						/>
						<path
							d="M3.88867 15.8332C3.88867 14.2224 5.19451 12.9166 6.80534 12.9166H9.722V15.8332C9.722 17.4441 8.41618 18.7499 6.80534 18.7499C5.19451 18.7499 3.88867 17.4441 3.88867 15.8332Z"
							fill="#0ACF83"
						/>
						<path d="M9.72266 1.25V7.08331H12.6393C14.2502 7.08331 15.556 5.77749 15.556 4.16666C15.556 2.55584 14.2502 1.25 12.6393 1.25H9.72266Z" fill="#FF7262" />
						<path d="M3.88867 4.16667C3.88867 5.77749 5.19451 7.08332 6.80534 7.08332H9.722V1.25H6.80534C5.19451 1.25 3.88867 2.55583 3.88867 4.16667Z" fill="#F24E1E" />
						<path d="M3.88867 10.0001C3.88867 11.6109 5.19451 12.9168 6.80534 12.9168H9.722V7.08344H6.80534C5.19451 7.08344 3.88867 8.3893 3.88867 10.0001Z" fill="#A259FF" />
					</svg>
					Figma Community File
				</Button>
				<Link href={process.env.NEXT_PUBLIC_BLOCKS_URL!}>
					<Button
						size="40"
						className="border-primary-hover w-full border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-lg ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
						Explore UI Blocks
					</Button>
				</Link>
			</div>
		</div>
	)
}
