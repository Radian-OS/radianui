import { CircleCheck, ShieldAlert } from "lucide-react"
import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/registry/ui/navigation-menu"

export default function NavigationMenuIcons() {
	return (
		<div className="flex items-center justify-center">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Status</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[200px] gap-2">
								<li>
									<NavigationMenuLink asChild>
										<Link href="#" className="flex flex-row items-center gap-2">
											<ShieldAlert />
											Backlog
										</Link>
									</NavigationMenuLink>
								</li>
								<li>
									<NavigationMenuLink asChild>
										<Link href="#" className="flex flex-row items-center gap-2">
											<CircleCheck />
											Done
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
