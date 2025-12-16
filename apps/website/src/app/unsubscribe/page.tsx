import * as React from "react"
import { SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { unsubscribe } from "@/app/actions/unsubscribe"
import { resend } from "@/lib/resend"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Empty, EmptyAction, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

interface UnsubscribePageProps {
	searchParams: Promise<{ id?: string }>
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
	const resolvedSearchParams = await searchParams
	const id = resolvedSearchParams.id

	if (!id) {
		return notFound()
	}

	const { error: contact_error } = await resend.contacts.get({ id })

	if (contact_error) {
		return notFound()
	}

	const result = await unsubscribe(id)

	if (result.status !== 200) return notFound()

	return (
		<div className="bg-fill1 flex min-h-screen items-center justify-center px-4">
			<div className="flex flex-col items-center justify-center gap-12">
				<Link href={"/"}>
					<Image src={"/radian.svg"} alt="Radian" width={150} height={36} className="block h-9 dark:hidden" />
					<Image src={"/radian-dark.svg"} alt="Radian" width={150} height={36} className="not-dark:hidden block h-9" />
				</Link>
				<Card className="bg-bg max-w-150 w-full px-16 py-12">
					<Empty className="gap-8 p-0 md:p-0">
						<EmptyMedia>
							<EmailIcon className="size-20" />
						</EmptyMedia>
						<EmptyHeader className="max-w-full gap-3">
							<EmptyTitle className="heading-5">We are Sad To See You Go!</EmptyTitle>
							<EmptyDescription className="text-base/7">
								You have <span className="font-semibold">successfully unsubscribed</span>, you will no longer be receiving emails from Radian.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyAction className="max-w-full">
							<Button variant={"outline"} size={"40"}>
								Subscribe Again
							</Button>
							<Button size={"40"} asChild>
								<Link href="/">Go to Homepage</Link>
							</Button>
						</EmptyAction>
					</Empty>
				</Card>
				<footer className="text-fg-tertiary text-center text-sm">
					<p>2025 &copy; Radian OS, all rights reserved</p>
					<p>8 The Green STE A Dover, Delaware 19901, US</p>
				</footer>
			</div>
		</div>
	)
}

const EmailIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg width={240} height={240} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#clip0_237_16269)">
			<path d="M235.087 102.3L214.5 120.862L213.75 120V81.075L231.262 96.7875C232.967 98.2866 234.28 100.179 235.087 102.3Z" fill="url(#paint0_linear_237_16269)" />
			<path
				d="M165.15 37.5002H74.8499L106.912 8.77522C110.504 5.54049 115.166 3.75046 120 3.75046C124.834 3.75046 129.496 5.54049 133.087 8.77522L165.15 37.5002Z"
				fill="url(#paint1_linear_237_16269)"
			/>
			<path d="M26.25 81.075V120L25.5 120.862L4.91254 102.3C5.72034 100.179 7.03328 98.2866 8.73754 96.7875L26.25 81.075Z" fill="url(#paint2_linear_237_16269)" />
			<path
				d="M25.5001 120.863L80.2876 170.288L8.47506 232.163C6.97846 230.767 5.78626 229.077 4.97319 227.2C4.16012 225.322 3.74371 223.296 3.75006 221.25V107.963C3.73323 106.014 4.12943 104.084 4.91256 102.3L25.5001 120.863Z"
				fill="url(#paint3_linear_237_16269)"
			/>
			<path
				d="M159.713 170.287L231.525 232.162C228.743 234.78 225.07 236.241 221.25 236.25H18.75C14.9304 236.241 11.2572 234.78 8.47504 232.162L80.2875 170.287L106.838 147.412C110.491 144.244 115.164 142.5 120 142.5C124.836 142.5 129.509 144.244 133.163 147.412L159.713 170.287Z"
				fill="url(#paint4_linear_237_16269)"
			/>
			<path
				d="M236.25 107.963V221.25C236.256 223.296 235.84 225.322 235.027 227.2C234.214 229.077 233.022 230.767 231.525 232.163L159.712 170.288L214.5 120.863L235.087 102.3C235.871 104.084 236.267 106.014 236.25 107.963Z"
				fill="url(#paint5_linear_237_16269)"
			/>
			<path
				d="M213.75 120L214.5 120.862L159.713 170.288L133.162 147.413C129.509 144.244 124.836 142.5 120 142.5C115.164 142.5 110.491 144.244 106.837 147.413L80.2875 170.288L25.5 120.862L26.25 120V37.5H213.75V120ZM157.5 83.925C157.5 68.25 146.025 63.75 136.95 63.75C130.571 64.3511 124.59 67.1167 120 71.5875C115.41 67.1167 109.429 64.3511 103.05 63.75C93.975 63.75 82.5 68.25 82.5 83.925C82.5 97.7625 111.713 118.613 118.575 123.3C118.993 123.593 119.49 123.75 120 123.75C120.51 123.75 121.007 123.593 121.425 123.3C128.288 118.613 157.5 97.7625 157.5 83.925Z"
				fill="url(#paint6_linear_237_16269)"
			/>
			<path
				d="M157.5 83.925C157.5 68.25 146.025 63.75 136.95 63.75C130.571 64.3511 124.59 67.1167 120 71.5875C115.41 67.1167 109.429 64.3511 103.05 63.75C93.975 63.75 82.5 68.25 82.5 83.925C82.5 97.7625 111.713 118.613 118.575 123.3C118.993 123.593 119.49 123.75 120 123.75C120.51 123.75 121.007 123.593 121.425 123.3C128.288 118.613 157.5 97.7625 157.5 83.925Z"
				fill="url(#paint7_linear_237_16269)"
			/>
			<path
				d="M3.74998 183.75V221.25C3.74363 223.296 4.16005 225.322 4.97312 227.2C5.78619 229.077 6.97838 230.767 8.47498 232.163L80.2875 170.288L72.45 163.219C59.0325 174.686 26.925 198.233 3.74998 183.75Z"
				fill="url(#paint8_linear_237_16269)"
			/>
			<path
				d="M167.55 163.219L159.712 170.288L231.525 232.163C233.022 230.767 234.214 229.077 235.027 227.2C235.84 225.322 236.256 223.296 236.25 221.25V183.75C213.075 198.233 180.967 174.686 167.55 163.219Z"
				fill="url(#paint9_linear_237_16269)"
			/>
			<path
				d="M213.75 120V101.25L155.824 151.935L133.162 132.413C129.509 129.244 124.836 127.5 120 127.5C115.164 127.5 110.491 129.244 106.837 132.413L84.1763 151.935L26.25 101.25V120L25.5 120.863L76.035 166.451L80.2875 170.288L90.7875 161.25L106.849 147.413C110.502 144.244 115.175 142.5 120.011 142.5C124.847 142.5 129.521 144.244 133.174 147.413L149.224 161.25L159.724 170.288L163.976 166.451L214.5 120.863L213.75 120Z"
				fill="url(#paint10_linear_237_16269)"
			/>
			<rect
				width={240}
				height={240}
				fill="#623DF5"
				style={{
					mixBlendMode: "hue",
				}}
			/>
			<g filter="url(#filter0_d_237_16269)">
				<path
					d="M119.4 109.744C119.4 109.744 121.212 106.504 125.001 105.432C128.79 104.361 132.03 106.172 132.03 106.172M152.837 78.4643C157.967 96.6004 147.423 115.459 129.287 120.588C111.151 125.717 92.2924 115.174 87.1633 97.0376C82.0342 78.9014 92.5776 60.0429 110.714 54.9138C128.85 49.7847 147.708 60.3281 152.837 78.4643ZM139.111 87.8023C139.3 88.4722 139.216 89.1899 138.876 89.7976C138.536 90.4053 137.969 90.8531 137.299 91.0426C136.629 91.232 135.911 91.1476 135.304 90.8079C134.696 90.4681 134.248 89.9009 134.059 89.231C133.869 88.5611 133.954 87.8433 134.293 87.2357C134.633 86.628 135.2 86.1802 135.87 85.9907C136.54 85.8012 137.258 85.8857 137.866 86.2254C138.473 86.5651 138.921 87.1324 139.111 87.8023ZM108.799 96.3746C108.989 97.0445 108.905 97.7622 108.565 98.3699C108.225 98.9776 107.658 99.4254 106.988 99.6149C106.318 99.8043 105.6 99.7199 104.993 99.3802C104.385 99.0404 103.937 98.4732 103.748 97.8033C103.558 97.1334 103.643 96.4156 103.982 95.8079C104.322 95.2003 104.889 94.7525 105.559 94.563C106.229 94.3735 106.947 94.458 107.555 94.7977C108.162 95.1374 108.61 95.7046 108.799 96.3746Z"
					stroke="#623DF5"
					strokeWidth={5.25}
					strokeLinecap="round"
					strokeLinejoin="round"
					shapeRendering="crispEdges"
				/>
			</g>
		</g>
		<defs>
			<filter id="filter0_d_237_16269" x={74.2409} y={47.9914} width={91.5191} height={91.5191} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dy={6} />
				<feGaussianBlur stdDeviation={4.5} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.12 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_237_16269" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_237_16269" result="shape" />
			</filter>
			<linearGradient id="paint0_linear_237_16269" x1={208.661} y1={90.9787} x2={225.818} y2={112.354} gradientUnits="userSpaceOnUse">
				<stop offset={0.005} stopColor="#FF5C5C" />
				<stop offset={1} stopColor="#BF0A1D" />
			</linearGradient>
			<linearGradient id="paint1_linear_237_16269" x1={120.799} y1={5.34022} x2={119.955} y2={39.3715} gradientUnits="userSpaceOnUse">
				<stop offset={0.005} stopColor="#FF5C5C" />
				<stop offset={1} stopColor="#BF0A1D" />
			</linearGradient>
			<linearGradient id="paint2_linear_237_16269" x1={31.3238} y1={94.605} x2={14.73} y2={111.199} gradientUnits="userSpaceOnUse">
				<stop offset={0.005} stopColor="#FF5C5C" />
				<stop offset={1} stopColor="#BF0A1D" />
			</linearGradient>
			<linearGradient id="paint3_linear_237_16269" x1={-5.63994} y1={152.269} x2={47.2351} y2={204.019} gradientUnits="userSpaceOnUse">
				<stop offset={0.005} stopColor="#FF5C5C" />
				<stop offset={1} stopColor="#BF0A1D" />
			</linearGradient>
			<linearGradient id="paint4_linear_237_16269" x1={120} y1={145.92} x2={120} y2={232.909} gradientUnits="userSpaceOnUse">
				<stop offset={0.005} stopColor="#FF5C5C" />
				<stop offset={1} stopColor="#BF0A1D" />
			</linearGradient>
			<linearGradient id="paint5_linear_237_16269" x1={252.945} y1={149.108} x2={197.257} y2={199.733} gradientUnits="userSpaceOnUse">
				<stop offset={0.005} stopColor="#FF5C5C" />
				<stop offset={1} stopColor="#BF0A1D" />
			</linearGradient>
			<linearGradient id="paint6_linear_237_16269" x1={120} y1={40.875} x2={120} y2={151.489} gradientUnits="userSpaceOnUse">
				<stop stopColor="#FFFAFC" />
				<stop offset={1} stopColor="#FEE5E6" />
			</linearGradient>
			<linearGradient id="paint7_linear_237_16269" x1={120} y1={40.875} x2={120} y2={151.489} gradientUnits="userSpaceOnUse">
				<stop stopColor="#FFFAFC" />
				<stop offset={1} stopColor="#FEE5E6" />
			</linearGradient>
			<linearGradient id="paint8_linear_237_16269" x1={-5.64002} y1={152.269} x2={47.235} y2={204.019} gradientUnits="userSpaceOnUse">
				<stop stopColor="#F24B4F" />
				<stop offset={0.209} stopColor="#EE474C" />
				<stop offset={0.428} stopColor="#E13C43" />
				<stop offset={0.652} stopColor="#CC2A34" />
				<stop offset={0.879} stopColor="#AF101F" />
				<stop offset={1} stopColor="#9C0012" />
			</linearGradient>
			<linearGradient id="paint9_linear_237_16269" x1={252.945} y1={149.108} x2={197.257} y2={199.733} gradientUnits="userSpaceOnUse">
				<stop stopColor="#F24B4F" />
				<stop offset={0.209} stopColor="#EE474C" />
				<stop offset={0.428} stopColor="#E13C43" />
				<stop offset={0.652} stopColor="#CC2A34" />
				<stop offset={0.879} stopColor="#AF101F" />
				<stop offset={1} stopColor="#9C0012" />
			</linearGradient>
			<linearGradient id="paint10_linear_237_16269" x1={120} y1={89.4712} x2={120} y2={167.254} gradientUnits="userSpaceOnUse">
				<stop stopColor="white" stopOpacity={0.1} />
				<stop offset={0.322} stopColor="#FCE9E9" stopOpacity={0.222} />
				<stop offset={0.735} stopColor="#F7C9C9" stopOpacity={0.4} />
				<stop offset={0.997} stopColor="#F0ADBD" />
			</linearGradient>
			<clipPath id="clip0_237_16269">
				<rect width={240} height={240} fill="white" />
			</clipPath>
		</defs>
	</svg>
)
