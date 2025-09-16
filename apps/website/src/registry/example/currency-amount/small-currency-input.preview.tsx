"use client"

import { useState } from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { CurrencyInputField } from "@/registry/ui/currency-amount"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SmallCurrencyInputPreview = () => {
	const [value, setValue] = useState<string>("")

	const code = `import React, { useState } from "react"
	import { CurrencyInputField } from "@/registry/ui/currency-amount"
	
	const BasicCurrencyInputPreview = () => {
		const [value, setValue] = useState<string>("")
		return (
			<div className="w-full max-w-sm space-y-2">
				<label className="text-fg text-sm font-medium">EUR Currency (Small)</label>
						<CurrencyInputField
							size="32"
							placeholder="Enter amount in EUR"
							value={value}
							onValueChange={(value: string | undefined) => setValue(value || "")}
							intlConfig={{ locale: "en-EU", currency: "EUR" }}
							prefix="€"
						/>
				<p className="text-fg-tertiary text-xs">Value: {value || "0"}</p>
			</div>
		)
	}
	
	export default BasicCurrencyInputPreview
	`

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center rounded-xl border p-10">
					<div className="w-full max-w-sm space-y-2">
						<label className="text-fg text-sm font-medium">EUR Currency (Small)</label>
						<CurrencyInputField
							size="32"
							placeholder="Enter amount in EUR"
							value={value}
							onValueChange={(value: string | undefined) => setValue(value || "")}
							intlConfig={{ locale: "en-EU", currency: "EUR" }}
							prefix="€"
						/>
						<p className="text-fg-tertiary text-xs">Value: {value || "0"}</p>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="small-currency-input.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default SmallCurrencyInputPreview
