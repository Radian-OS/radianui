import { describe, expect, it, vi } from "vitest"
import type { RawConfig } from "@/utils/getConfig"
import type { ProjectInfo } from "@/utils/getProjectInfo"
import { transform } from "@/utils/transformers/transform"

vi.mock("@/utils/registry", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/utils/registry")>()

	return {
		...actual,
		fetchIconMappings: vi.fn().mockResolvedValue([]),
	}
})

const config: RawConfig = {
	$schema: "",
	iconLibrary: "lucide",
	aliases: {
		components: "@/components",
		utils: "@/lib/utils",
		ui: "@/components/ui",
		animated: "@/components/animated",
		lib: "@/lib",
		hooks: "@/hooks",
	},
	hasSrcDir: true,
	style: "default",
}

const nextProjectInfo: ProjectInfo = {
	framework: {
		name: "next-app",
		label: "Next.js",
		link: { installation: "https://radianos.com", tailwind: "https://x" },
	},
	hasSrcDir: true,
	isRSC: true,
	isTsx: true,
	tailwindConfigFile: null,
	tailwindCssFile: "app/globals.css",
	aliasPrefix: "@",
}

const viteProjectInfo: ProjectInfo = {
	...nextProjectInfo,
	framework: {
		name: "vite",
		label: "Vite",
		link: { installation: "https://radianos.com", tailwind: "https://x" },
	},
	isRSC: false,
}

describe("integration > transform", () => {
	it("rewrites @/registry/ui imports for next-app", async () => {
		const content = `import { Button } from "@/registry/ui/button"\n`
		const out = await transform(nextProjectInfo, "test.tsx", content, config)
		expect(out).toContain(`from "@/components/ui/button"`)
	})

	it("applies RSC transforms when framework is vite", async () => {
		const content = `import Link from "next/link"\nimport Image from "next/image"\nexport default function X(){return <Link href="#"><Image src="a.png" /></Link>}\n`
		const out = await transform(viteProjectInfo, "test.tsx", content, config)
		// RSC transform strips next/link + next/image references
		expect(out).not.toContain(`"next/link"`)
		expect(out).not.toContain(`"next/image"`)
	})

	it("leaves non-ts files as-is", async () => {
		const css = `@import "tailwindcss";\n`
		const out = await transform(nextProjectInfo, "test.css", css, config)
		expect(out).toBe(css)
	})
})
