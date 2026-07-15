import React from "react"
import Image from "next/image"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"

const useCaseImages = [
	{ src: "/avatar/usecase/usecase-1.png", alt: "Navigation & Account Access" },
	{ src: "/avatar/usecase/usecase-2.png", alt: "Messaging & Collaboration" },
	{ src: "/avatar/usecase/usecase-3.png", alt: "Lists & Data Displays" },
	{ src: "/avatar/usecase/usecase-4.png", alt: "Avatar Groups and Teams" },
	{ src: "/avatar/usecase/usecase-5.png", alt: "Comments & Activity Feeds" },
	{ src: "/avatar/usecase/usecase-6.png", alt: "Project Ownership" },
	{ src: "/avatar/usecase/usecase-7.png", alt: "Presence & Status Indicators" },
	{ src: "/avatar/usecase/usecase-8.png", alt: "Organizations & Brands" },
]

const useCaseImagesDark = [
	{
		src: "/avatar/usecase/usecase-1-dark.png",
		alt: "Navigation & Account Access",
	},
	{
		src: "/avatar/usecase/usecase-2-dark.png",
		alt: "Messaging & Collaboration",
	},
	{ src: "/avatar/usecase/usecase-3-dark.png", alt: "Lists & Data Displays" },
	{ src: "/avatar/usecase/usecase-4-dark.png", alt: "Avatar Groups and Teams" },
	{
		src: "/avatar/usecase/usecase-5-dark.png",
		alt: "Comments & Activity Feeds",
	},
	{ src: "/avatar/usecase/usecase-6-dark.png", alt: "Project Ownership" },
	{
		src: "/avatar/usecase/usecase-7-dark.png",
		alt: "Presence & Status Indicators",
	},
	{ src: "/avatar/usecase/usecase-8-dark.png", alt: "Organizations & Brands" },
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
		<div className="flex flex-col gap-8 md:gap-16">
			<div className="lg:w-200 mx-auto flex w-full flex-col gap-6">
				<div className="flex flex-col gap-4">
					<p className="text-primary-text text-sm font-medium">Use cases</p>
					<h2 className="heading-4">Common avatar UI layouts and patterns</h2>
					<div className="flex flex-col gap-8">
						<p>
							User avatars appear throughout modern interfaces because they
							provide instant visual recognition while reducing cognitive load.
							Instead of relying solely on text, avatars help users identify
							people, teams, and organizations at a glance. A well-designed
							avatar component adapts to many interface patterns, from
							navigation menus and messaging apps to data tables and
							collaborative workspaces.
						</p>

						<ul className="flex list-disc flex-col gap-4 pl-5">
							{useCasePoints.map((point) => (
								<li key={point.title}>
									<span className="font-semibold">{point.title}</span> –{" "}
									{point.description}
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
					{useCaseImages.map((image) => (
						<Image
							key={image.src}
							src={image.src}
							alt={image.alt}
							width={560}
							height={420}
							className="border-soft h-auto w-[70vw] shrink-0 rounded-[10px] border sm:w-[45vw] sm:rounded-xl md:w-[35vw] md:rounded-[20px] lg:w-[28vw] dark:hidden"
						/>
					))}
				</InfiniteScroll>
				<InfiniteScroll duration={60} pauseOnHover={false}>
					{useCaseImagesDark.map((image) => (
						<Image
							key={image.src}
							src={image.src}
							alt={image.alt}
							width={560}
							height={420}
							className="bg-fill1 border-soft hidden h-auto w-[70vw] shrink-0 rounded-[10px] border sm:w-[45vw] sm:rounded-xl md:w-[35vw] md:rounded-[20px] lg:w-[28vw] dark:block"
						/>
					))}
				</InfiniteScroll>
			</div>
		</div>
	)
}

export default AvatarUseCase
