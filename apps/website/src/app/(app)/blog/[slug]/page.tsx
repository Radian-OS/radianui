import React from "react"
import { Box } from "lucide-react"
import Image from "next/image"
import { Alert } from "@/registry/ui/alert"
import { Avatar } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code"
import { Divider } from "@/registry/ui/divider"

const page = () => {
	return (
		<div className="max-w-360 mx-auto flex w-full flex-col items-center py-20">
			<section className="flex flex-col gap-4">
				<Badge variant="soft">Announcements</Badge>
				<h1 className="heading-3">Radian OS Alpha Release</h1>
				<span className="text-text-secondary text-sm">Sunday, June 24, 2025</span>
				<div className="py-6">
					<div className="max-h-100">
						<Image className="h-full w-full rounded-lg object-cover" src="/og/static-og.png" alt="blog-logo" width={500} height={500} />
					</div>
					<div className="flex items-center gap-3 py-6 text-sm">
						<span className="text-text-secondary font-medium">Author</span>
						<span className="flex items-center gap-3">
							<Avatar size="24" name="Nischal Kharel" src="https://randomuser.me/api/portraits/men/1.jpg" />
							<div className="flex flex-col">
								<p className="font-medium">Nischal Kharel</p>
								<p className="text-text-secondary text-xs">@script44</p>
							</div>
						</span>
						<span className="flex items-center gap-3 pl-3">
							<Avatar size="24" name="Nischal Kharel" src="https://randomuser.me/api/portraits/men/1.jpg" />
							<div className="flex flex-col">
								<p className="font-medium">Yubraj Adhikari</p>
								<p className="text-text-secondary text-xs">@script44</p>
							</div>
						</span>
					</div>
					<Divider spacing="20" />
					<h2 className="heading-5 py-5 font-semibold">Release Note</h2>
					<p className="text-text-secondary max-w-200 py-5 text-base">
						Following the stable release of next dev --turbopack, over 50% of development sessions on Next.js 15 are now using Turbopack.
						<br />
						This release includes our alpha release of next build --turbopack, bringing the same performance <br /> improvements from local development to production builds.
					</p>
					<div className="py-5">
						<CodeArea
							copiable
							language="tsx"
							code={`<Button variant="strong" size="base" rounded="rounded" isIcon={false}/>
 Button
</Button>`}
						/>
					</div>
					<Alert
						className="py-5"
						icon={<Box />}
						title="Alpha release Note"
						message="Radian is still in alpha version and expect quick changes and updates to the properties and structure of the code"
						color="warning"
					/>
					<div className="flex flex-col gap-5 py-12">
						<h2 className="heading-5">Installation</h2>
						<p className="text-text-secondary max-w-200 text-base">
							Following the stable release of next dev --turbopack, over 50% of development sessions on Next.js 15 are now using Turbopack.
							<br />
							This release includes our alpha release of next build --turbopack, bringing the same performance improvements from local development to production builds.
						</p>
						<CodeArea copiable language="shell" code={`npx radianos add button`} />
						<div className="outline-border text-text-secondary flex gap-2 rounded-lg p-3 outline">
							<Box className="size-5" />
							Go to the documentation to learn more about the plugin an how to use it
						</div>
					</div>
					<div className="flex flex-col gap-5 pt-12">
						<h2 className="heading-5">Radian OS Alpha Release</h2>
						<p className="text-text-secondary max-w-200 text-base">
							Following the stable release of next dev --turbopack, over 50% of development sessions on Next.js 15 are now using Turbopack.
							<br />
							This release includes our alpha release of next build --turbopack, bringing the same performance improvements from local development to production builds.
						</p>
						<div className="h-100 w-200 bg-fill-level2 rounded-lg"></div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default page
