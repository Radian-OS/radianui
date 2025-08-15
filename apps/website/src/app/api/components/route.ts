import { NextResponse } from "next/server"

import components from "./components.json"

export function GET() {
	return NextResponse.json(components, { status: 200 })
}
