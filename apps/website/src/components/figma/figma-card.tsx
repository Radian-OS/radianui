import React from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const FigmaCard = () => {
	return (
		<Link
			href="https://www.figma.com/community/file/1601125934366184350/radian-design-system-version-0-1-2"
			target="_blank"
			rel="noopener noreferrer"
			className="border-border bg-elevation-level1 hover:bg-fill2 flex w-full flex-col gap-8 rounded-lg border p-4">
			<div className="flex items-center justify-between">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M9.72229 10.0002C9.72229 8.38936 11.0281 7.0835 12.639 7.0835C14.2498 7.0835 15.5556 8.38936 15.5556 10.0002C15.5556 11.611 14.2498 12.9168 12.639 12.9168C11.0281 12.9168 9.72229 11.611 9.72229 10.0002Z"
						fill="#1ABCFE"
					/>
					<path
						d="M3.88889 15.8332C3.88889 14.2224 5.19472 12.9165 6.80555 12.9165H9.72222V15.8332C9.72222 17.444 8.4164 18.7498 6.80555 18.7498C5.19472 18.7498 3.88889 17.444 3.88889 15.8332Z"
						fill="#0ACF83"
					/>
					<path d="M9.72229 1.25V7.08331H12.639C14.2498 7.08331 15.5556 5.77749 15.5556 4.16666C15.5556 2.55584 14.2498 1.25 12.639 1.25H9.72229Z" fill="#FF7262" />
					<path d="M3.88889 4.16667C3.88889 5.77749 5.19472 7.08332 6.80555 7.08332H9.72222V1.25H6.80555C5.19472 1.25 3.88889 2.55583 3.88889 4.16667Z" fill="#F24E1E" />
					<path d="M3.88889 10.0002C3.88889 11.611 5.19472 12.9168 6.80555 12.9168H9.72222V7.0835H6.80555C5.19472 7.0835 3.88889 8.38936 3.88889 10.0002Z" fill="#A259FF" />
				</svg>
				<ArrowUpRight size={20} className="text-fg-tertiary" />
			</div>
			<div className="flex flex-col gap-1 px-0.5">
				<p className="text-fg font-medium leading-5">Get Radian Design System Kit Figma</p>
				<p className="text-fg-tertiary font-normal leading-5">radianos.com/figma</p>
			</div>
		</Link>
	)
}

export default FigmaCard
