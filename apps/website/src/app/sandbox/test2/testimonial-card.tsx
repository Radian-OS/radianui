import Image from "next/image"

interface TestimonialCardProps {
	brand: string
	image: string
}

export function TestimonialCard({ brand, image }: TestimonialCardProps) {
	return (
		<div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-2xl sm:aspect-[3/4] lg:aspect-auto lg:min-h-[380px]">
			{/* Background image */}
			<Image
				src={image}
				alt={`${brand} brand visual`}
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, 380px"
			/>

			{/* Blue tint overlay */}
			<div className="absolute inset-0 bg-[#1900ff]/70 mix-blend-multiply" />

			{/* Brand name overlay */}
			<div className="absolute bottom-6 left-6 z-10">
				<span className="text-xl font-medium tracking-tight text-white sm:text-2xl">
					{brand}
				</span>
			</div>
		</div>
	)
}
