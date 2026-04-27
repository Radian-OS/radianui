import React from "react"
import { Avatar, AvatarFallback } from "@/styles/default/ui/avatar"

export default function AvatarFallbackPreview() {
	return (
		<div className="flex gap-6">
			<Avatar size="48">
				<AvatarFallback>SM</AvatarFallback>
			</Avatar>
			<Avatar size="48">
				<AvatarFallback className="bg-fill4 overflow-hidden">
					<svg
						width="100"
						height="100"
						viewBox="0 0 36 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<defs>
							<clipPath>
								<rect width="36" height="36" rx={20} ry={20} fill="white" />
							</clipPath>
						</defs>
						<g clipPath="url(#clip0_5846_11264)">
							<path
								d="M5.3999 36C5.3999 29.0536 10.7999 23.4 17.9999 23.4C25.1999 23.4 30.5999 29.0536 30.5999 36"
								className="fill-elevation-level1"
							/>
							<path
								d="M18.0081 19.8C21.9759 19.8 25.1998 16.5761 25.1998 12.6083C25.1998 8.64044 21.9759 5.40002 18.0081 5.40002C14.0402 5.40002 10.7998 8.6239 10.7998 12.5918C10.7998 16.5596 14.0237 19.7835 17.9915 19.7835C18.0081 19.8"
								className="fill-elevation-level1"
							/>
						</g>
					</svg>
				</AvatarFallback>
			</Avatar>
		</div>
	)
}
