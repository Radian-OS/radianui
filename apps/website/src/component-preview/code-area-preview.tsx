import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
// import { CodeArea } from "@/registry/ui/code-area"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CodeAreaPreview = () => {
	type themetype = "one-dark-pro" | "night-owl" | "github-dark-default" | "material-theme" | "github-dark" | "github-light" | "dracula"
	type languageType = "tsx" | "javascript" | "html" | "python" | "bash" | "shell"
	type copyType = "true" | "false"
	type showLineNumbersType = "true" | "false"

	const [showLineNumbers, setShowLineNumbers] = useState<showLineNumbersType>("false")
	const [theme, setTheme] = useState<themetype>("github-dark-default")
	const [language, setLanguage] = useState<languageType>("tsx")
	const [copiable, setCopieable] = useState<copyType>("true")

	const codeSnippets = {
		tsx: `const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`,
		javascript: `const greeting = (name) => {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome back, \${name}\`;
};`,
		html: `<div class="container">
  <h1>Welcome</h1>
  <p>Hello World!</p>
</div>`,
		python: `def greet(name: str) -> str:
    return f"Hello, {name}!"
print(greet("World"))`,
		bash: `#!/bin/bash
echo "System Status"
uptime`,
		shell: `# Check system status
echo "Memory Usage:"
free -h`,
	}

	const getImplementationCode = () => {
		return `
<CodeArea 
  code={\`${codeSnippets[language].replace(/`/g, "\\`")}\`}
  language="${language}"
  theme="${theme}"
  showLineNumbers={${showLineNumbers}}
  copiable={${copiable}}
  className="h-full w-full"
/>`
	}

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Theme</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setTheme(Array.from(keys)[0] as themetype)
									}}
									minSelectionCount={1}
									selectedValues={[theme]}>
									<DropdownItem value="one-dark-pro">one-dark-pro</DropdownItem>
									<DropdownItem value="night-owl">night-owl</DropdownItem>
									<DropdownItem value="github-dark-default">github-dark-default</DropdownItem>
									<DropdownItem value="material-theme">material-theme</DropdownItem>
									<DropdownItem value="github-light">github-light</DropdownItem>
									<DropdownItem value="dracula">dracula</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Language</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									selectedValues={[language]}
									onSelectedChange={(keys) => {
										setLanguage(Array.from(keys)[0] as languageType)
									}}>
									<DropdownItem value="tsx">tsx</DropdownItem>
									<DropdownItem value="javascript">javascript</DropdownItem>
									<DropdownItem value="python">python</DropdownItem>
									<DropdownItem value="html">html</DropdownItem>
									<DropdownItem value="bash">bash</DropdownItem>
									<DropdownItem value="shell">shell</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Copiable</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									selectedValues={[copiable]}
									onSelectedChange={(keys) => {
										setCopieable(Array.from(keys)[0] as copyType)
									}}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Show line numbers</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									selectedValues={[showLineNumbers]}
									onSelectedChange={(keys) => {
										setShowLineNumbers(Array.from(keys)[0] as showLineNumbersType)
									}}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border p-5">
					<CodeArea
						className="h-full w-full"
						copiable={copiable === "true"}
						showLineNumbers={showLineNumbers === "true"}
						theme={theme}
						language={language}
						code={codeSnippets[language]}
					/>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="code-area.tsx" code={getImplementationCode()} className="h-[420px]" showLineNumber />
			</TabsContent>
		</Tabs>
	)
}

export default CodeAreaPreview
