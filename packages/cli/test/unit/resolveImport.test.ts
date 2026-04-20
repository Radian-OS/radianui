import path from "path"
import { describe, expect, it } from "vitest"
import { resolveImport } from "@/utils/resolveImport"

describe("resolveImport", () => {
  const config = {
    absoluteBaseUrl: path.resolve("/virtual/project"),
    paths: {
      "@/*": ["src/*"],
    },
  }

  it("resolves a prefixed import via tsconfig paths", async () => {
    const resolved = await resolveImport("@/components/button", config)
    expect(resolved).toBe(
      path.join(config.absoluteBaseUrl, "src", "components", "button")
    )
  })

  it("does not apply the @/ alias to bare package imports", async () => {
    const resolved = await resolveImport("react", config)
    // bare specifiers never get the src/ prefix applied
    expect(resolved).not.toBe(
      path.join(config.absoluteBaseUrl, "src", "react")
    )
  })

  it("honors the configured path root", async () => {
    const custom = {
      absoluteBaseUrl: path.resolve("/virtual/project"),
      paths: { "~/*": ["app/*"] },
    }
    const resolved = await resolveImport("~/lib/utils", custom)
    expect(resolved).toBe(
      path.join(custom.absoluteBaseUrl, "app", "lib", "utils")
    )
  })
})
