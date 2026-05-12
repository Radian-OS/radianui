import { Project, ts } from "ts-morph"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { RawConfig } from "@/utils/getConfig"
import { transformIcon } from "@/utils/transformers/transformIcon"

const MOCK_ICON_MAPPINGS = [
	{ slot: "down", lucideIcon: "ChevronDown", hugeiconsIcon: "ArrowDown01Icon" },
	{ slot: "plus", lucideIcon: "Plus", hugeiconsIcon: "PlusSignIcon" },
]

const project = new Project({
	useInMemoryFileSystem: true,
	compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
})

beforeEach(() => {
	vi.stubGlobal(
		"fetch",
		vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(MOCK_ICON_MAPPINGS),
		})
	)
})

afterEach(() => {
	vi.unstubAllGlobals()
})

const baseConfig = (iconLibrary: RawConfig["iconLibrary"]): RawConfig => ({
	$schema: "",
	hasSrcDir: true,
	style: "default",
	iconLibrary,
	aliases: {
		components: "@/components",
		ui: "@/components/ui",
		utils: "@/lib/utils",
		animated: "@/components/animations",
	},
})

describe("transform icon", () => {
	describe("lucide", () => {
		it("should replace a single IconSlot with the correct lucide component", async () => {
			const fileContent = `import { IconSlot } from "../icon-library"

function AccordionTrigger() {
  return (
    <IconSlot slot="down" className="AccordionChevron shrink-0" aria-hidden />
  )
}`
			const sourceFile = project.createSourceFile(
				"lucide-single.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("lucide"))

			const expected = `import { ChevronDown } from "lucide-react"

function AccordionTrigger() {
  return (
    <ChevronDown className="AccordionChevron shrink-0" aria-hidden />
  )
}`
			expect(result).toBe(expected)
			sourceFile.deleteImmediately()
		})

		it("should combine multiple lucide icons into one import line", async () => {
			const fileContent = `import { IconSlot } from "../icon-library"

function AccordionTrigger({ indicator }: { indicator: string }) {
  return (
    <>
      {indicator === "chevron" && (
        <IconSlot slot="down" className="AccordionChevron shrink-0 transition-transform duration-200" aria-hidden />
      )}
      {indicator === "plus-minus" && (
        <IconSlot slot="plus" className="AccordionPlus shrink-0 transition-transform duration-200" aria-hidden />
      )}
    </>
  )
}`
			const sourceFile = project.createSourceFile(
				"lucide-multi.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("lucide"))

			const expected = `import { ChevronDown, Plus } from "lucide-react"

function AccordionTrigger({ indicator }: { indicator: string }) {
  return (
    <>
      {indicator === "chevron" && (
        <ChevronDown className="AccordionChevron shrink-0 transition-transform duration-200" aria-hidden />
      )}
      {indicator === "plus-minus" && (
        <Plus className="AccordionPlus shrink-0 transition-transform duration-200" aria-hidden />
      )}
    </>
  )
}`
			expect(result).toBe(expected)
			sourceFile.deleteImmediately()
		})

		it("should not duplicate the icon in the import when the same slot appears multiple times", async () => {
			const fileContent = `import { IconSlot } from "../icon-library"

function Component() {
  return (
    <>
      <IconSlot slot="down" className="icon-a" />
      <IconSlot slot="down" className="icon-b" />
    </>
  )
}`
			const sourceFile = project.createSourceFile(
				"lucide-dedupe.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("lucide"))

			// ChevronDown must appear only once in the import
			expect(result).toContain(`import { ChevronDown } from "lucide-react"`)
			expect(result).not.toContain("ChevronDown, ChevronDown")
			sourceFile.deleteImmediately()
		})

		it("should leave unrelated imports untouched", async () => {
			const fileContent = `import React from "react"
import { cn } from "@/lib/utils"
import { IconSlot } from "../icon-library"

function Component() {
  return <IconSlot slot="down" />
}`
			const sourceFile = project.createSourceFile(
				"lucide-other-imports.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("lucide"))

			expect(result).toContain(`import React from "react"`)
			expect(result).toContain(`import { cn } from "@/lib/utils"`)
			expect(result).toContain(`import { ChevronDown } from "lucide-react"`)
			expect(result).not.toContain(`import { IconSlot }`)
			sourceFile.deleteImmediately()
		})

		it("should return the file unchanged when no IconSlot elements are present", async () => {
			const fileContent = `import React from "react"

function Component() {
  return <div>Hello</div>
}`
			const sourceFile = project.createSourceFile(
				"lucide-noop.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("lucide"))

			expect(result).toBe(fileContent)
			sourceFile.deleteImmediately()
		})
	})

	describe("hugeicons", () => {
		it("should replace a single IconSlot with HugeiconsIcon and correct icon prop", async () => {
			const fileContent = `import { IconSlot } from "../icon-library"

function AccordionTrigger() {
  return (
    <IconSlot slot="down" className="AccordionChevron shrink-0" aria-hidden />
  )
}`
			const sourceFile = project.createSourceFile(
				"huge-single.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("hugeicons"))

			const expected = `import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

function AccordionTrigger() {
  return (
    <HugeiconsIcon icon={ArrowDown01Icon} className="AccordionChevron shrink-0" aria-hidden />
  )
}`
			expect(result).toBe(expected)
			sourceFile.deleteImmediately()
		})

		it("should emit two import lines and combine icon definitions on one line", async () => {
			const fileContent = `import { IconSlot } from "../icon-library"

function AccordionTrigger({ indicator }: { indicator: string }) {
  return (
    <>
      {indicator === "chevron" && (
        <IconSlot slot="down" className="AccordionChevron shrink-0 transition-transform duration-200" aria-hidden />
      )}
      {indicator === "plus-minus" && (
        <IconSlot slot="plus" className="AccordionPlus shrink-0 transition-transform duration-200" aria-hidden />
      )}
    </>
  )
}`
			const sourceFile = project.createSourceFile("huge-multi.tsx", fileContent)

			const result = await transformIcon(sourceFile, baseConfig("hugeicons"))

			const expected = `import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, PlusSignIcon } from "@hugeicons/core-free-icons"

function AccordionTrigger({ indicator }: { indicator: string }) {
  return (
    <>
      {indicator === "chevron" && (
        <HugeiconsIcon icon={ArrowDown01Icon} className="AccordionChevron shrink-0 transition-transform duration-200" aria-hidden />
      )}
      {indicator === "plus-minus" && (
        <HugeiconsIcon icon={PlusSignIcon} className="AccordionPlus shrink-0 transition-transform duration-200" aria-hidden />
      )}
    </>
  )
}`
			expect(result).toBe(expected)
			sourceFile.deleteImmediately()
		})

		it("should not duplicate icons in the core-free-icons import for repeated slots", async () => {
			const fileContent = `import { IconSlot } from "../icon-library"

function Component() {
  return (
    <>
      <IconSlot slot="down" className="a" />
      <IconSlot slot="down" className="b" />
    </>
  )
}`
			const sourceFile = project.createSourceFile(
				"huge-dedupe.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("hugeicons"))

			expect(result).toContain(
				`import { ArrowDown01Icon } from "@hugeicons/core-free-icons"`
			)
			expect(result).not.toContain("ArrowDown01Icon, ArrowDown01Icon")
			sourceFile.deleteImmediately()
		})

		it("should always emit HugeiconsIcon wrapper import from @hugeicons/react", async () => {
			const fileContent = `import { IconSlot } from "../icon-library"

function Component() {
  return <IconSlot slot="plus" />
}`
			const sourceFile = project.createSourceFile(
				"huge-wrapper.tsx",
				fileContent
			)

			const result = await transformIcon(sourceFile, baseConfig("hugeicons"))

			expect(result).toContain(
				`import { HugeiconsIcon } from "@hugeicons/react"`
			)
			expect(result).toContain(
				`import { PlusSignIcon } from "@hugeicons/core-free-icons"`
			)
			sourceFile.deleteImmediately()
		})

		it("should return the file unchanged when no IconSlot elements are present", async () => {
			const fileContent = `import React from "react"

function Component() {
  return <div>Hello</div>
}`
			const sourceFile = project.createSourceFile("huge-noop.tsx", fileContent)

			const result = await transformIcon(sourceFile, baseConfig("hugeicons"))

			expect(result).toBe(fileContent)
			sourceFile.deleteImmediately()
		})
	})

	it("should throw when the icon registry fetch fails", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({ ok: false, status: 500 })
		)

		const fileContent = `import { IconSlot } from "../icon-library"
function Component() { return <IconSlot slot="down" /> }`

		const sourceFile = project.createSourceFile("fetch-error.tsx", fileContent)

		await expect(
			transformIcon(sourceFile, baseConfig("lucide"))
		).rejects.toThrow("Failed to fetch icon mappings: 500")

		sourceFile.deleteImmediately()
	})
})
