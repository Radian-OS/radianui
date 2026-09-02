import React from "react"
import Image from "next/image"

const AvatarIntroduction = () => {
	return (
		<section
			aria-labelledby="avatar-introduction-heading"
			className="mx-auto flex w-full flex-col gap-8 md:gap-16 lg:w-200">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<p className="text-primary-text text-sm font-medium">Introduction</p>
					<h2 id="avatar-introduction-heading" className="heading-4">
						<a href="#avatar-introduction-heading">What is an Avatar?</a>
					</h2>
					<div className="flex flex-col gap-8">
						<p>
							An avatar is a digital image of a character that represents a
							person, account, or identity online. It can be a photo,
							illustration, initials, cartoon, character, or pretty much any
							image someone chooses to represent themselves.
						</p>
						<p>
							The word &quot;avatar&quot; comes from the Sanskrit
							&quot;avatāra,&quot; which means &quot;manifestation.&quot; It was
							originally used in a religious way to describe a deity taking an
							earthly form. Much later, the word found its way into the digital
							world, where it came to mean a visual representation of a person
							or identity. You may also come across other variations of avatars
							like “avatares” in Spanish and Portuguese.
						</p>
						<p>
							Today, avatars are used everywhere online, from social media and
							gaming platforms to work apps and design tools. Some people use
							their own photo, some pick a random avatar, while some may even
							use the picture of their favorite character from a movie. While a
							person might choose a more lighthearted or goofy avatar for their
							personal social accounts, that same image would not be appropriate
							for formal media platforms like LinkedIn or a business account.
							You would need a professional headshot for formal media. The
							choice usually depends on how the person wants to appear and where
							the avatar will be used.
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Image
					className="border-soft overflow-hidden rounded-xl border md:rounded-[20px] dark:hidden"
					src="/avatar/avatar-introduction-bg3.png"
					alt="Collection of diverse UI avatar portraits arranged in a profile interface"
					width={800}
					height={440}
					sizes="(min-width: 1024px) 800px, 100vw"
				/>
				<Image
					className="border-soft hidden overflow-hidden rounded-xl border md:rounded-[20px] dark:block"
					src="/avatar/avatar-introduction-bg3-dark.png"
					alt="Collection of diverse UI avatar portraits arranged in a dark profile interface"
					width={800}
					height={440}
					sizes="(min-width: 1024px) 800px, 100vw"
				/>
				<p className="text-fg-tertiary text-center text-[13px] font-normal">
					Avatar usage in UI Design
				</p>
			</div>
		</section>
	)
}

export default AvatarIntroduction
