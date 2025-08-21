import { Avatar } from "../ui/avatar"
import { people } from "./avatar-group-example"

const AvatarExample = () => {
	return (
		<div className="mb-10 flex flex-col gap-10">
			<div className="flex flex-wrap items-center gap-10">
				<Avatar name="Nischal" src={people[4].image} status={"online"} size="20" className="h-20 w-20" />
				<Avatar size={"80"} name="Binaya Thapa" />
				<Avatar size={"80"} name="Binaya Thapa" src={people[2].image} />
				<Avatar size={"80"} name="Binaya Thapa" src={people[2].image} status="online" />
				<Avatar radius="square" size={"80"} />
				<Avatar radius="square" size={"80"} name="Binaya Thapa" />
				<Avatar radius="square" size={"80"} name="Binaya Thapa" src={people[2].image} />
				<Avatar radius="square" size={"80"} name="Binaya Thapa" src={people[2].image} status="online" />
			</div>
			<div className="flex flex-wrap items-center gap-10">
				<Avatar size={"16"} status="plus" name="John Prasad Rai" />
				<Avatar size={"20"} status="plus" name="Nischal Kharel" />
				<Avatar size={"24"} status="plus" name="Yuvraj" />
				<Avatar size={"32"} status="plus" name="Ashmit Bastola" />
				<Avatar size={"40"} status="plus" name="Binaya Bahadur Thapa" />
				<Avatar size={"48"} status="plus" />
				<Avatar size={"64"} status="plus" />
				<Avatar size={"80"} status="plus" />
			</div>
			<div className="flex flex-wrap items-center gap-10">
				<Avatar size={"16"} status="verified" src={people[1].image} />
				<Avatar size={"20"} status="verified" src={people[1].image} />
				<Avatar size={"24"} status="verified" src={people[1].image} />
				<Avatar size={"32"} status="verified" src={people[1].image} />
				<Avatar size={"40"} status="verified" src={people[1].image} />
				<Avatar size={"48"} status="verified" src={people[1].image} />
				<Avatar size={"64"} status="verified" src={people[1].image} />
				<Avatar size={"80"} status="verified" radius="square" src={people[1].image} />
			</div>
			<div className="flex flex-wrap items-center gap-10">
				<Avatar size={"16"} status="offline" />
				<Avatar size={"20"} status="offline" />
				<Avatar size={"24"} status="offline" />
				<Avatar size={"32"} status="offline" />
				<Avatar size={"40"} status="offline" />
				<Avatar size={"48"} status="offline" />
				<Avatar size={"64"} status="offline" />
				<Avatar size={"80"} status="offline" />
			</div>
			<div className="flex flex-wrap items-center gap-10">
				<Avatar size={"16"} status="online" name="Binaya Thapa" />
				<Avatar size={"20"} status="online" name="Binaya Thapa" />
				<Avatar size={"24"} status="online" name="Binaya Thapa" />
				<Avatar size={"32"} status="online" name="Binaya Thapa" />
				<Avatar size={"40"} status="online" name="Binaya Thapa" />
				<Avatar size={"48"} status="online" name="Binaya Thapa" />
				<Avatar size={"64"} status="online" name="Binaya Thapa" />
				<Avatar size={"80"} status="online" name="Binaya Thapa" />
			</div>
			{/* <div className="flex flex-wrap items-center gap-5">
				<Avatars src={people[0].image} name={people[0].name} size={20} />
				<Avatars src={people[1].image} name={people[1].name} size={24} />
				<Avatars src={people[2].image} name={people[2].name} size={32} />
				<Avatars src={people[3].image} name={people[3].name} size={36} />
				<Avatars src={people[4].image} name={people[4].name} size={40} />
				<Avatars src={people[5].image} name={people[5].name} size={48} />
				<Avatars src={people[6].image} name={people[6].name} size={64} />
				<Avatars src={people[7].image} name={people[7].name} size={80} />
				<Avatars src={people[8].image} name={people[8].name} size={120} onlineStatus={false} />
			</div>
			<div className="flex flex-wrap items-center gap-5">
				<Avatars src={people[0].image} name={people[0].name} size={20} variant={"square"} onlineStatus={true} />
				<Avatars src={people[1].image} name={people[1].name} size={24} variant={"square"} onlineStatus={false} />
				<Avatars src={people[2].image} name={people[2].name} size={32} variant={"square"} onlineStatus={false} />
				<Avatars src={people[3].image} name={people[3].name} size={36} variant={"square"} onlineStatus={false} />
				<Avatars src={people[4].image} name={people[4].name} size={40} variant={"square"} onlineStatus={true} />
				<Avatars src={people[5].image} name={people[5].name} size={48} variant={"square"} onlineStatus={false} />
				<Avatars src={people[6].image} name={people[6].name} size={64} variant={"square"} onlineStatus={false} />
				<Avatars src={people[7].image} name={people[7].name} size={80} variant={"square"} onlineStatus={false} />
				<Avatars src={people[8].image} name={people[8].name} size={120} variant={"square"} onlineStatus={false} />
			</div>
			<div className="flex flex-wrap items-center gap-5">
				<Avatars src={people[0].image} name={people[0].name} size={20} variant={"square"} />
				<Avatars src={people[1].image} name={people[1].name} size={24} variant={"square"} />
				<Avatars src={people[2].image} name={people[2].name} size={32} variant={"square"} />
				<Avatars src={people[3].image} name={people[3].name} size={36} variant={"square"} />
				<Avatars src={people[4].image} name={people[4].name} size={40} variant={"square"} />
				<Avatars src={people[5].image} name={people[5].name} size={48} variant={"square"} />
				<Avatars src={people[6].image} name={people[6].name} size={64} variant={"square"} />
				<Avatars src={people[7].image} name={people[7].name} size={80} variant={"square"} />
				<Avatars src={people[8].image} name={people[8].name} size={120} variant={"square"} />
			</div> */}
		</div>
	)
}

export default AvatarExample
