import { Project } from "ts-morph"
import { describe, expect, it } from "vitest"
import type { RawConfig } from "@/utils/getConfig"
import { transformImport } from "@/utils/transformers/transformImport"

const project = new Project({ useInMemoryFileSystem: true })

const configDefault: RawConfig = {
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    animated: "@/components/animated",
    lib: "@/lib",
    hooks: "@/hooks",
  },
  hasSrcDir: true,
}

describe("transformImport (extra cases)", () => {
  it("does nothing for non-js/ts files", () => {
    const content = `@/registry/ui/button;`
    const sourceFile = project.createSourceFile("test.css", content)
    const output = transformImport(sourceFile, configDefault)
    expect(output).toBe(content)
    sourceFile.deleteImmediately()
  })

  it("rewrites the cn import to the utils alias", () => {
    const content = `import { cn } from "@/lib/utils";\n`
    const sourceFile = project.createSourceFile("cn.tsx", content)
    const output = transformImport(sourceFile, {
      ...configDefault,
      aliases: { ...configDefault.aliases, utils: "@custom/utils" },
    })
    expect(output).toContain(`from "@custom/utils"`)
    sourceFile.deleteImmediately()
  })

  it("rewrites @/registry/components/* to the components alias", () => {
    const content = `import { Foo } from "@/registry/components/Foo";\n`
    const sourceFile = project.createSourceFile("components.tsx", content)
    const output = transformImport(sourceFile, {
      ...configDefault,
      aliases: { ...configDefault.aliases, components: "@alias/components" },
    })
    expect(output).toContain(`from "@alias/components/Foo"`)
    sourceFile.deleteImmediately()
  })

  it("leaves unrelated imports untouched", () => {
    const content = `import React from "react";\nimport path from "node:path";\n`
    const sourceFile = project.createSourceFile("untouched.tsx", content)
    const output = transformImport(sourceFile, configDefault)
    expect(output).toContain(`from "react"`)
    expect(output).toContain(`from "node:path"`)
    sourceFile.deleteImmediately()
  })
})
