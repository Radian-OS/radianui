import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

export default function FigmaPreviewButton({ className }: { className?: string }) {
	return (
		<Button className={cn("text-text-secondary", className)} variant="outline" color="neutral">
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
			Figma Preview
		</Button>
	)
}
