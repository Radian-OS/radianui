"use client"

import { useState } from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownCheckboxItem, DropdownContent, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export function DropdownWithDropdownCheckbox() {
	const [email, setEmail] = useState(true)
	const [sms, setSms] = useState(false)
	const [push, setPush] = useState(true)

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
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
					title="user-menu-dropdown.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import { useState } from "react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownCheckboxItem,
} from "@/components/ui/dropdown"
import { Button } from "@/components/ui/button"

export function CheckboxDropdownExample() {
  const [email, setEmail] = useState(true)
  const [sms, setSms] = useState(false)
  const [push, setPush] = useState(true)

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
