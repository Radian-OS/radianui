import Image from "next/image"
import { Button } from "../ui/button"
import { Divider } from "../ui/divider"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "../ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const ModalExample = () => (
	<div className="my-4 flex flex-row flex-wrap gap-2">
		<Modal1 />
		<Modal2 />
		<Modal3 />
		<Modal4 />
		<Modal5 />
		<Modal6 />
		<Modal7 />
		<Modal8 />
		<Modal9 />
		<Modal10 />
		<DeleteModal />
	</div>
)

const Modal1 = () => (
	<Modal>
		<ModalTrigger asChild>
			<Button>Modal 1</Button>
		</ModalTrigger>
		<ModalContent>
			<ModalHeader>
				<ModalTitle>This is sample header</ModalTitle>
				<ModalDescription>Are you sure you want to change the content in this section.</ModalDescription>
			</ModalHeader>
			<div className="bg-bg3 h-[155px] rounded-lg"></div>
			<ModalFooter>
				<ModalClose asChild>
					<Button variant="neutral-outline">Cancel</Button>
				</ModalClose>
				<Button variant={"strong"}>Submit Action</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const Modal2 = () => (
	<Modal>
		<ModalTrigger asChild>
			<Button>Modal 2</Button>
		</ModalTrigger>
		<ModalContent>
			<ModalHeader>
				<ModalTitle>This is sample header</ModalTitle>
				<ModalDescription>Are you sure you want to change the content in this section.</ModalDescription>
			</ModalHeader>
			<Divider className="-mx-5 my-0 w-100" />
			<div className="bg-bg3 h-[155px] rounded-lg"></div>
			<Divider className="-mx-5 my-0 w-100" />
			<ModalFooter>
				<ModalClose asChild>
					<Button variant="neutral-outline">Cancel</Button>
				</ModalClose>
				<Button variant={"strong"}>Submit Action</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const Modal3 = () => (
	<Modal>
		<ModalTrigger asChild>
			<Button>Modal 3</Button>
		</ModalTrigger>
		<ModalContent>
			<ModalHeader>
				<ModalTitle>This is sample header</ModalTitle>
			</ModalHeader>
			<Tabs defaultValue="account">
				<TabsList width={"full"}>
					<TabsTrigger value="view">View All</TabsTrigger>
					<TabsTrigger value="mentions">Mentions</TabsTrigger>
					<TabsTrigger value="followers">Followers</TabsTrigger>
					<TabsTrigger value="invites">Invites</TabsTrigger>
				</TabsList>
				<TabsContent value="view" className="bg-bg3 h-[67px] rounded-lg" />
				<TabsContent value="mentions" className="bg-bg3 h-[67px] rounded-lg" />
				<TabsContent value="followers" className="bg-bg3 h-[67px] rounded-lg" />
				<TabsContent value="invites" className="bg-bg3 h-[67px] rounded-lg" />
			</Tabs>
			<ModalFooter>
				<ModalClose asChild>
					<Button variant="neutral-outline">Cancel</Button>
				</ModalClose>
				<Button variant={"strong"}>Submit Action</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const Modal4 = () => (
	<Modal closeIconVisibility="hover">
		<ModalTrigger asChild>
			<Button>Modal 4</Button>
		</ModalTrigger>
		<ModalContent>
			<ModalHeader>
				<ModalTitle>Choose Template</ModalTitle>
				<ModalDescription>Select a template to start working on your project</ModalDescription>
			</ModalHeader>
			<div className="flex flex-col gap-4">
				<div className="bg-bg3 h-[100px] rounded-lg" />
				<div className="bg-bg3 h-[100px] rounded-lg" />
				<div className="bg-bg3 h-[100px] rounded-lg" />
			</div>
			<ModalFooter>
				<ModalClose asChild>
					<Button variant="neutral-outline">Cancel</Button>
				</ModalClose>
				<Button variant={"strong"}>Submit Action</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const Modal5 = () => (
	<Modal closeIconVisibility="hidden">
		<ModalTrigger asChild>
			<Button>Modal 5</Button>
		</ModalTrigger>
		<ModalContent>
			<ModalTitle className="hidden">Plain</ModalTitle>
			<div className="bg-bg3 flex h-[100px] items-center justify-center rounded-lg">
				<span>Content Area</span>
			</div>
		</ModalContent>
	</Modal>
)

const Modal6 = () => (
	<Modal closeIconVisibility="hidden">
		<ModalTrigger asChild>
			<Button>Modal 6</Button>
		</ModalTrigger>
		<ModalContent>
			<ModalTitle>Share Project</ModalTitle>
			<div className="flex flex-col gap-2">
				<Label htmlFor="project">Enter Recipients</Label>
				<Input type="text" id="project" />
			</div>
			<ModalFooter>
				<ModalClose asChild>
					<Button variant="neutral-outline">Cancel</Button>
				</ModalClose>
				<Button variant={"strong"}>Share Project</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const Modal7 = () => (
	<Modal closeIconVisibility="hover">
		<ModalTrigger asChild>
			<Button>Modal 7</Button>
		</ModalTrigger>
		<ModalContent>
			<div className="flex items-center justify-center gap-2 pt-6">
				<Image
					className="rounded-2xl"
					src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"}
					alt="radian"
					height={60}
					width={60}
				/>
				<Image
					className="rounded-2xl"
					src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"}
					alt="radian"
					height={60}
					width={60}
				/>
			</div>
			<ModalHeader className="text-center">
				<ModalTitle>Connect account to Github</ModalTitle>
				<ModalDescription>Streamline your API requests by using Github SDK’s and automate all your tickets</ModalDescription>
			</ModalHeader>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Account Name</Label>
					<Input type="text" id="name" />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="key">API Key</Label>
					<Input type="text" id="key" />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="url">Workspace URL</Label>
					<Input type="text" id="url" />
				</div>
			</div>
			<ModalFooter className="justify-start">
				<ModalClose asChild>
					<Button variant="neutral-outline" className="w-1/2">
						Close Modal
					</Button>
				</ModalClose>
				<Button variant={"strong"} className="w-1/2">
					Submit Action
				</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const Modal8 = () => (
	<Modal closeIconVisibility="hidden">
		<ModalTrigger asChild>
			<Button>Modal8</Button>
		</ModalTrigger>
		<ModalContent>
			<div className="bg-bg3 h-[220px] w-full rounded-lg" />
			<ModalHeader className="text-center">
				<ModalTitle>Create a new account</ModalTitle>
				<ModalDescription>This is a sample modal to stress test the xyz container in a modal. Here is a sample</ModalDescription>
			</ModalHeader>
			<ModalFooter className="flex-col">
				<Button variant={"strong"} className="w-full">
					Submit Action
				</Button>
				<ModalClose asChild>
					<Button variant="neutral-outline" className="w-full">
						Close Modal
					</Button>
				</ModalClose>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const Modal9 = () => (
	<Modal closeIconVisibility="hidden">
		<ModalTrigger asChild>
			<Button>Modal9</Button>
		</ModalTrigger>
		<ModalContent>
			<div className="bg-bg3 h-[220px] w-full rounded-lg" />
			<ModalHeader>
				<ModalTitle>Unlock Unlimited Access</ModalTitle>
				<ModalDescription>Join the Radian team to unlock unlimited features and subsets of products</ModalDescription>
			</ModalHeader>
			<ModalFooter className="flex-col">
				<Button variant={"strong"} className="w-full">
					Submit Action
				</Button>
				<ModalClose asChild>
					<Button variant="neutral-outline" className="w-full">
						Close Modal
					</Button>
				</ModalClose>
			</ModalFooter>
		</ModalContent>
	</Modal>
)
const Modal10 = () => (
	<Modal closeIconVisibility="hidden">
		<ModalTrigger asChild>
			<Button>Modal10</Button>
		</ModalTrigger>
		<ModalContent>
			<div className="bg-bg3 h-[220px] w-full rounded-lg" />
			<ModalHeader>
				<ModalTitle>Unlock Unlimited Access</ModalTitle>
				<ModalDescription>Join the Radian team to unlock unlimited features and subsets of products</ModalDescription>
			</ModalHeader>
			<ModalFooter className="justify-between">
				<ModalClose asChild>
					<Button variant="neutral-outline">Skip</Button>
				</ModalClose>
				<Button variant={"strong"}>Continue</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

const DeleteModal = () => (
	<Modal>
		<ModalTrigger asChild>
			<Button className="bg-[#f20808]">Delete</Button>
		</ModalTrigger>
		<ModalContent>
			<ModalHeader>
				<ModalTitle>Delete Container</ModalTitle>
				<ModalDescription>Are you sure you want to delete this container? This cannot be undone</ModalDescription>
			</ModalHeader>
			<ModalFooter>
				<ModalClose asChild>
					<Button variant="neutral-outline">Cancel</Button>
				</ModalClose>
				<Button variant={"strong"}>Delete</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

export default ModalExample
