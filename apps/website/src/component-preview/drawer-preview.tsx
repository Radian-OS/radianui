import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DrawerPreview = () => {
	const [variant, setVariant] = useState<"float" | "default" | "rounded" | undefined>("default")
	const [position, setPosition] = useState<"right" | "bottom" | "left" | "top" | undefined>("right")
	const [handle, setHandle] = useState<"true" | "false">("false")
	const [backdrop, setBackdrop] = useState<"blur" | "overlay" | null | undefined>("overlay")

	const code = `<Drawer variant='${variant}' direction='${position}' handle={${handle}} backdrop='${backdrop}'>
	<DrawerTrigger><Button>Open Trigger</Button></DrawerTrigger>
	<DrawerContent>
		<DrawerHeader>
			<DrawerTitle>This is a drawer header</DrawerTitle>
			<DrawerDescription>This is a drawer description message.</DrawerDescription>
		</DrawerHeader>
		<DrawerBody className="h-100 ${position === "left" || position === "right" ? "w-112.5 flex flex-col gap-3" : "flex gap-3"}">
			<div className="bg-fill4 h-64 rounded-radius-xl" ></div>
			<div className="bg-fill3 h-64 rounded-radius-xl" ></div>
			<div className="bg-fill4 h-64 rounded-radius-xl" ></div>
		</DrawerBody>
			<DrawerFooter>
			<DrawerClose>
				<Button variant="outline" color="neutral" >Close Drawer</Button>
			</DrawerClose>
			<Button>Submit Action</Button>
		</DrawerFooter>
	</DrawerContent>
</Drawer>`

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
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant ?? ""} onValueChange={(value) => setVariant((value || undefined) as "float" | "default" | "rounded" | undefined)}>
									<DropdownRadioItem value="float" onSelect={(e) => e.preventDefault()}>
										float
									</DropdownRadioItem>
									<DropdownRadioItem value="default" onSelect={(e) => e.preventDefault()}>
										default
									</DropdownRadioItem>
									<DropdownRadioItem value="rounded" onSelect={(e) => e.preventDefault()}>
										rounded
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Direction</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={position ?? ""} onValueChange={(value) => setPosition((value || undefined) as "right" | "bottom" | "left" | "top" | undefined)}>
									<DropdownRadioItem value="right" onSelect={(e) => e.preventDefault()}>
										right
									</DropdownRadioItem>
									<DropdownRadioItem value="bottom" onSelect={(e) => e.preventDefault()}>
										bottom
									</DropdownRadioItem>
									<DropdownRadioItem value="left" onSelect={(e) => e.preventDefault()}>
										left
									</DropdownRadioItem>
									<DropdownRadioItem value="top" onSelect={(e) => e.preventDefault()}>
										top
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Handle</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={handle ?? "false"} onValueChange={(value) => setHandle(value as "true" | "false")}>
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
							<DropdownSubTrigger>Backdrop</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup
									value={(backdrop ?? "none") as string}
									onValueChange={(value) => setBackdrop(value === "none" ? undefined : (value as "blur" | "overlay" | null))}>
									<DropdownRadioItem value="blur" onSelect={(e) => e.preventDefault()}>
										blur
									</DropdownRadioItem>
									<DropdownRadioItem value="overlay" onSelect={(e) => e.preventDefault()}>
										overlay
									</DropdownRadioItem>
									<DropdownRadioItem value="none" onSelect={(e) => e.preventDefault()}>
										none
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center rounded-xl border px-10">
					<Drawer variant={variant} direction={position} handle={handle === "true" ? true : false} backdrop={backdrop}>
						<DrawerTrigger>
							<Button>Open Trigger</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>This is a drawer header</DrawerTitle>
								<DrawerDescription>This is a drawer description message.</DrawerDescription>
							</DrawerHeader>
							<DrawerBody className={`h-100 ${position === "left" || position === "right" ? "w-112.5 flex flex-col gap-3" : "flex gap-3"}`}>
								<div className="bg-fill2 h-full w-full rounded-xl"></div>
								<div className="bg-fill2 h-full w-full rounded-xl"></div>
								<div className="bg-fill2 h-full w-full rounded-xl"></div>
							</DrawerBody>
							<DrawerFooter>
								<DrawerClose>
									<Button variant="outline">Close Drawer</Button>
								</DrawerClose>
								<Button>Submit Action</Button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="drawer.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default DrawerPreview
