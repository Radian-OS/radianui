import React, { ReactNode } from "react"

interface BlogLayoutProps {
	children: ReactNode
	aside: ReactNode
}

const BlogLayout = ({ children, aside }: BlogLayoutProps) => {
	return (
		<div className="mx-auto mt-10 mb-43 flex w-full max-w-340 justify-center gap-10 px-4 md:px-5">
			<div className="w-full max-w-200 min-w-0 flex-1">{children}</div>
			{aside}
		</div>
	)
}

export default BlogLayout
