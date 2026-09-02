import React from "react"
import Image from "next/image"
import Link from "next/link"

export function WebsiteLogo({ className }: { className?: string }) {
	return (
		<Link href={"/"} prefetch={false} tabIndex={-1} className={className}>
			<Image
				src="/radian.svg"
				className="h-auto w-[112px] dark:hidden"
				alt="radian-logo"
				width={103}
				height={28}
				priority
			/>
			<Image
				src="/radian-dark.svg"
				className="h-auto w-[112px] not-dark:hidden"
				alt="radian-logo"
				width={103}
				height={28}
				priority
			/>
		</Link>
	)
}
