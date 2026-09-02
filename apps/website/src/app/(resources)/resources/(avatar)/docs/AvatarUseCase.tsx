import React from "react"
import Image from "next/image"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { ResourceTextSection } from "../../components/ResourceDocs"

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
		title: "Navigation & Account Access",
		description:
			"Display the currently signed-in user while providing quick access to profiles, account settings, and authentication options.",
	},
	{
		title: "Messaging & Collaboration",
		description:
			"Distinguish participants in chats, comments, video meetings, and shared workspaces for easier communication.",
	},
	{
		title: "Lists & Data Displays",
		description:
			"Pair avatars with names in customer directories, employee lists, CRM records, and user management tables to improve readability and recognition.",
	},
	{
		title: "Avatar Groups and Teams",
		description:
			"Represent multiple collaborators in a compact layout with overlap and overflow indicators",
	},
	{
		title: "Comments & Activity Feeds",
		description:
			"Highlight authors across discussions, notifications, changelogs, and social interactions.",
	},
	{
		title: "Project Ownership",
		description:
			"Show assignees, reviewers, contributors, and document owners throughout productivity and project management applications.",
	},
	{
		title: "Presence & Status Indicators",
		description:
			"Display online, offline, away, busy, or verified states using badges that communicate user availability in real time.",
	},
	{
		title: "Organizations & Brands",
		description:
			"Use logos or branded avatars to represent companies, workspaces, departments, and business accounts.",
	},
]

const AvatarUseCase = () => {
	return (
		<ResourceTextSection
			id="avatar-use-cases-heading"
			eyebrow="Use cases"
			title="Common avatar UI layouts and patterns"
			points={useCasePoints}
			after={
				<p>
					Below is a collection of avatars used in different interface patterns.
				</p>
			}
			visual={<AvatarUseCaseVisual />}>
			<p>
				Avatars appear in navigation, chat threads, data tables, and activity
				feeds anywhere an interface needs to identify a person or team.
			</p>
		</ResourceTextSection>
	)
}

function AvatarUseCaseVisual() {
	return (
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
	)
}

export default AvatarUseCase
