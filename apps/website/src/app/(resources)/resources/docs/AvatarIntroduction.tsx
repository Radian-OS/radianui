import React from "react"
import Image from "next/image"

const AvatarIntroduction = () => {
	return (
		<section
			aria-labelledby="avatar-introduction-heading"
			className="lg:w-200 mx-auto flex w-full flex-col gap-8 md:gap-16">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<p className="text-primary-text text-sm font-medium">Introduction</p>
					<h2 id="avatar-introduction-heading" className="heading-4">
						What are UI Avatars
					</h2>
					<div className="flex flex-col gap-8">
						<p>
							A UI avatar is a small image or icon that represents a person,
							team, or organization inside a digital product, a photo, initials,
							a logo, or an illustration. Avatars let users recognize who&apos;s
							who at a glance, without reading a name every time.
						</p>
						<p>
							They show up everywhere SaaS dashboards, chat apps, CRMs, project
							tools, social platforms. Basically anywhere a piece of UI needs to
							point at a specific account. A proper avatar system needs multiple
							sizes, consistent shapes, status indicators, and a fallback for
							when there&apos;s no photo to show. Below are 216 of them free,
							royalty-free, ready to use
						</p>
					</div>
				</div>
			</div>
			<Image
				className="border-soft overflow-hidden rounded-xl border md:rounded-[20px] dark:hidden"
				src="/avatar/avatar-introduction-bg.png"
				alt="Collection of diverse UI avatar portraits arranged in a profile interface"
				width={800}
				height={440}
				sizes="(min-width: 1024px) 800px, 100vw"
			/>
			<Image
				className="border-soft hidden overflow-hidden rounded-xl border md:rounded-[20px] dark:block"
				src="/avatar/avatar-introduction-bg-dark.png"
				alt="Collection of diverse UI avatar portraits arranged in a dark profile interface"
				width={800}
				height={440}
				sizes="(min-width: 1024px) 800px, 100vw"
			/>
		</section>
	)
}

export default AvatarIntroduction
