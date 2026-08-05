import Image from "next/image"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"

const brands = [
	{
		name: "KrispCall",
		assetName: "Krispcall",
		width: 110,
		height: 23,
	},
	{
		name: "RemitOS",
		assetName: "Remit Os",
		width: 105,
		height: 22,
	},
	{
		name: "airchannel.ai",
		assetName: "Airchannel",
		width: 138,
		height: 24,
	},
	{
		name: "Tivazo",
		assetName: "Logo",
		width: 84,
		height: 18,
	},
	{
		name: "Mage Icons",
		assetName: "Mage",
		width: 130,
		height: 22,
	},
	{
		name: "Dialaxy",
		assetName: "Dialaxy",
		width: 91,
		height: 21,
	},
] as const

export default function BrandSection() {
	return (
		<section
			aria-labelledby="brand-section-title"
			className="border-soft relative z-30 mx-auto w-full max-w-[1440px] border-l border-r pt-[90px]">
			<div className="border-soft bg-bg lg:h-26 flex h-auto min-w-0 flex-col overflow-hidden border-y lg:flex-row">
				<h2
					id="brand-section-title"
					className="text-fg-secondary border-soft flex w-full shrink-0 items-center justify-center border-b px-8 py-[15px] text-sm font-normal leading-5 md:py-5 lg:h-full lg:w-72 lg:border-b-0 lg:border-r lg:px-9 lg:py-[30px]">
					Teams using Radian to Empower their Designs
				</h2>

				<div
					className="h-18 w-full min-w-0 flex-none md:h-20 lg:h-full lg:flex-1"
					aria-hidden="true">
					<InfiniteScroll
						duration={28}
						pauseOnHover={true}
						className="h-full p-0 [--gap:0px]">
						{brands.map((brand) => (
							<BrandLogo key={brand.name} brand={brand} />
						))}
					</InfiniteScroll>
				</div>
			</div>
		</section>
	)
}

function BrandLogo({ brand }: { brand: (typeof brands)[number] }) {
	return (
		<div className="group/logo border-soft flex h-full w-36 shrink-0 items-center justify-center border-r px-8 py-[15px] md:py-5 lg:w-56 lg:px-10 lg:py-[30px]">
			<span className="relative flex h-10 w-full items-center justify-center">
				<Image
					src={`/brands/${brand.assetName}.svg`}
					alt={`${brand.name} logo`}
					width={brand.width}
					height={brand.height}
					className="lg:max-w-35 absolute max-h-9 max-w-full object-contain transition-opacity group-hover/logo:opacity-0 dark:hidden"
				/>
				<Image
					src={`/brands/${brand.assetName} - On Hover.svg`}
					alt={`${brand.name} logo`}
					width={brand.width}
					height={brand.height}
					className="lg:max-w-35 absolute max-h-9 max-w-full object-contain opacity-0 transition-opacity group-hover/logo:opacity-100 dark:hidden"
				/>
				<Image
					src={`/brands/${brand.assetName} - Dark.svg`}
					alt={`${brand.name} logo`}
					width={brand.width}
					height={brand.height}
					className="lg:max-w-35 absolute hidden max-h-9 max-w-full object-contain transition-opacity group-hover/logo:opacity-0 dark:block"
				/>
				<Image
					src={`/brands/${brand.assetName} - On Hover - Dark.svg`}
					alt={`${brand.name} logo`}
					width={brand.width}
					height={brand.height}
					className="lg:max-w-35 absolute hidden max-h-9 max-w-full object-contain opacity-0 transition-opacity dark:block dark:group-hover/logo:opacity-100"
				/>
			</span>
		</div>
	)
}
