import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

const AvatarCTA = () => {
	return (
		<div className="border-soft bg-linear-to-b from-fill1 to-bg-fill2 lg:p-15 relative flex items-center overflow-hidden rounded-[20px] border p-6 sm:p-10 lg:mx-auto lg:w-[1350px]">
			<div className="relative z-10 flex w-full flex-col gap-5 lg:max-w-md">
				<div className="flex w-full flex-col gap-8 lg:w-[532px]">
					<div className="flex flex-col gap-5">
						<Badge color="green" variant="soft" size="28">
							Open Source Library
						</Badge>

						<h2 className="heading-4">
							Production-Ready UI Blocks for Designers and Developers
						</h2>
					</div>

					<p className="text-fg-secondary text-sm font-normal">
						Radian OS bridges the gap between design and development. Access
						production-ready UI blocks, developer documentation, and a fully
						synced Figma UI kit to launch your next project in record time.
					</p>
				</div>

				<div className="flex flex-col items-center gap-3 sm:flex-row">
					<Button variant="glossy" className="w-full" asChild>
						<Link
							href={process.env.NEXT_PUBLIC_BLOCKS_URL!}
							className="flex gap-1.5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none">
								<path
									d="M7.50002 18.3337V15.0003C7.44169 14.4837 7.48335 13.9587 7.62502 13.4587C7.76669 12.9587 8.00835 12.492 8.33335 12.0837C5.83335 12.0837 3.33335 10.417 3.33335 7.50033C3.26541 6.46098 3.55992 5.43023 4.16669 4.58366C3.91669 3.62533 3.91669 2.62533 4.16669 1.66699C4.16669 1.66699 5.00002 1.66699 6.66669 2.91699C8.86669 2.50033 11.1334 2.50033 13.3334 2.91699C15 1.66699 15.8334 1.66699 15.8334 1.66699C16.0667 2.62533 16.0667 3.62533 15.8334 4.58366C16.4417 5.43366 16.7334 6.45866 16.6667 7.50033C16.6667 10.417 14.1667 12.0837 11.6667 12.0837C12.3166 12.9088 12.616 13.9564 12.5 15.0003V18.3337M7.50002 15.0003C3.74169 16.667 3.33332 13.3337 1.66666 13.3337"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Documentation
						</Link>
					</Button>

					<Button variant="outline" className="w-full" color="neutral" asChild>
						<Link
							href="https://www.figma.com/community/file/1601125934366184350/radian-design-system-version-0-1-2"
							className="flex gap-1.5">
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
							View Figma Library
						</Link>
					</Button>
				</div>
			</div>

			<div className="pointer-events-none absolute -right-0 top-0 hidden w-[520px] -translate-y-1/2 lg:block">
				{/* Light mode images */}
				<div className="-right-70 absolute top-2 h-[700px] w-[900px] dark:hidden">
					<Image
						src="/avatar/Table.png"
						alt="Table view"
						fill
						className="object-contain"
					/>
				</div>
				<div className="right-51 absolute -top-2 h-[240px] w-[400px] dark:hidden">
					<Image
						src="/avatar/Dropdown.png"
						alt="Account dropdown"
						fill
						className="object-contain"
					/>
				</div>

				{/* Dark mode images */}
				<div className="-right-70 absolute top-2 hidden h-[700px] w-[900px] dark:block">
					<Image
						src="/avatar/Table-1.png"
						alt="Table view"
						fill
						className="object-contain"
					/>
				</div>
				<div className="right-51 absolute -top-2 hidden h-[240px] w-[400px] dark:block">
					<Image
						src="/avatar/Dropdown-1.png"
						alt="Account dropdown"
						fill
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default AvatarCTA
