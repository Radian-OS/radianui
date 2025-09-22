import React from "react"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"

function DrawerDirectionPreview() {
	return (
		<div className="flex items-center justify-center">
			<Drawer variant="float" direction="bottom" handle={false} backdrop="overlay">
				<DrawerTrigger asChild>
					<Button>Bottom</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>This is a drawer header</DrawerTitle>
						<DrawerDescription>This is a drawer description message.</DrawerDescription>
					</DrawerHeader>
					<DrawerBody className="h-100 flex gap-3">
						<div className="bg-fill4 h-full w-full rounded-xl"></div>
						<div className="bg-fill3 h-full w-full rounded-xl"></div>
						<div className="bg-fill4 h-full w-full rounded-xl"></div>
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

export default DrawerDirectionPreview
