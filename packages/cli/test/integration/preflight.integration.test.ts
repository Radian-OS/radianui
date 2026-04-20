import fs from "fs-extra"
import os from "os"
import path from "path"
import { fileURLToPath } from "url"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import type { AddOptions } from "@/commands/add"
import type { InitOptions } from "@/commands/init"
import { preflightAdd } from "@/preflights/preFlightAdd"
import { preFlightInit } from "@/preflights/preFlightInit"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const e2eFixtures = path.resolve(
  __dirname,
  "../../e2e/fixtures/radian-projects"
)

describe("integration > preflightAdd", () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-pfa-"))
  })

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  it("returns config=null when no package.json exists", async () => {
    const opts: AddOptions = {
      cwd: tempDir,
      yes: true,
      all: false,
      overwrite: false,
      components: [],
    }
    const result = await preflightAdd(opts)
    expect(result.config).toBeNull()
  })

  it("returns config=null when path itself does not exist", async () => {
    const opts: AddOptions = {
      cwd: path.join(tempDir, "missing"),
      yes: true,
      all: false,
      overwrite: false,
      components: [],
    }
    const result = await preflightAdd(opts)
    expect(result.config).toBeNull()
  })

  it("loads a valid components.json from the project path", async () => {
    const result = await preflightAdd({
      cwd: path.join(e2eFixtures, "next-app-no-src"),
      yes: true,
      all: false,
      overwrite: false,
      components: [],
    })
    expect(result.config).not.toBeNull()
    expect(result.config?.aliases.components).toBe("@/components")
  })
})

describe("integration > preFlightInit", () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-pfi-"))
  })

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  it("returns nulls for an empty directory", async () => {
    const opts: InitOptions = { cwd: tempDir }
    const result = await preFlightInit(opts)
    expect(result.projectInfo).toBeNull()
    expect(result.hasComponentsJson).toBe(false)
  })
})
