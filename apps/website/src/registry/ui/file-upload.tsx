// "use client"

// import React from "react"
// import { cva } from "class-variance-authority"
// import { File, Upload, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import ProgressBar from "./progress-bar"

// const DEFAULT_MAX_SIZE = 4 * 1024 * 1024 // 4 MB in bytes
// export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

// // Function to format file size into a human-readable string
// function formatFileSize(bytes: number) {
// 	if (bytes === 0) return "0 Bytes"
// 	const k = 1024
// 	const sizes = ["Bytes", "KB", "MB", "GB"]
// 	const i = Math.floor(Math.log(bytes) / Math.log(k))
// 	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
// }

// // Function to create a unique identifier for a file based on its name and last modified timestamp
// function getFileIdentifier(file: File) {
// 	return `${file.name}-${file.lastModified}`
// }
// // Type definition for the file upload status
// type FileUploadStatus = {
// 	progress: number
// 	status: "success" | "error" | "uploading"
// }
// // Type definition for FileUpload component props
// type FileUploadProps = Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange" | "headers"> & {
// 	value?: File[] // Current list of files
// 	onChange?: (files: File[]) => void // Callback when file changes
// 	maxSize?: number // Maximum file size allowed in bytes
// 	containerClassName?: string
// 	dropzoneClassName?: string
// 	url: string // API endpoint where the file will be uploaded to
// 	headers?: Record<string, string> // Custom headers for upload request
// 	ref?: React.Ref<HTMLInputElement>
// 	fieldname?: string // Fieldname for the file upload
// 	rounded?: RoundedOptions
// 	label?: string
// }

// // FileUpload component definition
// function FileUpload({
// 	value = [],
// 	onChange,
// 	multiple = false,
// 	accept,
// 	maxSize = DEFAULT_MAX_SIZE,
// 	containerClassName,
// 	dropzoneClassName,
// 	url,
// 	headers,
// 	fieldname = "file",
// 	rounded = "lg",
// 	label,
// 	ref,
// 	...props
// }: FileUploadProps) {
// 	const [isDragging, setIsDragging] = React.useState(false)
// 	const [error, setError] = React.useState<string | null>(null)
// 	const [uploadStatuses, setUploadStatuses] = React.useState<Record<string, FileUploadStatus>>({})

// 	async function upload(file: File) {
// 		const formData = new FormData()
// 		formData.append(fieldname, file)

// 		const xhr = new XMLHttpRequest()
// 		const fileIdentifier = getFileIdentifier(file)
// 		return new Promise<void>(function () {
// 			xhr.open("POST", url, true)

// 			setUploadStatuses((prev) => ({
// 				...prev,
// 				[fileIdentifier]: { progress: 0, status: "uploading" },
// 			}))

// 			if (headers) {
// 				for (const [key, value] of Object.entries(headers)) {
// 					xhr.setRequestHeader(key, value)
// 				}
// 			}

// 			xhr.upload.addEventListener("progress", function (event) {
// 				if (event.lengthComputable) {
// 					const progress = (event.loaded / event.total) * 100
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { ...prev[fileIdentifier], progress },
// 					}))
// 				}
// 			})

// 			xhr.onload = function () {
// 				if (xhr.status >= 200 && xhr.status < 300) {
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { progress: 100, status: "success" },
// 					}))
// 				} else {
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
// 					}))
// 				}
// 			}

// 			xhr.onerror = function () {
// 				setUploadStatuses((prev) => ({
// 					...prev,
// 					[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
// 				}))
// 			}

// 			xhr.send(formData)
// 		})
// 	}

// 	// Function to handle the drop event
// 	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
// 		e.preventDefault()
// 		setIsDragging(false)

// 		const files = Array.from(e.dataTransfer.files)
// 		handleFiles(files)
// 	}
// 	// Function to handle the file input
// 	function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
// 		const files = Array.from(e.target.files || [])
// 		handleFiles(files)
// 	}
// 	// Function to handle the files
// 	function handleFiles(files: File[]) {
// 		setError(null)

// 		if (!multiple && files.length > 1) {
// 			setError("Multiple files not allowed")
// 			return
// 		}
// 		// Check for oversized files
// 		const oversized = files.find((file) => file.size > maxSize)
// 		if (oversized) {
// 			setError(`File exceeds maximum size of ${formatFileSize(maxSize)}`)
// 			return
// 		}

// 		const newFiles = multiple ? [...value, ...files] : files
// 		onChange?.(newFiles)

// 		for (const file of files) {
// 			try {
// 				upload(file)
// 			} catch (err) {
// 				console.error(err)
// 			}
// 		}
// 	}
// 	// Function to remove a file from the list
// 	function removeFile(index: number) {
// 		const newFiles = value.filter((_, i) => i !== index)
// 		onChange?.(newFiles)
// 	}

// 	const cvaFileUploadVariants = {
// 		rounded: {
// 			xs: "rounded-xs",
// 			sm: "rounded-sm",
// 			md: "rounded-md",
// 			lg: "rounded-lg",
// 			xl: "rounded-xl",
// 			"2xl": "rounded-2xl",
// 		},
// 	}

// 	const defaultFileUploadRadius = "lg"

// 	const fileUploadVariants = cva(
// 		"border-border-alpha bg-bg-base max-h-50 relative flex h-full w-full cursor-pointer flex-col items-center justify-center border border-dashed p-3 transition-colors",
// 		{
// 			variants: {
// 				...cvaFileUploadVariants,
// 			},
// 			defaultVariants: {
// 				rounded: defaultFileUploadRadius,
// 			},
// 		}
// 	)

// 	return (
// 		<div className={cn("w-90 flex flex-col gap-1.5", containerClassName)}>
// 			{label && (
// 				<label
// 					className={cn("w-fit text-sm font-medium", {
// 						"text-text-disabled": props.disabled,
// 					})}>
// 					{label}
// 				</label>
// 			)}
// 			{/* Dropzone area - shown when empty or when multiple files allowed */}
// 			{((value.length == 0 && !multiple) || multiple) && (
// 				<div
// 					className={cn(
// 						fileUploadVariants({ rounded }),
// 						{
// 							"border-primary bg-primary/5": isDragging,
// 							"border-error bg-error/5": error,
// 							"bg-bg-level0": props.disabled,
// 							"hover:border-primary hover:bg-primary/5": !props.disabled,
// 						},
// 						dropzoneClassName
// 					)}
// 					onDragOver={function (e) {
// 						e.preventDefault()
// 						setIsDragging(true)
// 					}}
// 					onDragLeave={function () {
// 						setIsDragging(false)
// 					}}
// 					onDrop={handleDrop}>
// 					<input
// 						type="file"
// 						className={cn("absolute inset-0 z-40 h-full w-full cursor-pointer opacity-0", { "cursor-not-allowed": props.disabled })}
// 						multiple={multiple}
// 						accept={accept}
// 						onChange={handleFileInput}
// 						ref={ref}
// 						{...props}
// 					/>

// 					<div className="flex flex-col items-center justify-center gap-4">
// 						<span className={cn("border-border bg-bg-base drop-shadow-xs size-10 rounded-lg border p-2", { "border-error": error })}>
// 							<Upload
// 								size={24}
// 								className={cn("stroke-text-secondary stroke-[1.5]", {
// 									"stroke-error": error,
// 									"stroke-text-tertiary": props.disabled,
// 								})}
// 							/>
// 						</span>
// 						<div className="text-muted-foreground flex flex-col text-sm">
// 							<span
// 								className={cn("text-text text-sm font-medium", {
// 									"text-text-tertiary": props.disabled,
// 								})}>
// 								Upload an image or video
// 							</span>
// 							<span
// 								className={cn("text-text-secondary text-xs font-normal", {
// 									"text-text-tertiary": props.disabled,
// 								})}>
// 								or click to browse ({formatFileSize(maxSize)} max)
// 							</span>
// 						</div>
// 						{accept && <div className="text-muted-foreground text-xs">Supported formats: {accept.split(",").join(", ")}</div>}
// 					</div>
// 				</div>
// 			)}

// 			{error && <div className="text-error text-xs">{error}</div>}

// 			{value.length > 0 && (
// 				<div className="flex flex-col gap-1">
// 					{value.map((file, index) => (
// 						<FilePreview
// 							key={file.name + index}
// 							file={file}
// 							onRemove={function () {
// 								removeFile(index)
// 							}}
// 							status={uploadStatuses[getFileIdentifier(file)]}
// 						/>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// // FilePreview component definition
// function FilePreview({ file, onRemove, status }: { file: File; onRemove: () => void; status: FileUploadStatus | undefined }) {
// 	return (
// 		<div className={cn("bg-bg-level1 flex flex-col items-center justify-start gap-3 rounded-lg p-3", { "bg-error/5": status?.status === "error" })}>
// 			<div>
// 				<div className="flex w-full items-center gap-3">
// 					<span className="border-border bg-bg-base drop-shadow-xs size-10 rounded-lg border p-2">
// 						<File className="stroke-text-secondary" size={24} />
// 					</span>
// 					<div className="w-full">
// 						<div className="flex w-full justify-between gap-1">
// 							<span className="text-text text-sm font-medium">{file.name}</span>

// 							<button type="button" onClick={onRemove} className="bg-bg-base size-5 rounded-full p-1">
// 								<X size={12} className="stroke-text-tertiary" />
// 							</button>
// 						</div>
// 						<div className="text-text-secondary flex gap-2 text-xs font-normal">
// 							{status && status.status === "uploading" && <span>Uploading</span>}
// 							{status && status.status === "success" && <span>{formatFileSize(file.size)}</span>}
// 							{status && status.status === "error" && <span className="text-error">Error while uploading</span>}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			{status && <ProgressBar value={parseInt(status.progress.toString())} className="h-1" />}
// 		</div>
// 	)
// }

// export default FileUpload

"use client"

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

// "use client"

// import React from "react"
// import { cva } from "class-variance-authority"
// import { File, Upload, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import ProgressBar from "./progress-bar"

// const DEFAULT_MAX_SIZE = 4 * 1024 * 1024 // 4 MB in bytes
// export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

// // Function to format file size into a human-readable string
// function formatFileSize(bytes: number) {
// 	if (bytes === 0) return "0 Bytes"
// 	const k = 1024
// 	const sizes = ["Bytes", "KB", "MB", "GB"]
// 	const i = Math.floor(Math.log(bytes) / Math.log(k))
// 	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
// }

// // Function to create a unique identifier for a file based on its name and last modified timestamp
// function getFileIdentifier(file: File) {
// 	return `${file.name}-${file.lastModified}`
// }
// // Type definition for the file upload status
// type FileUploadStatus = {
// 	progress: number
// 	status: "success" | "error" | "uploading"
// }
// // Type definition for FileUpload component props
// type FileUploadProps = Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange" | "headers"> & {
// 	value?: File[] // Current list of files
// 	onChange?: (files: File[]) => void // Callback when file changes
// 	maxSize?: number // Maximum file size allowed in bytes
// 	containerClassName?: string
// 	dropzoneClassName?: string
// 	url: string // API endpoint where the file will be uploaded to
// 	headers?: Record<string, string> // Custom headers for upload request
// 	ref?: React.Ref<HTMLInputElement>
// 	fieldname?: string // Fieldname for the file upload
// 	rounded?: RoundedOptions
// 	label?: string
// }

// // FileUpload component definition
// function FileUpload({
// 	value = [],
// 	onChange,
// 	multiple = false,
// 	accept,
// 	maxSize = DEFAULT_MAX_SIZE,
// 	containerClassName,
// 	dropzoneClassName,
// 	url,
// 	headers,
// 	fieldname = "file",
// 	rounded = "lg",
// 	label,
// 	ref,
// 	...props
// }: FileUploadProps) {
// 	const [isDragging, setIsDragging] = React.useState(false)
// 	const [error, setError] = React.useState<string | null>(null)
// 	const [uploadStatuses, setUploadStatuses] = React.useState<Record<string, FileUploadStatus>>({})

// 	async function upload(file: File) {
// 		const formData = new FormData()
// 		formData.append(fieldname, file)

// 		const xhr = new XMLHttpRequest()
// 		const fileIdentifier = getFileIdentifier(file)
// 		return new Promise<void>(function () {
// 			xhr.open("POST", url, true)

// 			setUploadStatuses((prev) => ({
// 				...prev,
// 				[fileIdentifier]: { progress: 0, status: "uploading" },
// 			}))

// 			if (headers) {
// 				for (const [key, value] of Object.entries(headers)) {
// 					xhr.setRequestHeader(key, value)
// 				}
// 			}

// 			xhr.upload.addEventListener("progress", function (event) {
// 				if (event.lengthComputable) {
// 					const progress = (event.loaded / event.total) * 100
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { ...prev[fileIdentifier], progress },
// 					}))
// 				}
// 			})

// 			xhr.onload = function () {
// 				if (xhr.status >= 200 && xhr.status < 300) {
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { progress: 100, status: "success" },
// 					}))
// 				} else {
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
// 					}))
// 				}
// 			}

// 			xhr.onerror = function () {
// 				setUploadStatuses((prev) => ({
// 					...prev,
// 					[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
// 				}))
// 			}

// 			xhr.send(formData)
// 		})
// 	}

// 	// Function to handle the drop event
// 	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
// 		e.preventDefault()
// 		setIsDragging(false)

// 		const files = Array.from(e.dataTransfer.files)
// 		handleFiles(files)
// 	}
// 	// Function to handle the file input
// 	function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
// 		const files = Array.from(e.target.files || [])
// 		handleFiles(files)
// 	}
// 	// Function to handle the files
// 	function handleFiles(files: File[]) {
// 		setError(null)

// 		if (!multiple && files.length > 1) {
// 			setError("Multiple files not allowed")
// 			return
// 		}
// 		// Check for oversized files
// 		const oversized = files.find((file) => file.size > maxSize)
// 		if (oversized) {
// 			setError(`File exceeds maximum size of ${formatFileSize(maxSize)}`)
// 			return
// 		}

// 		const newFiles = multiple ? [...value, ...files] : files
// 		onChange?.(newFiles)

// 		for (const file of files) {
// 			try {
// 				upload(file)
// 			} catch (err) {
// 				console.error(err)
// 			}
// 		}
// 	}
// 	// Function to remove a file from the list
// 	function removeFile(index: number) {
// 		const newFiles = value.filter((_, i) => i !== index)
// 		onChange?.(newFiles)
// 	}

// 	const cvaFileUploadVariants = {
// 		rounded: {
// 			xs: "rounded-xs",
// 			sm: "rounded-sm",
// 			md: "rounded-md",
// 			lg: "rounded-lg",
// 			xl: "rounded-xl",
// 			"2xl": "rounded-2xl",
// 		},
// 	}

// 	const defaultFileUploadRadius = "lg"

// 	const fileUploadVariants = cva(
// 		"border-border-alpha bg-bg-base max-h-50 relative flex h-full w-full cursor-pointer flex-col items-center justify-center border border-dashed p-3 transition-colors",
// 		{
// 			variants: {
// 				...cvaFileUploadVariants,
// 			},
// 			defaultVariants: {
// 				rounded: defaultFileUploadRadius,
// 			},
// 		}
// 	)

// 	return (
// 		<div className={cn("w-90 flex flex-col gap-1.5", containerClassName)}>
// 			{label && (
// 				<label
// 					className={cn("w-fit text-sm font-medium", {
// 						"text-text-disabled": props.disabled,
// 					})}>
// 					{label}
// 				</label>
// 			)}
// 			{/* Dropzone area - shown when empty or when multiple files allowed */}
// 			{((value.length == 0 && !multiple) || multiple) && (
// 				<div
// 					className={cn(
// 						fileUploadVariants({ rounded }),
// 						{
// 							"border-primary bg-primary/5": isDragging,
// 							"border-error bg-error/5": error,
// 							"bg-bg-level0": props.disabled,
// 							"hover:border-primary hover:bg-primary/5": !props.disabled,
// 						},
// 						dropzoneClassName
// 					)}
// 					onDragOver={function (e) {
// 						e.preventDefault()
// 						setIsDragging(true)
// 					}}
// 					onDragLeave={function () {
// 						setIsDragging(false)
// 					}}
// 					onDrop={handleDrop}>
// 					<input
// 						type="file"
// 						className={cn("absolute inset-0 z-40 h-full w-full cursor-pointer opacity-0", { "cursor-not-allowed": props.disabled })}
// 						multiple={multiple}
// 						accept={accept}
// 						onChange={handleFileInput}
// 						ref={ref}
// 						{...props}
// 					/>

// 					<div className="flex flex-col items-center justify-center gap-4">
// 						<span className={cn("border-border bg-bg-base drop-shadow-xs size-10 rounded-lg border p-2", { "border-error": error })}>
// 							<Upload
// 								size={24}
// 								className={cn("stroke-text-secondary stroke-[1.5]", {
// 									"stroke-error": error,
// 									"stroke-text-tertiary": props.disabled,
// 								})}
// 							/>
// 						</span>
// 						<div className="text-muted-foreground flex flex-col text-sm">
// 							<span
// 								className={cn("text-text text-sm font-medium", {
// 									"text-text-tertiary": props.disabled,
// 								})}>
// 								Upload an image or video
// 							</span>
// 							<span
// 								className={cn("text-text-secondary text-xs font-normal", {
// 									"text-text-tertiary": props.disabled,
// 								})}>
// 								or click to browse ({formatFileSize(maxSize)} max)
// 							</span>
// 						</div>
// 						{accept && <div className="text-muted-foreground text-xs">Supported formats: {accept.split(",").join(", ")}</div>}
// 					</div>
// 				</div>
// 			)}

// 			{error && <div className="text-error text-xs">{error}</div>}

// 			{value.length > 0 && (
// 				<div className="flex flex-col gap-1">
// 					{value.map((file, index) => (
// 						<FilePreview
// 							key={file.name + index}
// 							file={file}
// 							onRemove={function () {
// 								removeFile(index)
// 							}}
// 							status={uploadStatuses[getFileIdentifier(file)]}
// 						/>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// // FilePreview component definition
// function FilePreview({ file, onRemove, status }: { file: File; onRemove: () => void; status: FileUploadStatus | undefined }) {
// 	return (
// 		<div className={cn("bg-bg-level1 flex flex-col items-center justify-start gap-3 rounded-lg p-3", { "bg-error/5": status?.status === "error" })}>
// 			<div>
// 				<div className="flex w-full items-center gap-3">
// 					<span className="border-border bg-bg-base drop-shadow-xs size-10 rounded-lg border p-2">
// 						<File className="stroke-text-secondary" size={24} />
// 					</span>
// 					<div className="w-full">
// 						<div className="flex w-full justify-between gap-1">
// 							<span className="text-text text-sm font-medium">{file.name}</span>

// 							<button type="button" onClick={onRemove} className="bg-bg-base size-5 rounded-full p-1">
// 								<X size={12} className="stroke-text-tertiary" />
// 							</button>
// 						</div>
// 						<div className="text-text-secondary flex gap-2 text-xs font-normal">
// 							{status && status.status === "uploading" && <span>Uploading</span>}
// 							{status && status.status === "success" && <span>{formatFileSize(file.size)}</span>}
// 							{status && status.status === "error" && <span className="text-error">Error while uploading</span>}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			{status && <ProgressBar value={parseInt(status.progress.toString())} className="h-1" />}
// 		</div>
// 	)
// }

// export default FileUpload

// "use client"

// import React from "react"
// import { cva } from "class-variance-authority"
// import { File, Upload, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import ProgressBar from "./progress-bar"

// const DEFAULT_MAX_SIZE = 4 * 1024 * 1024 // 4 MB in bytes
// export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

// // Function to format file size into a human-readable string
// function formatFileSize(bytes: number) {
// 	if (bytes === 0) return "0 Bytes"
// 	const k = 1024
// 	const sizes = ["Bytes", "KB", "MB", "GB"]
// 	const i = Math.floor(Math.log(bytes) / Math.log(k))
// 	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
// }

// // Function to create a unique identifier for a file based on its name and last modified timestamp
// function getFileIdentifier(file: File) {
// 	return `${file.name}-${file.lastModified}`
// }
// // Type definition for the file upload status
// type FileUploadStatus = {
// 	progress: number
// 	status: "success" | "error" | "uploading"
// }
// // Type definition for FileUpload component props
// type FileUploadProps = Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange" | "headers"> & {
// 	value?: File[] // Current list of files
// 	onChange?: (files: File[]) => void // Callback when file changes
// 	maxSize?: number // Maximum file size allowed in bytes
// 	containerClassName?: string
// 	dropzoneClassName?: string
// 	url: string // API endpoint where the file will be uploaded to
// 	headers?: Record<string, string> // Custom headers for upload request
// 	ref?: React.Ref<HTMLInputElement>
// 	fieldname?: string // Fieldname for the file upload
// 	rounded?: RoundedOptions
// 	label?: string
// }

// // FileUpload component definition
// function FileUpload({
// 	value = [],
// 	onChange,
// 	multiple = false,
// 	accept,
// 	maxSize = DEFAULT_MAX_SIZE,
// 	containerClassName,
// 	dropzoneClassName,
// 	url,
// 	headers,
// 	fieldname = "file",
// 	rounded = "lg",
// 	label,
// 	ref,
// 	...props
// }: FileUploadProps) {
// 	const [isDragging, setIsDragging] = React.useState(false)
// 	const [error, setError] = React.useState<string | null>(null)
// 	const [uploadStatuses, setUploadStatuses] = React.useState<Record<string, FileUploadStatus>>({})

// 	async function upload(file: File) {
// 		const formData = new FormData()
// 		formData.append(fieldname, file)

// 		const xhr = new XMLHttpRequest()
// 		const fileIdentifier = getFileIdentifier(file)
// 		return new Promise<void>(function () {
// 			xhr.open("POST", url, true)

// 			setUploadStatuses((prev) => ({
// 				...prev,
// 				[fileIdentifier]: { progress: 0, status: "uploading" },
// 			}))

// 			if (headers) {
// 				for (const [key, value] of Object.entries(headers)) {
// 					xhr.setRequestHeader(key, value)
// 				}
// 			}

// 			xhr.upload.addEventListener("progress", function (event) {
// 				if (event.lengthComputable) {
// 					const progress = (event.loaded / event.total) * 100
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { ...prev[fileIdentifier], progress },
// 					}))
// 				}
// 			})

// 			xhr.onload = function () {
// 				if (xhr.status >= 200 && xhr.status < 300) {
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { progress: 100, status: "success" },
// 					}))
// 				} else {
// 					setUploadStatuses((prev) => ({
// 						...prev,
// 						[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
// 					}))
// 				}
// 			}

// 			xhr.onerror = function () {
// 				setUploadStatuses((prev) => ({
// 					...prev,
// 					[fileIdentifier]: { ...prev[fileIdentifier], status: "error" },
// 				}))
// 			}

// 			xhr.send(formData)
// 		})
// 	}

// 	// Function to handle the drop event
// 	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
// 		e.preventDefault()
// 		setIsDragging(false)

// 		const files = Array.from(e.dataTransfer.files)
// 		handleFiles(files)
// 	}
// 	// Function to handle the file input
// 	function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
// 		const files = Array.from(e.target.files || [])
// 		handleFiles(files)
// 	}
// 	// Function to handle the files
// 	function handleFiles(files: File[]) {
// 		setError(null)

// 		if (!multiple && files.length > 1) {
// 			setError("Multiple files not allowed")
// 			return
// 		}
// 		// Check for oversized files
// 		const oversized = files.find((file) => file.size > maxSize)
// 		if (oversized) {
// 			setError(`File exceeds maximum size of ${formatFileSize(maxSize)}`)
// 			return
// 		}

// 		const newFiles = multiple ? [...value, ...files] : files
// 		onChange?.(newFiles)

// 		for (const file of files) {
// 			try {
// 				upload(file)
// 			} catch (err) {
// 				console.error(err)
// 			}
// 		}
// 	}
// 	// Function to remove a file from the list
// 	function removeFile(index: number) {
// 		const newFiles = value.filter((_, i) => i !== index)
// 		onChange?.(newFiles)
// 	}

// 	const cvaFileUploadVariants = {
// 		rounded: {
// 			xs: "rounded-xs",
// 			sm: "rounded-sm",
// 			md: "rounded-md",
// 			lg: "rounded-lg",
// 			xl: "rounded-xl",
// 			"2xl": "rounded-2xl",
// 		},
// 	}

// 	const defaultFileUploadRadius = "lg"

// 	const fileUploadVariants = cva(
// 		"border-border-alpha bg-bg-base max-h-50 relative flex h-full w-full cursor-pointer flex-col items-center justify-center border border-dashed p-3 transition-colors",
// 		{
// 			variants: {
// 				...cvaFileUploadVariants,
// 			},
// 			defaultVariants: {
// 				rounded: defaultFileUploadRadius,
// 			},
// 		}
// 	)

// 	return (
// 		<div className={cn("w-90 flex flex-col gap-1.5", containerClassName)}>
// 			{label && (
// 				<label
// 					className={cn("w-fit text-sm font-medium", {
// 						"text-text-disabled": props.disabled,
// 					})}>
// 					{label}
// 				</label>
// 			)}
// 			{/* Dropzone area - shown when empty or when multiple files allowed */}
// 			{((value.length == 0 && !multiple) || multiple) && (
// 				<div
// 					className={cn(
// 						fileUploadVariants({ rounded }),
// 						{
// 							"border-primary bg-primary/5": isDragging,
// 							"border-error bg-error/5": error,
// 							"bg-bg-level0": props.disabled,
// 							"hover:border-primary hover:bg-primary/5": !props.disabled,
// 						},
// 						dropzoneClassName
// 					)}
// 					onDragOver={function (e) {
// 						e.preventDefault()
// 						setIsDragging(true)
// 					}}
// 					onDragLeave={function () {
// 						setIsDragging(false)
// 					}}
// 					onDrop={handleDrop}>
// 					<input
// 						type="file"
// 						className={cn("absolute inset-0 z-40 h-full w-full cursor-pointer opacity-0", { "cursor-not-allowed": props.disabled })}
// 						multiple={multiple}
// 						accept={accept}
// 						onChange={handleFileInput}
// 						ref={ref}
// 						{...props}
// 					/>

// 					<div className="flex flex-col items-center justify-center gap-4">
// 						<span className={cn("border-border bg-bg-base drop-shadow-xs size-10 rounded-lg border p-2", { "border-error": error })}>
// 							<Upload
// 								size={24}
// 								className={cn("stroke-text-secondary stroke-[1.5]", {
// 									"stroke-error": error,
// 									"stroke-text-tertiary": props.disabled,
// 								})}
// 							/>
// 						</span>
// 						<div className="text-muted-foreground flex flex-col text-sm">
// 							<span
// 								className={cn("text-text text-sm font-medium", {
// 									"text-text-tertiary": props.disabled,
// 								})}>
// 								Upload an image or video
// 							</span>
// 							<span
// 								className={cn("text-text-secondary text-xs font-normal", {
// 									"text-text-tertiary": props.disabled,
// 								})}>
// 								or click to browse ({formatFileSize(maxSize)} max)
// 							</span>
// 						</div>
// 						{accept && <div className="text-muted-foreground text-xs">Supported formats: {accept.split(",").join(", ")}</div>}
// 					</div>
// 				</div>
// 			)}

// 			{error && <div className="text-error text-xs">{error}</div>}

// 			{value.length > 0 && (
// 				<div className="flex flex-col gap-1">
// 					{value.map((file, index) => (
// 						<FilePreview
// 							key={file.name + index}
// 							file={file}
// 							onRemove={function () {
// 								removeFile(index)
// 							}}
// 							status={uploadStatuses[getFileIdentifier(file)]}
// 						/>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// // FilePreview component definition
// function FilePreview({ file, onRemove, status }: { file: File; onRemove: () => void; status: FileUploadStatus | undefined }) {
// 	return (
// 		<div className={cn("bg-bg-level1 flex flex-col items-center justify-start gap-3 rounded-lg p-3", { "bg-error/5": status?.status === "error" })}>
// 			<div>
// 				<div className="flex w-full items-center gap-3">
// 					<span className="border-border bg-bg-base drop-shadow-xs size-10 rounded-lg border p-2">
// 						<File className="stroke-text-secondary" size={24} />
// 					</span>
// 					<div className="w-full">
// 						<div className="flex w-full justify-between gap-1">
// 							<span className="text-text text-sm font-medium">{file.name}</span>

// 							<button type="button" onClick={onRemove} className="bg-bg-base size-5 rounded-full p-1">
// 								<X size={12} className="stroke-text-tertiary" />
// 							</button>
// 						</div>
// 						<div className="text-text-secondary flex gap-2 text-xs font-normal">
// 							{status && status.status === "uploading" && <span>Uploading</span>}
// 							{status && status.status === "success" && <span>{formatFileSize(file.size)}</span>}
// 							{status && status.status === "error" && <span className="text-error">Error while uploading</span>}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			{status && <ProgressBar value={parseInt(status.progress.toString())} className="h-1" />}
// 		</div>
// 	)
// }

// export default FileUpload

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
}
const DEFAULT_MAX_SIZE = 4 * 1024 * 1024 // 4 MB in bytes

function FileUpload({
	maxSize = DEFAULT_MAX_SIZE,
	variant = "default",
	// fieldname = "file",
	// rounded = "lg",
	// label,
	className,
	format,
}: FileUploadProps) {
	const maxSizeMB = 5
	const maxFiles = 6

	const [
		{ files, isDragging, errors },
		{ handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, clearFiles, getInputProps },
	] = useFileUpload({
		accept: format === "image" ? "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif" : undefined,
		maxSize,
		multiple: true,
		maxFiles,
	})

	return (
		<>
			{variant === "default" ? (
				<Input id="picture" type="file" label="Picture" />
			) : (
				<div className={"flex flex-col gap-2"}>
					<Label htmlFor="picture">Picture</Label>
					{/* Drop area */}
					<div
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						data-dragging={isDragging || undefined}
						data-files={files.length > 0 || undefined}
						className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 not-data-[files]:justify-center relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]">
						<input id="picture" {...getInputProps()} className="sr-only" aria-label="Upload image file" />
						<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
							<div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
								<ImageIcon className="size-4 opacity-60" />
							</div>
							<p className="mb-1.5 text-sm font-medium">Drop your {format === "image" ? "images" : "choice of files"} here</p>
							<p className="text-muted-foreground text-xs">
								{format === "image" ? "SVG, PNG, JPG or GIF" : "All format files"} (max. {maxSizeMB}MB)
							</p>
							<Button variant="neutral-outline" className="mt-4" onClick={openFileDialog}>
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
