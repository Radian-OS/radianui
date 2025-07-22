import { Divider } from "@/registry/ui/divider"
import CodeSnippet from "./code-snippet"
import PackageManagerTabs from "./package-manager-tabs"

const Cli = () => {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<h5 className="heading-5">init</h5>
				<Divider spacing="6" />
			</div>
			<div className="flex flex-col gap-8">
				<p>Use the init command to initialize configuration and dependencies for a new project.</p>
				<p>The init command installs dependencies, adds the radianos util, configures tailwind.config.js, and CSS variables for the project.</p>
				<PackageManagerTabs
					commands={{
						npm: "npx @radianos/radianbeta init",
						yarn: "yarn dlx @radianos/radianbeta init",
						pnpm: "pnpm dlx @radianos/radianbeta init",
						bun: "bunx @radianos/radianbeta init",
					}}
				/>
				<p>You will be asked a few questions to configure components.json:</p>
				<CodeSnippet
					title="shell"
					showLineNumber
					code={`√ What would you like to name your project? ... my-app
√ Would you like to use /src directory? ... yes
√ Creating a new Next.js project. This might take some time.
√ Write configuration to components.json. Proceed? ... yes
√ Writing components.json file
√ Setting up project configuration
√ Installing the required dependencies

Success! Project initialization completed. You may now add components.`}
				/>
				<h5 className="heading-5">Options</h5>
				<CodeSnippet
					title="shell"
					code={`Usage: radianos init [options] [components...]

initialize your project and install dependencies

Arguments:
  components  the components to add or a url to the component.

Options:
  -y, --yes         skip confirmation prompt. (default: false)
  -h, --help       display help for command`}
				/>
			</div>
			<div>
				<h5 className="heading-5">add</h5>
				<Divider spacing="6" />
			</div>
			<div className="flex flex-col gap-8">
				<p>Use the add command to add components and dependencies to your project.</p>
				<PackageManagerTabs
					commands={{
						npm: "npx @radianos/radianbeta add [component]",
						yarn: "yarn dlx @radianos/radianbeta add [component]",
						pnpm: "pnpm dlx @radianos/radianbeta add [component]",
						bun: "bunx @radianos/radianbeta add [component]",
					}}
				/>
				<p>You will be presented with installation process:</p>
				<CodeSnippet
					title="shell"
					code={`RadianOS v1.0.0

√ Checking registry
√ Installing the dependencies

Created 1 file(s):
- C:\\Project\\components\\ui\\accordion.tsx`}
				/>
			</div>
		</div>
	)
}
export default Cli
