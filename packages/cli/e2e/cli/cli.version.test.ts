import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import { describe, expect, it } from "vitest"
import { CLIRunner } from "../utils/cliRunner"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgPath = path.resolve(__dirname, "../../package.json")
const cli = new CLIRunner()

describe("e2e | radianui version", () => {
  it("prints the version from package.json via --version", async () => {
    const pkg = await fs.readJSON(pkgPath)
    const { stdout, exitCode } = await cli.run(["--version"])

    expect(exitCode).toBe(0)
    expect(stdout.trim().split("\n").pop()?.trim()).toBe(pkg.version)
  })

  it("prints the version via the -v alias", async () => {
    const pkg = await fs.readJSON(pkgPath)
    const { stdout, exitCode } = await cli.run(["-v"])

    expect(exitCode).toBe(0)
    expect(stdout).toContain(pkg.version)
  })
})
