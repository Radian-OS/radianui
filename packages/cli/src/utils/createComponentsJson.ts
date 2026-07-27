import fs from "fs-extra"
import path from "path"
import { IconLibrary, Style } from "@/registry/constants"

export const createComponentsJson = async (
	projectDir: string,
	hasSrcDir: boolean,
	style: Style,
	iconLibrary: IconLibrary
) => {
	const componentsJsonPath = path.join(projectDir, "components.json")
	const componentsJson = {
		$schema: "https://radianos.com/schema.json",
		style,
		iconLibrary,
		aliases: {
			components: "@/components",
			utils: "@/lib/utils",
			ui: "@/components/ui",
			animated: "@/components/animated",
			lib: "@/lib",
			hooks: "@/hooks",
		},
		hasSrcDir,
	}
	await fs.writeFile(
		componentsJsonPath,
		JSON.stringify(componentsJson, null, 2) + "\n",
		"utf-8"
	)
}
