import { NextResponse } from "next/server"

const GITHUB_REPOSITORY = "Radian-os/radianos"
const FALLBACK_GITHUB_STARS = 32

export const revalidate = 300

export async function GET() {
	try {
		const headers: Record<string, string> = {
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
		}

		if (process.env.GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
		}

		const response = await fetch(
			`https://api.github.com/repos/${GITHUB_REPOSITORY}`,
			{
				headers,
				next: { revalidate },
			}
		)

		if (!response.ok) {
			throw new Error(`GitHub returned ${response.status}`)
		}

		const data: { stargazers_count?: unknown } = await response.json()
		const stars = Number(data.stargazers_count)

		if (!Number.isInteger(stars) || stars <= 0) {
			throw new Error("GitHub returned an invalid star count")
		}

		return NextResponse.json(
			{ stars },
			{
				headers: {
					"Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
				},
			}
		)
	} catch {
		return NextResponse.json(
			{ stars: FALLBACK_GITHUB_STARS },
			{
				headers: {
					"Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
				},
			}
		)
	}
}
