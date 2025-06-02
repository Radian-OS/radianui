import fs from "fs"
import path from "path"

type Block = {
	slug: string
	title: string
	category: string
	preview: string
	code: string
}

function loadCode(filePath: string): string {
	const fullPath = path.join(process.cwd(), filePath)
	return fs.readFileSync(fullPath, "utf-8")
}

export const blocks: Block[] = [
	{
		slug: "hero",
		title: "hero",
		category: "hero",
		preview: "/test/blocks/hero",
		code: loadCode("src/app/test/blocks/hero/page.tsx"),
	},
	{
		slug: "auth",
		title: "signin",
		category: "auth",
		preview: "/test/blocks/signin",
		code: loadCode("src/app/test/blocks/signin/page.tsx"),
	},
	{
		slug: "auth",
		title: "signup",
		category: "auth",
		preview: "/test/blocks/signup",
		code: loadCode("src/app/test/blocks/signup/page.tsx"),
	},
	{
		slug: "auth",
		title: "account-verified",
		category: "auth",
		preview: "/test/blocks/account-verified",
		code: loadCode("src/app/test/blocks/account-verified/page.tsx"),
	},
	{
		slug: "auth",
		title: "email-code",
		category: "auth",
		preview: "/test/blocks/email-code",
		code: loadCode("src/app/test/blocks/email-code/page.tsx"),
	},
	{
		slug: "auth",
		title: "verify-email",
		category: "auth",
		preview: "/test/blocks/verify-email",
		code: loadCode("src/app/test/blocks/verify-email/page.tsx"),
	},
]

export const categories = [...new Set(blocks.map((b) => b.category))]
