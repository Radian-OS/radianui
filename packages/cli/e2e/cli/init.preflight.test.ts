import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { CLIRunner } from "../utils/cliRunner"
import { cleanup, copyFixture } from "../utils/tempProject"

const cli = new CLIRunner()

describe("e2e | init preflight failures", () => {
  let projectDir: string

  afterEach(async () => {
    if (projectDir) await cleanup(projectDir)
  })

  it("refuses to re-init a project that already has components.json", async () => {
    projectDir = await copyFixture("radian-projects/next-app-no-src")

    const { combined, exitCode } = await cli.run(["init", "-s"], {
      cwd: projectDir,
    })

    expect(exitCode).toBe(1)
    expect(combined).toContain("components.json")
    expect(combined).toMatch(/already exists/i)
  })

  it("errors out when no framework config is detectable", async () => {
    projectDir = await copyFixture("preflight/no-framework")

    const { combined, exitCode } = await cli.run(["init", "-s"], {
      cwd: projectDir,
    })

    expect(exitCode).toBe(1)
    expect(combined.toLowerCase()).toContain("could not detect a supported framework")
  })

  it("errors out when tailwind is not configured", async () => {
    projectDir = await copyFixture("preflight/no-tailwind")

    const { combined, exitCode } = await cli.run(["init", "-s"], {
      cwd: projectDir,
    })

    expect(exitCode).toBe(1)
    expect(combined).toMatch(/could not find a Tailwind config/i)
  })

  it("errors out when tsconfig has no import alias", async () => {
    projectDir = await copyFixture("preflight/no-alias")

    const { combined, exitCode } = await cli.run(["init", "-s"], {
      cwd: projectDir,
    })

    expect(exitCode).toBe(1)
    expect(combined).toMatch(/no import alias/i)
  })
})
