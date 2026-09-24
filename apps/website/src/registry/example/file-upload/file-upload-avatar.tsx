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
							width="80"
							height="80"
							viewBox="0 0 80 80"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_15139_40857)">
								<rect width="80" height="80" fill="#9CA1AB" />
								<path
									d="M12 87C12 71.5636 24 59 40 59C56 59 68 71.5636 68 87H12Z"
									fill="#EEEFF1"
								/>
								<path
									d="M40.0184 49C48.8358 49 56 41.8358 56 33.0184C56 24.2009 48.8358 17 40.0184 17C31.2009 17 24 24.1642 24 32.9816C24 41.7991 31.1642 48.9633 39.9816 48.9633L40.0184 49Z"
									fill="#EEEFF1"
								/>
							</g>
							<defs>
								<clipPath id="clip0_15139_40857">
									<rect width="80" height="80" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</AvatarFallback>
				</Avatar>

				{/* Text + Actions */}
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<p className="text-fg text-sm leading-none font-medium">
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
