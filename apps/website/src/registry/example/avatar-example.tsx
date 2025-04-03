import { Avatar } from "../ui/avatar";
import { people } from "./avatar-group-example";

const AvatarExample = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-5">
        <Avatar variant="square" size={"40"} onlineStatus={false} name="" />
        <Avatar
          src={people[0].image}
          name={people[0].name}
          onlineStatus={false}
        />
        <Avatar
          src={people[1].image}
          name={people[1].name}
          size={"24"}
          onlineStatus={true}
        />
        <Avatar
          src={people[2].image}
          name={people[2].name}
          size={"32"}
          onlineStatus={true}
        />
        <Avatar
          src={people[3].image}
          name={people[3].name}
          size={"36"}
          onlineStatus={true}
        />
        <Avatar
          src={people[4].image}
          name={people[4].name}
          size={"40"}
          onlineStatus={true}
        />
        <Avatar
          src={people[5].image}
          name={people[5].name}
          size={"48"}
          onlineStatus={true}
        />
        <Avatar
          src={people[6].image}
          name={people[6].name}
          size={"64"}
          onlineStatus={false}
        />
        <Avatar
          src={people[7].image}
          name={people[7].name}
          size={"80"}
          onlineStatus={true}
        />
        <Avatar
          src={people[8].image}
          name={people[8].name}
          size={"120"}
          onlineStatus={false}
        />
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
  );
};

export default AvatarExample;
