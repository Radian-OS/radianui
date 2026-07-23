import { describe, expect, it } from "vitest"
import { findBlockDependencies } from "@/utils/findBlockDependencies"
import { RegistryComponents } from "@/utils/registry"

describe("findBlockDependencies (extra cases)", () => {
  it("returns an empty set for an empty registry", () => {
    expect(findBlockDependencies([])).toEqual(new Set())
  })

  it("traverses transitive ui dependencies of a block", () => {
    const components: RegistryComponents = [
      {
        name: "dashboard-01",
        type: "block",
        registryDependencies: ["card"],
        files: [],
      },
      {
        name: "card",
        type: "ui",
        registryDependencies: ["divider"],
        files: [],
      },
      {
        name: "divider",
        type: "ui",
        registryDependencies: ["label"],
        files: [],
      },
      { name: "label", type: "ui", files: [] },
      { name: "button", type: "ui", files: [] },
    ]

    const result = findBlockDependencies(components)
    expect(result).toEqual(new Set(["card", "divider", "label"]))
    expect(result.has("button")).toBe(false)
  })

  it("merges dependencies from multiple blocks without duplicates", () => {
    const components: RegistryComponents = [
      {
        name: "hero-01",
        type: "block",
        registryDependencies: ["button"],
        files: [],
      },
      {
        name: "hero-02",
        type: "block",
        registryDependencies: ["button", "badge"],
        files: [],
      },
      { name: "button", type: "ui", files: [] },
      { name: "badge", type: "ui", files: [] },
    ]

    expect(findBlockDependencies(components)).toEqual(
      new Set(["button", "badge"])
    )
  })

  it("ignores registry entries that are missing from the list", () => {
    const components: RegistryComponents = [
      {
        name: "hero-01",
        type: "block",
        registryDependencies: ["missing", "button"],
        files: [],
      },
      { name: "button", type: "ui", files: [] },
    ]

    expect(findBlockDependencies(components)).toEqual(
      new Set(["missing", "button"])
    )
  })
})
