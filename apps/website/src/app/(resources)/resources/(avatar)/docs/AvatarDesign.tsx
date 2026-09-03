import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FigmaIcon } from "@/components/custom/icon"

const avatarParts = [
	{
		title: "Image",
		description: "A profile photo, portrait, or illustration.",
	},
	{
		title: "Initials",
		description:
			"A useful fallback when there’s no profile image. One or two letters are usually enough.",
	},
	{
		title: "Icon",
		description:
			"A simple user icon works well when there isn’t a specific person to show.",
	},
	{
		title: "Character or illustration",
		description:
			"A good fit for games, communities, or products with a more playful visual style.",
	},
]

const RadianLogo = () => {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M23.4667 0H8.53333C3.8205 0 0 3.8205 0 8.53333V23.4667C0 28.1795 3.8205 32 8.53333 32H23.4667C28.1795 32 32 28.1795 32 23.4667V8.53333C32 3.8205 28.1795 0 23.4667 0Z"
				fill="url(#paint0_linear_1339_35700)"
			/>
			<path
				d="M23.0815 17.2704C23.3749 17.8827 23.1167 18.6454 22.9269 19.264C22.5663 20.3008 21.9487 21.2128 21.1391 21.9467C20.7381 22.3254 20.3093 22.6571 19.8175 22.9195C17.8111 24.0395 15.1413 24.0118 13.1615 22.8491C12.3445 22.3638 11.2341 21.6566 11.8645 20.5718C12.0991 20.2219 12.4362 19.8262 12.8607 19.8774C13.1562 19.9179 13.4079 20.2294 13.6447 20.4246C14.2581 20.9515 14.945 21.264 15.7951 21.424C17.0783 21.6523 18.4533 21.2726 19.4506 20.4427C20.2378 19.7792 20.7669 18.88 20.945 17.8528C21.009 17.4998 21.0474 16.9984 21.345 16.8032C21.8367 16.495 22.7989 16.7414 23.0773 17.2619L23.0805 17.2683L23.0815 17.2704Z"
				fill="white"
			/>
			<path
				d="M27.6778 11.294C27.8687 11.3367 27.8197 11.7697 27.7162 11.9351C27.5349 12.222 26.9184 12.6273 25.6031 13.2855C19.8517 15.9553 14.593 17.8049 7.36208 19.7356C6.42768 19.9852 5.73328 20.0481 5.21595 20.0481C4.69862 20.0481 3.79088 19.8721 4.46075 19.422C5.13062 18.9719 5.43355 18.7948 5.64688 18.67C8.24422 17.2247 8.12048 16.1889 9.01968 13.5404C10.3263 9.2396 15.4528 7.2588 19.4581 9.11053C20.913 9.76013 21.8335 10.9111 23.3962 11.3025C24.2783 11.5255 25.5434 11.5063 26.4693 11.4092C26.8373 11.4135 27.312 11.2119 27.6768 11.294H27.6778ZM13.5818 15.7953C15.1818 15.2225 17.0687 14.59 18.4053 14.0759C18.8181 13.9159 19.2031 13.7964 19.6298 13.5959C19.8175 13.5063 19.9946 13.3697 20.1866 13.1756C20.784 12.5335 19.1136 11.598 18.6336 11.3409C15.4016 9.64707 11.5872 11.7921 11.1413 15.3559C11.0623 16.1068 11.3472 16.4215 12.0853 16.2572C12.5973 16.1473 13.1221 15.9543 13.5722 15.7975L13.5808 15.7943L13.5818 15.7953Z"
				fill="white"
			/>
			<path
				d="M8.55991 26.1239C8.55991 26.1655 8.54711 26.206 8.52258 26.2401C8.49804 26.2743 8.46284 26.2999 8.42338 26.3137L8.07031 26.43C7.95938 26.4673 7.85911 26.5292 7.77591 26.6124C7.69378 26.6956 7.63084 26.7959 7.59458 26.9068L7.47191 27.2577C7.45804 27.2972 7.43244 27.3313 7.39831 27.3548C7.37271 27.3729 7.34284 27.3857 7.31191 27.39C7.28098 27.3943 7.24898 27.3921 7.21911 27.3825C7.18924 27.3729 7.16258 27.3559 7.14018 27.3335C7.11778 27.3111 7.10178 27.2833 7.09218 27.2535L6.97378 26.9004C6.93538 26.7895 6.87138 26.6892 6.78604 26.6081C6.70391 26.5239 6.60258 26.4588 6.49058 26.4204L6.13751 26.302C6.09804 26.2892 6.06284 26.2647 6.03831 26.2305C6.01378 26.1964 6.00098 26.1548 6.00098 26.1132C6.00098 26.0716 6.01378 26.03 6.03831 25.9959C6.06284 25.9607 6.09911 25.9351 6.13964 25.9223L6.49058 25.8039C6.60364 25.7655 6.70604 25.7015 6.78924 25.6161C6.87351 25.5329 6.93858 25.4316 6.97698 25.3196L7.09324 24.9719C7.10391 24.9324 7.12844 24.8972 7.16044 24.8727C7.19351 24.846 7.23404 24.8321 7.27671 24.8311C7.31831 24.8311 7.35991 24.8417 7.39511 24.8652C7.43031 24.8876 7.45804 24.9217 7.47191 24.9612L7.59031 25.3196C7.62871 25.4316 7.69378 25.5329 7.77804 25.6161C7.86124 25.7015 7.96258 25.7655 8.07458 25.8039L8.42551 25.9276C8.46498 25.9404 8.49911 25.9649 8.52364 25.9991C8.54818 26.0353 8.55991 26.0791 8.55778 26.1228L8.55991 26.1239Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M11.7279 28.3285C11.7279 28.3584 11.7183 28.3883 11.7002 28.4128C11.682 28.4373 11.6565 28.4565 11.6277 28.4661L11.3716 28.5504C11.2916 28.5771 11.218 28.6229 11.1583 28.6827C11.0986 28.7424 11.0538 28.816 11.0271 28.896L10.9386 29.1509C10.9279 29.1797 10.9098 29.2043 10.8852 29.2213C10.8671 29.2341 10.8447 29.2437 10.8223 29.2469C10.7999 29.2501 10.7764 29.248 10.7551 29.2416C10.7338 29.2341 10.7135 29.2224 10.6975 29.2064C10.6815 29.1904 10.6698 29.1701 10.6623 29.1488L10.577 28.8928C10.5493 28.8117 10.5023 28.7392 10.4404 28.6805C10.3807 28.6187 10.3071 28.5728 10.226 28.544L9.97005 28.4587C9.94125 28.4501 9.91565 28.4309 9.89752 28.4075C9.87938 28.3829 9.87085 28.3531 9.87085 28.3221C9.87085 28.2912 9.88045 28.2624 9.89752 28.2368C9.91565 28.2112 9.94125 28.1931 9.97112 28.1835L10.226 28.0981C10.3082 28.0704 10.3818 28.0245 10.4426 27.9616C10.5044 27.9019 10.5503 27.8283 10.5791 27.7472L10.6634 27.4955C10.6708 27.4667 10.689 27.4411 10.7124 27.4229C10.737 27.4037 10.7658 27.3931 10.7967 27.3931C10.8276 27.3931 10.8575 27.4005 10.8831 27.4176C10.9087 27.4336 10.929 27.4581 10.9386 27.4869L11.025 27.7472C11.0527 27.8283 11.0996 27.9019 11.1615 27.9616C11.2212 28.0235 11.2948 28.0704 11.377 28.0981L11.6319 28.1877C11.6607 28.1963 11.6852 28.2144 11.7023 28.2389C11.7204 28.2656 11.729 28.2965 11.7268 28.3285H11.7279Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M25.5841 3.75231C25.5841 3.78431 25.5734 3.81631 25.5553 3.84297C25.5361 3.86964 25.5094 3.88884 25.4785 3.89951L25.2044 3.99017C25.118 4.01897 25.0401 4.06697 24.9761 4.13097C24.9121 4.19497 24.8641 4.27284 24.8353 4.35924L24.7404 4.63124C24.7297 4.66111 24.7094 4.68777 24.6838 4.70697C24.6636 4.72084 24.6412 4.73044 24.6166 4.73471C24.5921 4.73791 24.5676 4.73684 24.5452 4.72831C24.5217 4.72084 24.5014 4.70804 24.4833 4.68991C24.4662 4.67284 24.4534 4.65151 24.446 4.62804L24.3542 4.35497C24.3244 4.26857 24.2742 4.19071 24.2081 4.12777C24.1441 4.06271 24.0662 4.01257 23.9798 3.98271L23.7057 3.89097C23.6748 3.88137 23.6481 3.86217 23.6289 3.83551C23.6097 3.80884 23.6001 3.77684 23.6001 3.74484C23.6001 3.71284 23.6108 3.68084 23.6289 3.65417C23.6481 3.62751 23.6758 3.60724 23.7078 3.59764L23.9798 3.50591C24.0673 3.47604 24.1473 3.42697 24.2113 3.36084C24.2764 3.29684 24.3265 3.21791 24.3564 3.13151L24.447 2.86271C24.4556 2.83177 24.4737 2.80511 24.4993 2.78591C24.5249 2.76564 24.5569 2.75391 24.59 2.75391C24.623 2.75391 24.655 2.76244 24.6817 2.78057C24.7094 2.79764 24.7308 2.82431 24.7414 2.85524L24.8332 3.13257C24.863 3.21897 24.9132 3.29791 24.9793 3.36191C25.0433 3.42804 25.1222 3.47817 25.2097 3.50697L25.4817 3.60297C25.5126 3.61257 25.5393 3.63177 25.5574 3.65844C25.5766 3.68724 25.5852 3.72031 25.5841 3.75444V3.75231Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M27.5606 26.8107C27.5552 26.831 27.5435 26.8491 27.5275 26.8619C27.5115 26.8747 27.4912 26.8833 27.4699 26.8843L27.2843 26.895C27.2256 26.8982 27.1691 26.9153 27.119 26.9451C27.0688 26.9739 27.0251 27.0145 26.9931 27.0635L26.8886 27.2171C26.8768 27.2342 26.8598 27.247 26.8406 27.2545C26.8256 27.2598 26.8096 27.2619 26.7947 27.2598C26.7787 27.2577 26.7638 27.2523 26.751 27.2438C26.7382 27.2353 26.7264 27.2235 26.719 27.2097C26.7115 27.1958 26.7072 27.1809 26.7062 27.1649L26.6944 26.9793C26.6902 26.9206 26.672 26.8641 26.6411 26.8139C26.6123 26.7627 26.5718 26.719 26.5227 26.6849L26.367 26.5825C26.3499 26.5707 26.336 26.5547 26.3286 26.5355C26.3211 26.5163 26.32 26.4939 26.3254 26.4737C26.3307 26.4534 26.3424 26.4353 26.3584 26.4214C26.3755 26.4075 26.3958 26.4001 26.4171 26.399L26.6016 26.3873C26.6614 26.3841 26.719 26.3659 26.7702 26.335C26.8214 26.3062 26.8662 26.2657 26.8992 26.2166L27.0006 26.0641C27.0112 26.0459 27.0272 26.0321 27.0464 26.0246C27.0656 26.0161 27.088 26.0139 27.1083 26.0203C27.1286 26.0257 27.1467 26.0363 27.1606 26.0523C27.1744 26.0683 27.184 26.0875 27.1851 26.1089L27.1958 26.2977C27.2 26.3563 27.2182 26.4139 27.248 26.4651C27.2768 26.5174 27.3174 26.5611 27.3675 26.5942L27.5211 26.6998C27.5382 26.7105 27.552 26.7275 27.5595 26.7467C27.567 26.767 27.567 26.7905 27.5595 26.8107H27.5606Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M5.7035 4.14289C5.71417 4.16102 5.71844 4.18236 5.7163 4.20262C5.71417 4.22396 5.70564 4.24316 5.69177 4.25916L5.56804 4.39782C5.52964 4.44156 5.50084 4.49382 5.4859 4.55036C5.47097 4.60689 5.46884 4.66556 5.48057 4.72316L5.51577 4.90556C5.52004 4.92582 5.51684 4.94716 5.5083 4.96636C5.5019 4.98022 5.4923 4.99302 5.4795 5.00262C5.4667 5.01222 5.45284 5.01969 5.43684 5.02289C5.4219 5.02609 5.4059 5.02609 5.3899 5.02182C5.37497 5.01756 5.3611 5.01009 5.34937 4.99942L5.20964 4.87676C5.16484 4.83836 5.11257 4.81062 5.05497 4.79676C4.99844 4.78076 4.9387 4.77862 4.88004 4.78929L4.69764 4.82662C4.67737 4.83089 4.65604 4.82876 4.63684 4.82022C4.61764 4.81169 4.60164 4.79676 4.59097 4.77862C4.5803 4.76049 4.57604 4.73916 4.57817 4.71889C4.5803 4.69756 4.58884 4.67729 4.60377 4.66236L4.72644 4.52369C4.7659 4.47889 4.79364 4.42556 4.80857 4.36796C4.82457 4.31036 4.8267 4.25062 4.81604 4.19302L4.77977 4.01382C4.77444 3.99356 4.77657 3.97329 4.78404 3.95409C4.7915 3.93489 4.80537 3.91782 4.82457 3.90716C4.8427 3.89649 4.86297 3.89116 4.8843 3.89222C4.90564 3.89222 4.9259 3.90076 4.9419 3.91462L5.0827 4.04049C5.1275 4.07889 5.18084 4.10662 5.23844 4.12156C5.29604 4.13756 5.35577 4.13969 5.41337 4.12902L5.59684 4.09489C5.6171 4.09062 5.63844 4.09276 5.65657 4.10129C5.67684 4.11089 5.69284 4.12689 5.70244 4.14609L5.7035 4.14289Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_1339_35700"
					x1="16"
					y1="0"
					x2="16"
					y2="32"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="#623DF5" />
					<stop offset="1" stopColor="#9981F8" />
				</linearGradient>
			</defs>
		</svg>
	)
}

const AvatarDesign = () => {
	return (
		<section
			aria-labelledby="avatar-design-heading"
			className="mx-auto flex w-full flex-col gap-6 lg:w-200">
			<div className="flex flex-col gap-4">
				<p className="text-primary-text text-sm font-medium">
					Designing Avatars
				</p>
				<h2 id="avatar-design-heading" className="heading-4">
					<a href="#avatar-design-heading">Avatars in UI Design</a>
				</h2>
				<div className="flex flex-col gap-8">
					<p>
						Avatars can take on different forms depending on what the interface
						needs to show. A simple avatar might only contain an image, while a
						more complete pattern can include a name, status, badge, or multiple
						users. Understanding these patterns helps you decide what your
						avatar component needs to support. Before we understand where to use
						avatars, let&apos;s deep dive into what goes into making a good
						avatar.
					</p>
				</div>
				<div className="mt-16 flex flex-col gap-6">
					<h5 id="anatomy-of-a-avatar" className="heading-5">
						<a href="#anatomy-of-a-avatar">Anatomy of a Avatar</a>
					</h5>
					<p>
						An avatar might look like a pretty simple component, but there can
						be a few different pieces around it depending on where you use it.
						Sometimes it’s just a photo. Other times, you might have initials, a
						name, or another small element alongside it. The trick is not to
						treat all of these as mandatory. What you include should depend on
						what the avatar needs to do in that particular part of the UI.
					</p>
					<div className="flex flex-col gap-3">
						<Image
							src="/avatar/avatar-anatomy.png"
							alt="Anatomy of avatar"
							width={560}
							height={420}
							className="bg-fill1 border-soft h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:invisible dark:absolute dark:inset-0"
							unoptimized
						/>
						<Image
							src="/avatar/avatar-anatomy-dark.png"
							alt="Anatomy of avatar"
							width={560}
							height={420}
							className="bg-fill1 border-soft invisible absolute inset-0 h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:visible dark:static"
							unoptimized
						/>
						<p className="text-fg-tertiary text-center text-[13px] font-normal">
							Anatomy of an avatar in UI Design
						</p>
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-6">
					<h5 id="avatar-representation" className="heading-5">
						<a href="#avatar-representation">Avatar Representation</a>
					</h5>
					<p>
						This is the part that actually represents the person. Most of the
						time, its a photo or illustration, but there are a few other options
						too.
					</p>
					<ul className="flex list-disc flex-col gap-2 pl-5">
						{avatarParts.map((part) => (
							<li key={part.title}>
								<span className="font-semibold">{part.title}</span>:{" "}
								{part.description}
							</li>
						))}
					</ul>
					<p>
						How much you show really depends on the space. A chat might only
						need an avatar and a small status dot. A team page might show the
						avatar with a name and role. You don&apos;t need to squeeze every
						possible detail into the component just because you can. A good
						avatar setup should allow you enough flexibility to use it in both
						simple and information-heavy parts of the product.
					</p>
					<div className="flex flex-col gap-3">
						<Image
							src="/avatar/avatar-representation.png"
							alt="Avatar representation"
							width={560}
							height={420}
							className="bg-fill1 border-soft h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:invisible dark:absolute dark:inset-0"
							unoptimized
						/>
						<Image
							src="/avatar/avatar-representation-dark.png"
							alt="Avatar representation"
							width={560}
							height={420}
							className="bg-fill1 border-soft invisible absolute inset-0 h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:visible dark:static"
							unoptimized
						/>
						<p className="text-fg-tertiary text-center text-[13px] font-normal">
							Avatars in various states such as empty and uploaded with
							different types of image
						</p>
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-6">
					<h5 id="avatar-dimension" className="heading-5">
						<a href="#avatar-dimension">Avatar Dimension</a>
					</h5>
					<p>
						Avatar size usually comes down to the nature of information the user
						is looking for. If the user is viewing comments on social media, the
						comment becomes the primary focus, and the avatar is a secondary
						contributing factor to it. Thus, the avatar size is smaller to match
						the comment&apos;s viewing experience. Other such examples for small
						avatars include tables, dropdowns, avatar groups notifications and
						more.
						<br />
						<br />
						On the other end, when visiting a person&apos;s profile, the primary
						objective of the user is to view more about the person. Here the
						person&apos;s avatar becomes one of the key pieces of information;
						thus, avatars are shown in a large size. Once the avatar becomes
						part of the profile itself, something like 80 px makes more sense.
					</p>
					<div className="flex flex-col gap-3">
						<Image
							src="/avatar/avatar-dimension.png"
							alt="Avatar dimension"
							width={560}
							height={420}
							className="bg-fill1 border-soft h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:invisible dark:absolute dark:inset-0"
							unoptimized
						/>
						<Image
							src="/avatar/avatar-dimension-dark.png"
							alt="Avatar dimension dark"
							width={560}
							height={420}
							className="bg-fill1 border-soft invisible absolute inset-0 h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:visible dark:static"
							unoptimized
						/>
						<p className="text-fg-tertiary text-center text-[13px] font-normal">
							Examples showcasing different avatar sizes
						</p>
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-6">
					<h5 id="avatar-shape" className="heading-5">
						<a href="#avatar-shape">Avatar Shape</a>
					</h5>
					<p>
						The shape of an avatar can change how it fits into the interface,
						but there’s no need to overthink it. Start with what the avatar
						represents and look at the shapes already being used throughout the
						product. A general rule of thumb is to go with the circle shape, as
						you cannot go wrong with it. It is the most commonly used shape with
						avatars and draws a sense of familiarity among the users. Few other
						common shapes include having avatars in square and a rounded square.
					</p>
					<div className="flex flex-col gap-3">
						<Image
							src="/avatar/avatar-shape.png"
							alt="Avatar representation"
							width={560}
							height={420}
							className="bg-fill1 border-soft h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:invisible dark:absolute dark:inset-0"
							unoptimized
						/>
						<Image
							src="/avatar/avatar-shape-dark.png"
							alt="Avatar representation"
							width={560}
							height={420}
							className="bg-fill1 border-soft invisible absolute inset-0 h-auto w-full rounded-[10px] border sm:rounded-xl md:rounded-[20px] dark:visible dark:static"
							unoptimized
						/>
						<p className="text-fg-tertiary text-center text-[13px] font-normal">
							Examples of various avatar shapes
						</p>
					</div>
				</div>
				<p className="mt-10">
					These are some of the basic information about avatars you should know
					before designing avatars for your UI design. To get a full experience
					of the avatar component use the following reference for your next UI
					Design project
				</p>

				<div className="mt-8 flex flex-col gap-4">
					<p className="text-fg-tertiary text-sm font-medium">
						Learn more about avatars
					</p>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Link
							target="_blank"
							href="/docs/components/avatar"
							className="bg-primary-accent border-primary-focus hover:border-primary-hover/50 flex gap-3 rounded-xl border p-4">
							<RadianLogo />
							<div className="flex flex-col gap-1.5">
								<h6
									id="avatar-react-component"
									className="text-fg text-base font-semibold">
									Avatar React Component
								</h6>
								<p className="text-fg-secondary text-sm font-normal">
									Add accessible, customizable avatars to your React project.
								</p>
							</div>
						</Link>

						<Link
							href="https://www.figma.com/design/ZB8gTZwafZOYY7rdJjSRz6/%E2%9D%96-Preview-%E2%9D%96-Radian-Design-System-%E2%9D%96-Version-0.3?node-id=38-5"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-primary-accent border-primary-focus hover:border-primary-hover/50 flex gap-3 rounded-xl border p-4">
							<FigmaIcon className="size-8" />
							<div className="flex flex-col gap-1.5">
								<h6
									id="avatar-figma-component"
									className="text-fg text-base font-semibold">
									Avatar Figma Component
								</h6>
								<p className="text-fg-secondary text-sm font-normal">
									Use ready-made avatar components and variants in Figma.
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AvatarDesign
