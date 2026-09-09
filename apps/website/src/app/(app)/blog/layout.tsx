import React, { ReactNode } from "react"
import AvatarCTA from "@/app/(resources)/resources/(avatar)/docs/AvatarCTA"
import Footer from "@/components/home/footer"

interface BlogLayoutProps {
	children: ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="mx-auto mt-6 mb-32 w-full max-w-368 px-4 sm:px-6 lg:px-8">
				{children}
			</div>
			<AvatarCTA />
			<Footer />
		</div>
	)
}

export default BlogLayout
