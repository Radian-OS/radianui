"use client"

import { useState } from "react"
import Image from "next/image"
import { Avatar } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Divider } from "../ui/divider"
import { Drawer, DrawerBody, DrawerClose, DrawerFooter, DrawerHeader } from "../ui/drawer"
import { Select, SelectItem } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export default function DrawerExample() {
	const [selectVariants, setSelectVariants] = useState<string[]>(["default"])
	const [selectPosition, setSelectPosition] = useState<string[]>(["right"])
	const [selectHandle, setSelectHandle] = useState<string[]>(["hide"])
	const [selectBackdrop, setSelectBackdrop] = useState<string[]>(["overlay"])

	const variant = selectVariants[0] as "float" | "default" | "rounded" | undefined
	const position = selectPosition[0] as "right" | "bottom" | "left" | "top" | undefined
	const handle = selectHandle[0] === "show"
	const backdrop = selectBackdrop[0] === "null" ? null : (selectBackdrop[0] as "blur" | "overlay" | undefined)

	return (
		<div className="flex flex-col gap-4 p-5">
			<h1 className="heading-4">Drawer Example</h1>
			<div className="flex gap-3">
				<Select placeholder="Select a variant" selectedValues={selectVariants} onSelectedChange={setSelectVariants} selectionMode="single">
					<SelectItem value="float">Float</SelectItem>
					<SelectItem value="default">Default</SelectItem>
					<SelectItem value="rounded">Rounded</SelectItem>
				</Select>
				<Select placeholder="Select a position" selectedValues={selectPosition} onSelectedChange={setSelectPosition} selectionMode="single">
					<SelectItem value="right">Right</SelectItem>
					<SelectItem value="bottom">Bottom</SelectItem>
					<SelectItem value="left">Left</SelectItem>
					<SelectItem value="top">Top</SelectItem>
				</Select>
				<Select placeholder="Show handle" selectedValues={selectHandle} onSelectedChange={setSelectHandle} selectionMode="single">
					<SelectItem value="show">Show</SelectItem>
					<SelectItem value="hide">Hide</SelectItem>
				</Select>
				<Select placeholder="Backdrop" selectedValues={selectBackdrop} onSelectedChange={setSelectBackdrop} selectionMode="single">
					<SelectItem value="null">Null</SelectItem>
					<SelectItem value="blur">Blur</SelectItem>
					<SelectItem value="overlay">Overlay</SelectItem>
				</Select>
			</div>

			{variant && position && (
				<Drawer
					type={variant}
					direction={position}
					handle={handle}
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
			)}
		</div>
	)
}
