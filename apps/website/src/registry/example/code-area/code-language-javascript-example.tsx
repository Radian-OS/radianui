import React from "react"
import { CodeArea } from "@/registry/ui/code-area"

const CodeLanguageJavascriptExample = () => {
	return (
		<div className="w-full max-w-2xl">
			<CodeArea
				className="w-full max-w-150"
				language="javascript"
				theme="tokyo-night"
				code={`async function fetchUser(userId) {
  const response = await fetch(\`/api/users/\${userId}\`)

  if (!response.ok) {
    throw new Error("Unable to load user")
  }

  return response.json()
}`}
			/>
		</div>
	)
}

export default CodeLanguageJavascriptExample
