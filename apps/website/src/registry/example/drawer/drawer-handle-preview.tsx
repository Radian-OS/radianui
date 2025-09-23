import React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"

function DrawerHandleExample() {
	return (
		<div className="flex items-center justify-center gap-6">
			<Drawer variant="default" direction="left" handle={true} backdrop="overlay">
				<DrawerTrigger>
					<Button variant="soft" color="neutral">
						<ChevronLeft size={20} /> Left
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>This is a drawer header</DrawerTitle>
						<DrawerDescription>This is a drawer description message.</DrawerDescription>
					</DrawerHeader>
					<DrawerBody>
						<div className="w-90">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque reprehenderit laudantium, excepturi maiores dolore temporibus veniam eos corporis culpa
							consequatur quidem officiis dolorem ea magnam, doloribus repudiandae, atque vel? Sapiente id nemo saepe nulla commodi ex voluptatum maiores, ab temporibus officia et
							odio. Dicta corrupti vel, nesciunt adipisci eum quibusdam voluptates suscipit consectetur repellendus omnis quam obcaecati laboriosam? Facere. Saepe non aliquid
							laboriosam aut earum aperiam enim omnis minima illo dicta nihil dolor voluptatibus ab maxime, dolores autem obcaecati repellendus maiores aspernatur ipsam! Quibusdam
							dolore voluptatibus doloribus et recusandae? Nostrum ut similique quos aut deleniti! Voluptatibus minima deleniti autem molestiae necessitatibus eius consequuntur
							iusto veniam nisi. Magnam consectetur facere quasi reprehenderit laboriosam quisquam maxime natus, tempore numquam maiores architecto. Hic optio aperiam cumque
							repellat porro aut numquam ad, mollitia voluptas eos perspiciatis reiciendis iure perferendis quibusdam error, exercitationem, debitis reprehenderit blanditiis
							cupiditate odio provident magni. In vero laborum iusto.
						</div>
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
			<Drawer variant="default" direction="right" handle={true} backdrop="overlay">
				<DrawerTrigger>
					<Button variant="soft" color="neutral">
						Right <ChevronRight size={20} />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>This is a drawer header</DrawerTitle>
						<DrawerDescription>This is a drawer description message.</DrawerDescription>
					</DrawerHeader>
					<DrawerBody>
						<div className="w-90">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque reprehenderit laudantium, excepturi maiores dolore temporibus veniam eos corporis culpa
							consequatur quidem officiis dolorem ea magnam, doloribus repudiandae, atque vel? Sapiente id nemo saepe nulla commodi ex voluptatum maiores, ab temporibus officia et
							odio. Dicta corrupti vel, nesciunt adipisci eum quibusdam voluptates suscipit consectetur repellendus omnis quam obcaecati laboriosam? Facere. Saepe non aliquid
							laboriosam aut earum aperiam enim omnis minima illo dicta nihil dolor voluptatibus ab maxime, dolores autem obcaecati repellendus maiores aspernatur ipsam! Quibusdam
							dolore voluptatibus doloribus et recusandae? Nostrum ut similique quos aut deleniti! Voluptatibus minima deleniti autem molestiae necessitatibus eius consequuntur
							iusto veniam nisi. Magnam consectetur facere quasi reprehenderit laboriosam quisquam maxime natus, tempore numquam maiores architecto. Hic optio aperiam cumque
							repellat porro aut numquam ad, mollitia voluptas eos perspiciatis reiciendis iure perferendis quibusdam error, exercitationem, debitis reprehenderit blanditiis
							cupiditate odio provident magni. In vero laborum iusto.
						</div>
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
			<Drawer variant="default" direction="top" handle={true} backdrop="overlay">
				<DrawerTrigger>
					<Button variant="soft" color="neutral">
						Top <ChevronUp size={20} />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>This is a drawer header</DrawerTitle>
						<DrawerDescription>This is a drawer description message.</DrawerDescription>
					</DrawerHeader>
					<DrawerBody>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque reprehenderit laudantium, excepturi maiores dolore temporibus veniam eos corporis culpa consequatur
						quidem officiis dolorem ea magnam, doloribus repudiandae, atque vel? Sapiente id nemo saepe nulla commodi ex voluptatum maiores, ab temporibus officia et odio. Dicta
						corrupti vel, nesciunt adipisci eum quibusdam voluptates suscipit consectetur repellendus omnis quam obcaecati laboriosam? Facere. Saepe non aliquid laboriosam aut
						earum aperiam enim omnis minima illo dicta nihil dolor voluptatibus ab maxime, dolores autem obcaecati repellendus maiores aspernatur ipsam! Quibusdam dolore
						voluptatibus doloribus et recusandae? Nostrum ut similique quos aut deleniti! Voluptatibus minima deleniti autem molestiae necessitatibus eius consequuntur iusto veniam
						nisi. Magnam consectetur facere quasi reprehenderit laboriosam quisquam maxime natus, tempore numquam maiores architecto. Hic optio aperiam cumque repellat porro aut
						numquam ad, mollitia voluptas eos perspiciatis reiciendis iure perferendis quibusdam error, exercitationem, debitis reprehenderit blanditiis cupiditate odio provident
						magni. In vero laborum iusto.
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
			<Drawer variant="default" direction="bottom" handle={true} backdrop="overlay">
				<DrawerTrigger>
					<Button variant="soft" color="neutral">
						Bottom <ChevronDown size={20} />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>This is a drawer header</DrawerTitle>
						<DrawerDescription>This is a drawer description message.</DrawerDescription>
					</DrawerHeader>
					<DrawerBody>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque reprehenderit laudantium, excepturi maiores dolore temporibus veniam eos corporis culpa consequatur
						quidem officiis dolorem ea magnam, doloribus repudiandae, atque vel? Sapiente id nemo saepe nulla commodi ex voluptatum maiores, ab temporibus officia et odio. Dicta
						corrupti vel, nesciunt adipisci eum quibusdam voluptates suscipit consectetur repellendus omnis quam obcaecati laboriosam? Facere. Saepe non aliquid laboriosam aut
						earum aperiam enim omnis minima illo dicta nihil dolor voluptatibus ab maxime, dolores autem obcaecati repellendus maiores aspernatur ipsam! Quibusdam dolore
						voluptatibus doloribus et recusandae? Nostrum ut similique quos aut deleniti! Voluptatibus minima deleniti autem molestiae necessitatibus eius consequuntur iusto veniam
						nisi. Magnam consectetur facere quasi reprehenderit laboriosam quisquam maxime natus, tempore numquam maiores architecto. Hic optio aperiam cumque repellat porro aut
						numquam ad, mollitia voluptas eos perspiciatis reiciendis iure perferendis quibusdam error, exercitationem, debitis reprehenderit blanditiis cupiditate odio provident
						magni. In vero laborum iusto.
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

export default DrawerHandleExample
