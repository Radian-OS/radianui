import type React from "react"
import Link from "next/link"

type Props = {
	thumbnail: React.ComponentType<React.SVGProps<SVGSVGElement>>
	title: string
	description: string
	url: string
	alt: string
}

export default function ComponentCard({
	thumbnail: Thumbnail,
	title,
	description,
	url,
	alt,
}: Props) {
	return (
		<Link href={url} className="flex h-full w-full flex-col items-center">
			<span className="sr-only">{title}</span>
			<div className="border-soft flex h-full w-full flex-col items-start overflow-hidden border border-y-0">
				<div className="border-soft bg-elevation-negative flex w-full flex-1 justify-center overflow-hidden border-b">
					<Thumbnail aria-label={alt} role="img" />
				</div>
				<div className="flex flex-col gap-1 p-5 text-sm">
					<h3 className="text-fg font-medium">{title}</h3>
					<p className="text-fg-secondary font-normal">{description}</p>
				</div>
			</div>
		</Link>
	)
}
