import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CodeAreaPreview = () => {
	type themetype = "one-dark-pro" | "night-owl" | "github-dark-default" | "material-theme" | "github-dark" | "github-light" | "dracula"
	type languageType = "tsx" | "javascript" | "html" | "python" | "bash" | "shell"
	type copyType = "true" | "false"
	type showLineNumbersType = "true" | "false"

	const [showLineNumbers, setShowLineNumbers] = useState<showLineNumbersType>("false")
	const [theme, setTheme] = useState<themetype>("github-dark-default")
	const [language, setLanguage] = useState<languageType>("tsx")
	const [copiable, setCopiable] = useState<copyType>("true")

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
  lineNumbers={${showLineNumbers}}
  copyButton={${copiable}}
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Language</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={language} onValueChange={(value) => setLanguage(value as languageType)}>
									<DropdownRadioItem value="tsx" onSelect={(e) => e.preventDefault()}>
										tsx
									</DropdownRadioItem>
									<DropdownRadioItem value="javascript" onSelect={(e) => e.preventDefault()}>
										javascript
									</DropdownRadioItem>
									<DropdownRadioItem value="python" onSelect={(e) => e.preventDefault()}>
										python
									</DropdownRadioItem>
									<DropdownRadioItem value="html" onSelect={(e) => e.preventDefault()}>
										html
									</DropdownRadioItem>
									<DropdownRadioItem value="bash" onSelect={(e) => e.preventDefault()}>
										bash
									</DropdownRadioItem>
									<DropdownRadioItem value="shell" onSelect={(e) => e.preventDefault()}>
										shell
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Theme</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={theme} onValueChange={(value) => setTheme(value as themetype)}>
									<DropdownRadioItem value="one-dark-pro" onSelect={(e) => e.preventDefault()}>
										one-dark-pro
									</DropdownRadioItem>
									<DropdownRadioItem value="night-owl" onSelect={(e) => e.preventDefault()}>
										night-owl
									</DropdownRadioItem>
									<DropdownRadioItem value="github-dark-default" onSelect={(e) => e.preventDefault()}>
										github-dark-default
									</DropdownRadioItem>
									<DropdownRadioItem value="material-theme" onSelect={(e) => e.preventDefault()}>
										material-theme
									</DropdownRadioItem>
									<DropdownRadioItem value="github-light" onSelect={(e) => e.preventDefault()}>
										github-light
									</DropdownRadioItem>
									<DropdownRadioItem value="dracula" onSelect={(e) => e.preventDefault()}>
										dracula
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Line numbers</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={showLineNumbers} onValueChange={(value) => setShowLineNumbers(value as showLineNumbersType)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Copy button</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={copiable} onValueChange={(value) => setCopiable(value as copyType)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border p-5">
					<CodeArea
						className="h-full w-full"
						copyButton={copiable === "true"}
						lineNumbers={showLineNumbers === "true"}
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
