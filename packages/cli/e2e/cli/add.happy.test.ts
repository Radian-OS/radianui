import fs from "fs-extra"
import path from "path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { CLIRunner } from "../utils/cliRunner"
import {
  type RegistryServerHandle,
  startRegistryServer,
} from "../utils/registryServer"
import { cleanup, copyFixture } from "../utils/tempProject"

const cli = new CLIRunner()

const buttonContent = `export function Button() {\n  return null;\n}\n`

describe("e2e | add happy path", () => {
  let projectDir: string
  let server: RegistryServerHandle

  beforeEach(async () => {
    server = await startRegistryServer({
      components: [
        {
          name: "button",
          type: "ui",
          files: [
            {
              name: "button.tsx",
              type: "ui",
              content: buttonContent,
            },
          ],
        },
      ],
    })
  })

  afterEach(async () => {
    await server.close()
    if (projectDir) await cleanup(projectDir)
  })

  it("writes a component file from the stubbed registry", async () => {
    projectDir = await copyFixture("radian-projects/next-app-no-src")

    const { exitCode, combined } = await cli.run(["add", "button", "-y"], {
      cwd: projectDir,
      env: {
        RADIANUI_WEBSITE_URL: server.url,
        RADIANUI_BLOCKS_URL: server.url,
        RADIANUI_SKIP_INSTALL: "1",
      },
    })

    expect(exitCode, combined).toBe(0)

    const buttonPath = path.join(projectDir, "components", "ui", "button.tsx")
    expect(await fs.pathExists(buttonPath)).toBe(true)
    const written = await fs.readFile(buttonPath, "utf8")
    expect(written).toContain("export function Button()")
  })

  it("errors out when requesting a component the registry does not have", async () => {
    projectDir = await copyFixture("radian-projects/next-app-no-src")

    const { exitCode, combined } = await cli.run(["add", "nope", "-y"], {
      cwd: projectDir,
      env: {
        RADIANUI_WEBSITE_URL: server.url,
        RADIANUI_BLOCKS_URL: server.url,
        RADIANUI_SKIP_INSTALL: "1",
      },
    })

    expect(exitCode).toBe(1)
    expect(combined.toLowerCase()).toMatch(/not found|nope/)
  })
})
