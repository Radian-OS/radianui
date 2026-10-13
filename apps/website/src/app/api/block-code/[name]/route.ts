import { getBlockCode } from "@/components/display-block"

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ name: string }> }
) {
	const { name } = await params
	const data = await getBlockCode(name)
	if (!data) return Response.json({ error: "Block not found" }, { status: 404 })

	return Response.json(data, {
		headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
	})
}
