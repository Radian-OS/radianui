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
		<Link href={url} className="flex h-full w-full flex-col items-center">
			<span className="sr-only">{title}</span>
			<div className="border-soft flex h-full w-full flex-col items-start gap-3 overflow-hidden border border-y-0">
				<div className="flex w-full flex-1 justify-center bg-[#F4F4F6] dark:bg-[#131316]">
					<Image
						width={335}
						height={320}
						alt={alt}
						src={thumbnail}
						className="max-h-[320px] max-w-[335px] dark:hidden"
					/>
					<Image
						width={335}
						height={320}
						alt={alt}
						src={thumbnailDark}
						className="hidden max-h-[320px] max-w-[335px] dark:block"
					/>
				</div>
				<div className="flex flex-col gap-1 p-5 text-sm">
					<h3 className="text-fg font-medium">{title}</h3>
					<p className="text-fg-secondary font-normal">
						{description}, 94 variants
					</p>
				</div>
			</div>
		</Link>
	)
}
