import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import DiagonalDivider from "./SvgDivider"

export default function CTASection() {
	return (
		<section
			aria-labelledby="build-section-title"
			className="relative mx-auto w-full max-w-[1440px]">
			<div className="border-soft max-w-360 mx-auto flex flex-col overflow-hidden border border-t-0">
				<div className="py-22 sm:py-30 sm:px-15 border-soft flex w-full flex-col items-center justify-center gap-8 overflow-hidden border-b px-5 md:py-40">
					<div className="flex flex-col items-center justify-center gap-6">
						<h2 className="heading-3 text-fg text-center text-[40px] font-medium leading-[52px]">
							Build faster with Radian
						</h2>
						<p className="text-fg-secondary text-center text-lg font-normal leading-[28px] tracking-[-0.18px]">
							Copy, paste, and customize beautifully crafted UI elements without
							starting from scratch.
						</p>
					</div>
					<div className="z-40 flex items-center gap-3">
						<Button variant="outline" color="neutral" size="40" asChild>
							<Link href="/docs/getting-started/figma">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none">
									<path
										d="M9.72266 10.0001C9.72266 8.3893 11.0285 7.08344 12.6393 7.08344C14.2501 7.08344 15.556 8.3893 15.556 10.0001C15.556 11.6109 14.2501 12.9168 12.6393 12.9168C11.0285 12.9168 9.72266 11.6109 9.72266 10.0001Z"
										fill="#1ABCFE"
									/>
									<path
										d="M3.88867 15.8332C3.88867 14.2224 5.19451 12.9166 6.80534 12.9166H9.722V15.8332C9.722 17.4441 8.41618 18.7499 6.80534 18.7499C5.19451 18.7499 3.88867 17.4441 3.88867 15.8332Z"
										fill="#0ACF83"
									/>
									<path
										d="M9.72266 1.25V7.08331H12.6393C14.2502 7.08331 15.556 5.77749 15.556 4.16666C15.556 2.55584 14.2502 1.25 12.6393 1.25H9.72266Z"
										fill="#FF7262"
									/>
									<path
										d="M3.88867 4.16667C3.88867 5.77749 5.19451 7.08332 6.80534 7.08332H9.722V1.25H6.80534C5.19451 1.25 3.88867 2.55583 3.88867 4.16667Z"
										fill="#F24E1E"
									/>
									<path
										d="M3.88867 10.0001C3.88867 11.6109 5.19451 12.9168 6.80534 12.9168H9.722V7.08344H6.80534C5.19451 7.08344 3.88867 8.3893 3.88867 10.0001Z"
										fill="#A259FF"
									/>
								</svg>
								Start in Design Tool
							</Link>
						</Button>
						<Button
							className="border-primary-hover w-full border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-lg ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]"
							size="40"
							asChild>
							<Link href="/docs/installation/next">Start in Code Editor</Link>
						</Button>
					</div>
				</div>
				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>
			</div>
		</section>
	)
}
