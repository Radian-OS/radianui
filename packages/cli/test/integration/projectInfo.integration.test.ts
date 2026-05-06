import path from "path"
import { fileURLToPath } from "url"
import { describe, expect, it } from "vitest"
import { FRAMEWORKS } from "@/utils/frameworks"
import {
  getAliasPrefixFromTsConfigFile,
  getConfigFile,
  getIsTypescriptProject,
  getProjectInfo,
  getTailwindCssFile,
} from "@/utils/getProjectInfo"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixtures = path.resolve(__dirname, "../fixtures/frameworks")

describe("integration > getProjectInfo", () => {
  it("detects a next-app project", async () => {
    const info = await getProjectInfo(path.join(fixtures, "next-app"))
    expect(info.framework).toEqual(FRAMEWORKS["next-app"])
    expect(info.isRSC).toBe(true)
    expect(info.isTsx).toBe(true)
    expect(info.hasSrcDir).toBe(false)
    expect(info.aliasPrefix).toBe("@")
  })

  it("detects a vite project", async () => {
    const info = await getProjectInfo(path.join(fixtures, "vite"))
    expect(info.framework).toEqual(FRAMEWORKS["vite"])
    expect(info.isRSC).toBe(false)
    expect(info.isTsx).toBe(true)
    expect(info.hasSrcDir).toBe(true)
  })

  it("finds the next config file via getConfigFile", async () => {
    const configFile = await getConfigFile(path.join(fixtures, "next-app"))
    expect(configFile).toMatch(/^next\.config\./)
  })

  it("finds the vite config file via getConfigFile", async () => {
    const configFile = await getConfigFile(path.join(fixtures, "vite"))
    expect(configFile).toMatch(/^vite\.config\./)
  })

  it("locates the tailwind CSS file for next-app", async () => {
    const cssFile = await getTailwindCssFile(path.join(fixtures, "next-app"))
    expect(cssFile).toBe("app/globals.css")
  })

  it("reports a TypeScript project when tsconfig exists", async () => {
    const isTs = await getIsTypescriptProject(path.join(fixtures, "next-app"))
    expect(isTs).toBe(true)
  })

  it("reads the tsconfig alias prefix", async () => {
    const prefix = await getAliasPrefixFromTsConfigFile(
      path.join(fixtures, "next-app")
    )
    expect(prefix).toBe("@")
  })
})
