import path from "path"
import { describe, expect, it } from "vitest"
import { getPackageManager } from "@/utils/getPackageManager"

describe("get package manager", () => {
	it("should get the correct package manager for each project", async () => {
		expect(
			await getPackageManager(
				path.resolve(__dirname, "../fixtures/projects/project-yarn")
			)
		).toBe("yarn")

		expect(
			await getPackageManager(
				path.resolve(__dirname, "../fixtures/projects/project-npm")
			)
		).toBe("npm")

		expect(
			await getPackageManager(
				path.resolve(__dirname, "../fixtures/projects/project-pnpm")
			)
		).toBe("pnpm")

		expect(
			await getPackageManager(
				path.resolve(__dirname, "../fixtures/projects/project-bun")
			)
		).toBe("bun")

		expect(
			await getPackageManager(
				path.resolve(__dirname, "../fixtures/projects/project-bun-lock")
			)
		).toBe("bun")
	})
})
