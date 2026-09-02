import React from "react"
import Image from "next/image"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"

const useCaseImages = [
	{
		src: "/avatar/usecase/usecase-1.png",
		alt: "User profile hover card UI component",
	},
	{ src: "/avatar/usecase/usecase-2.png", alt: "Image upload UI card" },
	{
		src: "/avatar/usecase/usecase-3.png",
		alt: "User account dropdown navigation UI component",
	},
	{
		src: "/avatar/usecase/usecase-4.png",
		alt: "Edit profile preview UI card component",
	},
	{
		src: "/avatar/usecase/usecase-5.png",
		alt: "Notifications feed Drawer component",
	},
	{
		src: "/avatar/usecase/usecase-6.png",
		alt: "Contributor search dropdown UI",
	},
	{
		src: "/avatar/usecase/usecase-7.png",
		alt: "Workspace owner selection radio cards component",
	},
	{
		src: "/avatar/usecase/usecase-8.png",
		alt: "Event preview hover card UI component",
	},
]

const useCaseImagesDark = [
	{
		src: "/avatar/usecase/usecase-1-dark.png",
		alt: "User profile hover card UI component",
	},
	{
		src: "/avatar/usecase/usecase-2-dark.png",
		alt: "Image upload UI card",
	},
	{
		src: "/avatar/usecase/usecase-3-dark.png",
		alt: "User account dropdown navigation UI component",
	},
	{
		src: "/avatar/usecase/usecase-4-dark.png",
		alt: "Edit profile preview UI card component",
	},
	{
		src: "/avatar/usecase/usecase-5-dark.png",
		alt: "Notifications feed Drawer component",
	},
	{
		src: "/avatar/usecase/usecase-6-dark.png",
		alt: "Contributor search dropdown UI",
	},
	{
		src: "/avatar/usecase/usecase-7-dark.png",
		alt: "Workspace owner selection radio cards component",
	},
	{
		src: "/avatar/usecase/usecase-8-dark.png",
		alt: "Event preview hover card UI component",
	},
]

const useCasePoints = [
	{
		title: "Profiles and account menus",
		description:
			"This is probably the first place that comes to mind. A larger profile picture can have plenty of room on a profile page, while a navigation bar or account menu might use a much smaller avatar just to show which account is signed in.",
	},
	{
		title: "Comments and chat",
		description:
			"When a conversation gets busy, a little face or set of initials can save you from constantly checking names. It makes it easier to follow who said what, especially when several people are talking at once.",
	},
	{
		title: "Teams, tables, and dashboards",
		description:
			"Avatars are handy whenever people are attached to something. You might see one next to the person assigned to a task, someone who made an update, or the people working on a project. They're a quick visual cue without adding another chunk of text to the interface.",
	},
	{
		title: "User selection and groups",
		description:
			"Avatars also make picking people a lot easier to scan. Whether you're assigning a task, adding someone to a project, or choosing team members, seeing a face or initials can be quicker than working through a wall of names.",
	},
]

const AvatarUseCase = () => {
	return (
		<section
			aria-labelledby="avatar-use-cases-heading"
			className="flex flex-col gap-8 md:gap-16">
			<div className="mx-auto flex w-full flex-col gap-6 lg:w-200">
				<div className="flex flex-col gap-4">
					<p className="text-primary-text text-sm font-medium">Use cases</p>
					<h2 id="avatar-use-cases-heading" className="heading-4">
						<a href="#avatar-use-cases-heading">
							Common avatar UI layouts and patterns
						</a>
					</h2>
					<div className="flex flex-col gap-8">
						<p>
							Avatars can turn up almost anywhere people show up in a product.
							Most of the time, their job is pretty simple: help you recognize
							who you&apos;re looking at. Here are few UI sections where you’ll
							find the avatars most commonly used.
						</p>

						<ul className="flex list-disc flex-col gap-4 pl-5">
							{useCasePoints.map((point) => (
								<li key={point.title}>
									<p className="font-semibold">{point.title}</p>
									<p>{point.description}</p>
								</li>
							))}
						</ul>
					</div>

					<p>
						Below is a collection of avatars used in various cases and their
						visualization in user interface.
					</p>
				</div>
			</div>
			<div className="-mx-5 sm:-mx-6">
				<InfiniteScroll duration={60} pauseOnHover={false}>
					{useCaseImages.map((image, i) => (
						<div
							key={image.src}
							className="relative h-auto w-[70vw] shrink-0 sm:w-[45vw] md:w-[35vw] lg:w-[28vw]">
							<Image
								src={image.src}
								alt={image.alt}
								width={560}
								height={420}
								className="bg-fill1 border-soft h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:invisible dark:absolute dark:inset-0"
							/>
							<Image
								src={useCaseImagesDark[i].src}
								alt={useCaseImagesDark[i].alt}
								width={560}
								height={420}
								className="bg-fill1 border-soft invisible absolute inset-0 h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:visible dark:static"
							/>
						</div>
					))}
				</InfiniteScroll>
			</div>
		</section>
	)
}

export default AvatarUseCase
