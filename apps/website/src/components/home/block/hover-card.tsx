import React, { SVGProps } from "react"
import { usePlayground } from "@/contexts/playground"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { FileWithPreview } from "@/registry/ui/file-upload"
import { buttonStyles, colorMap, radiusBorderMap, radiusMap, sizeMap, spaceMap } from "./signin1"

const profile = {
	name: "Zoya Petrova",
	description: "Engineering partner for @Radianos",
	avatar: "/media/male-2.png",
	address: "Berlin, Germany",
	followingInThousands: 1.4,
	followersInThousands: 412.4,
}

export default function HoverCard() {
	const { radius, color, size, button, logoImage, spacing } = usePlayground()

	const getImageSrc = (image: string | FileWithPreview | undefined) => {
		if (!image) return undefined
		return typeof image === "string" ? image : image.preview
	}
	return (
		<div
			style={{
				backgroundImage: "radial-gradient(circle, var(--color-fill4-alpha) 1px, transparent 1px)",
				backgroundSize: "10px 10px",
			}}
			className="bg-elevation-negative flex h-full w-full items-center justify-center px-5 py-4">
			<div className={`border-border bg-bg flex w-80 flex-col overflow-hidden ${radiusBorderMap[radius]} border p-0`}>
				<div className="bg-primary-focus relative h-16">
					<Avatar size="80" className="border-bg border-6 absolute bottom-0 left-4 translate-y-1/2">
						<AvatarImage src={logoImage ? getImageSrc(logoImage) : profile.avatar} />
						<AvatarFallback className="text-base">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
				</div>

				<div className={`flex flex-col ${spaceMap.gap4[spacing ?? "default"]} px-4 pb-4 pt-14`}>
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1">
							<p>{profile.name}</p>
							<VerifiedSVGIcon />
						</div>
						<p className="text-sm">{profile.description}</p>
						<p className="text-fg-tertiary text-[13px]">{profile.address}</p>
					</div>

					<div className={`flex h-5 ${spaceMap.gap3[spacing ?? "default"]} text-sm`}>
						<p className="flex items-center gap-1">
							<span className="font-medium">{profile.followingInThousands}k</span>
							<span className="text-fg-secondary">Following</span>
						</p>
						<Divider orientation="vertical" className="bg-soft-alpha" />
						<p className="flex items-center gap-1">
							<span className="font-medium">{profile.followersInThousands}k</span>
							<span className="text-fg-secondary">Followers</span>
						</p>
					</div>

					<div className={`flex ${spaceMap.gap3[spacing ?? "default"]}`}>
						<Button size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]} ${colorMap[color]} w-full flex-1 ${buttonStyles[button ?? "default"]}`}>
							Message
						</Button>
						<Button variant="outline" color="primary" size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]} w-full flex-1`}>
							Follow
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

function VerifiedSVGIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<mask id="a" maskUnits="userSpaceOnUse" x={-0.5} y={-0.5} width={21} height={21} fill="#000">
				<path className="fill-white" d="M-.5-.5h21v21h-21z" />
				<path d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65m-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z" />
			</mask>
			<path
				d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65m-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z"
				className="fill-info opacity-100"
			/>
			<path
				d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65Zm-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z"
				className="stroke-bg stroke-3"
				mask="url(#a)"
			/>
		</svg>
	)
}
