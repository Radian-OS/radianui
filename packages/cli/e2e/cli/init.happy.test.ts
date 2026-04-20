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

const STUB_GLOBAL_CSS = `@import "tailwindcss";\n\n@theme {\n  --color-primary: oklch(0 0 0);\n}\n\n.dark {\n  --color-primary: oklch(1 0 0);\n}\n`

const blueTheme = {
  name: "blue",
  label: "Blue",
  cssVariables: {
    light: { primary: "oklch(0.5 0.1 250)" },
    dark: { primary: "oklch(0.8 0.1 250)" },
  },
}

const interFont = {
  name: "inter",
  label: "Inter",
  importURL:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
  cssVariables: {
    "heading-font": "Inter",
    "body-font": "Inter",
  },
}

const buttonComponent = {
  name: "button",
  type: "ui" as const,
  files: [
    {
      name: "button.tsx",
      type: "ui" as const,
      content: `export function Button() {\n  return null;\n}\n`,
    },
  ],
}

const badgeComponent = {
  name: "badge",
  type: "ui" as const,
  files: [
    {
      name: "badge.tsx",
      type: "ui" as const,
      content: `export function Badge() {\n  return null;\n}\n`,
    },
  ],
}

describe("e2e | init happy path (existing project)", () => {
  let projectDir: string
  let server: RegistryServerHandle

  beforeEach(async () => {
    server = await startRegistryServer({
      components: [buttonComponent, badgeComponent],
      themes: { blue: blueTheme },
      fonts: { inter: interFont },
      globalCss: STUB_GLOBAL_CSS,
    })
  })

  afterEach(async () => {
    await server.close()
    if (projectDir) await cleanup(projectDir)
  })

  it("creates components.json and seeds the default components against a stubbed registry", async () => {
    projectDir = await copyFixture("next-app-src")

    const { exitCode, combined } = await cli.run(
      ["init", "--color=blue", "--font=inter", "-s"],
      {
        cwd: projectDir,
        env: {
          RADIANUI_WEBSITE_URL: server.url,
          RADIANUI_BLOCKS_URL: server.url,
          RADIANUI_GLOBAL_CSS_URL: `${server.url}/css/globals.css`,
          RADIANUI_SKIP_INSTALL: "1",
        },
      }
    )

    expect(exitCode, combined).toBe(0)

    const componentsJson = await fs.readJSON(
      path.join(projectDir, "components.json")
    )
    expect(componentsJson.hasSrcDir).toBe(true)
    expect(componentsJson.aliases?.ui).toBeDefined()

    const buttonPath = path.join(
      projectDir,
      "src",
      "components",
      "ui",
      "button.tsx"
    )
    expect(await fs.pathExists(buttonPath)).toBe(true)

    const cssPath = path.join(projectDir, "src", "app", "globals.css")
    expect(await fs.pathExists(cssPath)).toBe(true)
    const cssContent = await fs.readFile(cssPath, "utf8")
    expect(cssContent).toContain("tailwindcss")
  })
})
