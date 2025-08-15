import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

import { loadFonts } from "./fonts"

export const runtime = "edge"

export async function GET(request: NextRequest) {
	const fonts = await loadFonts()
	const { searchParams } = new URL(request.url)
	const title = searchParams.get("title") ?? "Documentation"

	return new ImageResponse(
		(
			<>
				<div
					style={{
						height: "630px",
						width: "1200px",
						display: "flex",
						backgroundImage: `url('${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/dynamic-og-bg.png')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						position: "relative",
						margin: 0,
						padding: 0,
						boxSizing: "border-box",
					}}>
					{/* Left side with logo and dynamic text */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "60%",
							height: "100%",
							padding: "100px",
							justifyContent: "center",
							boxSizing: "border-box",
						}}>
						{/* Logo */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "41px",
							}}>
							<img src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/dynamic-og-logo.png`} alt="radian-logo" width="150" height="36" />
						</div>
						{/* Dynamic Title */}
						<h1
							style={{
								fontSize: "64px",
								fontWeight: 600,
								lineHeight: "72px",
								fontFamily: "Inter",
								background: "linear-gradient(95.81deg, #737682, #ffffff 47.6%, #737682)",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								color: "transparent",
								WebkitTextFillColor: "transparent",
							}}>
							{title}
						</h1>
					</div>
				</div>
				{/* Right side with image */}
				<img
					src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/dynamic-og-image.png`}
					alt="og-image"
					style={{
						height: "561px",
						width: "956px",
						position: "absolute",
						right: "-431px",
						top: "120px",
					}}
					width={956}
					height={561}
				/>
			</>
		),
		{
			width: 1200,
			height: 630,
			fonts: [fonts["inter-semibold"]],
		}
	)
}
