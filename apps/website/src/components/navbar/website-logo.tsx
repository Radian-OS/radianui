import React from "react"

import Image from "next/image"
import Link from "next/link"

export function WebsiteLogo() {
	return (
		<Link href={"/"} tabIndex={-1}>
			<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
			<Image src="/radian-dark.svg" className="not-dark:hidden" alt="radian-logo" width={112} height={36} />
		</Link>
	)
}
