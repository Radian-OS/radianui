import * as React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Label } from "@/registry/ui/label"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/one-time-password-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PASSWORD_LENGTH = 6

const OneTimePasswordFieldPreview = () => {
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border p-10">
					<div className="flex flex-col gap-2">
						<Label htmlFor="one-time-password">Enter Verification Code</Label>
						<OTPField autoFocus id="one-time-password">
							{Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
								<OTPInput key={i} />
							))}
							<OTPHiddenInput />
						</OTPField>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="one-time-password-field.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import * as React from "react"
import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui"

export default function OneTimePasswordFieldDemo() {
  return (
    <OneTimePasswordField.Root className="flex gap-2 flex-nowrap">
      {Array.from({ length: 6 }).map((_, i) => (
        <OneTimePasswordField.Input
          key={i}
          className="box-border inline-flex h-[35px] w-6 appearance-none items-center justify-center rounded bg-blackA2 p-0 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
        />
      ))}
      <OneTimePasswordField.HiddenInput />
    </OneTimePasswordField.Root>
  )
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default OneTimePasswordFieldPreview
