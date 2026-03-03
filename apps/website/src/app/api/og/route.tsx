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
				{/* Background Image */}
				<div
					style={{
						height: "630px",
						width: "1200px",
						display: "flex",
						backgroundImage: `url('${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/dynamic-og-bg.png')`,
						backgroundSize: "100% 100%",
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
							position: "relative",
							width: "40%",
							top: "302px",
							left: "100px",
							display: "flex",
							flexDirection: "column",
							gap: "48px",
							boxSizing: "border-box",
						}}>
						{/* Logo */}
						<img
							src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/dynamic-og-logo.png`}
							alt="radian-logo"
							height="48"
						/>

						{/* Dynamic Title */}
						<h1
							style={{
								fontSize: "64px",
								letterSpacing: "-0.64px",
								fontWeight: 600,
								lineHeight: "72px",
								fontFamily: "Geist",
								background: "linear-gradient(0deg, #444A6B 0%, #26272C 100%)",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								color: "transparent",
								WebkitTextFillColor: "transparent",
								margin: 0,
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
						height: "558px",
						width: "900px",
						position: "absolute",
						right: "-347px",
						top: "147px",
					}}
					width={900}
					height={558}
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
