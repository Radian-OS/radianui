import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Password } from "@/registry/ui/password"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type LabelOptions = "true" | "false"
export type DisabledOptions = "true" | "false"
export type ErrorOptions = "true" | "false"
export type trailOptions = "show" | "hide" | "onFocus"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ExampleOptions = "default" | "disabled"

const PasswordInputPreview2 = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<DisabledOptions>("false")
	const [label, setLabel] = useState<LabelOptions>("true")
	const [error, setError] = useState<ErrorOptions>("false")
	const [trail, settrail] = useState<trailOptions>("onFocus")
	const [hint, setHint] = useState<boolean>(false)
	const [rounded, setRounded] = useState<RoundedOptions>("md")

	const code = `<div className="relative w-full">
  <Link href="#" className="text-primary text-sm absolute right-0.75">Forgot Password ?</Link>
  <Password
    ${label === "true" ? 'label="Password"' : ""}
    ${disabled === "true" ? "disabled={true}" : ""}
    ${size !== "36" ? `size="${size}"` : ""}
    visibility='${trail}'
	rounded='${rounded}'
	${hint === true ? `hint="Hint text to help the user with input"` : ""}
	${error === "true" ? "hasError={true}" : ""}  />
</div>`

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={label} onValueChange={(value) => setLabel(value as LabelOptions)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
									<DropdownRadioItem value="28" onSelect={(e) => e.preventDefault()}>
										28
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32
									</DropdownRadioItem>
									<DropdownRadioItem value="36" onSelect={(e) => e.preventDefault()}>
										36
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40
									</DropdownRadioItem>
									<DropdownRadioItem value="44" onSelect={(e) => e.preventDefault()}>
										44
									</DropdownRadioItem>
									<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
										48
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Rounded</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={rounded} onValueChange={(value) => setRounded(value as RoundedOptions)}>
									<DropdownRadioItem value="xs" onSelect={(e) => e.preventDefault()}>
										xs
									</DropdownRadioItem>
									<DropdownRadioItem value="sm" onSelect={(e) => e.preventDefault()}>
										sm
									</DropdownRadioItem>
									<DropdownRadioItem value="md" onSelect={(e) => e.preventDefault()}>
										md
									</DropdownRadioItem>
									<DropdownRadioItem value="lg" onSelect={(e) => e.preventDefault()}>
										lg
									</DropdownRadioItem>
									<DropdownRadioItem value="xl" onSelect={(e) => e.preventDefault()}>
										xl
									</DropdownRadioItem>
									<DropdownRadioItem value="2xl" onSelect={(e) => e.preventDefault()}>
										2xl
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as DisabledOptions)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Error</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={error} onValueChange={(value) => setError(value as ErrorOptions)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Hint</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(hint)} onValueChange={(value) => setHint(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Visibility</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={trail} onValueChange={(value) => settrail(value as trailOptions)}>
									<DropdownRadioItem value="show" onSelect={(e) => e.preventDefault()}>
										show
									</DropdownRadioItem>
									<DropdownRadioItem value="hide" onSelect={(e) => e.preventDefault()}>
										hide
									</DropdownRadioItem>
									<DropdownRadioItem value="onFocus" onSelect={(e) => e.preventDefault()}>
										onFocus
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="relative">
						<Link href="#" className="text-primary-text right-0.75 absolute text-sm font-medium">
							Forgot Password ?
						</Link>
						<Password
							label={label === "true" ? "Password" : ""}
							disabled={disabled === "true"}
							size={size}
							hasError={error === "true"}
							hint={hint ? "Hint text to help the user with input" : ""}
							className="w-80"
							visibility={trail}
							rounded={rounded}
							// {...(trail === "false" ? { trail: false } : trail === "visibilityIcon" ? { trail: "visibilityIcon" } : {})}
						/>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="password-input-preview2.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default PasswordInputPreview2
