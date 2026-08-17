"use client"

import {
	Download,
	Image as ImageIcon,
	Link2,
	MoreHorizontal,
	SquareDashedMousePointer,
	Star,
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import {
	AVATAR_BLEND_OPACITY,
	getAvatarAltText,
	getImageBackgroundTint,
} from "@/constants/avatar-playground-utils"
import { AVATAR_SHADOW_MAP } from "@/constants/avatar-shadow-map"
import { useAvatarTileActions } from "@/hooks/avatar/use-avatar-tile-actions"
import { cn } from "@/lib/utils"
import { Button, CompactButton } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="17"
		height="17"
		viewBox="0 0 17 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}>
		<mask
			id="mask0_1097_9070"
			style={{ maskType: "alpha" } as React.CSSProperties}
			maskUnits="userSpaceOnUse"
			x="0"
			y="0"
			width="17"
			height="17">
			<path
				d="M8.33301 0.347656C12.7435 0.347656 16.3192 3.92255 16.3193 8.33301C16.3193 12.7436 12.7436 16.3193 8.33301 16.3193C3.92255 16.3192 0.347656 12.7435 0.347656 8.33301C0.347833 3.92266 3.92266 0.347833 8.33301 0.347656Z"
				fill="black"
				stroke="#717784"
				strokeWidth="0.694444"
			/>
		</mask>
		<g mask="url(#mask0_1097_9070)">
			<path
				d="M8.33333 16.6667C12.9357 16.6667 16.6667 12.9357 16.6667 8.33333C16.6667 3.73096 12.9357 0 8.33333 0C3.73096 0 0 3.73096 0 8.33333C0 12.9357 3.73096 16.6667 8.33333 16.6667Z"
				fill="black"
			/>
			<path
				d="M13.8433 14.5852L6.40204 5H5V11.6639H6.12163V6.42441L12.9629 15.2634C13.2716 15.0569 13.5656 14.8301 13.8433 14.5852Z"
				fill="url(#paint0_linear_1097_9070)"
			/>
			<path
				d="M11.7595 5H10.6484V11.6667H11.7595V5Z"
				fill="url(#paint1_linear_1097_9070)"
			/>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_1097_9070"
				x1="10.0926"
				y1="10.787"
				x2="13.3796"
				y2="14.8611"
				gradientUnits="userSpaceOnUse">
				<stop stopColor="white" />
				<stop offset="1" stopColor="white" stopOpacity="0" />
			</linearGradient>
			<linearGradient
				id="paint1_linear_1097_9070"
				x1="11.204"
				y1="5"
				x2="11.1854"
				y2="9.89583"
				gradientUnits="userSpaceOnUse">
				<stop stopColor="white" />
				<stop offset="1" stopColor="white" stopOpacity="0" />
			</linearGradient>
		</defs>
	</svg>
)

const Html5Icon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="15"
		height="17"
		viewBox="0 0 15 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}>
		<path
			d="M1.30991 14.5996L0 0H14.409L13.0991 14.5996L7.18851 16.25"
			fill="#E34F26"
		/>
		<path
			d="M7.22046 14.9803L11.9808 13.6791L13.0991 1.1742H7.22046"
			fill="#EF652A"
		/>
		<path
			d="M7.22058 6.60151H4.82441L4.66467 4.76069H7.22058V2.98334H2.68383L3.16307 8.41059H7.22058V6.60151ZM7.22058 11.267L5.17585 10.7275L5.04805 9.29926H3.25891L3.48256 12.124L7.22058 13.1396V11.267Z"
			fill="#ECEDEE"
		/>
		<path
			d="M7.22058 8.41059H9.42494L9.20129 10.7275L7.22058 11.267V13.1396L10.8946 12.124L11.4058 6.60151H7.22058V8.41059ZM7.22058 2.98334V4.76069H11.5655L11.7253 2.98334H7.22058Z"
			fill="white"
		/>
	</svg>
)

export interface AvatarTileProps {
	src: string
	index: number
	toneStyle: React.CSSProperties
	tone: string
	copyFormat: string
	isFavorite: boolean
	onToggleFavorite: () => void
}

export const AvatarTile = ({
	src,
	index,
	toneStyle,
	tone,
	copyFormat,
	isFavorite,
	onToggleFavorite,
}: AvatarTileProps) => {
	const isNeutralBackground = tone === "neutral" || tone === "none"
	const imageBackgroundTint = getImageBackgroundTint(tone)
	const shouldApplyShadow =
		!isNeutralBackground && Object.keys(toneStyle).length > 0
	const shadowStyle = imageBackgroundTint
		? { backgroundColor: imageBackgroundTint }
		: toneStyle

	const {
		copied,
		handleCopy,
		handleCopyPng,
		handleCopyTransparentPng,
		handleCopyFigmaFrame,
		handleCopyUrlTransparent,
		handleCopyNextImageTag,
		handleCopyHtmlImgTag,
		handleDownload,
	} = useAvatarTileActions({
		src,
		index,
		tone,
		copyFormat,
		shouldApplyShadow,
	})

	return (
		<li
			className="border-soft bg-bg group relative isolate aspect-square w-full overflow-hidden rounded-xl border"
			style={toneStyle}>
			<Image
				src={src}
				alt={getAvatarAltText(index + 1, tone)}
				fill
				sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 14vw"
				className="z-10 origin-bottom translate-y-[3%] scale-[1.03] object-cover object-bottom transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.08]"
			/>
			{AVATAR_SHADOW_MAP[index] && (
				<Image
					src={AVATAR_SHADOW_MAP[index]}
					alt=""
					fill
					sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 14vw"
					className="z-5 pointer-events-none origin-bottom translate-y-[3%] scale-[1.03] object-cover object-bottom mix-blend-hard-light transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.08]"
				/>
			)}
			{shouldApplyShadow && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 mix-blend-color-burn"
					style={{
						...shadowStyle,
						opacity: AVATAR_BLEND_OPACITY,
					}}
				/>
			)}
			{isNeutralBackground && (
				<div
					aria-hidden="true"
					className="dark:bg-bg/10 pointer-events-none absolute inset-0 hidden dark:block"
				/>
			)}

			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[80px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				style={{
					background:
						"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%)",
				}}
			/>

			<div className="absolute right-2 top-2 z-30">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<CompactButton
							aria-label="Button with Down Arrow"
							size="24"
							variant="ghost"
							color="neutral"
							className="opacity-0 transition-opacity hover:bg-transparent group-hover:bg-transparent group-hover:opacity-100 data-[state=open]:opacity-100"
							onClick={(e) => e.stopPropagation()}>
							<MoreHorizontal className="size-4 text-black" />
						</CompactButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="start" className="z-100 w-56 p-1.5">
						<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
							Design
						</DropdownMenuLabel>
						<DropdownMenuItem className="h-7" onSelect={handleCopyPng}>
							<ImageIcon className="text-fg-secondary size-4" />
							<span>Copy PNG</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="h-7"
							onSelect={handleCopyTransparentPng}>
							<SquareDashedMousePointer className="text-fg-secondary size-4" />
							<span>Copy Transparent PNG</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="h-7" onSelect={handleCopyFigmaFrame}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 20 20"
								fill="none"
								className="size-4 shrink-0">
								<path
									d="M9.72266 10.0001C9.72266 8.3893 11.0285 7.08344 12.6393 7.08344C14.2501 7.08344 15.556 8.3893 15.556 10.0001C15.556 11.6109 14.2501 12.9168 12.6393 12.9168C11.0285 12.9168 9.72266 11.6109 9.72266 10.0001Z"
									fill="#1ABCFE"
								/>
								<path
									d="M3.88867 15.8332C3.88867 14.2224 5.19451 12.9166 6.80534 12.9166H9.722V15.8332C9.722 17.4441 8.41618 18.7499 6.80534 18.7499C5.19451 18.7499 3.88867 17.4441 3.88867 15.8332Z"
									fill="#0ACF83"
								/>
								<path
									d="M9.72266 1.25V7.08331H12.6393C14.2502 7.08331 15.556 5.77749 15.556 4.16666C15.556 2.55584 14.2502 1.25 12.6393 1.25H9.72266Z"
									fill="#FF7262"
								/>
								<path
									d="M3.88867 4.16667C3.88867 5.77749 5.19451 7.08332 6.80534 7.08332H9.722V1.25H6.80534C5.19451 1.25 3.88867 2.55583 3.88867 4.16667Z"
									fill="#F24E1E"
								/>
								<path
									d="M3.88867 10.0001C3.88867 11.6109 5.19451 12.9168 6.80534 12.9168H9.722V7.08344H6.80534C5.19451 7.08344 3.88867 8.3893 3.88867 10.0001Z"
									fill="#A259FF"
								/>
							</svg>
							<span>Figma Frame</span>
						</DropdownMenuItem>

						<DropdownMenuDivider />

						<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
							Development
						</DropdownMenuLabel>
						<DropdownMenuItem
							className="h-7"
							onSelect={handleCopyUrlTransparent}>
							<Link2 className="text-fg-secondary size-4" />
							<span>URL Transparent</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="h-7" onSelect={handleCopyNextImageTag}>
							<NextjsIcon className="text-fg size-4" />
							<span>Next JS &lt;Image&gt; Tag</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="h-7" onSelect={handleCopyHtmlImgTag}>
							<Html5Icon className="size-4" />
							<span>HTML &lt;IMG&gt; Tag</span>
						</DropdownMenuItem>

						<DropdownMenuDivider />

						<DropdownMenuItem className="h-7" onSelect={() => handleDownload()}>
							<Download className="text-fg-secondary size-4" />
							<span>Download PNG</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="h-7"
							onSelect={() => {
								setTimeout(() => {
									onToggleFavorite()
								}, 200)
								toast.success(
									isFavorite ? "Removed from favorites" : "Added to favorites"
								)
							}}>
							<Star
								className={cn(
									"text-fg-secondary size-4",
									isFavorite && "fill-current"
								)}
							/>
							<span>
								{isFavorite ? "Unfavorite Avatar" : "Favorite Avatar"}
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="absolute inset-x-0 bottom-0 z-30 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
				<Button
					size="28"
					color="neutral"
					variant="outline"
					className="w-full border-none bg-white text-black hover:[background:linear-gradient(rgba(0,0,0,0.10),rgba(0,0,0,0.10)),_#fff]"
					onClick={handleCopy}>
					{copied
						? copyFormat === "editable-bg"
							? "Paste in Figma"
							: "Copied"
						: "Copy"}
				</Button>
			</div>
		</li>
	)
}
