import React, { useEffect } from "react"
import { useState } from "react"
import { Upload } from "lucide-react"
import { AlertCircleIcon, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { usePlayground } from "@/contexts/playground"
import { Button, IconButton } from "@/registry/ui/button"
import { FileMetadata, useFileUpload } from "@/registry/ui/file-upload"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

interface ImagePreviewProps {
	file: {
		id: string
		preview?: string
		file: File | FileMetadata
	}
	size?: number
}

export function ImagePreview({ file, size = 8 }: ImagePreviewProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	const handleImageLoad = () => {
		setIsLoading(false)
	}

	const handleImageError = () => {
		setIsLoading(false)
		setHasError(true)
	}

	return (
		<div className={`bg-primary-focus relative size-${size} cursor-pointer rounded-md transition-all`} onClick={() => file.preview}>
			{/* Loading state - maintains full dimensions */}
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center rounded-[inherit]">
					<Loader2 className="size-6 animate-spin opacity-60" />
				</div>
			)}

			{/* Error state */}
			{hasError && (
				<div className="absolute inset-0 flex items-center justify-center rounded-[inherit]">
					<ImageIcon className="size-6 opacity-40" />
				</div>
			)}

			{/* Image */}
			<img
				src={file.preview}
				alt={file.file.name}
				className={`size-${size} rounded-[inherit] object-cover transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
				onLoad={handleImageLoad}
				onError={handleImageError}
			/>
		</div>
	)
}

export default function Uploads() {
	const maxSizeMB = 10
	const maxSize = maxSizeMB * 1024 * 1024
	const maxFiles = 1

	const { setLogoImage } = usePlayground()

	const [{ files, isDragging, errors }, { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps }] = useFileUpload({
		accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
		maxSize,
		multiple: false,
		maxFiles,
	})
	useEffect(() => {
		if (files.length > 0) {
			setLogoImage?.(files[0].preview || undefined)
		}
	}, [files])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<Image alt="" height={18} width={18} src="/mstile-70x70.png" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="p-3" sideOffset={10}>
				<div className="flex flex-col gap-1.5">
					<p className="text-fg text-sm font-medium">My Logo</p>
					<div
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						data-dragging={isDragging || undefined}
						data-files={files.length > 0 || undefined}
						role="button"
						className="border-border hover:bg-fill1 data-[dragging=true]:bg-primary-accent has-[input:focus]:border-primary-focus has-disabled:pointer-events-none has-disabled:opacity-50 min-h-41 flex flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px] has-[input:focus]:ring-transparent">
						<input {...getInputProps()} className="sr-only" aria-label="Upload files" />

						<div className="flex flex-col items-center justify-center gap-3 text-center">
							<IconButton onClick={openFileDialog} color="neutral" variant="outline">
								<Upload size={20} />
							</IconButton>
							<div className="flex flex-col gap-1">
								<p className="text-fg text-sm font-medium">Drag and drop image here</p>
								<p className="text-fg-secondary text-xs font-normal">PNG or JPEG (max. {maxSizeMB} MB)</p>
							</div>
							<Button onClick={openFileDialog} variant="outline" color="neutral" size="28">
								Browse Files
							</Button>
						</div>
					</div>
					{errors.length > 0 && (
						<div className="text-destructive flex items-center gap-1 text-xs" role="alert">
							<AlertCircleIcon className="size-3 shrink-0" />
							<span>{errors[0]}</span>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}
