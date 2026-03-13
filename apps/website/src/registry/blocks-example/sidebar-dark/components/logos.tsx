import React from "react"

export function DiscordLogo() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M16.5732 6.11247C16.0542 5.15933 15.1925 4.43901 14.1624 4.09734C13.5512 3.87596 12.9142 3.73372 12.2669 3.67407C12.1092 3.95399 11.9679 4.24278 11.8436 4.53901C10.5842 4.34584 9.30274 4.34584 8.04339 4.53901C7.91404 4.24353 7.7697 3.95484 7.61092 3.67407C6.98394 3.74288 6.36665 3.88177 5.77062 4.08814C4.7335 4.43141 3.86742 5.15918 3.35063 6.12167C1.98658 8.58803 1.42986 11.4199 1.75878 14.2189C3.01282 15.1512 4.41606 15.8637 5.90865 16.3261C6.33164 15.9148 6.64754 15.4062 6.8288 14.8447C6.37947 14.6767 5.9454 14.4704 5.53139 14.2282C5.45778 14.1269 5.74303 13.9614 5.83504 13.9337C7.14389 14.5471 8.57165 14.8651 10.0172 14.8651C11.4626 14.8651 12.8903 14.5471 14.1992 13.9337C14.282 13.9337 14.5765 14.1269 14.5028 14.2282C14.1347 14.5134 13.3158 14.7159 13.1778 14.9183C13.4188 15.4274 13.7284 15.9011 14.098 16.3261C15.5934 15.8637 16.9997 15.1512 18.2571 14.2189C18.5569 11.4072 17.968 8.5722 16.5732 6.11247ZM7.22446 12.2499C6.79655 12.245 6.38796 12.0709 6.08796 11.7658C5.78796 11.4606 5.62094 11.0491 5.62339 10.6212C5.63055 10.1996 5.80182 9.79753 6.10079 9.50028C6.39977 9.20303 6.80289 9.03403 7.22446 9.02936C7.43791 9.03053 7.64902 9.07395 7.84564 9.15703C8.04227 9.24003 8.22053 9.3612 8.37015 9.51345C8.51982 9.66561 8.6379 9.84595 8.71765 10.0439C8.79732 10.2419 8.83715 10.4538 8.83474 10.6672C8.82515 11.0887 8.65157 11.4899 8.35082 11.7854C8.05016 12.0809 7.64607 12.2475 7.22446 12.2499ZM12.7453 12.2499C12.3174 12.2474 11.9079 12.0757 11.6062 11.7723C11.3044 11.4689 11.1351 11.0583 11.1351 10.6304C11.1375 10.2049 11.3082 9.7977 11.61 9.4977C11.9117 9.1977 12.3199 9.02936 12.7453 9.02936C12.9584 9.02936 13.1692 9.07161 13.3658 9.15361C13.5624 9.2357 13.7407 9.35595 13.8906 9.50745C14.0403 9.65895 14.1585 9.83861 14.2383 10.0361C14.3182 10.2336 14.3581 10.445 14.3556 10.658C14.3484 11.0803 14.1755 11.4828 13.8743 11.7788C13.5732 12.0749 13.1677 12.2407 12.7453 12.2406V12.2499Z"
				fill="#5C6AF2"
			/>
		</svg>
	)
}

export function CircleLogo() {
	const id = React.useId()
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g clipPath={`url(#clip-${id})`}>
				<path
					d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
					fill={`url(#paint-${id})`}
				/>
				<path
					d="M12 18.6666C15.6819 18.6666 18.6667 15.6819 18.6667 12C18.6667 8.31808 15.6819 5.33331 12 5.33331C8.3181 5.33331 5.33333 8.31808 5.33333 12C5.33333 15.6819 8.3181 18.6666 12 18.6666Z"
					fill="var(--color-elevation-level2)"
				/>
			</g>
			<defs>
				<linearGradient
					id={`paint-${id}`}
					x1="3.51533"
					y1="20.4853"
					x2="20.4853"
					y2="3.51467"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="#FDDFD5" />
					<stop offset="0.25" stopColor="#FC7284" />
					<stop offset="0.5" stopColor="#E401A1" />
					<stop offset="0.75" stopColor="#C639E0" />
					<stop offset="1" stopColor="#ABD5EE" />
				</linearGradient>
				<clipPath id={`clip-${id}`}>
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}

export function DriveLogo() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M2.92666 15.3169L3.66168 16.5864C3.81441 16.8537 4.03396 17.0637 4.29169 17.2165L6.91674 12.6727H1.66664C1.66664 12.9687 1.74301 13.2646 1.89574 13.5318L2.92666 15.3169Z"
				fill="#0066DA"
			/>
			<path
				d="M9.99997 7.3272L7.37493 2.78348C7.11719 2.93621 6.89765 3.14622 6.74491 3.41349L1.89574 11.8136C1.74582 12.0752 1.66684 12.3713 1.66664 12.6727H6.91674L9.99997 7.3272Z"
				fill="#00AC47"
			/>
			<path
				d="M15.7083 17.2165C15.966 17.0637 16.1855 16.8537 16.3383 16.5864L16.6437 16.0614L18.1042 13.5318C18.2569 13.2646 18.3333 12.9687 18.3333 12.6727H13.0828L14.2001 14.8682L15.7083 17.2165Z"
				fill="#EA4335"
			/>
			<path
				d="M9.99997 7.3272L12.625 2.78354C12.3672 2.63081 12.0713 2.55444 11.7659 2.55444H8.23399C7.92853 2.55444 7.63266 2.6403 7.37493 2.78348L9.99997 7.3272Z"
				fill="#00832D"
			/>
			<path
				d="M13.0828 12.6727H6.91674L4.29169 17.2165C4.54942 17.3692 4.84538 17.4456 5.15084 17.4456H14.8492C15.1547 17.4456 15.4505 17.3596 15.7083 17.2165L13.0828 12.6727Z"
				fill="#2684FC"
			/>
			<path
				d="M15.6796 7.61357L13.255 3.41349C13.1023 3.14622 12.8827 2.93627 12.625 2.78354L9.99997 7.3272L13.0828 12.6727L18.3238 12.6728C18.3238 12.3768 18.2474 12.0809 18.0947 11.8136L15.6796 7.61357Z"
				fill="#FFBA00"
			/>
		</svg>
	)
}

export function NotionLogo() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.77344 2.2075C5.2294 2.40414 3.06635 2.5762 2.96803 2.58849C2.68536 2.64994 2.42727 2.83429 2.30437 3.09238L2.19376 3.3136L2.20605 8.64749L2.21834 13.9814L2.37811 14.3132C2.47643 14.4976 3.09093 15.3579 3.76689 16.2304C5.1065 17.9756 5.20482 18.0617 5.70872 18.1231C5.8562 18.1354 6.97459 18.0862 8.16673 18.0125C9.37115 17.9388 11.313 17.8159 12.4682 17.7544C17.4211 17.4472 17.163 17.4717 17.458 17.2259C17.8144 16.931 17.7775 17.4226 17.8021 10.9334C17.8144 5.43978 17.8021 5.07108 17.7161 4.91131C17.6301 4.71467 17.458 4.59177 15.1966 3.00635C13.685 1.93712 13.5743 1.88796 12.8984 1.87567C12.6157 1.86338 10.3052 2.02315 7.77344 2.2075Z"
				fill="white"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.77344 2.2075C5.2294 2.40414 3.06635 2.5762 2.96803 2.58849C2.68536 2.64994 2.42727 2.83429 2.30437 3.09238L2.19376 3.3136L2.20605 8.64749L2.21834 13.9814L2.37811 14.3132C2.47643 14.4976 3.09093 15.3579 3.76689 16.2304C5.1065 17.9756 5.20482 18.0617 5.70872 18.1231C5.8562 18.1354 6.97459 18.0862 8.16673 18.0125C9.37115 17.9388 11.313 17.8159 12.4682 17.7544C17.4211 17.4472 17.163 17.4717 17.458 17.2259C17.8144 16.931 17.7775 17.4226 17.8021 10.9334C17.8144 5.43978 17.8021 5.07108 17.7161 4.91131C17.6301 4.71467 17.458 4.59177 15.1966 3.00635C13.685 1.93712 13.5743 1.88796 12.8984 1.87567C12.6157 1.86338 10.3052 2.02315 7.77344 2.2075ZM13.4883 2.90803C13.7095 3.00635 15.2704 4.08788 15.4916 4.29681C15.553 4.35826 15.5776 4.41971 15.5408 4.44429C15.4793 4.50574 5.80704 5.08337 5.52436 5.03421C5.40146 5.02192 5.21711 4.94818 5.1065 4.87444C4.66406 4.56719 3.57025 3.67001 3.57025 3.60856C3.57025 3.4365 3.53338 3.4365 7.83489 3.11696C8.65833 3.0678 10.0225 2.96948 10.846 2.89574C12.628 2.76055 13.1565 2.76055 13.4883 2.90803ZM16.5608 5.68558C16.6346 5.75932 16.696 5.89451 16.7206 6.0297C16.7329 6.1526 16.7452 8.43855 16.7329 11.0932C16.7206 15.6405 16.7083 15.9355 16.6223 16.0584C16.5731 16.1444 16.4748 16.2304 16.3888 16.255C16.1798 16.3411 6.05284 16.9187 5.84391 16.8572C5.74559 16.8327 5.61039 16.7466 5.54894 16.6729L5.42604 16.55L5.41375 11.634C5.40146 8.18046 5.41375 6.6565 5.45062 6.52131C5.4752 6.42299 5.56123 6.30009 5.62268 6.25092C5.70872 6.18947 6.31093 6.14031 8.37566 6.01741C9.82588 5.94367 12.075 5.80848 13.3531 5.72245C16.4256 5.5381 16.4134 5.5381 16.5608 5.68558Z"
				fill="black"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.8445 7.36882C13.2915 7.40569 12.7999 7.45485 12.7507 7.49172C12.5787 7.57775 12.4804 7.72523 12.4558 7.885C12.4435 8.04477 12.4926 8.06935 13.0457 8.14309L13.2792 8.16767V10.343C13.2792 11.6335 13.2669 12.4815 13.23 12.4569C13.2055 12.4323 12.4926 11.3262 11.6323 10.0235C10.772 8.69614 10.0592 7.61462 10.0469 7.61462C10.0346 7.60233 9.48158 7.62691 8.80562 7.67607C7.98219 7.72523 7.52746 7.78668 7.44143 7.83584C7.29395 7.90958 7.12189 8.17996 7.12189 8.35202C7.12189 8.46263 7.31853 8.52408 7.7241 8.52408H7.94532V14.7674L7.58891 14.878C7.33082 14.9518 7.2325 15.0009 7.18334 15.1116C7.1096 15.2836 7.1096 15.4311 7.19563 15.4311C7.22021 15.4311 7.79784 15.4065 8.4615 15.3574C9.76425 15.2836 9.91173 15.2467 10.0469 14.9764C10.0961 14.9026 10.133 14.8166 10.133 14.7797C10.133 14.7674 9.9486 14.706 9.73967 14.6568C9.51845 14.6077 9.29723 14.5462 9.24807 14.5462C9.16204 14.5216 9.16204 14.3619 9.16204 12.1742V9.82683L10.7106 12.248C12.3329 14.792 12.5295 15.087 12.7876 15.2099C13.0949 15.3696 13.8814 15.259 14.2747 15.0009L14.3976 14.9272L14.4099 11.4614L14.4222 7.98332L14.6926 7.93416C15.0121 7.87271 15.1596 7.72523 15.1596 7.46714C15.1596 7.30737 15.1473 7.29508 14.9998 7.30737C14.9138 7.30737 14.3853 7.34424 13.8445 7.36882Z"
				fill="black"
			/>
		</svg>
	)
}

export function MageLogo() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_iii_1081_3475)">
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H14C17.3137 0 20 2.68629 20 6V14C20 17.3137 17.3137 20 14 20H6C2.68629 20 0 17.3137 0 14V6Z"
					fill="#623DF5"
				/>
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H14C17.3137 0 20 2.68629 20 6V14C20 17.3137 17.3137 20 14 20H6C2.68629 20 0 17.3137 0 14V6Z"
					fill="url(#paint0_linear_1081_3475)"
				/>
				<path
					d="M6 0.5H14C17.0376 0.5 19.5 2.96243 19.5 6V14C19.5 17.0376 17.0376 19.5 14 19.5H6C2.96243 19.5 0.5 17.0376 0.5 14V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
					stroke="url(#paint1_linear_1081_3475)"
				/>
				<g filter="url(#filter1_d_1081_3475)">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.375 8.4375V13.4375H5.9375C6.10165 13.4375 6.26419 13.4698 6.41586 13.5327C6.5675 13.5955 6.70532 13.6875 6.82137 13.8036C6.93745 13.9197 7.02953 14.0575 7.09236 14.2092C7.15515 14.3608 7.1875 14.5233 7.1875 14.6875V16.25H10.9375L15.625 11.5625V6.5625H14.0625C13.8983 6.5625 13.7358 6.53017 13.5841 6.46735C13.4325 6.40453 13.2947 6.31246 13.1786 6.19638C13.0626 6.08031 12.9705 5.94251 12.9076 5.79085C12.8448 5.6392 12.8125 5.47666 12.8125 5.3125V3.75H9.0625L4.375 8.4375ZM9.6875 13.125H7.5V9.6875L10.3125 6.875H12.5V10.3125L9.6875 13.125Z"
						fill="url(#paint2_linear_1081_3475)"
						shapeRendering="crispEdges"
					/>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_iii_1081_3475"
					x="0"
					y="-1"
					width="20"
					height="22"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.5"
						operator="erode"
						in="SourceAlpha"
						result="effect1_innerShadow_1081_3475"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_1081_3475"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_innerShadow_1081_3475"
						result="effect2_innerShadow_1081_3475"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect2_innerShadow_1081_3475"
						result="effect3_innerShadow_1081_3475"
					/>
				</filter>
				<filter
					id="filter1_d_1081_3475"
					x="3.41531"
					y="3.51008"
					width="13.1694"
					height="14.4194"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.479847"
						operator="erode"
						in="SourceAlpha"
						result="effect1_dropShadow_1081_3475"
					/>
					<feOffset dy="0.719771" />
					<feGaussianBlur stdDeviation="0.719771" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1081_3475"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1081_3475"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_1081_3475"
					x1="10"
					y1="2.48353e-07"
					x2="10.8333"
					y2="20"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.15" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_1081_3475"
					x1="10"
					y1="0"
					x2="10"
					y2="20"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0.2" />
					<stop offset="1" stopColor="white" stopOpacity="0" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_1081_3475"
					x1="10"
					y1="3.75"
					x2="10"
					y2="16.25"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="white" stopOpacity="0.5" />
				</linearGradient>
			</defs>
		</svg>
	)
}

export function AcmeLogo() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_iii_1046_255)">
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H14C17.3137 0 20 2.68629 20 6V14C20 17.3137 17.3137 20 14 20H6C2.68629 20 0 17.3137 0 14V6Z"
					fill="#F53D7A"
				/>
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H14C17.3137 0 20 2.68629 20 6V14C20 17.3137 17.3137 20 14 20H6C2.68629 20 0 17.3137 0 14V6Z"
					fill="url(#paint0_linear_1046_255)"
				/>
				<path
					d="M6 0.5H14C17.0376 0.5 19.5 2.96243 19.5 6V14C19.5 17.0376 17.0376 19.5 14 19.5H6C2.96243 19.5 0.5 17.0376 0.5 14V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
					stroke="url(#paint1_linear_1046_255)"
				/>
				<g filter="url(#filter1_d_1046_255)">
					<path
						d="M16.25 10C14.5924 10 13.0027 10.6585 11.8306 11.8306C10.6585 13.0027 10 14.5924 10 16.25C11.6576 16.25 13.2473 15.5915 14.4194 14.4194C15.5915 13.2473 16.25 11.6576 16.25 10ZM10 3.75C8.3424 3.75 6.75269 4.40848 5.58058 5.58058C4.40848 6.75269 3.75 8.3424 3.75 10C5.4076 10 6.99732 9.34152 8.16942 8.16942C9.34152 6.99732 10 5.4076 10 3.75ZM16.25 10C16.25 8.3424 15.5915 6.75269 14.4194 5.58058C13.2473 4.40848 11.6576 3.75 10 3.75C10 5.4076 10.6585 6.99732 11.8306 8.16942C13.0027 9.34152 14.5924 10 16.25 10ZM10 16.25C10 14.5924 9.34152 13.0027 8.16942 11.8306C6.99732 10.6585 5.4076 10 3.75 10C3.75 11.6576 4.40848 13.2473 5.58058 14.4194C6.75269 15.5915 8.3424 16.25 10 16.25Z"
						fill="url(#paint2_linear_1046_255)"
						shapeRendering="crispEdges"
					/>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_iii_1046_255"
					x="0"
					y="-1"
					width="20"
					height="22"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.5"
						operator="erode"
						in="SourceAlpha"
						result="effect1_innerShadow_1046_255"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_1046_255"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_innerShadow_1046_255"
						result="effect2_innerShadow_1046_255"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect2_innerShadow_1046_255"
						result="effect3_innerShadow_1046_255"
					/>
				</filter>
				<filter
					id="filter1_d_1046_255"
					x="2.79031"
					y="3.51008"
					width="14.4194"
					height="14.4194"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.479847"
						operator="erode"
						in="SourceAlpha"
						result="effect1_dropShadow_1046_255"
					/>
					<feOffset dy="0.719771" />
					<feGaussianBlur stdDeviation="0.719771" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1046_255"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1046_255"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_1046_255"
					x1="10"
					y1="2.48353e-07"
					x2="10.8333"
					y2="20"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.15" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_1046_255"
					x1="10"
					y1="0"
					x2="10"
					y2="20"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0.2" />
					<stop offset="1" stopColor="white" stopOpacity="0" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_1046_255"
					x1="10"
					y1="3.75"
					x2="10"
					y2="16.25"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="white" stopOpacity="0.5" />
				</linearGradient>
			</defs>
		</svg>
	)
}

export function RadianCoreLogo() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_iii_1046_210)">
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H14C17.3137 0 20 2.68629 20 6V14C20 17.3137 17.3137 20 14 20H6C2.68629 20 0 17.3137 0 14V6Z"
					fill="#3D99F5"
				/>
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H14C17.3137 0 20 2.68629 20 6V14C20 17.3137 17.3137 20 14 20H6C2.68629 20 0 17.3137 0 14V6Z"
					fill="url(#paint0_linear_1046_210)"
				/>
				<path
					d="M6 0.5H14C17.0376 0.5 19.5 2.96243 19.5 6V14C19.5 17.0376 17.0376 19.5 14 19.5H6C2.96243 19.5 0.5 17.0376 0.5 14V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
					stroke="url(#paint1_linear_1046_210)"
				/>
				<g filter="url(#filter1_d_1046_210)">
					<path
						d="M7.29174 10H7.3129L5.93758 8.60353L4.58341 7.29168V4.58334H7.29174L10.0001 7.29168V12.7083L8.64591 14.0202L7.27058 15.4167H4.58341V12.7083L7.29174 10ZM15.4167 7.29168V12.7083L14.0626 14.0202L12.6873 15.4167H10.0001V12.7083L12.7084 10H12.7296L11.3542 8.60353L10.0001 7.29168V4.58334H12.7084L15.4167 7.29168Z"
						fill="url(#paint2_linear_1046_210)"
						shapeRendering="crispEdges"
					/>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_iii_1046_210"
					x="0"
					y="-1"
					width="20"
					height="22"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.5"
						operator="erode"
						in="SourceAlpha"
						result="effect1_innerShadow_1046_210"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_1046_210"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_innerShadow_1046_210"
						result="effect2_innerShadow_1046_210"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect2_innerShadow_1046_210"
						result="effect3_innerShadow_1046_210"
					/>
				</filter>
				<filter
					id="filter1_d_1046_210"
					x="3.62372"
					y="4.34342"
					width="12.7527"
					height="12.7527"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.479847"
						operator="erode"
						in="SourceAlpha"
						result="effect1_dropShadow_1046_210"
					/>
					<feOffset dy="0.719771" />
					<feGaussianBlur stdDeviation="0.719771" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1046_210"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1046_210"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_1046_210"
					x1="10"
					y1="2.48353e-07"
					x2="10.8333"
					y2="20"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.15" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_1046_210"
					x1="10"
					y1="0"
					x2="10"
					y2="20"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0.2" />
					<stop offset="1" stopColor="white" stopOpacity="0" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_1046_210"
					x1="10.0001"
					y1="4.58334"
					x2="10.0001"
					y2="15.4167"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="white" stopOpacity="0.5" />
				</linearGradient>
			</defs>
		</svg>
	)
}

export function Logo() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_iii_1082_1465)">
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
					fill="#F36A25"
				/>
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
					fill="url(#paint0_linear_1082_1465)"
				/>
				<path
					d="M6 0.5H18C21.0376 0.5 23.5 2.96243 23.5 6V18C23.5 21.0376 21.0376 23.5 18 23.5H6C2.96243 23.5 0.5 21.0376 0.5 18V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
					stroke="url(#paint1_linear_1082_1465)"
				/>
				<g filter="url(#filter1_d_1082_1465)">
					<path
						d="M12 5.5V12H18.5C18.5 10.2761 17.8152 8.62279 16.5962 7.40381C15.3772 6.18482 13.7239 5.5 12 5.5ZM12 18.5H18.5V12C16.7761 12 15.1228 12.6848 13.9038 13.9038C12.6848 15.1228 12 16.7761 12 18.5ZM5.5 12C5.5 13.7239 6.18482 15.3772 7.40381 16.5962C8.62279 17.8152 10.2761 18.5 12 18.5V12H5.5ZM5.5 12V5.5H12C12 7.22391 11.3152 8.87721 10.0962 10.0962C8.87721 11.3152 7.22391 12 5.5 12Z"
						fill="url(#paint2_linear_1082_1465)"
						shapeRendering="crispEdges"
					/>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_iii_1082_1465"
					x="0"
					y="-1"
					width="24"
					height="26"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.5"
						operator="erode"
						in="SourceAlpha"
						result="effect1_innerShadow_1082_1465"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_1082_1465"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_innerShadow_1082_1465"
						result="effect2_innerShadow_1082_1465"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect2_innerShadow_1082_1465"
						result="effect3_innerShadow_1082_1465"
					/>
				</filter>
				<filter
					id="filter1_d_1082_1465"
					x="4.60886"
					y="5.27721"
					width="14.7823"
					height="14.7823"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="0.445572"
						operator="erode"
						in="SourceAlpha"
						result="effect1_dropShadow_1082_1465"
					/>
					<feOffset dy="0.668359" />
					<feGaussianBlur stdDeviation="0.668359" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1082_1465"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1082_1465"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_1082_1465"
					x1="12"
					y1="2.98023e-07"
					x2="13"
					y2="24"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.15" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_1082_1465"
					x1="12"
					y1="0"
					x2="12"
					y2="24"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0.2" />
					<stop offset="1" stopColor="white" stopOpacity="0" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_1082_1465"
					x1="12"
					y1="5.5"
					x2="12"
					y2="18.5"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="white" stopOpacity="0.5" />
				</linearGradient>
			</defs>
		</svg>
	)
}
