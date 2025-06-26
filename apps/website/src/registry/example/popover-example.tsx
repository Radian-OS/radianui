import { Avatar } from "../ui/avatar"
import { Button } from "../ui/button"
import { Divider } from "../ui/divider"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const PopoverExample = () => {
	return (
		<div className="my-10">
			<Popover side="bottom" align="start">
				<PopoverTrigger asChild>
					<Button variant={"neutral-outline"}>Aurthur Dominic</Button>
				</PopoverTrigger>
				<PopoverContent className="flex w-fit flex-col gap-3">
					<div className="flex flex-col gap-2">
						<div className="text-sm font-medium">Contact Details</div>
						<Divider className="-mx-4 w-[calc(100%)+0.125rem]" />
					</div>
					<div className="flex items-center gap-3">
						<Avatar name="Aurther Dominic" src="https://randomuser.me/api/portraits/women/21.jpg" />
						<div className="flex flex-col text-sm">
							<div className="font-medium">Aurther Dominic</div>
							<div className="text-text-secondary">dominic@radianos.com</div>
						</div>
					</div>
					<div className="flex gap-3">
						<Button variant="outline">Send Message</Button>
						<Button>Contact</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default PopoverExample
