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
		return <FileTextIcon className="size-10 opacity-60" />
	} else if (fileType.includes("zip") || fileType.includes("archive") || fileName.endsWith(".zip") || fileName.endsWith(".rar")) {
		return <FileArchiveIcon className="size-10 opacity-60" />
	} else if (fileType.includes("excel") || fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
		return <FileSpreadsheetIcon className="size-10 opacity-60" />
	} else if (fileType.includes("video/")) {
		return <VideoIcon className="size-10 opacity-60" />
	} else if (fileType.includes("audio/")) {
		return <HeadphonesIcon className="size-10 opacity-60" />
	} else if (fileType.startsWith("image/")) {
		// Only use preview if it exists (not a native File)
		return <img src={src} alt={file.file.name} className="size-10 rounded-[inherit] object-cover" />
	}
	return <FileIcon className="size-10 opacity-60" />
}

type FileUploadProps = Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange" | "headers"> & {
	maxSize?: number // Maximum file size allowed in bytes
	containerClassName?: string
	rounded?: RoundedOptions
	label?: string
	variant?: string
	className?: string
	accepts?: string[]
	error?: boolean
	disabled?: boolean
	multiple?: boolean
	maxFile?: number
}
const DEFAULT_MAX_SIZE = 4 * 1024 * 1024 // 4 MB in bytes

function FileUpload({
	maxSize = DEFAULT_MAX_SIZE,
	variant = "input",
	rounded = "lg",
	label,
	className,
	accepts = ["image"],
	error,
	disabled,
	multiple,
	maxFile = 4,
}: FileUploadProps) {
	const maxSizeMB = maxSize
	const maxSizeValue = maxSize * 1024 * 1024

	const getAcceptTypes = (formats: string[]) => {
		const types: Record<string, string[]> = {
			image: ["image/svg", "image/png", "image/jpeg", "image/jpg", "image/gif"],
			document: ["application/pdf", "application/msword", "text/plain"],
			audio: ["audio/mpeg", "audio/wav"],
			video: ["video/mp4", "video/webm"],
			all: ["*/*"], // catch-all
		}

		// If "all" is selected, accept everything
		if (formats.includes("all")) return "*/*"

		const acceptList = formats.flatMap((format) => types[format] || [])
		return acceptList.join(",")
	}
	const [
		{ files, isDragging, errors },
		{ handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, clearFiles, getInputProps },
	] = useFileUpload({
		accept: getAcceptTypes(accepts),
		maxSize: maxSizeValue,
		multiple: multiple,
		maxFiles: maxFile,
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
				<Input
					size="0"
					className="p-0 px-2"
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
						<div className="flex flex-col items-center justify-center gap-2.5 px-4 py-3 text-center">
							<div className="bg-background flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
								<ImageIcon className="size-4 opacity-60" />
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-sm font-medium">Drop your {accepts.join(", ")} here</p>
								<p className="text-muted-foreground text-xs">
									{accepts.includes("all")
										? "All file accept"
										: getAcceptTypes(accepts)
												.split(",")
												.map((type) => type.split("/").pop())
												.join(", ")}{" "}
									(max. {maxSizeMB}MB)
								</p>
							</div>
							<Button
								variant="neutral-outline"
								disabled={disabled}
								className={` ${disabled ? "cursor-not-allowed" : ""}`}
								onClick={() => {
									if (!disabled) {
										openFileDialog()
									}
								}}>
								<UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
								Select file
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
