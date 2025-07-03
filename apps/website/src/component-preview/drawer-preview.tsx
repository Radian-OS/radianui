import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DrawerPreview = () => {
	const [variant, setVariant] = useState<"float" | "default" | "rounded" | undefined>("default")
	const [position, setPosition] = useState<"right" | "bottom" | "left" | "top" | undefined>("right")
	const [handle, setHandle] = useState<"true" | "false">("false")
	const [backdrop, setBackdrop] = useState<"blur" | "overlay" | null | undefined>("overlay")

	const code = `<Drawer type='${variant}' direction='${position}' handle={${handle}} backdrop='${backdrop}'>
	<DrawerTrigger><Button>Open Trigger</Button></DrawerTrigger>
	<DrawerContent>
		<DrawerHeader>
			<DrawerTitle>This is a drawer header</DrawerTitle>
			<DrawerDescription>This is a drawer description message.</DrawerDescription>
		</DrawerHeader>
		<DrawerBody className="h-100 ${position === "left" || position === "right" ? "w-112.5 flex flex-col gap-3" : "flex gap-3"}">
			<div className="bg-fill-level4 h-64 rounded-radius-xl" ></div>
			<div className="bg-fill-level3 h-64 rounded-radius-xl" ></div>
			<div className="bg-fill-level4 h-64 rounded-radius-xl" ></div>
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
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as "float" | "default" | "rounded" | undefined)}
										selectedValues={variant ? [variant] : []}>
										<DropdownItem value="float">float</DropdownItem>
										<DropdownItem value="default">default</DropdownItem>
										<DropdownItem value="rounded">rounded</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Position</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setPosition(Array.from(keys)[0] as "right" | "bottom" | "left" | "top" | undefined)}
										selectedValues={position ? [position] : []}>
										<DropdownItem value="right">right</DropdownItem>
										<DropdownItem value="bottom">bottom</DropdownItem>
										<DropdownItem value="left">left</DropdownItem>
										<DropdownItem value="top">top</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Handle</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setHandle(Array.from(keys)[0] as "true" | "false")} selectedValues={handle ? [handle] : []}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Backdrop</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setBackdrop(Array.from(keys)[0] as "blur" | "overlay" | null | undefined)}
										selectedValues={backdrop ? [backdrop] : []}>
										<DropdownItem value="blur">blur</DropdownItem>
										<DropdownItem value="overlay">overlay</DropdownItem>
										<DropdownItem value="none">none</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center rounded-xl border px-10">
					<Drawer type={variant} direction={position} handle={handle === "true" ? true : false} backdrop={backdrop}>
						<DrawerTrigger>
							<Button>Open Trigger</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>This is a drawer header</DrawerTitle>
								<DrawerDescription>This is a drawer description message.</DrawerDescription>
							</DrawerHeader>
							<DrawerBody className={`h-100 ${position === "left" || position === "right" ? "w-112.5 flex flex-col gap-3" : "flex gap-3"}`}>
								<div className="bg-fill-level2 h-full w-full rounded-xl"></div>
								<div className="bg-fill-level2 h-full w-full rounded-xl"></div>
								<div className="bg-fill-level2 h-full w-full rounded-xl"></div>
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
				<CodeArea language="tsx" showLineNumbers code={code} className="h-[420px]" />
			</TabsContent>
		</Tabs>
	)
}

export default DrawerPreview
