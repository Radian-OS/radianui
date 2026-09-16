import React from "react"
import { CodeArea } from "@/registry/ui/code-area"

const CodeLanguageTypescriptExample = () => {
	return (
		<div className="w-full max-w-2xl">
			<CodeArea
				className="w-full max-w-150"
				language="typescript"
				theme="tokyo-night"
				code={`type User = {
  id: string
  name: string
  email: string
}

const getDisplayName = (user: User) => {
  return user.name.trim() || user.email
}`}
			/>
		</div>
	)
}

export default CodeLanguageTypescriptExample
