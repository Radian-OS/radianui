import React from "react"
import { Avatar, AvatarFallback } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"

const CardFirst = () => {
	return (
		<div className="bg-bg border-border relative w-full overflow-hidden rounded-xl border">
			<div className="from-primary-text to-primary-accent h-[80px] w-full bg-gradient-to-r"></div>
			<div className="absolute top-14 flex w-full items-end justify-between px-5">
				<Avatar className="border-bg border-4" size="64" rounded="circle">
					<AvatarFallback>NM</AvatarFallback>
				</Avatar>
				<Badge size="20" variant="outline" color="neutral">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="14"
						viewBox="0 0 15 14"
						fill="none">
						<path
							d="M5.5376 11.993C5.48917 11.9736 5.44137 11.9537 5.39404 11.9334C5.44093 11.9347 5.48874 11.9346 5.5376 11.9334V11.993ZM7.47803 1.91389C13.4708 2.04836 14.7713 9.89026 9.50146 11.9881C9.50303 11.9497 9.50457 11.9081 9.50635 11.8631C9.51568 11.6272 9.52594 11.3203 9.51709 11.0076C9.50848 10.7035 9.48077 10.3669 9.40674 10.0711C9.87127 9.95879 10.3412 9.7705 10.7417 9.44026C11.3941 8.90212 11.7788 8.06236 11.7788 6.84065C11.7858 6.23595 11.5894 5.65041 11.228 5.17268C11.3496 4.63522 11.2994 4.07051 11.0747 3.56136L10.9751 3.33577L10.7378 3.26839L10.6206 3.68147C10.7266 3.30801 10.7363 3.27196 10.7368 3.26839L10.7358 3.26741H10.7339C10.7325 3.26703 10.7305 3.26682 10.729 3.26643C10.7262 3.26569 10.7233 3.26426 10.7202 3.2635C10.714 3.26194 10.707 3.2602 10.6997 3.25862C10.6851 3.25547 10.6685 3.25265 10.6499 3.24983C10.6122 3.24413 10.566 3.23932 10.5122 3.23811C10.4042 3.2357 10.2659 3.24626 10.0962 3.28401C9.79523 3.35099 9.39813 3.50297 8.89404 3.81624C7.99384 3.60964 7.05986 3.60964 6.15967 3.81624C5.65261 3.49818 5.25283 3.34486 4.94873 3.27913C4.77732 3.24211 4.63741 3.23305 4.52783 3.23714C4.47316 3.23917 4.42658 3.24426 4.38818 3.25081C4.36916 3.25406 4.3523 3.258 4.3374 3.26155C4.32991 3.26334 4.32235 3.26467 4.31592 3.26643C4.31283 3.26728 4.30997 3.26854 4.30713 3.26936C4.30565 3.26979 4.30365 3.26992 4.30225 3.27034L4.30029 3.27132H4.29932C4.29901 3.27204 4.30413 3.28895 4.45361 3.77327L4.29834 3.27132L4.07373 3.34065L3.97607 3.55452C3.74076 4.06799 3.68647 4.64168 3.81201 5.18636C3.50294 5.59566 3.31472 6.08382 3.27197 6.59554L3.26318 6.85335C3.26325 7.72848 3.46085 8.40752 3.81299 8.92073C3.72636 8.89506 3.63845 8.87308 3.54834 8.86116L3.51611 8.85725H3.43701C3.41293 8.85814 3.37875 8.8608 3.34033 8.86507C3.28385 8.87135 3.13854 8.88982 3.00244 8.96663C2.92909 9.00807 2.81005 9.09346 2.73975 9.25081C2.71575 9.30458 2.70296 9.35866 2.6958 9.41096C1.21407 6.31696 3.07026 2.01337 7.47803 1.91389ZM3.15186 10.1737L3.16162 10.1795C3.35139 10.2964 3.49497 10.4742 3.57178 10.6824C3.41657 10.5187 3.2744 10.3478 3.146 10.1698L3.15186 10.1737ZM4.90479 9.83089C5.13324 9.9391 5.36947 10.0204 5.60596 10.0799C5.49569 10.1005 5.38197 10.1 5.27197 10.0692C5.12728 10.0286 4.99992 9.94462 4.90479 9.83089Z"
							fill={`var(--color-primary)`}
							stroke={`var(--color-primary)`}
							strokeWidth="1.05"
						/>
					</svg>
					Nancy_dev
				</Badge>
			</div>
			<div className="mt-10 flex flex-col gap-5 p-4">
				<span>
					<span className="flex items-center gap-0.5 font-medium">
						<p className="text-fg text-[16px]">Nancy Mureum </p>
						<p className="text-fg-tertiary text-sm"> #2126</p>
					</span>
					<p className="text-fg-tertiary text-[12px] font-normal">
						+977 9861038740
					</p>
				</span>
				<div className="flex gap-2">
					<Button variant="outline" color="neutral" className="w-full">
						Message
					</Button>
					<Button className="w-full">Add Friend</Button>
				</div>
			</div>
		</div>
	)
}

export default CardFirst
