"use client"

import {
	AlertCircleIcon,
	FileArchiveIcon,
	FileIcon,
	FileSpreadsheetIcon,
	FileTextIcon,
	FileUpIcon,
	HeadphonesIcon,
	ImageIcon,
	VideoIcon,
	XIcon,
} from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"
import { formatBytes, useFileUpload } from "@/registry/ui/file-upload"

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
	const fileType = file.file instanceof File ? file.file.type : file.file.type
	const fileName = file.file instanceof File ? file.file.name : file.file.name

	if (
		fileType.includes("pdf") ||
		fileName.endsWith(".pdf") ||
		fileType.includes("word") ||
		fileName.endsWith(".doc") ||
		fileName.endsWith(".docx")
	) {
		return <FileTextIcon className="size-4 opacity-60" />
	} else if (
		fileType.includes("zip") ||
		fileType.includes("archive") ||
		fileName.endsWith(".zip") ||
		fileName.endsWith(".rar")
	) {
		return <FileArchiveIcon className="size-4 opacity-60" />
	} else if (
		fileType.includes("excel") ||
		fileName.endsWith(".xls") ||
		fileName.endsWith(".xlsx")
	) {
		return <FileSpreadsheetIcon className="size-4 opacity-60" />
	} else if (fileType.includes("video/")) {
		return <VideoIcon className="size-4 opacity-60" />
	} else if (fileType.includes("audio/")) {
		return <HeadphonesIcon className="size-4 opacity-60" />
	} else if (fileType.startsWith("image/")) {
		return <ImageIcon className="size-4 opacity-60" />
	}
	return <FileIcon className="size-4 opacity-60" />
}

export default function DocumentUpload() {
	const maxSize = 100 * 1024 * 1024 // 10MB default
	const maxFiles = 10

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			clearFiles,
			getInputProps,
		},
	] = useFileUpload({
		multiple: true,
		maxFiles,
		maxSize,
	})

	return (
		<div className="w-90 flex flex-col gap-2">
			{/* Drop area */}
			<div
				role="button"
				onClick={openFileDialog}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				className="border-border hover:bg-fill1 data-[dragging=true]:bg-primary-accent has-[input:focus]:border-primary-focus has-[input:focus]:ring-primary has-disabled:pointer-events-none has-disabled:opacity-50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]">
				<input
					{...getInputProps()}
					className="sr-only"
					aria-label="Upload files"
				/>

				<div className="flex flex-col items-center justify-center text-center">
					<div
						className="bg-bg mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
						aria-hidden="true">
						<FileUpIcon className="size-4 opacity-60" />
					</div>
					<p className="mb-1.5 text-sm font-medium">Upload files</p>
					<p className="text-fg-secondary mb-2 text-xs">
						Drag & drop or click to browse
					</p>
					<div className="text-fg-tertiary flex flex-wrap justify-center gap-1 text-xs">
						<span>All files</span>
						<span>∙</span>
						<span>Max {maxFiles} files</span>
						<span>∙</span>
						<span>Up to {formatBytes(maxSize)}</span>
					</div>
				</div>
			</div>

			{errors.length > 0 && (
				<div
					className="text-error flex items-center gap-1 text-xs"
					role="alert">
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}

			{/* File list */}
			{files.length > 0 && (
				<div className="space-y-2">
					{files.map((file) => (
						<div
							key={file.id}
							className="bg-bg flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
							<div className="flex items-center gap-3 overflow-hidden">
								<div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
									{getFileIcon(file)}
								</div>
								<div className="flex min-w-0 flex-col gap-0.5">
									<p className="truncate text-[13px] font-medium">
										{file.file instanceof File
											? file.file.name
											: file.file.name}
									</p>
									<p className="text-fg-secondary text-xs">
										{formatBytes(
											file.file instanceof File
												? file.file.size
												: file.file.size
										)}
									</p>
								</div>
							</div>

							<IconButton
								variant="ghost"
								className="text-fg-secondary hover:text-fg-tertiary -me-2 size-8 hover:bg-transparent"
								onClick={() => removeFile(file.id)}
								aria-label="Remove file">
								<XIcon className="size-4" aria-hidden="true" />
							</IconButton>
						</div>
					))}

					{/* Remove all files button */}
					{files.length > 1 && (
						<div>
							<Button
								size="28"
								variant="outline"
								color="neutral"
								onClick={clearFiles}>
								Remove all files
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
