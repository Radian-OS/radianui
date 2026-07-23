import dedent from "dedent"
import { createTemplate } from "./create-template"

export const vite = createTemplate({
	name: "vite",
	title: "Vite",
	defaultProjectName: "vite-app",
	templateDir: "vite-app",
	frameworks: ["vite"],
	create: async () => {
		// Empty for now.
	},
	files: [
		{
			type: "registry:file",
			path: "src/App.tsx",
			target: "src/App.tsx",
			content: dedent`import { ComponentExample } from "@/components/component-example";

export function App() {
  return <ComponentExample />;
}

export default App;
`,
		},
	],
})
