import React from "react"
import { CodeArea } from "@/registry/ui/code-area"

const CodeAreaPreview = () => {
	return (
		<div className="w-full max-w-2xl">
			<CodeArea
				code={`const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`}
				language="tsx"
				theme="github-dark-default"
				lineNumbers={false}
				className="h-full w-full"
			/>
		</div>
	)
}

export default CodeAreaPreview
