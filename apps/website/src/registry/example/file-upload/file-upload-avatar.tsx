"use client"

import { TriangleAlert, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { formatBytes, useFileUpload } from "@/registry/ui/file-upload"

export default function FileUploadAvatar() {
	const [{ files, errors }, { removeFile, openFileDialog, getInputProps }] =
		useFileUpload({
			maxFiles: 1,
			accept: "image/*",
			multiple: false,
		})

	const currentFile = files[0]
	const previewUrl = currentFile?.preview

	const handleRemove = () => {
		if (currentFile) {
			removeFile(currentFile.id)
		}
	}

	return (
		<div className="flex flex-col items-start gap-3">
			<div className={cn("flex items-center gap-4")}>
				<input {...getInputProps()} className="sr-only" />

				{/* Avatar */}
				<Avatar
					size="48"
					rounded="square"
					className="cursor-pointer self-start"
					onClick={!previewUrl ? openFileDialog : undefined}>
					<AvatarImage src={previewUrl ?? undefined} alt="Uploaded avatar" />
					<AvatarFallback delayMs={0} className="bg-fill4 overflow-hidden">
						<svg
							width="100"
							height="100"
							viewBox="0 0 36 36"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<defs>
								<clipPath id="clip0_5846_11264">
									<rect width="36" height="36" rx={20} ry={20} fill="white" />
								</clipPath>
							</defs>
							<g clipPath="url(#clip0_5846_11264)">
								<path
									d="M5.3999 36C5.3999 29.0536 10.7999 23.4 17.9999 23.4C25.1999 23.4 30.5999 29.0536 30.5999 36"
									className="fill-elevation-level1"
								/>
								<path
									d="M18.0081 19.8C21.9759 19.8 25.1998 16.5761 25.1998 12.6083C25.1998 8.64044 21.9759 5.40002 18.0081 5.40002C14.0402 5.40002 10.7998 8.6239 10.7998 12.5918C10.7998 16.5596 14.0237 19.7835 17.9915 19.7835C18.0081 19.8"
									className="fill-elevation-level1"
								/>
							</g>
						</svg>
					</AvatarFallback>
				</Avatar>

				{/* Text + Actions */}
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<p className="text-fg text-sm font-medium leading-none">
							Upload Image
						</p>
						<p className="text-fg-secondary text-xs font-normal">
							Preferred size 1:1, up to {formatBytes(5 * 1024 * 1024)}
						</p>
					</div>

					{previewUrl ? (
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								color="error"
								onClick={handleRemove}
								size="28">
								Remove
							</Button>
							<Button
								variant="outline"
								color="neutral"
								size="28"
								onClick={openFileDialog}>
								Change
							</Button>
						</div>
					) : (
						<Button
							variant="outline"
							color="neutral"
							size="28"
							onClick={openFileDialog}
							className="w-fit">
							<Upload />
							Upload
						</Button>
					)}
				</div>
			</div>

			{errors.length > 0 && (
				<Alert variant="soft" color="error">
					<AlertIcon>
						<TriangleAlert />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>File upload error(s)</AlertTitle>
						<AlertDescription>
							{errors.map((error, index) => (
								<p key={index} className="last:mb-0">
									{error}
								</p>
							))}
						</AlertDescription>
					</AlertContent>
				</Alert>
			)}
		</div>
	)
}
