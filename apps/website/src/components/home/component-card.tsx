import Link from "next/link"

type Props = {
	thumbnail: string
	thumbnailDark: string
	title: string
	description: string
	url: string
	alt: string
}

export default function ComponentCard({ thumbnail, thumbnailDark, title, description, url, alt }: Props) {
	return (
		<Link href={url}>
			<span className="sr-only">{title}</span>
			<div className="flex flex-col gap-3">
				<img alt={alt} src={thumbnail} className="rounded-md dark:hidden" loading="eager" />
				<img alt={alt} src={thumbnailDark} className="hidden rounded-md dark:block" loading="eager" />
				<div className="flex flex-col gap-1 text-sm">
					<p className="text-text font-semibold">{title}</p>
					<p className="text-text-secondary font-normal">{description}</p>
				</div>
			</div>
		</Link>
	)
}
