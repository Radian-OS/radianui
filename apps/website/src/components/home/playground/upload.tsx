import React, { useEffect } from "react"
import { Upload } from "lucide-react"
import { AlertCircleIcon } from "lucide-react"
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
	height?: number
}

export function ImagePreview({ file, height = 8 }: ImagePreviewProps) {
	return (
		<img
			src={file.preview}
			alt={file.file.name}
			className={`h-${height} rounded-[inherit] object-cover transition-opacity`}
		/>
	)
}

export default function Uploads() {
	const maxSizeMB = 10
	const maxSize = maxSizeMB * 1024 * 1024
	const maxFiles = 1

	const { setLogoImage } = usePlayground()

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			getInputProps,
		},
	] = useFileUpload({
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
				<IconButton
					aria-label="Upload Logo"
					variant="ghost"
					color="neutral"
					className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<Image alt="" height={18} width={18} src="/mstile-70x70.png" />
				</IconButton>
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
						className="border-border hover:bg-fill1 data-[dragging=true]:bg-primary-accent has-[input:focus]:border-primary has-disabled:pointer-events-none has-disabled:opacity-50 min-h-41 flex flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px] has-[input:focus]:ring-transparent">
						<input
							{...getInputProps()}
							className="sr-only"
							aria-label="Upload files"
						/>

						<div className="flex flex-col items-center justify-center gap-3 text-center">
							<IconButton
								aria-label="Upload Button"
								onClick={openFileDialog}
								color="neutral"
								variant="outline">
								<Upload size={20} />
							</IconButton>
							<div className="flex flex-col gap-1">
								<p className="text-fg text-sm font-medium">
									Drag and drop image here
								</p>
								<p className="text-fg-secondary text-xs font-normal">
									PNG or JPEG (max. {maxSizeMB} MB)
								</p>
							</div>
							<Button
								onClick={openFileDialog}
								variant="outline"
								color="neutral"
								size="28">
								Browse Files
							</Button>
						</div>
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
			</PopoverContent>
		</Popover>
	)
}
