import dedent from "dedent"
import { createTemplate } from "./create-template"

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
})
