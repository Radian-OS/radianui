import path from "path"
import { fileURLToPath } from "url"
import { describe, expect, it } from "vitest"
import {
  getDependencyInstaller,
  getPackageManager,
  getPackageRunner,
} from "@/utils/getPackageManager"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixtures = path.resolve(__dirname, "../fixtures/projects")

describe("integration > getPackageManager", () => {
  it.each([
    ["project-npm", "npm"],
    ["project-pnpm", "pnpm"],
    ["project-yarn", "yarn"],
    ["project-bun", "bun"],
    ["project-bun-lock", "bun"],
  ])("detects %s as %s", async (folder, pm) => {
    expect(await getPackageManager(path.join(fixtures, folder))).toBe(pm)
  })

  it("throws when the project path does not exist", async () => {
    await expect(
      getPackageManager(path.join(fixtures, "does-not-exist"))
    ).rejects.toThrow(/does not exist/)
  })

  it("returns a runner and installer command for a known manager", async () => {
    const runner = await getPackageRunner(path.join(fixtures, "project-pnpm"))
    const installer = await getDependencyInstaller(
      path.join(fixtures, "project-pnpm")
    )
    expect(runner).toBe("pnpm dlx")
    expect(installer).toBe("install")
  })

  it("falls back when no package.json exists and withFallback=true", async () => {
    const result = await getPackageManager(path.join(fixtures, "project-npm"), {
      withFallback: true,
    })
    expect(["npm", "pnpm", "yarn", "bun"]).toContain(result)
  })
})
