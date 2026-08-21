import dedent from "dedent"
import { createTemplate, defaultPostInit } from "./create-template"
import { getPackageManager } from "@/utils/getPackageManager"
import path from "path"
import fs from 'fs-extra'

export const next = createTemplate({
	name: "next",
	title: "Next.js",
	defaultProjectName: "next-app",
	templateDir: "next-app",
	frameworks: ["next-app"],
	create: async () => {
		// Empty for now.
	},
	files: [
		{
			type: "registry:page",
			path: "app/page.tsx",
			target: "app/page.tsx",
			content: dedent`import { ComponentExample } from "@/components/component-example";

export default function Page() {
  return <ComponentExample />;
}
`,
		},
	],
	preInstall: async ({ projectPath }) => {
		const packageManager = await getPackageManager(projectPath, { withFallback: true })
		if (packageManager === 'pnpm') {
			const content = dedent`
				allowBuilds:
				  sharp: true
				  unrs-resolver: true
			` + "\n"

			await fs.writeFile(path.join(projectPath, "pnpm-workspace.yaml"), content, 'utf-8')
		}
	}
})
