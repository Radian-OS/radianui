"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import PackageManagerTabs from "@/components/package-manager-tab"
import { CodeArea } from "@/registry/ui/code"

const Manual = () => {
	const language = "bash"
	const pkg = ["pnpm", "yarn", "npm", "bun"]
	const [globalCSS, setGlobalCSS] = useState("")

	useEffect(() => {
		fetch("/styles/global.css")
			.then((res) => res.text())
			.then(setGlobalCSS)
	}, [])
	return (
		<div className="ml-[0.4rem] px-2 py-6 md:ml-[1rem] md:px-0">
			<div className="flex flex-col gap-[30px] border-l pl-[2rem]">
				<div className="relative flex flex-col gap-6">
					<span className="heading-6 bg-border absolute left-[-3rem] flex h-8 w-8 items-center justify-center rounded-full">1</span>
					<h1 className="heading-6">Add Tailwind CSS</h1>
					<p>Components are styled using Tailwind CSS. You need to install Tailwind CSS in your project.</p>
					<Link href="https://tailwindcss.com/docs/installation" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
						Follow the Tailwind CSS installation instructions to get started.
					</Link>
				</div>
				<div className="flex flex-col gap-6">
					<div className="relative">
						<span className="heading-6 bg-border absolute left-[-3rem] flex h-8 w-8 items-center justify-center rounded-full">2</span>
						<div className="flex flex-col gap-6">
							<h1 className="heading-6">Add dependencies</h1>
							<p>Add the following dependencies to your project:</p>
						</div>
					</div>
					<PackageManagerTabs
						language={language}
						pkg={pkg}
						code={"add tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react"}
					/>
				</div>

				<div className="flex flex-col gap-6">
					<div className="relative">
						<span className="heading-6 bg-border absolute left-[-3rem] flex h-8 w-8 items-center justify-center rounded-full">3</span>
						<h1 className="heading-6">Configure path aliases</h1>
					</div>
					<p>Configure the path aliases in your tsconfig.json file.</p>
					<CodeArea
						language="json"
						showLineNumbers
						code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}
					/>
					<p>The @ alias is a preference. You can use other aliases if you want.</p>
				</div>
				<div className="flex flex-col gap-[10px]">
					<div className="relative">
						<span className="heading-6 bg-border absolute left-[-3rem] flex h-8 w-8 items-center justify-center rounded-full">4</span>
						<h1 className="heading-6">Configure styles</h1>
					</div>
					<p>Add the following to your styles/globals.css file.</p>
					<CodeArea language="json" className="h-[30rem]" code={globalCSS} />
				</div>
			</div>
		</div>
	)
}
export default Manual
