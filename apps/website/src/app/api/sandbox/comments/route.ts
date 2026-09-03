import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export interface SandboxComment {
	id: string
	componentId: string
	elementTag: string
	elementSelector: string
	positionX: number
	positionY: number
	authorName: string
	content: string
	createdAt: string
	resolved: boolean
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const componentId = searchParams.get("componentId")

		if (!componentId) {
			const result = await pool.query(
				`SELECT 
					id,
					component_id AS "componentId",
					element_tag AS "elementTag",
					element_selector AS "elementSelector",
					position_x AS "positionX",
					position_y AS "positionY",
					author_name AS "authorName",
					content,
					created_at AS "createdAt",
					resolved
				FROM sandbox_comments
				ORDER BY created_at ASC`
			)
			return NextResponse.json({ comments: result.rows })
		}

		const result = await pool.query(
			`SELECT 
				id,
				component_id AS "componentId",
				element_tag AS "elementTag",
				element_selector AS "elementSelector",
				position_x AS "positionX",
				position_y AS "positionY",
				author_name AS "authorName",
				content,
				created_at AS "createdAt",
				resolved
			FROM sandbox_comments
			WHERE component_id = $1
			ORDER BY created_at ASC`,
			[componentId]
		)
		return NextResponse.json({ comments: result.rows })
	} catch (error) {
		console.error("Failed to fetch sandbox comments:", error)
		return NextResponse.json(
			{ error: "Failed to fetch comments", comments: [] },
			{ status: 500 }
		)
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const {
			componentId,
			elementTag,
			elementSelector,
			positionX,
			positionY,
			authorName,
			content,
		} = body

		if (
			!componentId ||
			typeof componentId !== "string" ||
			!content ||
			typeof content !== "string"
		) {
			return NextResponse.json(
				{ error: "componentId and content are required" },
				{ status: 400 }
			)
		}

		const id = `comment_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
		const finalAuthor =
			typeof authorName === "string" && authorName.trim()
				? authorName.trim()
				: "Anonymous"

		const result = await pool.query(
			`INSERT INTO sandbox_comments (
				id,
				component_id,
				element_tag,
				element_selector,
				position_x,
				position_y,
				author_name,
				content,
				created_at,
				resolved
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), FALSE)
			RETURNING 
				id,
				component_id AS "componentId",
				element_tag AS "elementTag",
				element_selector AS "elementSelector",
				position_x AS "positionX",
				position_y AS "positionY",
				author_name AS "authorName",
				content,
				created_at AS "createdAt",
				resolved`,
			[
				id,
				componentId,
				typeof elementTag === "string" ? elementTag : "div",
				typeof elementSelector === "string" ? elementSelector : "",
				typeof positionX === "number" ? positionX : 0,
				typeof positionY === "number" ? positionY : 0,
				finalAuthor,
				content.trim(),
			]
		)

		return NextResponse.json({ comment: result.rows[0] }, { status: 201 })
	} catch (error) {
		console.error("Failed to save sandbox comment:", error)
		return NextResponse.json(
			{ error: "Failed to save comment" },
			{ status: 500 }
		)
	}
}

export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get("id")

		if (!id || typeof id !== "string") {
			return NextResponse.json(
				{ error: "id parameter is required" },
				{ status: 400 }
			)
		}

		await pool.query(`DELETE FROM sandbox_comments WHERE id = $1`, [id])
		return NextResponse.json({ success: true, id })
	} catch (error) {
		console.error("Failed to delete sandbox comment:", error)
		return NextResponse.json(
			{ error: "Failed to delete comment" },
			{ status: 500 }
		)
	}
}
