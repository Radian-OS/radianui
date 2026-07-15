import React from "react"
import { CodeArea } from "@/registry/ui/code-area"

const CodeLanguageTypescriptExample = () => {
	return (
		<div className="flex w-80 items-center justify-center sm:w-fit">
			<CodeArea
				className="max-w-150 w-full"
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
