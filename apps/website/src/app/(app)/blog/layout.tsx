import React, { ReactNode } from "react"
import CTASection from "@/components/home/cta-section"
import Footer from "@/components/home/footer"

interface BlogLayoutProps {
	children: ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
	return (
		<div className="flex flex-col">
			<div className="mx-auto w-full max-w-360">{children}</div>
			<CTASection />
			<Footer />
		</div>
	)
}

export default BlogLayout
