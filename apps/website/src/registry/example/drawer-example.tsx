// "use client"

// import { useState } from "react"
// import { Button } from "../ui/button"
// import { Drawer, DrawerBody, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
// import { Select, SelectItem } from "../ui/select"

// const DrawerExample = () => {
// 	const [selectVariants, setSelectVariants] = useState<string[]>(["default"])
// 	const [selectPosition, setSelectPosition] = useState<string[]>(["right"])
// 	const [selectHandle, setSelectHandle] = useState<string[]>(["hide"])
// 	const [selectBackdrop, setSelectBackdrop] = useState<string[]>(["overlay"])

// 	const variant = selectVariants[0] as "float" | "default" | "rounded" | undefined
// 	const position = selectPosition[0] as "right" | "bottom" | "left" | "top" | undefined
// 	const handle = selectHandle[0] === "show"
// 	const backdrop = selectBackdrop[0] === "null" ? null : (selectBackdrop[0] as "blur" | "overlay" | undefined)
// 	return (
// 		<div className="flex flex-col gap-4 p-5">
// 			<h1 className="heading-4">Drawer Example</h1>
// 			<div className="flex gap-3">
// 				<Select placeholder="Select a variant" selectedValues={selectVariants} onSelectedChange={setSelectVariants} selectionMode="single">
// 					<SelectItem value="float">Float</SelectItem>
// 					<SelectItem value="default">Default</SelectItem>
// 					<SelectItem value="rounded">Rounded</SelectItem>
// 				</Select>
// 				<Select placeholder="Select a position" selectedValues={selectPosition} onSelectedChange={setSelectPosition} selectionMode="single">
// 					<SelectItem value="right">Right</SelectItem>
// 					<SelectItem value="bottom">Bottom</SelectItem>
// 					<SelectItem value="left">Left</SelectItem>
// 					<SelectItem value="top">Top</SelectItem>
// 				</Select>
// 				<Select placeholder="Show handle" selectedValues={selectHandle} onSelectedChange={setSelectHandle} selectionMode="single">
// 					<SelectItem value="show">Show</SelectItem>
// 					<SelectItem value="hide">Hide</SelectItem>
// 				</Select>
// 				<Select placeholder="Backdrop" selectedValues={selectBackdrop} onSelectedChange={setSelectBackdrop} selectionMode="single">
// 					<SelectItem value="null">Null</SelectItem>
// 					<SelectItem value="blur">Blur</SelectItem>
// 					<SelectItem value="overlay">Overlay</SelectItem>
// 				</Select>
// 			</div>
// 			{variant && position && (
// 				<Drawer type={variant} direction={position} handle={handle} backdrop={backdrop} trigger={<Button>Open Drawer</Button>} className="relative">
// 					<DrawerHeader>
// 						<DrawerTitle>This is a drawer header</DrawerTitle>
// 						<DrawerDescription>This is a drawer description message.</DrawerDescription>
// 					</DrawerHeader>
// 					<DrawerBody className="flex flex-col gap-3">
// 						<div className="bg-fill4 rounded-radius-xl h-64"></div>
// 						<div className="bg-fill3 rounded-radius-xl h-64"></div>
// 						<div className="bg-fill4 rounded-radius-xl h-64"></div>
// 					</DrawerBody>
// 					<DrawerFooter>
// 						<DrawerClose>
// 							<Button variant="outline">Close Drawer</Button>
// 						</DrawerClose>
// 						<Button>Submit Action</Button>
// 					</DrawerFooter>
// 				</Drawer>
// 			)}
// 		</div>
// 	)
// }
// export default DrawerExample
