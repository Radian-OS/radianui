import type { Metadata } from "next"

export const metadata: Metadata = {
	alternates: {
		canonical: new URL(`${process.env.NEXT_PUBLIC_WEBSITE_URL!}/blog`),
	},
}

export default function Blog() {
	return (
		<div className="mx-auto max-w-7xl">
			<div className="w-full">
				<div id="header" className="lg:py-7.5 flex flex-col gap-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10">
					<h1 className="text-text text-2xl font-bold sm:text-3xl lg:text-4xl">Blogs</h1>
					<p className="text-text-secondary text-sm font-normal sm:text-base lg:text-lg">Get all the latest blogs about RadianOS</p>
				</div>
				<div className="bg-border h-px w-full" />
			</div>
		</div>
	)
}
