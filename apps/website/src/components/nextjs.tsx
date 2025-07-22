import CodeSnippet from "./code-snippet"
import PackageManagerTabs from "./package-manager-tabs"

const Nextjs = () => {
	return (
		<div className="ml-[0.4rem] px-2 py-6 md:ml-[1rem] md:px-0">
			<div className="flex flex-col gap-[30px] border-l pl-[2rem]">
				<div className="flex flex-col gap-[10px]">
					<div className="relative">
						<span className="heading-6 bg-border absolute left-[-3rem] flex h-8 w-8 items-center justify-center rounded-full">1</span>
						<h6 className="heading-6"> Create Project</h6>
					</div>
					<p>
						Run the <code>init</code> command to create a new Next.js project or to setup an existing one:
					</p>
					<PackageManagerTabs
						commands={{
							npm: "npx @radianos/radianbeta init",
							yarn: "yarn dlx @radianos/radianbeta init",
							pnpm: "pnpm dlx @radianos/radianbeta init",
							bun: "bunx @radianos/radianbeta init",
						}}
					/>
				</div>
				<div className="flex flex-col gap-[10px]">
					<div className="relative">
						<span className="heading-6 bg-border absolute left-[-3rem] flex h-8 w-8 items-center justify-center rounded-full">2</span>
						<h6 className="heading-6">Configure components.json</h6>
					</div>
					<p>
						You will be asked a few questions to configure <code>components.json</code>:
					</p>
					<CodeSnippet
						title="components.json"
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
				</div>
				<div className="flex flex-col gap-[10px]">
					<div className="relative">
						<span className="heading-6 bg-border absolute left-[-3rem] flex h-8 w-8 items-center justify-center rounded-full">3</span>
						<h6 className="heading-6">Add Component</h6>
					</div>
					<p>You can now start adding components to your project.</p>
					<PackageManagerTabs
						commands={{
							npm: "npx @radianos/radianbeta add button",
							yarn: "yarn dlx @radianos/radianbeta add button",
							pnpm: "pnpm dlx @radianos/radianbeta add button",
							bun: "bunx @radianos/radianbeta add button",
						}}
					/>
					<p>
						The command above will add the <code>Button</code> component to your project. You can then import it like this:
					</p>
					<CodeSnippet
						title="app.tsx"
						showLineNumber
						code={`import {Button} from "@/components/ui/Button"

export default function App() {
  return (
    <div>
        <Button variant="strong" size="base" rounded="rounded" iconOnly={false}/>
            Button
        </Button>         
    </div>
  )
}                   `}
					/>
				</div>
			</div>
		</div>
	)
}
export default Nextjs
