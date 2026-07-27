import { describe, expect, it } from "vitest"
import { RegistryComponents, resolveComponents } from "@/utils/registry"

describe("resolveComponents (extra cases)", () => {
  it("returns empty array when no component names are given", async () => {
    const result = await resolveComponents(
      [{ name: "button", type: "ui", files: [] }],
      []
    )
    expect(result).toEqual([])
  })

  it("ignores names that do not exist in the registry", async () => {
    const components: RegistryComponents = [
      { name: "button", type: "ui", files: [] },
    ]
    const result = await resolveComponents(components, ["missing"])
    expect(result).toEqual([])
  })

  it("deduplicates when a component is requested multiple times", async () => {
    const components: RegistryComponents = [
      { name: "button", type: "ui", files: [] },
      { name: "badge", type: "ui", files: [] },
    ]
    const result = await resolveComponents(components, [
      "button",
      "button",
      "badge",
    ])
    expect(result.map((c) => c.name)).toEqual(["button", "badge"])
  })

  it("handles circular registry dependencies without an infinite loop", async () => {
    const components: RegistryComponents = [
      {
        name: "a",
        type: "ui",
        registryDependencies: ["b"],
        files: [],
      },
      {
        name: "b",
        type: "ui",
        registryDependencies: ["a"],
        files: [],
      },
    ]
    const result = await resolveComponents(components, ["a"])
    expect(result.map((c) => c.name).sort()).toEqual(["a", "b"])
  })

  it("preserves transitive dependency ordering (parent before child)", async () => {
    const components: RegistryComponents = [
      {
        name: "modal",
        type: "ui",
        registryDependencies: ["button"],
        files: [],
      },
      {
        name: "button",
        type: "ui",
        registryDependencies: ["spinner"],
        files: [],
      },
      { name: "spinner", type: "ui", files: [] },
    ]
    const result = await resolveComponents(components, ["modal"])
    const names = result.map((c) => c.name)
    expect(names.indexOf("modal")).toBeLessThan(names.indexOf("button"))
    expect(names.indexOf("button")).toBeLessThan(names.indexOf("spinner"))
  })
})
