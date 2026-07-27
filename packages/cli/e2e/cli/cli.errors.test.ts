import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { CLIRunner } from "../utils/cliRunner"
import { cleanup, makeTmpDir } from "../utils/tempProject"

const cli = new CLIRunner()

describe("e2e | invalid CLI usage", () => {
  it("rejects unknown top-level commands", async () => {
    const { combined, exitCode } = await cli.run(["does-not-exist"])
    expect(exitCode).not.toBe(0)
    expect(combined.toLowerCase()).toContain("unknown command")
  })

  it("rejects unknown options on `add`", async () => {
    const { combined, exitCode } = await cli.run(["add", "--nope"])
    expect(exitCode).not.toBe(0)
    expect(combined.toLowerCase()).toMatch(/unknown (option|argument)/)
  })

  it("rejects unknown options on `init`", async () => {
    const { combined, exitCode } = await cli.run(["init", "--nope"])
    expect(exitCode).not.toBe(0)
    expect(combined.toLowerCase()).toMatch(/unknown (option|argument)/)
  })
})

describe("e2e | init flag validation", () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await makeTmpDir()
  })

  afterEach(async () => {
    await cleanup(tmpDir)
  })

  it("exits 1 when both --next and --vite are passed", async () => {
    const { combined, exitCode } = await cli.run(
      ["init", "demo", "--next", "--vite", "-s"],
      { cwd: tmpDir }
    )
    expect(exitCode).toBe(1)
    expect(combined).toMatch(/cannot pass both --next and --vite/i)
  })

  it("rejects an unknown --color value", async () => {
    const { combined, exitCode } = await cli.run(
      ["init", "demo", "--next", "--color=notacolor", "-s"],
      { cwd: tmpDir }
    )
    expect(exitCode).not.toBe(0)
    expect(combined.toLowerCase()).toContain("color")
  })

  it("rejects an unknown --font value", async () => {
    const { combined, exitCode } = await cli.run(
      ["init", "demo", "--next", "--font=comicsans", "-s"],
      { cwd: tmpDir }
    )
    expect(exitCode).not.toBe(0)
    expect(combined.toLowerCase()).toContain("font")
  })
})
