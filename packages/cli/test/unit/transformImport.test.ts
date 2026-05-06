import { Project } from "ts-morph"
import { describe, expect, it } from "vitest"
import { RawConfig } from "@/utils/getConfig"
import { transformImport } from "@/utils/transformers/transformImport"

const project = new Project({
	useInMemoryFileSystem: true,
})

describe("transform import", () => {
	it("should transform import path correctly when given correct config 1", () => {
		// Arrange
		const fileContent = `import React, { useEffect, useRef, useState } from "react"
    import { cn } from "@/lib/utils"
    import { DateRangeShortcut, DateRangeShortcutValues, mockMouseClick } from "@/styles/default/ui/date-picker"
    import { Select, SelectItem } from "@/styles/default/ui/select"
    import { AnimatedList } from "@/registry/animated/animated-list"
    `
		const sourceFile = project.createSourceFile("test1.tsx", fileContent)
		const config: RawConfig = {
			$schema: "",
			hasSrcDir: true,
			aliases: {
				components: "@/components",
				ui: "@/components/ui",
				utils: "@/lib/utils",
				animated: "@/components/animations",
			},
			style: "default",
		}

		// Act
		const transformedContent = transformImport(sourceFile, config)

		// Assert
		const correctOutput = `import React, { useEffect, useRef, useState } from "react"
    import { cn } from "@/lib/utils"
    import { DateRangeShortcut, DateRangeShortcutValues, mockMouseClick } from "@/components/ui/date-picker"
    import { Select, SelectItem } from "@/components/ui/select"
    import { AnimatedList } from "@/components/animations/animated-list"
    `
		expect(transformedContent).toBe(correctOutput)

		// Cleanup
		sourceFile.deleteImmediately()
	})

	it("should transform import path correctly when given correct config 2", () => {
		const fileContent = `import React, { useEffect, useRef, useState } from "react"
    import { cn } from "@/lib/utils"
    import { DateRangeShortcut, DateRangeShortcutValues, mockMouseClick } from "@/styles/default/ui/date-picker"
    import { Select, SelectItem } from "@/styles/default/ui/select"
    import { AnimatedList } from "@/registry/animated/animated-list"
    `
		const sourceFile = project.createSourceFile("test1.tsx", fileContent)
		const config: RawConfig = {
			$schema: "",
			hasSrcDir: true,
			aliases: {
				components: "@custom-alias/components",
				ui: "@custom-alias/ui",
				utils: "@custom-alias/lib/utils",
				animated: "@custom-alias/animated",
			},
			style: "default",
		}

		const transformedContent = transformImport(sourceFile, config)

		const correctOutput = `import React, { useEffect, useRef, useState } from "react"
    import { cn } from "@custom-alias/lib/utils"
    import { DateRangeShortcut, DateRangeShortcutValues, mockMouseClick } from "@custom-alias/ui/date-picker"
    import { Select, SelectItem } from "@custom-alias/ui/select"
    import { AnimatedList } from "@custom-alias/animated/animated-list"
    `
		expect(transformedContent).toBe(correctOutput)

		sourceFile.deleteImmediately()
	})
})
