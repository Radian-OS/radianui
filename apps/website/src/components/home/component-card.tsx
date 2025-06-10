import Link from "next/link"

type Props = {
	svgUrl: string
	darkModeSvgUrl: string
	title: string
	description: string
	href: string
	alt: string
}

export default function ComponentCard({ svgUrl, darkModeSvgUrl, title, description, href, alt }: Props) {
	return (
		<Link href={href}>
			<div className="flex flex-col gap-3">
				<img alt={alt} src={svgUrl} className="rounded-md dark:hidden" loading="eager" />
				<img alt={alt} src={darkModeSvgUrl} className="hidden rounded-md dark:block" loading="eager" />
				<div className="flex flex-col gap-1 text-sm">
					<p className="text-text font-semibold">{title}</p>
					<p className="text-text-secondary font-normal">{description}</p>
				</div>
			</div>
		</Link>
	)
}
