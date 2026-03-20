import Image from "next/image"

export default function AuthHeader({
	title,
	children,
}: {
	title: string
	children?: React.ReactNode
}) {
	return (
		<div className="flex flex-col gap-6">
			<Image
				src="https://radianos.com/favicon.ico"
				alt="Radian Logo"
				width={32}
				height={32}
				className="rounded-md"
			/>
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">{title}</h2>
				{children}
			</div>
		</div>
	)
}
