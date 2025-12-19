import { useEffect, useState } from "react"
import { BoxIcon, GitPullRequestArrow, PencilRuler } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

const data = [
	{
		id: "test1",
		icon: BoxIcon,
		title: "Building with Radian, Design and Development",
		profile: {
			name: "Kaelin Tristian",
			avatar: "/media/female-5.png",
			username: "lahcsin#44",
		},
		timestamp: "1 week ago",
		tag: "Radian",
		img: "/mstile-70x70.png",
	},
	{
		id: "test2",
		icon: PencilRuler,
		title: "Updated design system to match new project",
		profile: {
			name: "Alex Morgan",
			avatar: "/media/male-1.png",
			username: "nugas#21",
		},
		timestamp: "5 days ago",
		tag: "Figma",
		img: "/figma.svg",
	},
	{
		id: "test3",
		icon: PencilRuler,
		title: "Created all user flows using blocks",
		profile: {
			name: "Alex Morgan",
			avatar: "/media/male-1.png",
			username: "nugas#21",
		},
		timestamp: "5 days ago",
		tag: "Figma",
		img: "/figma.svg",
	},
	{
		id: "test4",
		icon: PencilRuler,
		title: "Modified a few screens to match our project requirements",
		profile: {
			name: "Alex Morgan",
			avatar: "/media/male-1.png",
			username: "nugas#21",
		},
		timestamp: "2 days ago",
		tag: "Figma",
		img: "/figma.svg",
	},
	{
		id: "test5",
		icon: GitPullRequestArrow,
		title: "Initializing project via CLI and adding all components",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.png",
			username: "yajib#21",
		},
		timestamp: "2 days ago",
		tag: "Cursor",
		img: "/cursor.svg",
	},
	{
		id: "test6",
		icon: GitPullRequestArrow,
		title: "Pulled all blocks from radian blocks directory",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.png",
			username: "yajib#21",
		},
		timestamp: "2 hours ago",
		tag: "Cursor",
		img: "/cursor.svg",
	},
	{
		id: "test7",
		icon: GitPullRequestArrow,
		title: "Fixing a few components and screens to update design requirements",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.png",
			username: "yajib#21",
		},
		timestamp: "2 hours ago",
		tag: "Cursor",
		img: "/cursor.svg",
	},
	{
		id: "test8",
		icon: GitPullRequestArrow,
		title: "The project looks good to go. Validated with the team",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.png",
			username: "yajib#21",
		},
		timestamp: "2 hours ago",
		tag: "Cursor",
		img: "/cursor.svg",
	},
]

export function CodeSync() {
	const [offset, setOffset] = useState(0)
	const totalCards = data.length
	const duplicatedData = Array(10).fill(data).flat()

	useEffect(() => {
		const interval = setInterval(() => {
			setOffset((prev) => {
				if (prev >= duplicatedData.length - 4) {
					return 0
				}
				return prev + 1
			})
		}, 4000)

		return () => clearInterval(interval)
	}, [totalCards])

	return (
		<div className="h-full select-none overflow-hidden">
			<motion.div
				animate={{ y: -offset * 94 }}
				transition={{
					duration: 1,
					ease: "easeInOut",
				}}>
				{duplicatedData.map((item, index) => {
					const Icon = item.icon
					// Calculate position relative to current offset
					const position = index - offset
					// Determine if this is the top visible card (position 0)
					const iconClass = position === 0 ? "text-primary-text shrink-0 transition-opacity duration-1000" : "text-fg-secondary shrink-0 transition-opacity duration-1000"
					return (
						<div key={index} className="border-soft bg-bg h-23.5 flex gap-5 border-t py-6 pl-4 md:px-12">
							<Icon className={iconClass} size={20} style={{ opacity: 1 }} />
							<div className="flex flex-col gap-1.5">
								<p className="text-fg text-sm font-normal">{item.title}</p>
								<div className="flex items-center gap-2.5">
									<div className="flex items-center gap-1.5">
										<Avatar size="20" rounded="circle">
											<AvatarImage src={item.profile.avatar} />
											<AvatarFallback>{item.profile.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<p className="text-fg-secondary text-xs font-normal">{item.profile.username}</p>
									</div>
									<div className="bg-fill3 h-1 w-1 rounded-full"></div>
									<p className="text-fg-secondary text-xs font-normal">{item.timestamp}</p>
									<div className="bg-fill3 h-1 w-1 rounded-full"></div>
									<div className="flex items-center gap-1.5">
										<Image src={item.img ?? "/mstile-70x70.png"} alt="Radian" width={16} height={16} />
										<p className="text-fg-secondary text-xs font-normal">{item.tag}</p>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</motion.div>
		</div>
	)
}
