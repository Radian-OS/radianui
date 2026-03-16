import Image from "next/image"
import Link from "next/link"

type Props = {
	thumbnail: string
	thumbnailDark: string
	title: string
	description: string
	url: string
	alt: string
}

export default function ComponentCard({
	thumbnail,
	thumbnailDark,
	title,
	description,
	url,
	alt,
}: Props) {
	return (
		<Link href={url} className="flex w-full flex-col items-center">
			<span className="sr-only">{title}</span>
			<div className="flex w-full flex-col items-start gap-3">
				<div className="flex w-full justify-center rounded-md bg-[#F4F4F6] dark:bg-[#131316]">
					<Image
						width={282}
						height={228}
						alt={alt}
						src={thumbnail}
						className="max-h-[228x] max-w-[282px] dark:hidden"
					/>
					<Image
						width={282}
						height={228}
						alt={alt}
						src={thumbnailDark}
						className="hidden max-h-[228px] max-w-[282px] dark:block"
					/>
				</div>
				<div className="flex flex-col gap-1 text-sm">
					<p className="text-fg font-semibold">{title}</p>
					<p className="text-fg-secondary font-normal">{description}</p>
				</div>
			</div>
		</Link>
	)
}
