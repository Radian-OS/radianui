import Image from "next/image"
import { ResourceTextSection } from "../../components/ResourceDocs"

export default function AvatarIntroduction() {
	return (
		<ResourceTextSection
			id="avatar-introduction-heading"
			eyebrow="Introduction"
			title="What are UI Avatars"
			visual={<AvatarIntroductionVisual />}>
			<p>
				A UI avatar is a small image or icon that represents a person, team, or
				organization inside a digital product: a photo, initials, a logo, or an
				illustration. Avatars let users recognize who&apos;s who at a glance.
			</p>
			<p>
				They appear throughout SaaS dashboards, chat apps, CRMs, project tools,
				and social platforms. A useful avatar system needs consistent sizes and
				shapes, status indicators, and a fallback when no image is available.
			</p>
		</ResourceTextSection>
	)
}

function AvatarIntroductionVisual() {
	return (
		<div className="mx-auto w-full lg:w-200">
			<Image
				className="border-soft w-full overflow-hidden rounded-xl border md:rounded-[20px] dark:hidden"
				src="/avatar/avatar-introduction-bg.png"
				alt="Collection of diverse UI avatar portraits arranged in a profile interface"
				width={800}
				height={440}
				sizes="(min-width: 1024px) 800px, 100vw"
			/>
			<Image
				className="border-soft hidden w-full overflow-hidden rounded-xl border md:rounded-[20px] dark:block"
				src="/avatar/avatar-introduction-bg-dark.png"
				alt="Collection of diverse UI avatar portraits arranged in a dark profile interface"
				width={800}
				height={440}
				sizes="(min-width: 1024px) 800px, 100vw"
			/>
		</div>
	)
}
