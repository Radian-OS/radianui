"use client"

import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SocialButtonPreview = () => {
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	type disabledType = "true" | "false"
	type socials = "google" | "apple" | "facebook" | "X" | "github"
	type variant = "outline" | "strong"

	const [size, setSize] = useState<sizes>("36")
	const [disabled, setDisabled] = useState<disabledType>("false")
	const [socials, setSocials] = useState<socials>("google")
	const [variant, setVariant] = useState<variant>("outline")

	const getCodeDisplay = () => {
		if (socials === "google" && variant === "strong") {
			return `<Button ${disabled === "true" ? "disabled" : ""} size={${size}} variant="strong" 
className="bg-[#3B7DED] hover:bg-[#3B7DED]/90  focus-visible:ring-[#3B7DED]">
<GoogleIcon/>
Continue with Google
</Button>`
		}

		if (socials === "google" && variant === "outline") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  variant="${variant}" 
  ${variant === "outline" ? `color="neutral"` : ``}
  >
  <GoogleIcon/>
  Continue with Google
  </Button>`
		}

		if (socials === "apple" && variant === "outline") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  variant="${variant}" 
  color="neutral"
  >
  <AppleIcon/>
  Continue with Apple
  </Button>`
		}

		if (socials === "apple" && variant === "strong") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  color="neutral"
  >
  <AppleIcon/>
  Continue with Apple
  </Button>`
		}

		if (socials === "facebook" && variant === "outline") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  color="neutral"
  variant="${variant}" 
  >
  <FacebookIcon/>
  Continue with Facebook
  </Button>`
		}

		if (socials === "facebook" && variant === "strong") {
			return `<Button 
className="bg-[#1778F2] hover:bg-[#1778f2]/90  focus-visible:ring-[#1778F2]"
disabled={${disabled}} 
size={${size}}  >
<FacebookIcon/>
Continue with Facebook
</Button>`
		}

		if (socials === "X" && variant === "outline") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  variant="${variant}"
  color="neutral" 
  >
  <XIcon/>
  Continue with X(Twitter)
  </Button>`
		}

		if (socials === "X" && variant === "strong") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  variant="${variant}"
  color="neutral"
  >
  <XIcon/>
  Continue with X(Twitter)
  </Button>`
		}

		if (socials === "github" && variant === "outline") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  variant="${variant}" 
  color="neutral"
  >
  <GithubIcon/>
  Continue with Github
  </Button>`
		}

		if (socials === "github" && variant === "strong") {
			return `<Button 
  disabled={${disabled === "true" ? true : false}}
  size={${size}}
  color="neutral"
  >
  <GithubIcon/>
  Continue with Github
  </Button>`
		}
	}

	const getButtonDisplay = () => {
		if (socials === "google" && variant === "strong") {
			return (
				<Button
					asChild
					disabled={disabled === "true" ? true : false}
					size={size}
					variant="strong"
					className="bg-[#3B7DED] hover:bg-[#3B7DED]/90 focus-visible:ring-[#3B7DED] disabled:bg-[#3B7DED]/50">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.9989 12.0436C22.0132 13.7997 21.5561 15.5273 20.6756 17.0455C19.795 18.5638 18.5234 19.8169 16.9938 20.6736C15.4887 21.5475 13.782 22.0123 12.0425 22.022C10.2955 22.0108 8.58168 21.5419 7.0712 20.662C5.56072 19.7821 4.30603 18.5217 3.43157 17.0059C2.52806 15.5064 2.03433 13.7949 2 12.0436C2.00067 10.2855 2.46482 8.55875 3.34546 7.03821C4.21992 5.52235 5.47461 4.26196 6.98509 3.38205C8.49557 2.50214 10.2093 2.0333 11.9564 2.02203C14.3631 2.03117 16.6861 2.90805 18.5007 4.49237C18.5662 4.55391 18.6185 4.62827 18.6541 4.71083C18.6898 4.7934 18.7082 4.88243 18.7082 4.97241C18.7082 5.06239 18.6898 5.15142 18.6541 5.23399C18.6185 5.31655 18.5662 5.39091 18.5007 5.45245L16.6494 7.3079C16.5292 7.41482 16.3741 7.47386 16.2135 7.47386C16.0528 7.47386 15.8977 7.41482 15.7775 7.3079C14.728 6.42682 13.4112 5.92862 12.0425 5.89474C10.9744 5.89256 9.92469 6.17388 9.0002 6.7101C8.0757 7.24632 7.30936 8.01831 6.77908 8.9476C6.21851 9.88336 5.91752 10.9522 5.90723 12.0436C5.91244 13.1129 6.19828 14.1621 6.73604 15.0857C7.2754 16.0133 8.0509 16.7808 8.98325 17.3096C9.91559 17.8384 10.9713 18.1096 12.0425 18.0954C13.1086 18.094 14.1555 17.8112 15.0779 17.2755C16.261 16.567 17.1769 15.486 17.6827 14.2011H13.1189C13.0332 14.2011 12.9483 14.184 12.8692 14.1508C12.7902 14.1176 12.7185 14.069 12.6584 14.0077C12.5983 13.9465 12.5509 13.8739 12.5191 13.7941C12.4873 13.7143 12.4716 13.629 12.4731 13.5431V10.9649C12.4716 10.8795 12.4873 10.7946 12.5193 10.7154C12.5512 10.6363 12.5987 10.5643 12.659 10.5039C12.7193 10.4435 12.791 10.3959 12.87 10.3639C12.9491 10.3319 13.0337 10.3161 13.1189 10.3176H21.267C21.4212 10.3155 21.571 10.3686 21.6895 10.4676C21.8079 10.5665 21.8872 10.7046 21.9128 10.857C21.9772 11.2491 22.0061 11.6463 21.9989 12.0436Z"
								fill="currentColor"
							/>
						</svg>
						Continue with Google
					</div>
				</Button>
			)
		}
		if (socials === "google" && variant === "outline") {
			return (
				<Button asChild disabled={disabled === "true" ? true : false} size={size} color="neutral" variant="outline">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18.55 19.55C18.0663 19.9611 17.5477 20.3291 17 20.65C14.7044 21.9769 11.9759 22.3377 9.41428 21.6533C6.85269 20.9688 4.6678 19.295 3.34 17C3.23018 16.8188 3.13004 16.6318 3.04 16.44L6.24 13.94C6.65125 15.1428 7.42682 16.1877 8.45903 16.9296C9.49124 17.6715 10.7288 18.0736 12 18.08C13.0547 18.0751 14.0895 17.7923 15 17.26C15.0991 17.2095 15.1929 17.1492 15.28 17.08L18.55 19.55Z"
								fill="#2BA24C"
							/>
							<path
								d="M5.91 12C5.9123 12.6572 6.02382 13.3094 6.24 13.93L3 16.43C2.33133 15.0495 1.98917 13.5338 2 12C1.99548 10.4277 2.36934 8.87739 3.09 7.47998L6.26 9.99998C6.02665 10.6409 5.90816 11.3179 5.91 12Z"
								fill="#F0B501"
							/>
							<path
								d="M18.59 5.40998L16.74 7.25998C16.619 7.36821 16.4623 7.42805 16.3 7.42805C16.1377 7.42805 15.981 7.36821 15.86 7.25998C15.1742 6.70071 14.3743 6.29841 13.5164 6.08136C12.6585 5.8643 11.7635 5.83776 10.8943 6.0036C10.0251 6.16944 9.20271 6.52364 8.48501 7.0413C7.76731 7.55895 7.17168 8.22751 6.74 8.99998C6.55409 9.32025 6.3936 9.65461 6.26 9.99998L3.09 7.47998C3.17 7.31998 3.25 7.15998 3.34 7.00998C4.07676 5.73504 5.086 4.63854 6.29562 3.79881C7.50524 2.95909 8.88537 2.39687 10.3374 2.15231C11.7895 1.90775 13.2777 1.98689 14.6956 2.38408C16.1135 2.78127 17.4263 3.4867 18.54 4.44998C18.6087 4.5082 18.6648 4.57986 18.7047 4.66055C18.7447 4.74124 18.7677 4.82925 18.7724 4.91918C18.7771 5.00911 18.7633 5.09904 18.732 5.18345C18.7006 5.26785 18.6523 5.34495 18.59 5.40998Z"
								fill="#E43E2B"
							/>
							<path
								d="M22 12.08C22.0083 13.502 21.7035 14.9084 21.1073 16.1993C20.511 17.4903 19.6379 18.6343 18.55 19.55L15.31 17.08C16.3885 16.3857 17.2184 15.3667 17.68 14.17H13.09C13.0043 14.1713 12.9191 14.1554 12.8397 14.1232C12.7602 14.0911 12.688 14.0432 12.6274 13.9826C12.5667 13.922 12.5189 13.8498 12.4867 13.7703C12.4545 13.6908 12.4386 13.6057 12.44 13.52V10.91C12.4386 10.8247 12.4545 10.74 12.4868 10.6611C12.5191 10.5821 12.5671 10.5106 12.6279 10.4507C12.6887 10.3909 12.761 10.344 12.8404 10.3129C12.9198 10.2819 13.0047 10.2673 13.09 10.27H21.24C21.393 10.2693 21.5414 10.3218 21.66 10.4185C21.7786 10.5151 21.8599 10.65 21.89 10.8C21.9653 11.2224 22.0021 11.6509 22 12.08Z"
								fill="#3B7DED"
							/>
						</svg>
						Continue with Google
					</div>
				</Button>
			)
		}
		if (socials === "apple" && variant === "outline") {
			return (
				<Button asChild color="neutral" disabled={disabled === "true" ? true : false} size={size} variant="outline">
					<div>
						<svg className="text-fg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M19.8892 8.74791C19.1582 9.13547 18.5573 9.72959 18.1615 10.4562C17.7657 11.1829 17.5925 12.0099 17.6635 12.8343C17.7186 13.6647 18.0047 14.4631 18.4896 15.1394C18.9744 15.8157 19.6387 16.343 20.4074 16.6617C20.4115 16.693 20.4115 16.7246 20.4074 16.7559C19.8807 18.2791 19.047 19.6779 17.9579 20.8659C17.5333 21.3892 16.9508 21.761 16.2974 21.9258C15.8124 22.0108 15.3138 21.9702 14.8489 21.808C14.3543 21.6549 13.8715 21.4547 13.3651 21.3134C12.4758 21.1021 11.542 21.1848 10.7036 21.5489C10.2753 21.7055 9.83891 21.8391 9.39639 21.9493C9.12913 22.0108 8.85203 22.0164 8.5825 21.9657C8.31297 21.9151 8.05682 21.8093 7.83012 21.6549C7.29238 21.3068 6.81504 20.8732 6.41695 20.3713C5.00268 18.6502 4.07912 16.5793 3.74369 14.3771C3.4376 12.8871 3.5895 11.3394 4.17942 9.93733C4.49758 9.15653 5.00567 8.46752 5.65758 7.93283C6.30949 7.39814 7.08459 7.03469 7.91256 6.87545C8.67323 6.73068 9.45897 6.79582 10.1854 7.06388L11.7399 7.59382C12.0127 7.6991 12.315 7.6991 12.5878 7.59382C13.2464 7.34038 13.9187 7.12413 14.6016 6.94611C15.5156 6.68219 16.487 6.69213 17.3955 6.97471C18.3039 7.25729 19.1095 7.8001 19.7126 8.53594L19.8892 8.74791Z"
								fill="currentColor"
							/>
							<path
								d="M16.1914 2C16.2569 2.61464 16.1762 3.23606 15.9558 3.81358C15.5481 4.86649 14.7916 5.74772 13.8125 6.31019C13.3248 6.60052 12.7667 6.75125 12.1992 6.74592C12.0461 6.74592 12.0107 6.74592 11.999 6.54572C11.9738 5.56439 12.2949 4.60553 12.9057 3.83713C13.6472 2.85813 14.7416 2.20738 15.9558 2.02355L16.1914 2Z"
								fill="currentColor"
							/>
						</svg>
						Continue with Apple
					</div>
				</Button>
			)
		}
		if (socials === "apple" && variant === "strong") {
			return (
				<Button asChild disabled={disabled === "true" ? true : false} size={size} color="neutral">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M19.8892 8.74791C19.1582 9.13547 18.5573 9.72959 18.1615 10.4562C17.7657 11.1829 17.5925 12.0099 17.6635 12.8343C17.7186 13.6647 18.0047 14.4631 18.4896 15.1394C18.9744 15.8157 19.6387 16.343 20.4074 16.6617C20.4115 16.693 20.4115 16.7246 20.4074 16.7559C19.8807 18.2791 19.047 19.6779 17.9579 20.8659C17.5333 21.3892 16.9508 21.761 16.2974 21.9258C15.8124 22.0108 15.3138 21.9702 14.8489 21.808C14.3543 21.6549 13.8715 21.4547 13.3651 21.3134C12.4758 21.1021 11.542 21.1848 10.7036 21.5489C10.2753 21.7055 9.83891 21.8391 9.39639 21.9493C9.12913 22.0108 8.85203 22.0164 8.5825 21.9657C8.31297 21.9151 8.05682 21.8093 7.83012 21.6549C7.29238 21.3068 6.81504 20.8732 6.41695 20.3713C5.00268 18.6502 4.07912 16.5793 3.74369 14.3771C3.4376 12.8871 3.5895 11.3394 4.17942 9.93733C4.49758 9.15653 5.00567 8.46752 5.65758 7.93283C6.30949 7.39814 7.08459 7.03469 7.91256 6.87545C8.67323 6.73068 9.45897 6.79582 10.1854 7.06388L11.7399 7.59382C12.0127 7.6991 12.315 7.6991 12.5878 7.59382C13.2464 7.34038 13.9187 7.12413 14.6016 6.94611C15.5156 6.68219 16.487 6.69213 17.3955 6.97471C18.3039 7.25729 19.1095 7.8001 19.7126 8.53594L19.8892 8.74791Z"
								fill="currentColor"
							/>
							<path
								d="M16.1914 2C16.2569 2.61464 16.1762 3.23606 15.9558 3.81358C15.5481 4.86649 14.7916 5.74772 13.8125 6.31019C13.3248 6.60052 12.7667 6.75125 12.1992 6.74592C12.0461 6.74592 12.0107 6.74592 11.999 6.54572C11.9738 5.56439 12.2949 4.60553 12.9057 3.83713C13.6472 2.85813 14.7416 2.20738 15.9558 2.02355L16.1914 2Z"
								fill="currentColor"
							/>
						</svg>
						Continue with Apple
					</div>
				</Button>
			)
		}
		if (socials === "facebook" && variant === "outline") {
			return (
				<Button asChild color="neutral" className="disabled:bg-bg/50" disabled={disabled === "true" ? true : false} size={size} variant="outline">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.9999 12.0794C21.9885 14.5348 21.0741 16.9002 19.431 18.7249C17.7878 20.5495 15.5308 21.7058 13.0899 21.9734V14.7989H15.4391C15.5428 14.7997 15.6431 14.7625 15.7212 14.6942C15.7992 14.6259 15.8494 14.5314 15.8624 14.4285L16.1163 12.2275C16.1256 12.1696 16.1221 12.1105 16.1061 12.0541C16.0901 11.9977 16.0619 11.9455 16.0236 11.9012C15.9853 11.8568 15.9378 11.8214 15.8843 11.7973C15.8309 11.7733 15.7728 11.7612 15.7142 11.7619H13.0899V9.963C13.0899 9.12703 13.3227 8.55561 14.5185 8.55561H15.6296C15.74 8.55285 15.845 8.50704 15.9221 8.42796C15.9992 8.34887 16.0423 8.24279 16.0423 8.13234V6.23818C16.0395 6.12777 15.9937 6.0228 15.9146 5.9457C15.8355 5.86859 15.7294 5.82546 15.619 5.82549H13.8201C13.3148 5.78923 12.8076 5.8637 12.334 6.04369C11.8605 6.22369 11.4319 6.50487 11.0782 6.86761C10.7246 7.23035 10.4543 7.66591 10.2864 8.14388C10.1184 8.62185 10.0568 9.13072 10.1058 9.63496V11.7513H8.33867C8.28358 11.7513 8.22903 11.7623 8.17826 11.7837C8.12749 11.8051 8.08152 11.8365 8.04305 11.8759C8.00459 11.9154 7.97441 11.9621 7.95431 12.0134C7.9342 12.0647 7.92457 12.1195 7.92598 12.1746V14.3756C7.92598 14.4851 7.96946 14.5901 8.04686 14.6675C8.12425 14.7448 8.22922 14.7883 8.33867 14.7883H10.1058V21.8253C7.83671 21.3876 5.78921 20.1775 4.31148 18.4007C2.83374 16.624 2.01701 14.3903 2.00014 12.0794C1.99315 10.759 2.24769 9.45041 2.74909 8.22898C3.25049 7.00755 3.98881 5.8975 4.92144 4.9629C5.85408 4.02829 6.96257 3.28763 8.18294 2.78366C9.40332 2.27969 10.7114 2.02239 12.0317 2.0266C13.3467 2.03076 14.648 2.29423 15.861 2.80195C17.0741 3.30966 18.175 4.05164 19.1009 4.9854C20.0268 5.91917 20.7595 7.02639 21.2569 8.24367C21.7544 9.46095 22.0068 10.7644 21.9999 12.0794Z"
								fill="#1778F2"
							/>
						</svg>
						Continue with Facebook
					</div>
				</Button>
			)
		}
		if (socials === "facebook" && variant === "strong") {
			return (
				<Button asChild className="bg-[#1778F2] hover:bg-[#1778f2]/90 focus-visible:ring-[#1778F2]" disabled={disabled === "true" ? true : false} size={size}>
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.9999 12.0794C21.9885 14.5348 21.0741 16.9002 19.431 18.7249C17.7878 20.5495 15.5308 21.7058 13.0899 21.9734V14.7989H15.4391C15.5428 14.7997 15.6431 14.7625 15.7212 14.6942C15.7992 14.6259 15.8494 14.5314 15.8624 14.4285L16.1163 12.2275C16.1256 12.1696 16.1221 12.1105 16.1061 12.0541C16.0901 11.9977 16.0619 11.9455 16.0236 11.9012C15.9853 11.8568 15.9378 11.8214 15.8843 11.7973C15.8309 11.7733 15.7728 11.7612 15.7142 11.7619H13.0899V9.963C13.0899 9.12703 13.3227 8.55561 14.5185 8.55561H15.6296C15.74 8.55285 15.845 8.50704 15.9221 8.42796C15.9992 8.34887 16.0423 8.24279 16.0423 8.13234V6.23818C16.0395 6.12777 15.9937 6.0228 15.9146 5.9457C15.8355 5.86859 15.7294 5.82546 15.619 5.82549H13.8201C13.3148 5.78923 12.8076 5.8637 12.334 6.04369C11.8605 6.22369 11.4319 6.50487 11.0782 6.86761C10.7246 7.23035 10.4543 7.66591 10.2864 8.14388C10.1184 8.62185 10.0568 9.13072 10.1058 9.63496V11.7513H8.33867C8.28358 11.7513 8.22903 11.7623 8.17826 11.7837C8.12749 11.8051 8.08152 11.8365 8.04305 11.8759C8.00459 11.9154 7.97441 11.9621 7.95431 12.0134C7.9342 12.0647 7.92457 12.1195 7.92598 12.1746V14.3756C7.92598 14.4851 7.96946 14.5901 8.04686 14.6675C8.12425 14.7448 8.22922 14.7883 8.33867 14.7883H10.1058V21.8253C7.83671 21.3876 5.78921 20.1775 4.31148 18.4007C2.83374 16.624 2.01701 14.3903 2.00014 12.0794C1.99315 10.759 2.24769 9.45041 2.74909 8.22898C3.25049 7.00755 3.98881 5.8975 4.92144 4.9629C5.85408 4.02829 6.96257 3.28763 8.18294 2.78366C9.40332 2.27969 10.7114 2.02239 12.0317 2.0266C13.3467 2.03076 14.648 2.29423 15.861 2.80195C17.0741 3.30966 18.175 4.05164 19.1009 4.9854C20.0268 5.91917 20.7595 7.02639 21.2569 8.24367C21.7544 9.46095 22.0068 10.7644 21.9999 12.0794Z"
								fill="currentColor"
							/>
						</svg>
						Continue with Facebook
					</div>
				</Button>
			)
		}
		if (socials === "X" && variant === "outline") {
			return (
				<Button asChild color="neutral" disabled={disabled === "true" ? true : false} size={size} variant="outline">
					<div>
						<svg className="text-fg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M17.7512 3H20.818L14.1179 10.6246L22 21H15.8284L10.9946 14.7074L5.46359 21H2.39494L9.5613 12.8446L2 3H8.32828L12.6976 8.75169L17.7512 3ZM16.6748 19.1723H18.3742L7.4049 4.73169H5.58133L16.6748 19.1723Z"
								fill="currentColor"
							/>
						</svg>
						Continue with X(Twitter)
					</div>
				</Button>
			)
		}
		if (socials === "X" && variant === "strong") {
			return (
				<Button asChild disabled={disabled === "true" ? true : false} size={size} color="neutral">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M17.7512 3H20.818L14.1179 10.6246L22 21H15.8284L10.9946 14.7074L5.46359 21H2.39494L9.5613 12.8446L2 3H8.32828L12.6976 8.75169L17.7512 3ZM16.6748 19.1723H18.3742L7.4049 4.73169H5.58133L16.6748 19.1723Z"
								fill="currentColor"
							/>
						</svg>
						Continue with X(Twitter)
					</div>
				</Button>
			)
		}

		if (socials === "github" && variant === "outline") {
			return (
				<Button asChild color="neutral" disabled={disabled === "true" ? true : false} size={size} variant="outline">
					<div>
						<svg className="text-fg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M11.9633 2.38196C0.554219 2.62051 -1.82095 17.9295 8.85177 21.6012C9.34962 21.6945 9.53632 21.3833 9.53632 21.124C9.53632 20.8647 9.53632 20.2735 9.53632 19.4438C6.74627 20.0454 6.15506 18.1266 6.15506 18.1266C5.96795 17.5265 5.57009 17.0144 5.0349 16.6849C4.13255 16.0729 5.1075 16.0833 5.1075 16.0833C5.42624 16.1254 5.73084 16.241 5.99724 16.421C6.26364 16.601 6.48455 16.8405 6.64254 17.1205C6.92549 17.6131 7.39049 17.9749 7.93748 18.1281C8.48448 18.2814 9.06977 18.2138 9.56744 17.9399C9.61868 17.4406 9.84242 16.9747 10.2001 16.6226C7.97016 16.3737 5.63646 15.5232 5.63646 11.7478C5.62244 10.7644 5.99486 9.81471 6.67366 9.10297C6.35965 8.24547 6.39693 7.29866 6.77738 6.4685C6.77738 6.4685 7.61751 6.2092 9.53632 7.50569C11.1799 7.05965 12.9127 7.05965 14.5563 7.50569C16.4648 6.22995 17.3049 6.4685 17.3049 6.4685C17.6699 7.29557 17.7033 8.23123 17.3982 9.08223C18.077 9.79397 18.4495 10.7436 18.4354 11.7271C18.4354 15.5128 16.0914 16.353 13.8614 16.5915C14.8986 17.1412 14.463 20.6781 14.5252 21.1137C14.5252 21.373 14.7015 21.6841 15.2201 21.5908C25.8617 17.9502 23.3725 2.62051 11.9633 2.38196Z"
								fill="currentColor"
							/>
						</svg>
						Continue with Github
					</div>
				</Button>
			)
		}

		if (socials === "github" && variant === "strong") {
			return (
				<Button asChild disabled={disabled === "true" ? true : false} size={size} color="neutral">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M11.9633 2.38196C0.554219 2.62051 -1.82095 17.9295 8.85177 21.6012C9.34962 21.6945 9.53632 21.3833 9.53632 21.124C9.53632 20.8647 9.53632 20.2735 9.53632 19.4438C6.74627 20.0454 6.15506 18.1266 6.15506 18.1266C5.96795 17.5265 5.57009 17.0144 5.0349 16.6849C4.13255 16.0729 5.1075 16.0833 5.1075 16.0833C5.42624 16.1254 5.73084 16.241 5.99724 16.421C6.26364 16.601 6.48455 16.8405 6.64254 17.1205C6.92549 17.6131 7.39049 17.9749 7.93748 18.1281C8.48448 18.2814 9.06977 18.2138 9.56744 17.9399C9.61868 17.4406 9.84242 16.9747 10.2001 16.6226C7.97016 16.3737 5.63646 15.5232 5.63646 11.7478C5.62244 10.7644 5.99486 9.81471 6.67366 9.10297C6.35965 8.24547 6.39693 7.29866 6.77738 6.4685C6.77738 6.4685 7.61751 6.2092 9.53632 7.50569C11.1799 7.05965 12.9127 7.05965 14.5563 7.50569C16.4648 6.22995 17.3049 6.4685 17.3049 6.4685C17.6699 7.29557 17.7033 8.23123 17.3982 9.08223C18.077 9.79397 18.4495 10.7436 18.4354 11.7271C18.4354 15.5128 16.0914 16.353 13.8614 16.5915C14.8986 17.1412 14.463 20.6781 14.5252 21.1137C14.5252 21.373 14.7015 21.6841 15.2201 21.5908C25.8617 17.9502 23.3725 2.62051 11.9633 2.38196Z"
								fill="currentColor"
							/>
						</svg>
						Continue with Github
					</div>
				</Button>
			)
		}
	}

	return (
		<Tabs className="" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						{/* Size Selector */}
						<DropdownSub>
							<DropdownSubTrigger>size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as sizes)}>
									<DropdownRadioItem value="28" onSelect={(e) => e.preventDefault()}>
										28
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32
									</DropdownRadioItem>
									<DropdownRadioItem value="36" onSelect={(e) => e.preventDefault()}>
										36
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40
									</DropdownRadioItem>
									<DropdownRadioItem value="44" onSelect={(e) => e.preventDefault()}>
										44
									</DropdownRadioItem>
									<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
										48
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						{/* Disabled Selector */}
						<DropdownSub>
							<DropdownSubTrigger>disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as disabledType)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										true
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										false
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						{/* Social Selector */}
						<DropdownSub>
							<DropdownSubTrigger>social</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={socials} onValueChange={(value) => setSocials(value as socials)}>
									<DropdownRadioItem value="google" onSelect={(e) => e.preventDefault()}>
										Google
									</DropdownRadioItem>
									<DropdownRadioItem value="apple" onSelect={(e) => e.preventDefault()}>
										Apple
									</DropdownRadioItem>
									<DropdownRadioItem value="facebook" onSelect={(e) => e.preventDefault()}>
										Facebook
									</DropdownRadioItem>
									<DropdownRadioItem value="X" onSelect={(e) => e.preventDefault()}>
										X
									</DropdownRadioItem>
									<DropdownRadioItem value="github" onSelect={(e) => e.preventDefault()}>
										GitHub
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as variant)}>
									<DropdownRadioItem value="outline" onSelect={(e) => e.preventDefault()}>
										Outline
									</DropdownRadioItem>
									<DropdownRadioItem value="strong" onSelect={(e) => e.preventDefault()}>
										Strong
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			{/* PREVIEW */}
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-3 overflow-auto rounded-xl border">{getButtonDisplay()}</div>
			</TabsContent>

			{/* CODE DISPLAY */}
			<TabsContent value="code">
				<CodeSnippet title="social-button.tsx" showLineNumber className="h-[420px]" code={getCodeDisplay()! || ""} />
			</TabsContent>
		</Tabs>
	)
}

export default SocialButtonPreview
