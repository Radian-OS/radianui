import React, { ReactNode } from "react"

interface Props {
	children: ReactNode
}

export default async function LandingLayout({ children }: Props) {
	return <main>{children}</main>
}
