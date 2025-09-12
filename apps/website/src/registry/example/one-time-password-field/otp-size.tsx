"use client"

import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/one-time-password-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function OneTimePasswordFieldSizeExample() {
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
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex flex-col items-center justify-center gap-2 overflow-auto rounded-xl border px-10">
					<OTPField size="28">
						{Array.from({ length: 6 }).map((_, index) => (
							<OTPInput key={index} index={index} />
						))}
						<OTPHiddenInput />
					</OTPField>
					<OTPField size="32">
						{Array.from({ length: 6 }).map((_, index) => (
							<OTPInput key={index} index={index} />
						))}
						<OTPHiddenInput />
					</OTPField>
					<OTPField size="36">
						{Array.from({ length: 6 }).map((_, index) => (
							<OTPInput key={index} index={index} />
						))}
						<OTPHiddenInput />
					</OTPField>
					<OTPField size="40">
						{Array.from({ length: 6 }).map((_, index) => (
							<OTPInput key={index} index={index} />
						))}
						<OTPHiddenInput />
					</OTPField>
					<OTPField size="44">
						{Array.from({ length: 6 }).map((_, index) => (
							<OTPInput key={index} index={index} />
						))}
						<OTPHiddenInput />
					</OTPField>
					<OTPField size="56">
						{Array.from({ length: 6 }).map((_, index) => (
							<OTPInput key={index} index={index} />
						))}
						<OTPHiddenInput />
					</OTPField>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet title="one-time-password-field-size.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}
