"use client"

import * as React from "react"
import { ChevronDown, Link2, Plus } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownCheckboxItem,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

type Workspace = "debcon" | "xavion" | "qubio" | "personal"

const DropdownWithCheckboxExample = () => {
	const [checkedWorkspaces, setCheckedWorkspaces] = React.useState<Workspace[]>(
		["debcon"]
	)

	const isWorkspaceChecked = (workspace: Workspace) =>
		checkedWorkspaces.includes(workspace)

	const setWorkspaceChecked = (workspace: Workspace, checked: boolean) => {
		setCheckedWorkspaces((currentWorkspaces) =>
			checked
				? currentWorkspaces.includes(workspace)
					? currentWorkspaces
					: [...currentWorkspaces, workspace]
				: currentWorkspaces.filter((item) => item !== workspace)
		)
	}

	return (
		<Dropdown indicatorPosition="right">
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline">
					Switch Workspace <ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>

			<DropdownContent className="w-80">
				<DropdownLabel className="uppercase">Switch Workspace</DropdownLabel>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("debcon")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("debcon", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<g filter="url(#filter0_iii_18384_482)">
							<path
								d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z"
								fill="#F36A25"
							/>
							<path
								d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z"
								fill="url(#paint0_linear_18384_482)"
							/>
							<path
								d="M6 0.5H26C29.0376 0.5 31.5 2.96243 31.5 6V26C31.5 29.0376 29.0376 31.5 26 31.5H6C2.96243 31.5 0.5 29.0376 0.5 26V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
								stroke="url(#paint1_linear_18384_482)"
							/>
							<g filter="url(#filter1_d_18384_482)">
								<path
									d="M16 7.33325V15.9999H24.6667C24.6667 13.7014 23.7536 11.497 22.1283 9.87166C20.5029 8.24634 18.2985 7.33325 16 7.33325ZM16 24.6666H24.6667V15.9999C22.3681 15.9999 20.1637 16.913 18.5384 18.5383C16.9131 20.1636 16 22.368 16 24.6666ZM7.33333 15.9999C7.33333 18.2985 8.24642 20.5029 9.87174 22.1282C11.4971 23.7535 13.7015 24.6666 16 24.6666V15.9999H7.33333ZM7.33333 15.9999V7.33325H16C16 9.63179 15.0869 11.8362 13.4616 13.4615C11.8363 15.0868 9.63187 15.9999 7.33333 15.9999Z"
									fill="url(#paint2_linear_18384_482)"
									shapeRendering="crispEdges"
								/>
							</g>
						</g>
						<defs>
							<filter
								id="filter0_iii_18384_482"
								x="0"
								y="-1"
								width="32"
								height="34"
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
									result="effect1_innerShadow_18384_482"
								/>
								<feOffset />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="shape"
									result="effect1_innerShadow_18384_482"
								/>
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="1" />
								<feGaussianBlur stdDeviation="0.5" />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="effect1_innerShadow_18384_482"
									result="effect2_innerShadow_18384_482"
								/>
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="-1" />
								<feGaussianBlur stdDeviation="0.5" />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="effect2_innerShadow_18384_482"
									result="effect3_innerShadow_18384_482"
								/>
							</filter>
							<filter
								id="filter1_d_18384_482"
								x="6.44218"
								y="7.11047"
								width="19.1156"
								height="19.1156"
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
									result="effect1_dropShadow_18384_482"
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
									result="effect1_dropShadow_18384_482"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_18384_482"
									result="shape"
								/>
							</filter>
							<linearGradient
								id="paint0_linear_18384_482"
								x1="16"
								y1="3.97364e-07"
								x2="17.3333"
								y2="32"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" stopOpacity="0" />
								<stop offset="1" stopColor="white" stopOpacity="0.15" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_18384_482"
								x1="16"
								y1="0"
								x2="16"
								y2="32"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" stopOpacity="0.2" />
								<stop offset="1" stopColor="white" stopOpacity="0" />
							</linearGradient>
							<linearGradient
								id="paint2_linear_18384_482"
								x1="16"
								y1="7.33325"
								x2="16"
								y2="24.6666"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0.5" />
							</linearGradient>
						</defs>
					</svg>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Debcon Inc.</span>
						<span className="text-fg-secondary text-xs">14 members</span>
					</div>
					<Badge variant="soft" color="info">
						Pro
					</Badge>
				</DropdownCheckboxItem>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("xavion")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("xavion", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<g filter="url(#filter0_iii_18384_508)">
							<path
								d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z"
								fill="#BB33FF"
							/>
							<path
								d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z"
								fill="url(#paint0_linear_18384_508)"
							/>
							<path
								d="M6 0.5H26C29.0376 0.5 31.5 2.96243 31.5 6V26C31.5 29.0376 29.0376 31.5 26 31.5H6C2.96243 31.5 0.5 29.0376 0.5 26V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
								stroke="url(#paint1_linear_18384_508)"
							/>
							<g filter="url(#filter1_d_18384_508)">
								<path
									d="M18.9167 19.5C18.9167 22.7217 16.305 25.3333 13.0833 25.3333H12.5C9.27833 25.3333 6.66667 22.7217 6.66667 19.5H18.9167ZM25.3333 19.5C25.3333 22.7217 22.7217 25.3333 19.5 25.3333V19.5H25.3333ZM12.7917 6.66666C16.1744 6.66666 18.9167 9.40891 18.9167 12.7917C18.9167 16.1744 16.1744 18.9167 12.7917 18.9167C9.40892 18.9167 6.66667 16.1744 6.66667 12.7917C6.66667 9.40891 9.40892 6.66666 12.7917 6.66666ZM19.5 6.66666C22.7217 6.66666 25.3333 9.27832 25.3333 12.5V13.0833C25.3333 16.305 22.7217 18.9167 19.5 18.9167V6.66666Z"
									fill="url(#paint2_linear_18384_508)"
									shapeRendering="crispEdges"
								/>
							</g>
						</g>
						<defs>
							<filter
								id="filter0_iii_18384_508"
								x="0"
								y="-1"
								width="32"
								height="34"
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
									result="effect1_innerShadow_18384_508"
								/>
								<feOffset />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="shape"
									result="effect1_innerShadow_18384_508"
								/>
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="1" />
								<feGaussianBlur stdDeviation="0.5" />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="effect1_innerShadow_18384_508"
									result="effect2_innerShadow_18384_508"
								/>
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="-1" />
								<feGaussianBlur stdDeviation="0.5" />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="effect2_innerShadow_18384_508"
									result="effect3_innerShadow_1838f4_508"
								/>
							</filter>
							<filter
								id="filter1_d_18384_508"
								x="5.77096"
								y="6.44274"
								width="20.4581"
								height="20.4581"
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
									radius="0.447857"
									operator="erode"
									in="SourceAlpha"
									result="effect1_dropShadow_18384_508"
								/>
								<feOffset dy="0.671786" />
								<feGaussianBlur stdDeviation="0.671786" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow_18384_508"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_18384_508"
									result="shape"
								/>
							</filter>
							<linearGradient
								id="paint0_linear_18384_508"
								x1="16"
								y1="3.97364e-07"
								x2="17.3333"
								y2="32"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" stopOpacity="0" />
								<stop offset="1" stopColor="white" stopOpacity="0.15" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_18384_508"
								x1="16"
								y1="0"
								x2="16"
								y2="32"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" stopOpacity="0.2" />
								<stop offset="1" stopColor="white" stopOpacity="0" />
							</linearGradient>
							<linearGradient
								id="paint2_linear_18384_508"
								x1="16"
								y1="6.66666"
								x2="16"
								y2="25.3333"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0.5" />
							</linearGradient>
						</defs>
					</svg>

					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Xavion Inc.</span>
						<span className="text-fg-secondary text-xs">51 members</span>
					</div>
					<Badge variant="soft" color="warning">
						Biz
					</Badge>
				</DropdownCheckboxItem>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("qubio")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("qubio", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<g filter="url(#filter0_iii_18384_533)">
							<path
								d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z"
								fill="#F53D7A"
							/>
							<path
								d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z"
								fill="url(#paint0_linear_18384_533)"
							/>
							<path
								d="M6 0.5H26C29.0376 0.5 31.5 2.96243 31.5 6V26C31.5 29.0376 29.0376 31.5 26 31.5H6C2.96243 31.5 0.5 29.0376 0.5 26V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
								stroke="url(#paint1_linear_18384_533)"
							/>
							<g filter="url(#filter1_d_18384_533)">
								<path
									d="M26 16C23.3478 16 20.8043 17.0536 18.9289 18.9289C17.0536 20.8043 16 23.3478 16 26C18.6522 26 21.1957 24.9464 23.0711 23.0711C24.9464 21.1957 26 18.6522 26 16ZM16 6C13.3478 6 10.8043 7.05357 8.92893 8.92893C7.05357 10.8043 6 13.3478 6 16C8.65216 16 11.1957 14.9464 13.0711 13.0711C14.9464 11.1957 16 8.65216 16 6ZM26 16C26 13.3478 24.9464 10.8043 23.0711 8.92893C21.1957 7.05357 18.6522 6 16 6C16 8.65216 17.0536 11.1957 18.9289 13.0711C20.8043 14.9464 23.3478 16 26 16ZM16 26C16 23.3478 14.9464 20.8043 13.0711 18.9289C11.1957 17.0536 8.65216 16 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C10.8043 24.9464 13.3478 26 16 26Z"
									fill="url(#paint2_linear_18384_533)"
									shapeRendering="crispEdges"
								/>
							</g>
						</g>
						<defs>
							<filter
								id="filter0_iii_18384_533"
								x="0"
								y="-1"
								width="32"
								height="34"
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
									result="effect1_innerShadow_18384_533"
								/>
								<feOffset />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="shape"
									result="effect1_innerShadow_18384_533"
								/>
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="1" />
								<feGaussianBlur stdDeviation="0.5" />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="effect1_innerShadow_18384_533"
									result="effect2_innerShadow_18384_533"
								/>
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="-1" />
								<feGaussianBlur stdDeviation="0.5" />
								<feComposite
									in2="hardAlpha"
									operator="arithmetic"
									k2="-1"
									k3="1"
								/>
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="effect2_innerShadow_18384_533"
									result="effect3_innerShadow_18384_533"
								/>
							</filter>
							<filter
								id="filter1_d_18384_533"
								x="5.04031"
								y="5.76008"
								width="21.9194"
								height="21.9194"
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
									result="effect1_dropShadow_18384_533"
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
									result="effect1_dropShadow_18384_533"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_18384_533"
									result="shape"
								/>
							</filter>
							<linearGradient
								id="paint0_linear_18384_533"
								x1="16"
								y1="3.97364e-07"
								x2="17.3333"
								y2="32"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" stopOpacity="0" />
								<stop offset="1" stopColor="white" stopOpacity="0.15" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_18384_533"
								x1="16"
								y1="0"
								x2="16"
								y2="32"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" stopOpacity="0.2" />
								<stop offset="1" stopColor="white" stopOpacity="0" />
							</linearGradient>
							<linearGradient
								id="paint2_linear_18384_533"
								x1="16"
								y1="6"
								x2="16"
								y2="26"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0.5" />
							</linearGradient>
						</defs>
					</svg>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Qubio Inc.</span>
						<span className="text-fg-secondary text-xs">84 members</span>
					</div>
					<Badge variant="outline" color="neutral">
						Free
					</Badge>
				</DropdownCheckboxItem>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("personal")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("personal", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z"
							fill="#271862"
						/>
						<path
							d="M8.71577 21H6.74702L10.3315 10.8182H12.6085L16.198 21H14.2293L11.5098 12.9062H11.4303L8.71577 21ZM8.7804 17.0078H14.1497V18.4893H8.7804V17.0078ZM17.3991 21V10.8182H21.2968C22.0326 10.8182 22.6441 10.9342 23.1314 11.1662C23.6219 11.3949 23.9881 11.7081 24.2301 12.1058C24.4753 12.5036 24.598 12.9543 24.598 13.4581C24.598 13.8724 24.5184 14.227 24.3593 14.522C24.2002 14.8137 23.9865 15.0507 23.718 15.233C23.4495 15.4152 23.1496 15.5462 22.8181 15.6257V15.7251C23.1794 15.745 23.5258 15.8561 23.8572 16.0582C24.192 16.2571 24.4654 16.5388 24.6775 16.9034C24.8896 17.268 24.9957 17.7088 24.9957 18.2259C24.9957 18.7528 24.8681 19.2268 24.6129 19.6477C24.3577 20.0653 23.9732 20.3951 23.4595 20.6371C22.9457 20.879 22.2994 21 21.5206 21H17.3991ZM19.2436 19.4588H21.2272C21.8967 19.4588 22.379 19.3312 22.674 19.076C22.9723 18.8175 23.1214 18.486 23.1214 18.0817C23.1214 17.7801 23.0468 17.5083 22.8977 17.2663C22.7485 17.0211 22.5364 16.8288 22.2613 16.6896C21.9862 16.5471 21.6581 16.4759 21.2769 16.4759H19.2436V19.4588ZM19.2436 15.1484H21.0681C21.3863 15.1484 21.673 15.0904 21.9282 14.9744C22.1834 14.8551 22.384 14.6877 22.5298 14.4723C22.6789 14.2536 22.7535 13.995 22.7535 13.6967C22.7535 13.3023 22.6143 12.9775 22.3359 12.7223C22.0608 12.4671 21.6515 12.3395 21.1079 12.3395H19.2436V15.1484Z"
							fill="#9981F8"
						/>
					</svg>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Personal</span>
						<span className="text-fg-secondary text-xs">Just You</span>
					</div>
					<Badge variant="outline" color="neutral">
						Free
					</Badge>
				</DropdownCheckboxItem>
				<DropdownDivider />
				<DropdownItem>
					<Plus />
					Create Workspace
				</DropdownItem>
				<DropdownItem>
					<Link2 />
					Join with invite link
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	)
}

export default DropdownWithCheckboxExample
