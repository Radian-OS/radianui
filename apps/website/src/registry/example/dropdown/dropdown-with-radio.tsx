"use client"

import { useState } from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function DropdownWithRadioExample() {
	const [theme, setTheme] = useState("system")

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
								Theme
							</Button>
						</DropdownTrigger>
						<DropdownContent>
							<DropdownRadioGroup value={theme} onValueChange={setTheme}>
								<DropdownRadioItem value="light">Light</DropdownRadioItem>
								<DropdownRadioItem value="dark">Dark</DropdownRadioItem>
								<DropdownRadioItem value="system">System</DropdownRadioItem>
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="dropdown-radio.tsx"
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

export default function RadioDropdownExample() {
  const [theme, setTheme] = React.useState("system")

  return (
    <Dropdown indicatorPosition="left">
      <DropdownTrigger asChild>
        <Button variant="outline" color="neutral">Theme</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownRadioItem value="light">Light</DropdownRadioItem>
          <DropdownRadioItem value="dark">Dark</DropdownRadioItem>
          <DropdownRadioItem value="system">System</DropdownRadioItem>
        </DropdownRadioGroup>
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
