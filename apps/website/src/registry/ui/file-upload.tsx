"use client"

import { cva } from "class-variance-authority"
import {
	AlertCircleIcon,
	FileArchiveIcon,
	FileIcon,
	FileSpreadsheetIcon,
	FileTextIcon,
	HeadphonesIcon,
	ImageIcon,
	UploadIcon,
	VideoIcon,
	XIcon,
} from "lucide-react"
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const getFileIcon = (file: { file: File | { type: string; name: string; preview?: string } }) => {
	const fileType = file.file instanceof File ? file.file.type : file.file.type
	const fileName = file.file instanceof File ? file.file.name : file.file.name
	const isNativeFile = file.file instanceof File
	let src = ""
	if (isNativeFile) {
		src = URL.createObjectURL(file.file as File) // safe
	} else {
		src = "preview" in file.file && file.file.preview ? file.file.preview : ""
	}
	if (fileType.includes("pdf") || fileName.endsWith(".pdf") || fileType.includes("word") || fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
		return <FileTextIcon className="size-4 opacity-60" />
	} else if (fileType.includes("zip") || fileType.includes("archive") || fileName.endsWith(".zip") || fileName.endsWith(".rar")) {
		return <FileArchiveIcon className="size-4 opacity-60" />
	} else if (fileType.includes("excel") || fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
		return <FileSpreadsheetIcon className="size-4 opacity-60" />
	} else if (fileType.includes("video/")) {
		return <VideoIcon className="size-4 opacity-60" />
	} else if (fileType.includes("audio/")) {
		return <HeadphonesIcon className="size-4 opacity-60" />
	} else if (fileType.startsWith("image/")) {
		// Only use preview if it exists (not a native File)
		return <img src={src} alt={file.file.name} className="size-10 rounded-[inherit] object-cover" />
	}
	return <FileIcon className="size-4 opacity-60" />
}

type FileUploadProps = Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange" | "headers"> & {
	maxSize?: number // Maximum file size allowed in bytes
	containerClassName?: string
	rounded?: RoundedOptions
	label?: string
	variant?: string
	className?: string
	format?: string
	error?: boolean
	disabled?: boolean
	multiple?: boolean
}
const DEFAULT_MAX_SIZE = 4 * 1024 * 1024 // 4 MB in bytes

function FileUpload({
	maxSize = DEFAULT_MAX_SIZE,
	variant = "input",
	rounded = "lg",
	label,
	className,
	format,
	error,
	disabled,
	multiple,
}: FileUploadProps) {
	const maxSizeMB = maxSize
	const maxFiles = 6
	const maxSizeValue = maxSize * 1024 * 1024

	const [
		{ files, isDragging, errors },
		{ handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, clearFiles, getInputProps },
	] = useFileUpload({
		accept: format === "image" ? "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif" : undefined,
		maxSize: maxSizeValue,
		multiple: multiple,
		maxFiles,
	})

	const cvaFileUploadVariants = {
		rounded: {
			xs: "rounded-xs",
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			xl: "rounded-xl",
			"2xl": "rounded-2xl",
		},
	}

	const defaultFileUploadRadius = "lg"

	const fileUploadVariants = cva(
		"border-border-alpha bg-bg-base max-h-50 relative flex h-full w-full cursor-pointer flex-col items-center justify-center border border-dashed p-3 transition-colors",
		{
			variants: {
				...cvaFileUploadVariants,
			},
			defaultVariants: {
				rounded: defaultFileUploadRadius,
			},
		}
	)
	return (
		<>
			{variant === "input" ? (
				<Input id="picture" type="file" label={label ? `${label}` : ""} rounded={rounded} disabled={disabled} multiple={multiple} />
			) : (
				<div className={"flex w-80 flex-col gap-1.5"}>
					{label && <Label htmlFor="picture">{label}</Label>}
					{/* Drop area */}
					<div
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						data-dragging={isDragging || undefined}
						data-files={files.length > 0 || undefined}
						className={cn(fileUploadVariants({ rounded }), {
							"border-primary bg-primary/5": isDragging,
							"border-error bg-error/5": error,
							"bg-bg-level0 cursor-not-allowed": disabled,
							"hover:border-primary hover:bg-primary/5": !disabled,
						})}>
						<input id="picture" {...getInputProps()} className="sr-only" aria-label="Upload image file" />
						<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
							<div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
								<ImageIcon className="size-4 opacity-60" />
							</div>
							<p className="mb-1.5 text-sm font-medium">Drop your {format === "image" ? "images" : "choice of files"} here</p>
							<p className="text-muted-foreground text-xs">
								{format === "image" ? "SVG, PNG, JPG or GIF" : "All format files"} (max. {maxSizeMB}MB)
							</p>
							<Button
								variant="neutral-outline"
								disabled={disabled}
								className={`mt-4 ${disabled ? "cursor-not-allowed" : ""}`}
								onClick={() => {
									if (!disabled) {
										openFileDialog()
									}
								}}>
								<UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
								Select images
							</Button>
						</div>
					</div>

					{errors.length > 0 && (
						<div className="text-error flex items-center gap-1 text-xs" role="alert">
							<AlertCircleIcon className="size-3 shrink-0" />
							<span>{errors[0]}</span>
						</div>
					)}

					{/* File list */}
					{files.length > 0 && (
						<div className="space-y-2">
							{files.map((file) => (
								<div key={file.id} className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
									<div className="flex items-center gap-3 overflow-hidden">
										<div className="bg-accent aspect-square shrink-0 rounded">{getFileIcon(file)}</div>
										<div className="flex min-w-0 flex-col gap-0.5">
											<p className="truncate text-[13px] font-medium">{file.file.name}</p>
											<p className="text-muted-foreground text-xs">{formatBytes(file.file.size)}</p>
										</div>
									</div>

									<Button
										size="36"
										variant="ghost"
										className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
										onClick={() => removeFile(file.id)}
										aria-label="Remove file">
										<XIcon aria-hidden="true" />
									</Button>
								</div>
							))}

							{/* Remove all files button */}
							{files.length > 0 && (
								<div className={cn(className)}>
									<Button size="28" variant="neutral-outline" onClick={clearFiles}>
										Remove all files
									</Button>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default FileUpload
