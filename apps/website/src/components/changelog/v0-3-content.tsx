import * as React from "react"
import Image from "next/image"
import ChangelogCard from "@/components/changelog-card"
import { ComponentExpansionGrid } from "@/components/component-expansion"
import { FeatureList, FeatureListItem } from "@/components/feature-list"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Divider } from "@/registry/ui/divider"

function RadianLogo() {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M23.4667 0H8.53333C3.8205 0 0 3.8205 0 8.53333V23.4667C0 28.1795 3.8205 32 8.53333 32H23.4667C28.1795 32 32 28.1795 32 23.4667V8.53333C32 3.8205 28.1795 0 23.4667 0Z"
				fill="url(#paint0_linear_19193_7327)"
			/>
			<path
				d="M23.0816 17.2704C23.3749 17.8827 23.1168 18.6454 22.9269 19.264C22.5664 20.3008 21.9488 21.2128 21.1392 21.9467C20.7381 22.3254 20.3093 22.6571 19.8176 22.9195C17.8112 24.0395 15.1413 24.0118 13.1616 22.8491C12.3445 22.3638 11.2341 21.6566 11.8645 20.5718C12.0992 20.2219 12.4363 19.8262 12.8608 19.8774C13.1563 19.9179 13.408 20.2294 13.6448 20.4246C14.2581 20.9515 14.9451 21.264 15.7952 21.424C17.0784 21.6523 18.4533 21.2726 19.4507 20.4427C20.2379 19.7792 20.7669 18.88 20.9451 17.8528C21.0091 17.4998 21.0475 16.9984 21.3451 16.8032C21.8368 16.495 22.7989 16.7414 23.0773 17.2619L23.0805 17.2683L23.0816 17.2704Z"
				fill="white"
			/>
			<path
				d="M27.6779 11.2935C27.8688 11.3362 27.8197 11.7692 27.7163 11.9346C27.5349 12.2215 26.9184 12.6268 25.6032 13.285C19.8517 15.9548 14.5931 17.8044 7.36213 19.7351C6.42773 19.9847 5.73333 20.0476 5.216 20.0476C4.69866 20.0476 3.79093 19.8716 4.4608 19.4215C5.13066 18.9714 5.4336 18.7943 5.64693 18.6695C8.24426 17.2242 8.12053 16.1884 9.01973 13.5399C10.3264 9.23911 15.4528 7.25831 19.4581 9.11004C20.9131 9.75964 21.8336 10.9106 23.3963 11.302C24.2784 11.525 25.5435 11.5058 26.4693 11.4087C26.8373 11.413 27.312 11.2114 27.6768 11.2935H27.6779ZM13.5819 15.7948C15.1819 15.222 17.0688 14.5895 18.4053 14.0754C18.8181 13.9154 19.2032 13.7959 19.6299 13.5954C19.8176 13.5058 19.9947 13.3692 20.1867 13.1751C20.784 12.533 19.1136 11.5975 18.6336 11.3404C15.4016 9.64658 11.5872 11.7916 11.1413 15.3554C11.0624 16.1063 11.3472 16.421 12.0853 16.2567C12.5973 16.1468 13.1221 15.9538 13.5723 15.797L13.5808 15.7938L13.5819 15.7948Z"
				fill="white"
			/>
			<path
				d="M8.55999 26.1239C8.55999 26.1655 8.54719 26.206 8.52265 26.2401C8.49812 26.2743 8.46292 26.2999 8.42345 26.3137L8.07039 26.43C7.95945 26.4673 7.85919 26.5292 7.77599 26.6124C7.69385 26.6956 7.63092 26.7959 7.59465 26.9068L7.47199 27.2577C7.45812 27.2972 7.43252 27.3313 7.39839 27.3548C7.37279 27.3729 7.34292 27.3857 7.31199 27.39C7.28105 27.3943 7.24905 27.3921 7.21919 27.3825C7.18932 27.3729 7.16265 27.3559 7.14025 27.3335C7.11785 27.3111 7.10185 27.2833 7.09225 27.2535L6.97385 26.9004C6.93545 26.7895 6.87145 26.6892 6.78612 26.6081C6.70399 26.5239 6.60265 26.4588 6.49065 26.4204L6.13759 26.302C6.09812 26.2892 6.06292 26.2647 6.03839 26.2305C6.01385 26.1964 6.00105 26.1548 6.00105 26.1132C6.00105 26.0716 6.01385 26.03 6.03839 25.9959C6.06292 25.9607 6.09919 25.9351 6.13972 25.9223L6.49065 25.8039C6.60372 25.7655 6.70612 25.7015 6.78932 25.6161C6.87359 25.5329 6.93865 25.4316 6.97705 25.3196L7.09332 24.9719C7.10399 24.9324 7.12852 24.8972 7.16052 24.8727C7.19359 24.846 7.23412 24.8321 7.27679 24.8311C7.31839 24.8311 7.35999 24.8417 7.39519 24.8652C7.43039 24.8876 7.45812 24.9217 7.47199 24.9612L7.59039 25.3196C7.62879 25.4316 7.69385 25.5329 7.77812 25.6161C7.86132 25.7015 7.96265 25.7655 8.07465 25.8039L8.42559 25.9276C8.46505 25.9404 8.49919 25.9649 8.52372 25.9991C8.54825 26.0353 8.55999 26.0791 8.55785 26.1228L8.55999 26.1239Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M11.728 28.328C11.728 28.3579 11.7184 28.3878 11.7003 28.4123C11.6821 28.4368 11.6565 28.456 11.6277 28.4656L11.3717 28.5499C11.2917 28.5766 11.2181 28.6224 11.1584 28.6822C11.0987 28.7419 11.0539 28.8155 11.0272 28.8955L10.9387 29.1504C10.928 29.1792 10.9099 29.2038 10.8853 29.2208C10.8672 29.2336 10.8448 29.2432 10.8224 29.2464C10.8 29.2496 10.7765 29.2475 10.7552 29.2411C10.7339 29.2336 10.7136 29.2219 10.6976 29.2059C10.6816 29.1899 10.6699 29.1696 10.6624 29.1483L10.5771 28.8923C10.5493 28.8112 10.5024 28.7387 10.4405 28.68C10.3808 28.6182 10.3072 28.5723 10.2261 28.5435L9.97013 28.4582C9.94133 28.4496 9.91573 28.4304 9.89759 28.407C9.87946 28.3824 9.87093 28.3526 9.87093 28.3216C9.87093 28.2907 9.88053 28.2619 9.89759 28.2363C9.91573 28.2107 9.94133 28.1926 9.97119 28.183L10.2261 28.0976C10.3083 28.0699 10.3819 28.024 10.4427 27.9611C10.5045 27.9014 10.5504 27.8278 10.5792 27.7467L10.6635 27.495C10.6709 27.4662 10.6891 27.4406 10.7125 27.4224C10.7371 27.4032 10.7659 27.3926 10.7968 27.3926C10.8277 27.3926 10.8576 27.4 10.8832 27.4171C10.9088 27.4331 10.9291 27.4576 10.9387 27.4864L11.0251 27.7467C11.0528 27.8278 11.0997 27.9014 11.1616 27.9611C11.2213 28.023 11.2949 28.0699 11.3771 28.0976L11.632 28.1872C11.6608 28.1958 11.6853 28.2139 11.7024 28.2384C11.7205 28.2651 11.7291 28.296 11.7269 28.328H11.728Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M25.584 3.75231C25.584 3.78431 25.5734 3.81631 25.5552 3.84297C25.536 3.86964 25.5094 3.88884 25.4784 3.89951L25.2043 3.99017C25.1179 4.01897 25.04 4.06697 24.976 4.13097C24.912 4.19497 24.864 4.27284 24.8352 4.35924L24.7403 4.63124C24.7296 4.66111 24.7094 4.68777 24.6838 4.70697C24.6635 4.72084 24.6411 4.73044 24.6166 4.73471C24.592 4.73791 24.5675 4.73684 24.5451 4.72831C24.5216 4.72084 24.5014 4.70804 24.4832 4.68991C24.4662 4.67284 24.4534 4.65151 24.4459 4.62804L24.3542 4.35497C24.3243 4.26857 24.2742 4.19071 24.208 4.12777C24.144 4.06271 24.0662 4.01257 23.9798 3.98271L23.7056 3.89097C23.6747 3.88137 23.648 3.86217 23.6288 3.83551C23.6096 3.80884 23.6 3.77684 23.6 3.74484C23.6 3.71284 23.6107 3.68084 23.6288 3.65417C23.648 3.62751 23.6758 3.60724 23.7078 3.59764L23.9798 3.50591C24.0672 3.47604 24.1472 3.42697 24.2112 3.36084C24.2763 3.29684 24.3264 3.21791 24.3563 3.13151L24.447 2.86271C24.4555 2.83177 24.4736 2.80511 24.4992 2.78591C24.5248 2.76564 24.5568 2.75391 24.5899 2.75391C24.623 2.75391 24.655 2.76244 24.6816 2.78057C24.7094 2.79764 24.7307 2.82431 24.7414 2.85524L24.8331 3.13257C24.863 3.21897 24.9131 3.29791 24.9792 3.36191C25.0432 3.42804 25.1222 3.47817 25.2096 3.50697L25.4816 3.60297C25.5126 3.61257 25.5392 3.63177 25.5574 3.65844C25.5766 3.68724 25.5851 3.72031 25.584 3.75444V3.75231Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M27.5606 26.8107C27.5552 26.831 27.5435 26.8491 27.5275 26.8619C27.5115 26.8747 27.4912 26.8833 27.4699 26.8843L27.2843 26.895C27.2256 26.8982 27.1691 26.9153 27.119 26.9451C27.0688 26.9739 27.0251 27.0145 26.9931 27.0635L26.8886 27.2171C26.8768 27.2342 26.8598 27.247 26.8406 27.2545C26.8256 27.2598 26.8096 27.2619 26.7947 27.2598C26.7787 27.2577 26.7638 27.2523 26.751 27.2438C26.7382 27.2353 26.7264 27.2235 26.719 27.2097C26.7115 27.1958 26.7072 27.1809 26.7062 27.1649L26.6944 26.9793C26.6902 26.9206 26.672 26.8641 26.6411 26.8139C26.6123 26.7627 26.5718 26.719 26.5227 26.6849L26.367 26.5825C26.3499 26.5707 26.336 26.5547 26.3286 26.5355C26.3211 26.5163 26.32 26.4939 26.3254 26.4737C26.3307 26.4534 26.3424 26.4353 26.3584 26.4214C26.3755 26.4075 26.3958 26.4001 26.4171 26.399L26.6016 26.3873C26.6614 26.3841 26.719 26.3659 26.7702 26.335C26.8214 26.3062 26.8662 26.2657 26.8992 26.2166L27.0006 26.0641C27.0112 26.0459 27.0272 26.0321 27.0464 26.0246C27.0656 26.0161 27.088 26.0139 27.1083 26.0203C27.1286 26.0257 27.1467 26.0363 27.1606 26.0523C27.1744 26.0683 27.184 26.0875 27.1851 26.1089L27.1958 26.2977C27.2 26.3563 27.2182 26.4139 27.248 26.4651C27.2768 26.5174 27.3174 26.5611 27.3675 26.5942L27.5211 26.6998C27.5382 26.7105 27.552 26.7275 27.5595 26.7467C27.567 26.767 27.567 26.7905 27.5595 26.8107H27.5606Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<path
				d="M5.70346 4.14338C5.71412 4.16151 5.71839 4.18285 5.71626 4.20311C5.71412 4.22445 5.70559 4.24365 5.69172 4.25965L5.56799 4.39831C5.52959 4.44205 5.50079 4.49431 5.48586 4.55085C5.47092 4.60738 5.46879 4.66605 5.48052 4.72365L5.51572 4.90605C5.51999 4.92631 5.51679 4.94765 5.50826 4.96685C5.50186 4.98071 5.49226 4.99351 5.47946 5.00311C5.46666 5.01271 5.45279 5.02018 5.43679 5.02338C5.42186 5.02658 5.40586 5.02658 5.38986 5.02231C5.37492 5.01805 5.36106 5.01058 5.34932 4.99991L5.20959 4.87725C5.16479 4.83885 5.11252 4.81111 5.05492 4.79725C4.99839 4.78125 4.93866 4.77911 4.87999 4.78978L4.69759 4.82711C4.67732 4.83138 4.65599 4.82925 4.63679 4.82071C4.61759 4.81218 4.60159 4.79725 4.59092 4.77911C4.58026 4.76098 4.57599 4.73965 4.57812 4.71938C4.58026 4.69805 4.58879 4.67778 4.60372 4.66285L4.72639 4.52418C4.76586 4.47938 4.79359 4.42605 4.80852 4.36845C4.82452 4.31085 4.82666 4.25111 4.81599 4.19351L4.77972 4.01431C4.77439 3.99405 4.77652 3.97378 4.78399 3.95458C4.79146 3.93538 4.80532 3.91831 4.82452 3.90765C4.84266 3.89698 4.86292 3.89165 4.88426 3.89271C4.90559 3.89271 4.92586 3.90125 4.94186 3.91511L5.08266 4.04098C5.12746 4.07938 5.18079 4.10711 5.23839 4.12205C5.29599 4.13805 5.35572 4.14018 5.41332 4.12951L5.59679 4.09538C5.61706 4.09111 5.63839 4.09325 5.65652 4.10178C5.67679 4.11138 5.69279 4.12738 5.70239 4.14658L5.70346 4.14338Z"
				fill="#18191B"
				fill-opacity="0.2"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_19193_7327"
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

export function ChangelogV03Content() {
	return (
		<>
			<ChangelogCard title="Changelog Patch 0.3">
				This release brings significant quality-of-life improvements to the
				design system, featuring utility colors for seamless theming, new
				component blocks for both design & development files, implementation of
				flexible slots, & performance optimization across various core
				components.
			</ChangelogCard>

			<div className="flex flex-col gap-10">
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						<Badge size="28" variant="soft" color="primary">
							<BadgeDot className="bg-primary" /> 18 june, 2026
						</Badge>
						<h2 className="heading-4 mt-2 font-normal">Radian 0.3 changelog</h2>
					</div>

					<div className="text-fg-secondary text-lg font-normal">
						<p>
							This release marks our most significant design system update yet.
							We&apos;ve expanded the library with new assets, introduced
							production-ready components, refined our color foundations, and
							rebuilt key architectures to improve flexibility, consistency, and
							everyday design workflows.
						</p>
						<br />
						<p>
							Combined with hundreds of smaller improvements to spacing,
							accessibility, and how components behave, your daily design work
							will be faster, smoother, and more polished.
						</p>
						<br />
						<p>Let&apos;s dive into what&apos;s new.</p>
					</div>
				</div>

				<AspectRatio ratio={16 / 9}>
					<Image alt="radian background" fill src="/radian-changelog.jpg" />
				</AspectRatio>
			</div>

			<div className="mt-12">
				<div className="flex flex-col gap-5">
					<h2 className="heading-4 text-fg mt-0 font-medium">
						What&apos;s new in this release
					</h2>
					<p className="text-fg-secondary text-lg font-normal">
						This update focuses on four key areas: expanding the asset library,
						modernizing the color system, introducing production-ready
						components, and rebuilding existing components with a more flexible
						architecture.
					</p>
				</div>

				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						1
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Assets & Resources
					</h3>
				</div>
				<p className="text-fg-secondary mb-10 text-lg font-normal">
					We&apos;ve significantly expanded the design asset ecosystem to
					support more real-world use cases and speed up interface creation.
				</p>

				<AspectRatio className="mb-10" ratio={16 / 9}>
					<Image
						fill
						src="/assets-resources.jpg"
						alt="Assets and Resources"
						className="border-soft w-full rounded-xl border"
					/>
				</AspectRatio>

				<FeatureList>
					<FeatureListItem icon="🎯">
						Added 90 new Brand Logos with original and neutral variants.
					</FeatureListItem>
					<FeatureListItem icon="🌍">
						Introduced rounded Country Flags for every supported country.
					</FeatureListItem>
					<FeatureListItem icon="📝">
						Expanded File Format Icons with 46 additional variants, bringing the
						total to 69.
					</FeatureListItem>
					<FeatureListItem icon="🖼️">
						Redesigned the asset library layout for faster browsing and
						discovery.
					</FeatureListItem>
					<FeatureListItem icon="✨">
						Updated naming conventions for improved consistency across the
						library.
					</FeatureListItem>
				</FeatureList>

				<Divider className="my-15" />
				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						2
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Color System Refresh
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					Our color foundations have been refined to improve accessibility,
					scalability, and consistency across light and dark themes.
				</p>

				<FeatureList>
					<FeatureListItem icon="🎨">
						Added 17 new utility color systems with complete interaction tokens.
					</FeatureListItem>
					<FeatureListItem icon="🧩">
						Refined neutral palettes, state variables, and alpha fills for
						greater consistency.
					</FeatureListItem>
					<FeatureListItem icon="👀">
						Improved accessibility, text contrast, and interaction states across
						the color system.
					</FeatureListItem>
				</FeatureList>

				<div className="mt-8 grid grid-cols-1 gap-6">
					<Image
						width={1200}
						height={800}
						src="/color-system-1.jpg"
						alt="Color System Variables"
						className="border-soft w-full rounded-xl border"
					/>
					<Image
						width={1200}
						height={800}
						src="/color-system-2.jpg"
						alt="Color System Dark Mode"
						className="border-soft w-full rounded-xl border"
					/>
				</div>

				<Divider className="my-15" />
				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						3
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Logo & Typography
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					We&apos;ve modernized our brand presentation with more flexible
					layouts and refreshed typography. Highlights include containerless
					logo variants, updated typefaces across all styles, and editable
					placeholders to speed up your mockup process. We&apos;ve also
					refreshed our recommended font showcase and transitioned our header
					typeface from Geist to Inter for a cleaner, more refined look.
				</p>

				<Image
					width={1200}
					height={800}
					src="/logo-typography.jpg"
					alt="Logo and Typography"
					className="border-soft mb-12 w-full rounded-xl border"
				/>

				<Divider className="my-15" />
				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						4
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Effects & Visual Foundations
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					We&apos;ve streamlined our interaction effects to make them both more
					versatile and easier to use. By reworking our underlying variables and
					introducing new focus styles including colorful outer rings and pastel
					borders We&apos;ve created a more consistent experience. We have also
					phased out older, softer ring styles to make way for a cleaner, more
					modern look.
				</p>

				<Divider className="my-15" />
				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						5
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Component Expansion
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					This release delivers one of the largest component updates to date,
					introducing entirely new systems alongside major upgrades to existing
					ones.
				</p>
				<p className="text-fg-secondary mb-10 text-lg font-normal">
					New additions include:
				</p>

				<ComponentExpansionGrid />

				<div className="bg-primary-accent text-primary-text rounded-sm p-2 text-lg font-medium">
					10+ core components rebuilt & redefined to support more powerful
					workflows.
				</div>

				<Divider className="my-15" />
				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						6
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Ready-to-Use Blocks
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					Build complete experiences faster with our latest collection of
					reusable interface blocks.
				</p>

				<FeatureList>
					<FeatureListItem
						icon="🧭"
						rightElement={
							<a
								href="#"
								className="flex items-center gap-1 text-[13px] font-medium text-indigo-600 transition-colors hover:underline dark:text-indigo-400">
								View Live Demo <span>→</span>
							</a>
						}>
						10+ Sidebar layouts for modern dashboards and applications.
					</FeatureListItem>
					<FeatureListItem
						icon="👋"
						rightElement={
							<a
								href="#"
								className="flex items-center gap-1 text-[13px] font-medium text-indigo-600 transition-colors hover:underline dark:text-indigo-400">
								View Live Demo <span>→</span>
							</a>
						}>
						5+ Onboarding flows for seamless user introductions and setup.
					</FeatureListItem>
					<FeatureListItem icon="🎛️">
						Fully customizable and built using core design system components.
					</FeatureListItem>
					<FeatureListItem icon="🚀">
						Ready to drop into real-world projects.
					</FeatureListItem>
				</FeatureList>

				<Image
					width={1200}
					height={800}
					src="/ready-to-use-blocks.jpg"
					alt="Ready-to-Use Blocks"
					className="border-soft mb-12 mt-8 w-full rounded-xl border"
				/>

				<Divider className="my-15" />
				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						7
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">Forms & Inputs</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					Input components have been enhanced with richer layouts and improved
					usability, introducing features like required indicators, sublabels,
					info icons, character counters, multi-select support, and more
					flexible file upload workflows.
				</p>

				<Divider className="my-15" />

				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						8
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Flexible Architecture
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					Many components have been rebuilt around modular structures and
					slot-based composition, making them easier to customize and extend.
					<br />
					Improvements include:
				</p>

				<FeatureList>
					<FeatureListItem icon="🎀">
						Introduced slot-based architecture across the system.
					</FeatureListItem>
					<FeatureListItem icon="⚙️">
						Reworked Drawer, Tabs, and Pagination for greater flexibility.
					</FeatureListItem>
					<FeatureListItem icon="🧱">
						Refined core component foundations, including Checkbox, Radio,
						Switch, Avatar, Skeleton, and Badge.
					</FeatureListItem>
				</FeatureList>

				<Image
					width={1200}
					height={800}
					src="/flexible-architecture.jpg"
					alt="Flexible Architecture"
					className="border-soft mb-12 mt-8 w-full rounded-xl border"
				/>

				<Divider className="my-15" />
				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						9
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Productivity & Workflow Improvements
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					A wide range of quality-of-life improvements help designers build
					interfaces faster.
					<br />
					<br />
					Highlights include:
				</p>

				<FeatureList>
					<FeatureListItem icon="🎛️">
						50+ production-ready Dropdown examples.
					</FeatureListItem>
					<FeatureListItem icon="🎛️">30+ Dialog examples.</FeatureListItem>
					<FeatureListItem icon="🎛️">
						Accordion Blocks and Alert Blocks.
					</FeatureListItem>
					<FeatureListItem icon="🎛️">
						Expanded Hover Card examples.
					</FeatureListItem>
					<FeatureListItem icon="🎛️">
						New layout examples for Checkbox Groups and Radio Groups.
					</FeatureListItem>
					<FeatureListItem icon="🎛️">
						Improved Progress Bar and Slider granularity.
					</FeatureListItem>
				</FeatureList>

				<Image
					width={1200}
					height={800}
					src="/productivity-workflow.jpg"
					alt="Productivity & Workflow Improvements"
					className="border-soft mb-12 mt-8 w-full rounded-xl border"
				/>

				<Divider className="my-15" />

				<div className="mb-4 mt-10 flex items-center gap-3">
					<div className="bg-primary border-primary-border flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium text-white">
						10
					</div>
					<h3 className="heading-6 text-fg m-0 font-medium">
						Documentation Refresh
					</h3>
				</div>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					We&apos;ve refreshed our documentation by replacing traditional
					reference pages with practical, example-driven content and a cleaner
					format, making it easier to explore components and understand their
					real-world usage.
				</p>

				<Image
					width={1200}
					height={800}
					src="/documentation-refresh.jpg"
					alt="Documentation Refresh"
					className="mb-15 border-soft mt-8 w-full rounded-xl border"
				/>

				<h2 className="heading-4 text-fg mb-4 font-medium">
					What we&apos;re Building Next
				</h2>

				<p className="text-fg-secondary mb-10 text-lg font-normal">
					Looking ahead, we&apos;re focused on introducing powerful new Forms,
					Charts, and Blocks alongside continuous improvements to existing
					components. We&apos;ll keep expanding the library, refining
					architectures, and enhancing usability to deliver an even better
					experience for designers and developers.
				</p>

				<Image
					width={1200}
					height={800}
					src="/building-next.jpg"
					alt="What we're Building Next"
					className="border-soft w-full rounded-xl border"
				/>

				<Divider className="my-15" />

				<div className="text-fg-secondary mb-15 space-y-6 text-lg font-normal">
					<p>
						Radian is all about giving you a solid, scalable foundation for your
						SaaS projects. We&apos;ve packed this update with improvements to
						help you ship faster. We can&apos;t wait to see your work.
					</p>
					<p>Happy Designing!! 🚀✨</p>
				</div>

				<div className="bg-fill1 text-fg-secondary flex flex-col justify-between rounded-2xl px-20 py-10 text-lg sm:flex-row sm:items-center">
					<div className="flex items-center gap-4">
						<RadianLogo />
						<span>© RadianOS - All Rights Reserved.</span>
					</div>
					<a
						href="https://www.radianos.com"
						className="mt-4 underline-offset-4 hover:underline sm:mt-0">
						www.radianos.com
					</a>
				</div>
			</div>
		</>
	)
}
