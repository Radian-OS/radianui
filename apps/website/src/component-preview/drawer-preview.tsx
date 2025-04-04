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
handle={${handle === "true" ? true : false}}
backdrop="${backdrop}"
trigger={<Button>Open Drawer</Button>}
>
<DrawerHeader>
<span className="body-lg font-semibold">Component Sample</span>
<p className="body-sm text-fg2">Stress testing the drawer component with an example</p>
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
<div className="p-4 flex gap-4 rounded-[0.5rem] bg-bg3">
<Avatar name="avatar" size={"48"} variant="circle" src="/avatar.png" />
<div>
<span className="body-base font-semibold">Anna Mureum</span>
<p className="body-sm text-fg2">Head of Engineering</p>
</div>
</div>
<div>
<ul className="flex flex-col gap-3">
<li className="flex gap-2"><span className="text-fg3 body-sm w-1/2">Status</span><span className="w-1/2"><Badge className="bg-success border-none text-white" size="20">Paid</Badge></span></li>
<li className="flex gap-2"><span className="text-fg3 body-sm w-1/2">Customer ID</span><span className="w-1/2 body-sm">1200322201A</span></li>
<li className="flex gap-2"><span className="text-fg3 body-sm w-1/2">Invoice ID</span><span className="w-1/2 body-sm">44440000AY</span></li>
<li className="flex gap-2"><span className="text-fg3 body-sm w-1/2">Payment Method</span><span className="w-1/2 body-sm">Credit card ending with 0044</span></li>
<li className="flex gap-2"><span className="text-fg3 body-sm w-1/2">Due Date</span><span className="body-sm w-1/2">Jan 12, 2024</span></li>
</ul>
</div>
<div><Divider orientation="horizontal" spacing="8" /></div>
<div className="body-sm font-semibold">More details about the invoice</div>
<div className="p-5 flex items-center justify-center body-sm text-fg3 bg-bg3 rounded-[0.75rem]">Sample Container</div>
</TabsContent>
<TabsContent value="updates" className="flex flex-col items-center justify-center gap-8">
<div className="w-[163px] h-[108px]">
<Image src="/loader.png" className="h-full w-full object-cover" width={100} height={100} alt="loader" />
</div>
<div className="flex flex-col text-center gap-1">
<h1 className="body-lg font-semibold">No new updates</h1>
<p className="body-sm text-fg2">This content sample does not have any new updates, please check at a later time</p>
</div>
<div className="flex gap-3">
<DrawerClose>
<Button variant="neutral-outline">Close Drawer</Button>
</DrawerClose>
<Button>Refresh</Button>
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
						handle={handle === "true" ? true : false}
						backdrop={backdrop}
						trigger={<Button>Open Drawer</Button>}
						// rounded={rounded}
					>
						<DrawerHeader>
							<span className="body-lg font-semibold">Component Sample</span>
							<p className="body-sm text-fg2">Stress testing the drawer component with an example</p>
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
									<div className="bg-bg3 flex gap-4 rounded-[0.5rem] p-4">
										<Avatar name="avatar" size={"48"} variant="circle" src="/avatar.png" />
										<div>
											<span className="body-base font-semibold">Anna Mureum</span>
											<p className="body-sm text-fg2">Head of Engineering</p>
										</div>
									</div>
									<div>
										<ul className="flex flex-col gap-3">
											<li className="flex gap-2">
												<span className="text-fg3 body-sm w-1/2">Status</span>
												<span className="w-1/2">
													<Badge className="bg-success border-none text-white" size="20">
														Paid
													</Badge>
												</span>
											</li>
											<li className="flex gap-2">
												<span className="text-fg3 body-sm w-1/2">Customer ID</span>
												<span className="body-sm w-1/2">1200322201A</span>
											</li>
											<li className="flex gap-2">
												<span className="text-fg3 body-sm w-1/2">Invoice ID</span>
												<span className="body-sm w-1/2">44440000AY</span>
											</li>
											<li className="flex gap-2">
												<span className="text-fg3 body-sm w-1/2">Payment Method</span>
												<span className="body-sm w-1/2">Credit card ending with 0044</span>
											</li>
											<li className="flex gap-2">
												<span className="text-fg3 body-sm w-1/2">Due Date</span>
												<span className="body-sm w-1/2">Jan 12, 2024</span>
											</li>
										</ul>
									</div>
									<div>
										<Divider orientation="horizontal" spacing="8" />
									</div>
									<div className="body-sm font-semibold">More details about the invoice</div>
									<div className="body-sm text-fg3 bg-bg3 flex items-center justify-center rounded-[0.75rem] p-5">Sample Container</div>
								</TabsContent>
								<TabsContent value="updates" className="flex flex-col items-center justify-center gap-8">
									<div className="h-[108px] w-[163px]">
										<Image src="/loader.png" className="h-full w-full object-cover" width={100} height={100} alt="loader" />
									</div>
									<div className="flex flex-col gap-1 text-center">
										<h1 className="body-lg font-semibold">No new updates</h1>
										<p className="body-sm text-fg2">This content sample does not have any new updates, please check at a later time</p>
									</div>
									<div className="flex gap-3">
										<DrawerClose>
											<Button variant="neutral-outline">Close Drawer</Button>
										</DrawerClose>
										<Button>Refresh</Button>
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
