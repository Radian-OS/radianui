import { useEffect, useRef, useState } from "react"
import { BoxIcon, GitPullRequestArrow, PencilRuler } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

const data = [
	{
		id: "1",
		icon: BoxIcon,
		title: "Building with Radian, Design and Development",
		profile: {
			name: "Kaelin Tristian",
			avatar: "/media/female-5.jpg",
			username: "lahcsin#44",
		},
		timestamp: "1 week ago",
		tag: "Radian",
		img: "/mstile-70x70.png",
	},
	{
		id: "2",
		icon: PencilRuler,
		title: "Updated design system to match new project",
		profile: {
			name: "Alex Morgan",
			avatar: "/media/male-1.jpg",
			username: "nugas#21",
		},
		timestamp: "5 days ago",
		tag: "Figma",
		img: "/figma.svg",
	},
	{
		id: "3",
		icon: PencilRuler,
		title: "Created all user flows using blocks",
		profile: {
			name: "Alex Morgan",
			avatar: "/media/male-1.jpg",
			username: "nugas#21",
		},
		timestamp: "5 days ago",
		tag: "Figma",
		img: "/figma.svg",
	},
	{
		id: "4",
		icon: PencilRuler,
		title: "Modified a few screens to match our project requirements",
		profile: {
			name: "Alex Morgan",
			avatar: "/media/male-1.jpg",
			username: "nugas#21",
		},
		timestamp: "2 days ago",
		tag: "Figma",
		img: "/figma.svg",
	},
	{
		id: "5",
		icon: GitPullRequestArrow,
		title: "Initializing project via CLI and adding all components",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.jpg",
			username: "yajib#21",
		},
		timestamp: "2 days ago",
		tag: "Cursor",
		img: "/cursor.svg",
	},
	{
		id: "6",
		icon: GitPullRequestArrow,
		title: "Pulled all blocks from radian blocks directory",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.jpg",
			username: "yajib#21",
		},
		timestamp: "10 hours ago",
		tag: "Cursor",
		img: "/cursor.svg",
	},
	{
		id: "7",
		icon: GitPullRequestArrow,
		title: "Fixing a few components and screens to update design requirements",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.jpg",
			username: "yajib#21",
		},
		timestamp: "2 hours ago",
		tag: "Cursor",
		img: "/cursor.svg",
	},
	{
		id: "8",
		icon: GitPullRequestArrow,
		title: "The project looks good to go. Validated with the team",
		profile: {
			name: "Emma Wilson",
			avatar: "/media/female-4.jpg",
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
	const [cardHeight, setCardHeight] = useState(94)
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Measure the actual card height after first render
		if (cardRef.current) {
			const height = cardRef.current.offsetHeight
			setCardHeight(height)
		}

		// Update on window resize
		const handleResize = () => {
			if (cardRef.current) {
				setCardHeight(cardRef.current.offsetHeight)
			}
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

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
				animate={{ y: -offset * cardHeight }}
				transition={{
					duration: 1,
					ease: "easeInOut",
				}}>
				{duplicatedData.map((item, index) => {
					const Icon = item.icon
					// Calculate position relative to current offset
					const position = index - offset
					// Determine if this is the top visible card (position 0)
					const iconClass = position === 1 ? "text-primary-text " : "text-fg-secondary "
					return (
						<div key={index} ref={index === 0 ? cardRef : null} className="border-soft bg-bg flex gap-5 border-t p-4 md:px-12">
							<Icon className={`${iconClass} shrink-0 transition-opacity duration-1000`} size={20} style={{ opacity: 1 }} />
							<div className="flex flex-col gap-1.5">
								<p className="text-fg text-sm font-normal">{item.title}</p>
								<div className="flex items-center gap-2.5">
									<div className="flex items-center gap-1.5">
										<Avatar size="20" rounded="circle">
											<AvatarImage alt={item.profile.name} src={item.profile.avatar} />
											<AvatarFallback>{item.profile.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<p className="text-fg-secondary text-xs font-normal">{item.profile.username}</p>
									</div>
									<div className="bg-fill3 h-1 w-1 rounded-full"></div>
									<p className="text-fg-secondary text-xs font-normal">{item.timestamp}</p>
									<div className="bg-fill3 h-1 w-1 rounded-full"></div>
									<div className="flex items-center gap-1.5">
										<Image src={item.img ?? "/mstile-70x70.png"} alt={item.img ?? "Radian"} width={16} height={16} />
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
