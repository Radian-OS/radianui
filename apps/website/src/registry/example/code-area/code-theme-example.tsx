import React from "react"
import { CodeArea } from "@/registry/ui/code-area"

const CodeThemeExample = () => {
	return (
		<div className="flex w-full max-w-2xl flex-col items-center justify-center gap-4">
			<CodeArea
				language="tsx"
				theme="night-owl"
				code={`//Night Owl
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`}
				className="w-full"
			/>
			<CodeArea
				language="tsx"
				className="w-full border"
				theme="github-light-default"
				code={`//Github Light Default
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`}
			/>
			<CodeArea
				language="tsx"
				theme="github-dark"
				code={`//Github Dark
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`}
				className="w-full"
			/>
		</div>
	)
}

export default CodeThemeExample
