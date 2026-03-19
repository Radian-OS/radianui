import Image from "next/image"

export function RadianLogo() {
	return (
		<div className="size-8 overflow-hidden rounded-md">
			<Image
				src="https://radianos.com/icons/notion-20.svg"
				alt="Radian Logo"
				width={32}
				height={32}
				className="size-full"
			/>
		</div>
	)
}
