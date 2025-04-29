import { useState } from "react"
import Image from "next/image"
import { Avatar } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Divider } from "@/registry/ui/divider"
import { Drawer, DrawerBody, DrawerClose, DrawerFooter, DrawerHeader } from "@/registry/ui/drawer"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DrawerPreview = () => {
	const [variant, setVariant] = useState<"float" | "default" | "rounded" | undefined>("default")
	const [position, setPosition] = useState<"right" | "bottom" | "left" | "top" | undefined>("right")
	const [handle, setHandle] = useState<"true" | "false">("false")
	const [backdrop, setBackdrop] = useState<"blur" | "overlay" | null | undefined>("overlay")

	const code = `<Drawer
type="${variant}"
direction="${position}"
handle={${handle}}
backdrop="${backdrop}"
trigger={<Button>Open Drawer</Button>}
>
<DrawerHeader>
<div className="text-lg font-semibold">Component Sample</div>
<div className="text-text-secondary text-sm">Stress testing the drawer component with an example</div>
</DrawerHeader>
	
<Tabs defaultValue="invoice">
<DrawerBody>
<TabsList width="full">
<TabsTrigger value="invoice">Invoice Details</TabsTrigger>
<TabsTrigger value="updates">Updates</TabsTrigger>
</TabsList>
</DrawerBody>
<DrawerFooter>
<TabsContent className="flex flex-col gap-4" value="invoice">
<div className="flex flex-col" >
<div className="bg-bg-level1 flex gap-4 rounded-radius-md py-4">
<Avatar name="avatar" size={"48"} variant="circle" src="/avatar.png" />
<div>
<h1 className="text-base font-semibold">Anna Mureum</h1>
<p className="text-text-secondary text-sm">Head of Engineering</p>
</div>
</div>
<div>
<ul className="flex flex-col gap-3">
<li className="flex gap-2">
<span className="text-text-tertiary w-1/2 text-sm">Status</span>
<span className="w-1/2">
<Badge className="bg-success border-none text-white" size="20">
Paid
</Badge>
</span>
</li>
<li className="flex gap-2">
<span className="text-text-tertiary w-1/2 text-sm">Customer ID</span>
<span className="w-1/2 text-sm">1200322201A</span>
</li>
<li className="flex gap-2">
<span className="text-text-tertiary w-1/2 text-sm">Invoice ID</span>
<span className="w-1/2 text-sm">44440000AY</span>
</li>
<li className="flex gap-2">
<span className="text-text-tertiary w-1/2 text-sm">Payment Method</span>
<span className="w-1/2 text-sm">Credit card ending with 0044</span>
</li>
<li className="flex gap-2">
<span className="text-text-tertiary w-1/2 text-sm">Due Date</span>
<span className="w-1/2 text-sm">Jan 12, 2024</span>
</li>
</ul>
</div>
<div>
<Divider orientation="horizontal" spacing="8" />
</div>
<div className="text-sm font-semibold">More details about the invoice</div>
<div className="text-text-tertiary bg-fill-level2 flex items-center justify-center rounded-[0.75rem] p-5 mt-2 text-sm">Sample Container</div>
</div>
</TabsContent>
<TabsContent value="updates">
<div className="py-4 flex flex-col gap-3 items-center" >
<div className="h-[108px] w-[163px]">
<Image src="/loader.png" className="h-full w-full object-cover" width={100} height={100} alt="loader" />
</div>
<div className="flex flex-col gap-1 text-center">
<h1 className="text-lg font-semibold">No new updates</h1>
<span className="text-text-secondary text-sm">This content sample does not have any new updates, please check at a later time</span>
</div>
<div className="flex gap-3">
<DrawerClose>
<Button variant="neutral-outline">Close Drawer</Button>
</DrawerClose>
<Button>Refresh</Button>
</div>
</div>
</TabsContent>
</DrawerFooter>
</Tabs>
</Drawer>`

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>variant</DropdownSubTrigger>
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
								<DropdownSubTrigger>position</DropdownSubTrigger>
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
								<DropdownSubTrigger>handle</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setHandle(Array.from(keys)[0] as "true" | "false")}
										selectedValues={handle ? [handle] : []}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>backdrop</DropdownSubTrigger>
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
					<Drawer
						type={variant}
						direction={position}
						handle={handle === "true"}
						backdrop={backdrop}
						trigger={<Button>Open Drawer</Button>}
					// rounded={rounded}
					>
						<DrawerHeader>
							<div className="text-lg font-semibold">Component Sample</div>
							<div className="text-text-secondary text-sm">Stress testing the drawer component with an example</div>
						</DrawerHeader>

						<Tabs defaultValue="invoice">
							<DrawerBody>
								<TabsList width="full">
									<TabsTrigger value="invoice">Invoice Details</TabsTrigger>
									<TabsTrigger value="updates">Updates</TabsTrigger>
								</TabsList>
							</DrawerBody>
							<DrawerFooter>
								<TabsContent className="flex flex-col gap-4" value="invoice">
									<div className="flex flex-col" >
										<div className="bg-bg-level1 flex gap-4 rounded-radius-md py-4">
											<Avatar name="avatar" size={"48"} variant="circle" src="/avatar.png" />
											<div>
												<h1 className="text-base font-semibold">Anna Mureum</h1>
												<p className="text-text-secondary text-sm">Head of Engineering</p>
											</div>
										</div>
										<div>
											<ul className="flex flex-col gap-3">
												<li className="flex gap-2">
													<span className="text-text-tertiary w-1/2 text-sm">Status</span>
													<span className="w-1/2">
														<Badge className="bg-success border-none text-white" size="20">
															Paid
														</Badge>
													</span>
												</li>
												<li className="flex gap-2">
													<span className="text-text-tertiary w-1/2 text-sm">Customer ID</span>
													<span className="w-1/2 text-sm">1200322201A</span>
												</li>
												<li className="flex gap-2">
													<span className="text-text-tertiary w-1/2 text-sm">Invoice ID</span>
													<span className="w-1/2 text-sm">44440000AY</span>
												</li>
												<li className="flex gap-2">
													<span className="text-text-tertiary w-1/2 text-sm">Payment Method</span>
													<span className="w-1/2 text-sm">Credit card ending with 0044</span>
												</li>
												<li className="flex gap-2">
													<span className="text-text-tertiary w-1/2 text-sm">Due Date</span>
													<span className="w-1/2 text-sm">Jan 12, 2024</span>
												</li>
											</ul>
										</div>
										<div>
											<Divider orientation="horizontal" spacing="8" />
										</div>
										<div className="text-sm font-semibold">More details about the invoice</div>
										<div className="text-text-tertiary bg-fill-level2 flex items-center justify-center rounded-[0.75rem] p-5 mt-2 text-sm">Sample Container</div>
									</div>
								</TabsContent>
								<TabsContent value="updates">
									<div className="py-4 flex flex-col gap-3 items-center" >
										<div className="h-[108px] w-[163px]">
											<Image src="/loader.png" className="h-full w-full object-cover" width={100} height={100} alt="loader" />
										</div>
										<div className="flex flex-col gap-1 text-center">
											<h1 className="text-lg font-semibold">No new updates</h1>
											<span className="text-text-secondary text-sm">This content sample does not have any new updates, please check at a later time</span>
										</div>
										<div className="flex gap-3">
											<DrawerClose>
												<Button variant="neutral-outline">Close Drawer</Button>
											</DrawerClose>
											<Button>Refresh</Button>
										</div>
									</div>
								</TabsContent>
							</DrawerFooter>
						</Tabs>
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
