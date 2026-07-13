import React from "react"
import Image from "next/image"

const AvatarIntroduction = () => {
	return (
		<div className="lg:w-200 mx-auto flex w-full flex-col gap-16">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<p className="text-primary-text text-sm font-medium">Introduction</p>
					<h2 className="heading-4">What are UI Avatars</h2>
					<div className="flex flex-col gap-8">
						<p>
							UI avatars are visual representations of users, teams,
							organizations, or brands within a digital interface. They help
							people quickly recognize identities without reading names, making
							interfaces faster to scan and easier to navigate. An avatar can be
							a profile photo, initials, company logo, icon, emoji,
							illustration, or any custom graphic that represents an account.
						</p>
						<p>
							Modern avatar components are widely used across web applications,
							mobile apps, SaaS dashboards, social platforms, CRMs, project
							management tools, and collaboration software. Beyond displaying
							profile pictures, avatars improve visual hierarchy, strengthen
							brand identity, and create a more personal user experience. A
							flexible avatar system typically supports multiple sizes, shapes,
							status indicators, badges, fallback initials, and avatar groups to
							ensure consistency throughout an application.
						</p>
					</div>
				</div>
			</div>
			<Image
				src="/avatar/avatar-introduction-bg.png"
				alt="Avatar Introduction"
				width={800}
				height={440}
			/>
		</div>
	)
}

export default AvatarIntroduction
