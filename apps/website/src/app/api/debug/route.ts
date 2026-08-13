import { NextResponse } from "next/server"
import { docsSource } from "@/lib/source"

export async function GET() {
	return NextResponse.json(docsSource.pageTree)
}
