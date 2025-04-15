import Link from "next/link"

type Props = {
	svgUrl: string
	darkModeSvgUrl: string
	title: string
	description: string
	href: string
}

export default function ComponentCard({ svgUrl, darkModeSvgUrl, title, description, href }: Props) {
	return (
		<Link href={href}>
			<div className="flex flex-col gap-3">
				<img alt="Light mode picture" src={svgUrl} className="rounded-md dark:hidden" loading="eager" />
				<img alt="Dark mode picture" src={darkModeSvgUrl} className="hidden rounded-md dark:block" loading="eager" />
				<div className="text-sm flex flex-col gap-1">
					<p className="text-text font-semibold">{title}</p>
					<p className="text-text-secondary font-normal">{description}</p>
				</div>
			</div>
		</Link>
	)
}
