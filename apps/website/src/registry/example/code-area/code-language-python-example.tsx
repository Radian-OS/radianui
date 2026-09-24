import React from "react"
import { CodeArea } from "@/registry/ui/code-area"

const CodeLanguagePythonExample = () => {
	return (
		<div className="w-full max-w-2xl">
			<CodeArea
				className="w-full max-w-150"
				language="python"
				theme="tokyo-night"
				code={`def calculate_total(items):
    subtotal = sum(item["price"] for item in items)
    tax = subtotal * 0.13
    return round(subtotal + tax, 2)

cart = [{"name": "Keyboard", "price": 89}]
print(calculate_total(cart))`}
			/>
		</div>
	)
}

export default CodeLanguagePythonExample
