import React from "react"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"

const DrawerExamplePreview = () => {
	return (
		<div className="flex items-center justify-center">
			<Drawer variant="rounded" direction="right" handle={true} backdrop="overlay">
				<DrawerTrigger>
					<Button>Overlay</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>This is a drawer header</DrawerTitle>
						<DrawerDescription>This is a drawer description message.</DrawerDescription>
					</DrawerHeader>
					<DrawerBody className="h-100 w-112.5 flex flex-col gap-3">
						<div className="bg-fill4 h-64 rounded-xl"></div>
						<div className="bg-fill3 h-64 rounded-xl"></div>
						<div className="bg-fill4 h-64 rounded-xl"></div>
					</DrawerBody>
					<DrawerFooter>
						<DrawerClose>
							<Button variant="outline" color="neutral">
								Close Drawer
							</Button>
						</DrawerClose>
						<Button>Submit Action</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default DrawerExamplePreview
