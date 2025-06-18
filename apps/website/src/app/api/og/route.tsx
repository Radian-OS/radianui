// import SvgIcon from '@/app/SvgIcon'
import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const title = searchParams.get("title") || "Documentation"
	const titlerender = title[0].toUpperCase() + title.slice(1)
	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					// Background gradient placeholder - customize this
					background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
					position: "relative",
				}}>
				{/* Left side with logo and dynamic text */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "55%",
						height: "100%",
						padding: "100px",
						justifyContent: "center",
					}}>
					{/* Logo placeholder */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "80px",
						}}>
						{/* Replace src with your logo URL */}
						<img
							src="https://radianos.com/radian.svg"
							alt="Logo"
							width="120"
							height="40"
							style={{
								marginRight: "16px",
								borderRadius: "8px",
							}}
						/>
					</div>
					{/* Dynamic Title */}
					<h1
						style={{
							fontSize: "64px",
							fontWeight: "600",
							color: "#FFFFFF",
							margin: 0,
							lineHeight: "72px",
							fontFamily: "system-ui",
							textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
						}}>
						{titlerender}
					</h1>
				</div>
				{/* Right side image placeholder - overflowing image */}
				<div
					style={{
						margin: "120px 0px",
						width: "45%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
						position: "relative",
					}}>
					{/* Replace src with your right side image URL */}
					<img
						src="https://unsection.b-cdn.net/cf-ce0beeea-7c4c-41c0-23b9-1031ad122200.jpg"
						alt="Right side image"
						width="120"
						height="120"
						style={{
							width: "120%",
							height: "120%",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				</div>
			</div>
		)
	)
}
