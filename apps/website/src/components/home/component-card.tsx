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
		<Link href={url} className="flex w-full flex-col items-center">
			<span className="sr-only">{title}</span>
			<div className="flex w-full flex-col items-start gap-3">
				<div className="bg-fill2 flex w-full justify-center rounded-md">
					<img alt={alt} src={thumbnail} className="max-h-[228x] max-w-[282px] dark:hidden" loading="eager" />
					<img alt={alt} src={thumbnailDark} className="hidden max-h-[228px] max-w-[282px] dark:block" loading="eager" />
				</div>
				<div className="flex flex-col gap-1 text-sm">
					<p className="text-fg font-semibold">{title}</p>
					<p className="text-fg-secondary font-normal">{description}</p>
				</div>
			</div>
		</Link>
	)
}
