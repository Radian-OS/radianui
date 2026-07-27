import { type NextRequest, NextResponse } from "next/server"
import { buildRegistryConfig, themerConfigSchema } from "@/registry/config"

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = request.nextUrl

		const raw = {
			primaryColor: searchParams.get("primaryColor") ?? undefined,
			headingFont: searchParams.get("headingFont") ?? undefined,
			bodyFont: searchParams.get("bodyFont") ?? undefined,
			template: searchParams.get("template") ?? undefined,
			radius: searchParams.get("radius") ?? undefined,
			style: searchParams.get("style") ?? undefined,
			useSrcDir:
				searchParams.get("useSrcDir") === null
					? undefined
					: searchParams.get("useSrcDir") === "true",
			theme: searchParams.get("theme") ?? undefined,
		}

		const result = themerConfigSchema.safeParse(raw)

		if (!result.success) {
			return NextResponse.json(
				{
					error: "Invalid configuration",
					issues: result.error.issues.map((issue) => ({
						path: issue.path.join("."),
						message: issue.message,
					})),
				},
				{ status: 400 }
			)
		}

		const projectConfig = buildRegistryConfig(result.data)

		return NextResponse.json(projectConfig)
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			},
			{ status: 500 }
		)
	}
}
