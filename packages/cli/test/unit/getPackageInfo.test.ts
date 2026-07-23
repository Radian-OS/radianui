import fs from "fs-extra"
import os from "os"
import path from "path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { getPackageInfo } from "@/utils/getPackageInfo"

describe("getPackageInfo", () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-pkginfo-"))
  })

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  it("reads and parses package.json in the given cwd", async () => {
    const pkg = { name: "demo", version: "1.2.3" }
    await fs.writeJSON(path.join(tempDir, "package.json"), pkg)

    const result = await getPackageInfo(tempDir)
    expect(result).toMatchObject(pkg)
  })

  it("returns null for invalid JSON when shouldThrow=false", async () => {
    await fs.writeFile(path.join(tempDir, "package.json"), "{ not json")
    const result = await getPackageInfo(tempDir, false)
    expect(result).toBeNull()
  })

  it("throws on invalid JSON when shouldThrow=true", async () => {
    await fs.writeFile(path.join(tempDir, "package.json"), "{ not json")
    await expect(getPackageInfo(tempDir, true)).rejects.toThrow()
  })

  it("throws when package.json is missing", async () => {
    await expect(getPackageInfo(tempDir)).rejects.toThrow()
  })
})
