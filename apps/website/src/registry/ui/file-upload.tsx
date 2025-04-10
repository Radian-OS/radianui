"use client"

import React from "react"
import { File, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RoundedOptions, defaultInputRadius } from "./input"
import ProgressBar from "./progress-bar"

const DEFAULT_MAX_SIZE = 4 * 1024 * 1024 // 4 MB in bytes

// Function to format file size into a human-readable string
function formatFileSize(bytes: number) {
	if (bytes === 0) return "0 Bytes"
	const k = 1024
	const sizes = ["Bytes", "KB", "MB", "GB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Function to create a unique identifier for a file based on its name and last modified timestamp
function getFileIdentifier(file: File) {
	return `${file.name}-${file.lastModified}`
}
// Type definition for the file upload status
type FileUploadStatus = {
	progress: number
	status: "success" | "error" | "uploading"
}
// Type definition for FileUpload component props
type FileUploadProps = Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange" | "headers"> & {
	value?: File[] // Current list of files
	onChange?: (files: File[]) => void // Callback when file changes
	maxSize?: number // Maximum file size allowed in bytes
	containerClassName?: string
	dropzoneClassName?: string
	url: string // API endpoint where the file will be uploaded to
	headers?: Record<string, string> // Custom headers for upload request
	ref?: React.Ref<HTMLInputElement>
	fieldname?: string // Fieldname for the file upload
	rounded?: Omit<RoundedOptions, "full">
	label?: string
}

// FileUpload component definition
function FileUpload({
	value = [],
	onChange,
	multiple = false,
	accept,
	maxSize = DEFAULT_MAX_SIZE,
	containerClassName,
	dropzoneClassName,
	url,
	headers,
	fieldname = "file",
	rounded = defaultInputRadius,
	label,
	ref,
	...props
}: FileUploadProps) {
	const [isDragging, setIsDragging] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const [uploadStatuses, setUploadStatuses] = React.useState<Record<string, FileUploadStatus>>({})

	async function upload(file: File) {
		const formData = new FormData()
		formData.append(fieldname, file)

		const xhr = new XMLHttpRequest()
		const fileIdentifier = getFileIdentifier(file)
		return new Promise<void>(function () {
			xhr.open("POST", url, true)

			setUploadStatuses((prev) => ({
				...prev,
				[fileIdentifier]: { progress: 0, status: "uploading" },
			}))

			if (headers) {
				for (const [key, value] of Object.entries(headers)) {
					xhr.setRequestHeader(key, value)
				}
			}

			xhr.upload.addEventListener("progress", function (event) {
				if (event.lengthComputable) {
					const progress = (event.loaded / event.total) * 100
					setUploadStatuses((prev) => ({
						...prev,
						[fileIdentifier]: { ...prev[fileIdentifier], progress },
					}))
				}
			})

			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					setUploadStatuses((prev) => ({
						...prev,
						[fileIdentifier]: { progress: 100, status: "success" },
					}))
				} else {
					setUploadStatuses((prev) => ({
						...prev,
						[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
					}))
				}
			}

			xhr.onerror = function () {
				setUploadStatuses((prev) => ({
					...prev,
					[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
				}))
			}

			xhr.send(formData)
		})
	}

	// Function to handle the drop event
	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		setIsDragging(false)

		const files = Array.from(e.dataTransfer.files)
		handleFiles(files)
	}
	// Function to handle the file input
	function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files || [])
		handleFiles(files)
	}
	// Function to handle the files
	function handleFiles(files: File[]) {
		setError(null)

		if (!multiple && files.length > 1) {
			setError("Multiple files not allowed")
			return
		}
		// Check for oversized files
		const oversized = files.find((file) => file.size > maxSize)
		if (oversized) {
			setError(`File exceeds maximum size of ${formatFileSize(maxSize)}`)
			return
		}

		const newFiles = multiple ? [...value, ...files] : files
		onChange?.(newFiles)

		for (const file of files) {
			try {
				upload(file)
			} catch (err) {
				console.error(err)
			}
		}
	}
	// Function to remove a file from the list
	function removeFile(index: number) {
		const newFiles = value.filter((_, i) => i !== index)
		onChange?.(newFiles)
	}

	return (
		<div className={cn("flex w-90 flex-col gap-2", containerClassName)}>
			{label && (
				<label
					className={cn("text-sm w-fit font-medium", {
						"text-fg2": props.disabled,
					})}>
					{label}
				</label>
			)}
			{/* Dropzone area - shown when empty or when multiple files allowed */}
			{((value.length == 0 && !multiple) || multiple) && (
				<div
					className={cn(
						"border-stroke-decorative bg-bg1 relative flex h-full max-h-50 w-full cursor-pointer flex-col items-center justify-center border border-dashed p-3 transition-colors",
						{
							"rounded-lg": rounded === "rounded",
							"rounded-none": rounded === "square",
							"border-primary bg-primary/5": isDragging,
							"border-error bg-error/5": error,
							"bg-bg0": props.disabled,
							"hover:border-primary hover:bg-primary/5": !props.disabled,
						},
						dropzoneClassName
					)}
					onDragOver={function (e) {
						e.preventDefault()
						setIsDragging(true)
					}}
					onDragLeave={function () {
						setIsDragging(false)
					}}
					onDrop={handleDrop}>
					<input
						type="file"
						className={cn("absolute inset-0 z-40 h-full w-full cursor-pointer opacity-0", { "cursor-not-allowed": props.disabled })}
						multiple={multiple}
						accept={accept}
						onChange={handleFileInput}
						ref={ref}
						{...props}
					/>

					<div className="flex flex-col items-center justify-center gap-4">
						<span className={cn("border-stroke bg-bg1 size-10 rounded-lg border p-2 drop-shadow-xs", { "border-error": error })}>
							<Upload
								size={24}
								className={cn("stroke-fg1 stroke-[1.5]", {
									"stroke-error": error,
									"stroke-fg2": props.disabled,
								})}
							/>
						</span>
						<div className="text-muted-foreground flex flex-col text-sm">
							<span
								className={cn("text-sm text-fg0 font-medium", {
									"text-fg2": props.disabled,
								})}>
								Upload an image or video
							</span>
							<span
								className={cn("text-xs text-fg1 font-normal", {
									"text-fg2": props.disabled,
								})}>
								or click to browse ({formatFileSize(maxSize)} max)
							</span>
						</div>
						{accept && <div className="text-muted-foreground text-xs">Supported formats: {accept.split(",").join(", ")}</div>}
					</div>
				</div>
			)}

			{error && <div className="text-error text-xs">{error}</div>}

			{value.length > 0 && (
				<div className="flex flex-col gap-1">
					{value.map((file, index) => (
						<FilePreview
							key={file.name + index}
							file={file}
							onRemove={function () {
								removeFile(index)
							}}
							status={uploadStatuses[getFileIdentifier(file)]}
						/>
					))}
				</div>
			)}
		</div>
	)
}

// FilePreview component definition
function FilePreview({ file, onRemove, status }: { file: File; onRemove: () => void; status: FileUploadStatus | undefined }) {
	return (
		<div className={cn("bg-bg2 flex flex-col items-center justify-start gap-3 rounded-lg p-3", { "bg-error/5": status?.status === "error" })}>
			<div>
				<div className="flex w-full items-center gap-3">
					<span className="border-stroke bg-bg1 size-10 rounded-lg border p-2 drop-shadow-xs">
						<File className="stroke-fg1" size={24} />
					</span>
					<div className="w-full">
						<div className="flex w-full justify-between gap-1">
							<span className="text-sm text-fg0 font-medium">{file.name}</span>

							<button type="button" onClick={onRemove} className="bg-bg1 size-5 rounded-full p-1">
								<X size={12} className="stroke-fg2" />
							</button>
						</div>
						<div className="text-xs text-fg1 flex gap-2 font-normal">
							{status && status.status === "uploading" && <span>Uploading</span>}
							{status && status.status === "success" && <span>{formatFileSize(file.size)}</span>}
							{status && status.status === "error" && <span className="text-error">Error while uploading</span>}
						</div>
					</div>
				</div>
			</div>
			{status && <ProgressBar value={parseInt(status.progress.toString())} rootClassName="h-1" />}
		</div>
	)
}

export default FileUpload
