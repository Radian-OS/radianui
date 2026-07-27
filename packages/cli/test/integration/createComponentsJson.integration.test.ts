import fs from "fs-extra"
import os from "os"
import path from "path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { createComponentsJson } from "@/utils/createComponentsJson"

describe("integration > createComponentsJson", () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-cj-"))
  })

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  it("writes a components.json with the expected shape", async () => {
    await createComponentsJson(tempDir, true)
    const file = await fs.readJSON(path.join(tempDir, "components.json"))
    expect(file).toEqual({
      $schema: "https://radianos.com/schema.json",
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        animated: "@/components/animated",
        lib: "@/lib",
        hooks: "@/hooks",
      },
      hasSrcDir: true,
    })
  })

  it("respects hasSrcDir=false", async () => {
    await createComponentsJson(tempDir, false)
    const file = await fs.readJSON(path.join(tempDir, "components.json"))
    expect(file.hasSrcDir).toBe(false)
  })

  it("writes valid JSON that ends with a trailing newline", async () => {
    await createComponentsJson(tempDir, true)
    const contents = await fs.readFile(
      path.join(tempDir, "components.json"),
      "utf-8"
    )
    expect(contents.endsWith("\n")).toBe(true)
    expect(() => JSON.parse(contents)).not.toThrow()
  })
})
