import React from "react"
import { CodeArea } from "@/registry/ui/code-area"

const CodeThemeExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex w-80 items-center justify-center sm:w-fit">
				<CodeArea
					language="tsx"
					theme="night-owl"
					code={`//Night Owl
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`}
				/>
			</div>
			<div className="flex w-80 items-center justify-center sm:w-fit">
				<CodeArea
					language="tsx"
					className="border"
					theme="github-light-default"
					code={`//Github Light Default
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`}
				/>
			</div>
			<div className="flex w-80 items-center justify-center sm:w-fit">
				<CodeArea
					language="tsx"
					theme="github-dark"
					code={`//Github Dark
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`}
				/>
			</div>
		</div>
	)
}

export default CodeThemeExample
