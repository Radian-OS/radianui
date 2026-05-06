import { describe, expect, it } from "vitest"
import { CLIRunner } from "../utils/cliRunner"

const cli = new CLIRunner()

describe("e2e | radianui --help", () => {
  it("prints top-level usage with the two subcommands", async () => {
    const { stdout, exitCode } = await cli.run(["--help"])

    expect(exitCode).toBe(0)
    expect(stdout).toContain("Usage: radianui")
    expect(stdout).toMatch(/^\s*init\b/m)
    expect(stdout).toMatch(/^\s*add\b/m)
  })

  it("accepts the -h alias", async () => {
    const { stdout, exitCode } = await cli.run(["-h"])
    expect(exitCode).toBe(0)
    expect(stdout).toContain("Usage: radianui")
  })

  it("includes the RadianUI banner", async () => {
    const { stdout } = await cli.run(["--help"])
    expect(stdout).toContain("RadianUI")
  })
})

describe("e2e | radianui init --help", () => {
  it("documents the framework, color, font, and preset flags", async () => {
    const { stdout, exitCode } = await cli.run(["init", "--help"])

    expect(exitCode).toBe(0)
    expect(stdout).toContain("--next")
    expect(stdout).toContain("--vite")
    expect(stdout).toContain("--useSrc")
    expect(stdout).toContain("--color")
    expect(stdout).toContain("--font")
    expect(stdout).toContain("--preset")
    expect(stdout).toContain("-s, --skipPrompts")
  })
})

describe("e2e | radianui add --help", () => {
  it("documents the yes, all, cwd, and overwrite flags", async () => {
    const { stdout, exitCode } = await cli.run(["add", "--help"])

    expect(exitCode).toBe(0)
    expect(stdout).toContain("-y, --yes")
    expect(stdout).toContain("-a, --all")
    expect(stdout).toContain("-c, --cwd")
    expect(stdout).toContain("-o, --overwrite")
  })
})
