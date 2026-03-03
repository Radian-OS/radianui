"use client"

import { useState } from "react"
import {
	AlertCircleIcon,
	ImageIcon,
	Loader2,
	UploadIcon,
	X,
} from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"
import { FileMetadata, useFileUpload } from "@/registry/ui/file-upload"

const initialFiles = [
	{
		name: "image-01.jpg",
		size: 1528737,
		type: "image/jpeg",
		url: "https://picsum.photos/1000/800?random=1",
		id: "image-01-123456789",
	},
	{
		name: "image-02.jpg",
		size: 1528737,
		type: "image/jpeg",
		url: "https://picsum.photos/1000/800?random=2",
		id: "image-02-123456789",
	},
]

interface ImagePreviewProps {
	file: {
		id: string
		preview?: string
		file: File | FileMetadata
	}
	onRemove: (id: string) => void
}

function ImagePreview({ file, onRemove }: ImagePreviewProps) {
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
		<div className="bg-primary-focus relative size-32 rounded-md">
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
				className={`size-full rounded-[inherit] object-cover transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
				onLoad={handleImageLoad}
				onError={handleImageError}
			/>

			{/* Remove button */}
			<IconButton
				variant="strong"
				color="neutral"
				onClick={() => onRemove(file.id)}
				className="size-6.5 absolute -right-2 -top-2 rounded-full"
				aria-label="Remove image">
				<X />
			</IconButton>
		</div>
	)
}

export default function ImageUpload() {
	const maxSizeMB = 5
	const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
	const maxFiles = 6

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
		},
	] = useFileUpload({
		accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
		maxSize,
		multiple: true,
		maxFiles,
		initialFiles,
	})

	return (
		<div className="flex flex-col gap-2">
			{/* Drop area */}
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				data-files={files.length > 0 || undefined}
				className="border-input data-[dragging=true]:bg-elevation-level1/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 not-data-[files]:justify-center relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]">
				<input
					{...getInputProps()}
					className="sr-only"
					aria-label="Upload image file"
				/>
				{files.length > 0 ? (
					<div className="flex w-full flex-col gap-3">
						<div className="flex items-center justify-between gap-2">
							<h3 className="truncate text-sm font-medium">
								Uploaded Files ({files.length})
							</h3>
							<Button
								variant="outline"
								size="32"
								onClick={openFileDialog}
								disabled={files.length >= maxFiles}>
								<UploadIcon
									className="-ms-0.5 size-3.5 opacity-60"
									aria-hidden="true"
								/>
								Add more
							</Button>
						</div>

						<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
							{files.map((file) => (
								<ImagePreview key={file.id} file={file} onRemove={removeFile} />
							))}
						</div>
					</div>
				) : (
					<div className="md:w-100 flex flex-col items-center justify-center px-4 py-3 text-center">
						<div
							className="bg-bg mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
							aria-hidden="true">
							<ImageIcon className="size-4 opacity-60" />
						</div>
						<p className="mb-1.5 text-sm font-medium">Drop your images here</p>
						<p className="text-fg-secondary text-xs">
							SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
						</p>
						<Button
							variant="outline"
							color="neutral"
							className="mt-4"
							onClick={openFileDialog}>
							<UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
							Select images
						</Button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className="text-error-text flex items-center gap-1 text-xs"
					role="alert">
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	)
}
