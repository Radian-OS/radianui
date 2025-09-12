"use client"

import * as React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownCheckboxItem, DropdownContent, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function DropdownWithDropdownCheckbox() {
	const [email, setEmail] = React.useState(true)
	const [sms, setSms] = React.useState(false)
	const [push, setPush] = React.useState(true)

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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Dropdown indicatorPosition="left">
						<DropdownTrigger asChild>
							<Button variant="outline" color="neutral">
								Notifications
							</Button>
						</DropdownTrigger>
						<DropdownContent>
							<DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={email} onCheckedChange={(checked) => setEmail(checked)}>
								Email
							</DropdownCheckboxItem>
							<DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={sms} onCheckedChange={(checked) => setSms(checked)}>
								SMS
							</DropdownCheckboxItem>
							<DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={push} onCheckedChange={(checked) => setPush(checked)}>
								Push Notifications
							</DropdownCheckboxItem>
						</DropdownContent>
					</Dropdown>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="dropdown-checkbox.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import * as React from "react"

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownCheckboxItem,
} from "@/components/ui/dropdown"
import { Button } from "@/components/ui/button"

export default function CheckboxDropdownExample() {
  const [email, setEmail] = React.useState(true)
  const [sms, setSms] = React.useState(false)
  const [push, setPush] = React.useState(true)

  return (
    <Dropdown indicatorPosition="left">
      <DropdownTrigger asChild>
        <Button variant="outline">Notifications</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={email} onCheckedChange={(checked) => setEmail(!!checked)}>
          Email
        </DropdownCheckboxItem>
        <DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={sms} onCheckedChange={(checked) => setSms(!!checked)}>
          SMS
        </DropdownCheckboxItem>
        <DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={push} onCheckedChange={(checked) => setPush(!!checked)}>
          Push Notifications
        </DropdownCheckboxItem>
      </DropdownContent>
    </Dropdown>
  )
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
