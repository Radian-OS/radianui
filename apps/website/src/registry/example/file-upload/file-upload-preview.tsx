"use client"

import { TriangleAlert, User, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/styles/default/ui/alert"
import { IconButton } from "@/styles/default/ui/button"
import { formatBytes, useFileUpload } from "@/styles/default/ui/file-upload"

const FileUploadPreview = () => {
	const [
		{ files, isDragging, errors },
		{
			removeFile,
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			getInputProps,
		},
	] = useFileUpload({
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
		<div className="flex flex-col items-center gap-4">
			<div className="relative">
				<div
					className={cn(
						"group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors",
						isDragging
							? "border-primary bg-primary-focus"
							: "border-fg-secondary hover:border-fg-tertiary",
						previewUrl && "border-solid"
					)}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					onClick={openFileDialog}>
					<input {...getInputProps()} className="sr-only" />
					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Avatar"
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center">
							<User className="text-fg size-6" />
						</div>
					)}
				</div>
				{currentFile && (
					<IconButton
						variant="strong"
						color="neutral"
						onClick={handleRemove}
						className="absolute end-0 top-0 size-7 rounded-full"
						aria-label="Remove avatar">
						<X className="size-3.5" />
					</IconButton>
				)}
			</div>
			<div className="space-y-0.5 text-center">
				<p className="text-sm font-medium">
					{currentFile ? "Avatar uploaded" : "Upload avatar"}
				</p>
				<p className="text-fg text-xs">
					PNG, JPG up to {formatBytes(2 * 1024 * 1024)}
				</p>
			</div>
			{errors.length > 0 && (
				<Alert variant="soft" color="error" className="mt-5">
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

export default FileUploadPreview
