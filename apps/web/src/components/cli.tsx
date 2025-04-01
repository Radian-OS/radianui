"use client"

import { CodeArea } from "@/registry/ui/code"
import { Divider } from "@/registry/ui/divider"
import PackageManagerTabs from "./package-manager-tab"

const Cli = () => {
	const language = "bash"
	const pkg = ["pnpm", "yarn", "npm", "bun"]
	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="heading-5">init</h1>
				<Divider spacing="6" />
			</div>
			<div className="flex flex-col gap-8">
				<p>Use the init command to initialize configuration and dependencies for a new project.</p>
				<p>The init command installs dependencies, adds the radianos util, configures tailwind.config.js, and CSS variables for the project.</p>
				<PackageManagerTabs isNpx={true} language={language} pkg={pkg} code={"radianos init"} />
				<p>You will be asked a few questions to configure components.json:</p>
				<CodeArea
					language="tsx"
					showLineNumbers
					code={`√ What would you like to name your project? ... my-app
√ Would you like to use /src directory? ... yes
√ Creating a new Next.js project. This might take some time.
√ Write configuration to components.json. Proceed? ... yes
√ Writing components.json file
√ Setting up project configuration
√ Installing the required dependencies

Success! Project initialization completed. You may now add components.`}
				/>
				<h1 className="heading-5">Options</h1>
				<CodeArea
					language="tsx"
					code={`Usage: radianos init [options] [components...]

initialize your project and install dependencies

Arguments:
  components         the components to add or a url to the component.

Options:
  -y, --yes         skip confirmation prompt. (default: false)
  -h, --help       display help for command`}
				/>
			</div>
			<div>
				<h1 className="heading-5">add</h1>
				<Divider spacing="6" />
			</div>
			<div className="flex flex-col gap-8">
				<p>Use the add command to add components and dependencies to your project.</p>
				<PackageManagerTabs isNpx={true} language={language} pkg={pkg} code={"radianos add [component]"} />
				<p>You will be presented with installation process:</p>
				<CodeArea
					language="tsx"
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
