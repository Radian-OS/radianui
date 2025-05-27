"use client"

import { cva } from "class-variance-authority"
import { AlertCircleIcon, FileArchiveIcon, FileIcon, FileSpreadsheetIcon, FileTextIcon, HeadphonesIcon, Upload, VideoIcon, XIcon } from "lucide-react"
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
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
	accept?: string
	error?: boolean
	disabled?: boolean
	multiple?: boolean
	maxFiles?: number
	sizes?: SizeOptions
	title?: string
	description?: string
	hint?: string
}
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024 // 5 MB in bytes

function FileUpload({
	maxSize = DEFAULT_MAX_SIZE,
	variant = "input",
	rounded = "lg",
	label,
	className,
	accept = "image/*",
	error,
	disabled,
	multiple = true,
	sizes = "36",
	hint,
	maxFiles = 4,
	title = "Drag and drop files to upload",
	description = "JPG, PNG, GIF or other image files",
}: FileUploadProps) {
	const maxSizeValue = maxSize * 1024 * 1024

	const [
		{ files, isDragging, errors },
		{ handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, clearFiles, getInputProps },
	] = useFileUpload({
		accept,
		maxSize: maxSizeValue,
		multiple: maxFiles > 1 ? multiple : false,
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
		"border-border-alpha bg-fill-level1 max-h-50 relative flex h-55 w-full cursor-pointer flex-col items-center justify-center border border-dashed p-3 transition-colors",
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
				<Input
					fileUploadSize={sizes}
					size="0"
					hint={hint}
					id="picture"
					type="file"
					label={label ? `${label}` : ""}
					rounded={rounded}
					disabled={disabled}
					multiple={multiple}
				/>
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
						<div className="flex flex-col items-center justify-center gap-4 px-4 py-3 text-center">
							<Button disabled={disabled} variant="neutral-outline" size="36" isIcon>
								<Upload className="text-text-secondary size-6" />
							</Button>
							<div className="flex flex-col gap-2">
								<p className="text-text text-sm font-semibold leading-5">{title}</p>
								<p className="text-text-tertiary text-xs font-normal leading-4">
									{description} (max. {maxSize} MB){" "}
								</p>
							</div>
							<Button
								variant="neutral-outline"
								disabled={disabled}
								size="32"
								className={`text-text-secondary text-sm font-medium ${disabled ? "cursor-not-allowed" : ""}`}
								onClick={() => {
									if (!disabled) {
										openFileDialog()
									}
								}}>
								Browse Files
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
										<div className="flex aspect-square size-10 shrink-0 items-center justify-center overflow-hidden rounded border">
											{getFileIcon(file)}
										</div>
										<div className="flex min-w-0 flex-col gap-0.5">
											<p className="truncate text-[13px] font-medium">{file.file.name}</p>
											<p className="text-muted-foreground text-xs">{formatBytes(file.file.size)}</p>
										</div>
									</div>

									<XIcon className="text-text-tertiary size-4 shrink-0 cursor-pointer" onClick={() => removeFile(file.id)} aria-hidden="true" />
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
