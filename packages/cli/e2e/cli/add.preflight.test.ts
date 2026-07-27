import { afterEach, describe, expect, it } from "vitest"
import { CLIRunner } from "../utils/cliRunner"
import { cleanup, copyFixture } from "../utils/tempProject"

const cli = new CLIRunner()

describe("e2e | add preflight failures", () => {
  let projectDir: string | undefined

  afterEach(async () => {
    if (projectDir) await cleanup(projectDir)
    projectDir = undefined
  })

  it("exits with an invalid-config error when components.json is malformed", async () => {
    projectDir = await copyFixture("radian-projects/next-app-wrong-config")

    const { combined, exitCode } = await cli.run(["add", "button", "-y"], {
      cwd: projectDir,
    })

    expect(exitCode).toBe(1)
    expect(combined).toContain(
      "Error loading components.json configuration: Invalid components.json file"
    )
  })
})
