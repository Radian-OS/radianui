"use client"

import type React from "react"
import { type ChangeEvent, type DragEvent, type InputHTMLAttributes, useCallback, useRef, useState } from "react"
import { cva } from "class-variance-authority"
import { AlertCircleIcon, FileArchiveIcon, FileIcon, FileSpreadsheetIcon, FileTextIcon, HeadphonesIcon, Upload, VideoIcon, XIcon } from "lucide-react"
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
	maxSize?: number
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
	hasError?: boolean
	value?: FileWithPreview[] // External file list
	onChange?: (files: FileWithPreview[]) => void // Callback when files change
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
	hasError = false,
	title = "Drag and drop files to upload",
	description = "JPG, PNG, GIF or other image files",
	value,
	onChange,
}: FileUploadProps) {
	// Convert external value to initialFiles format
	const initialFiles = value
		? value.map((fileWithPreview) => {
				if (fileWithPreview.file instanceof File) {
					return {
						id: fileWithPreview.id,
						name: fileWithPreview.file.name,
						size: fileWithPreview.file.size,
						type: fileWithPreview.file.type,
						url: fileWithPreview.preview || URL.createObjectURL(fileWithPreview.file),
					}
				} else {
					return fileWithPreview.file as FileMetadata
				}
			})
		: []

	const maxSizeValue = maxSize * 1024 * 1024

	const [{ files, isDragging, errors }, { handleDragEnter, handleFileChange, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, clearFiles, getInputProps }] =
		useFileUpload({
			accept,
			maxSize: maxSizeValue,
			multiple: maxFiles > 1 ? multiple : false,
			maxFiles,
			initialFiles,
			onFilesChange: onChange,
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
					onChange={handleFileChange}
					id="picture"
					type="file"
					label={label ? `${label}` : ""}
					rounded={rounded}
					disabled={disabled}
					multiple={multiple}
					hint={errors.length > 0 ? errors[0] : hint}
					hasError={errors.length > 0 || hasError}
				/>
			) : (
				<div className={cn("flex w-80 flex-col gap-1.5", className)}>
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
							<Button disabled={disabled} variant="outline" color="neutral" size="36" isIcon>
								<Upload className="text-text-secondary size-6" />
							</Button>
							<div className="flex flex-col gap-2">
								<p className="text-text text-sm font-semibold leading-5">{title}</p>
								<p className="text-text-tertiary text-xs font-normal leading-4">
									{description} (max. {maxSize} MB){" "}
								</p>
							</div>
							<Button
								variant="outline"
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

					{hint && <Label className={`flex items-start text-xs font-normal ${hasError ? "text-error" : "text-text-tertiary"}`}>{hint}</Label>}

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
										<div className="flex aspect-square size-10 shrink-0 items-center justify-center overflow-hidden rounded border">{getFileIcon(file)}</div>
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
									<Button size="28" variant="outline" color="neutral" onClick={clearFiles}>
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

export type FileMetadata = {
	name: string
	size: number
	type: string
	url: string
	id: string
}

export type FileWithPreview = {
	file: File | FileMetadata
	id: string
	preview?: string
}

export type FileUploadOptions = {
	maxFiles?: number // Only used when multiple is true, defaults to Infinity
	maxSize?: number // in bytes
	accept?: string
	multiple?: boolean // Defaults to false
	initialFiles?: FileMetadata[]
	onFilesChange?: (files: FileWithPreview[]) => void // Callback when files change
	onFilesAdded?: (addedFiles: FileWithPreview[]) => void // Callback when new files are added
}

export type FileUploadState = {
	files: FileWithPreview[]
	isDragging: boolean
	errors: string[]
}

export type FileUploadActions = {
	addFiles: (files: FileList | File[]) => void
	removeFile: (id: string) => void
	clearFiles: () => void
	clearErrors: () => void
	handleDragEnter: (e: DragEvent<HTMLElement>) => void
	handleDragLeave: (e: DragEvent<HTMLElement>) => void
	handleDragOver: (e: DragEvent<HTMLElement>) => void
	handleDrop: (e: DragEvent<HTMLElement>) => void
	handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
	openFileDialog: () => void
	getInputProps: (props?: InputHTMLAttributes<HTMLInputElement>) => InputHTMLAttributes<HTMLInputElement> & {
		ref: React.Ref<HTMLInputElement>
	}
}

export const useFileUpload = (options: FileUploadOptions = {}): [FileUploadState, FileUploadActions] => {
	const { maxFiles = Infinity, maxSize = Infinity, accept = "*", multiple = false, initialFiles = [], onFilesChange, onFilesAdded } = options

	const [state, setState] = useState<FileUploadState>({
		files: initialFiles.map((file) => ({
			file,
			id: file.id,
			preview: file.url,
		})),
		isDragging: false,
		errors: [],
	})

	const inputRef = useRef<HTMLInputElement>(null)

	const validateFile = useCallback(
		(file: File | FileMetadata): string | null => {
			if (file instanceof File) {
				if (file.size > maxSize) {
					return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`
				}
			} else {
				if (file.size > maxSize) {
					return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`
				}
			}

			if (accept !== "*") {
				const acceptedTypes = accept.split(",").map((type) => type.trim())
				const fileType = file instanceof File ? file.type || "" : file.type
				const fileExtension = `.${file instanceof File ? file.name.split(".").pop() : file.name.split(".").pop()}`

				const isAccepted = acceptedTypes.some((type) => {
					if (type.startsWith(".")) {
						return fileExtension.toLowerCase() === type.toLowerCase()
					}
					if (type.endsWith("/*")) {
						const baseType = type.split("/")[0]
						return fileType.startsWith(`${baseType}/`)
					}
					return fileType === type
				})

				if (!isAccepted) {
					return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`
				}
			}

			return null
		},
		[accept, maxSize]
	)

	const createPreview = useCallback((file: File | FileMetadata): string | undefined => {
		if (file instanceof File) {
			return URL.createObjectURL(file)
		}
		return file.url
	}, [])

	const generateUniqueId = useCallback((file: File | FileMetadata): string => {
		if (file instanceof File) {
			return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
		}
		return file.id
	}, [])

	const clearFiles = useCallback(() => {
		setState((prev) => {
			// Clean up object URLs
			prev.files.forEach((file) => {
				if (file.preview && file.file instanceof File && file.file.type.startsWith("image/")) {
					URL.revokeObjectURL(file.preview)
				}
			})

			if (inputRef.current) {
				inputRef.current.value = ""
			}

			const newState = {
				...prev,
				files: [],
				errors: [],
			}

			onFilesChange?.(newState.files)
			return newState
		})
	}, [onFilesChange])

	const addFiles = useCallback(
		(newFiles: FileList | File[]) => {
			if (!newFiles || newFiles.length === 0) return

			const newFilesArray = Array.from(newFiles)
			const errors: string[] = []

			// Clear existing errors when new files are uploaded
			setState((prev) => ({ ...prev, errors: [] }))

			// In single file mode, clear existing files first
			if (!multiple) {
				clearFiles()
			}

			// Check if adding these files would exceed maxFiles (only in multiple mode)
			if (multiple && maxFiles !== Infinity && state.files.length + newFilesArray.length > maxFiles) {
				errors.push(`You can only upload a maximum of ${maxFiles} files.`)
				setState((prev) => ({ ...prev, errors }))
				return
			}

			const validFiles: FileWithPreview[] = []

			newFilesArray.forEach((file) => {
				// Only check for duplicates if multiple files are allowed
				if (multiple) {
					const isDuplicate = state.files.some((existingFile) => existingFile.file.name === file.name && existingFile.file.size === file.size)

					// Skip duplicate files silently
					if (isDuplicate) {
						return
					}
				}

				// Check file size
				if (file.size > maxSize) {
					errors.push(multiple ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.` : `File exceeds the maximum size of ${formatBytes(maxSize)}.`)
					return
				}

				const error = validateFile(file)
				if (error) {
					errors.push(error)
				} else {
					validFiles.push({
						file,
						id: generateUniqueId(file),
						preview: createPreview(file),
					})
				}
			})

			// Only update state if we have valid files to add
			if (validFiles.length > 0) {
				// Call the onFilesAdded callback with the newly added valid files
				onFilesAdded?.(validFiles)

				setState((prev) => {
					const newFiles = !multiple ? validFiles : [...prev.files, ...validFiles]
					onFilesChange?.(newFiles)
					return {
						...prev,
						files: newFiles,
						errors,
					}
				})
			} else if (errors.length > 0) {
				setState((prev) => ({
					...prev,
					errors,
				}))
			}

			// Reset input value after handling files
			if (inputRef.current) {
				inputRef.current.value = ""
			}
		},
		[state.files.length, maxFiles, multiple, maxSize, validateFile, createPreview, generateUniqueId, clearFiles, onFilesChange, onFilesAdded]
	)

	const removeFile = useCallback(
		(id: string) => {
			setState((prev) => {
				const fileToRemove = prev.files.find((file) => file.id === id)
				if (fileToRemove && fileToRemove.preview && fileToRemove.file instanceof File && fileToRemove.file.type.startsWith("image/")) {
					URL.revokeObjectURL(fileToRemove.preview)
				}

				const newFiles = prev.files.filter((file) => file.id !== id)
				onFilesChange?.(newFiles)

				return {
					...prev,
					files: newFiles,
					errors: [],
				}
			})
		},
		[onFilesChange]
	)

	const clearErrors = useCallback(() => {
		setState((prev) => ({
			...prev,
			errors: [],
		}))
	}, [])

	const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setState((prev) => ({ ...prev, isDragging: true }))
	}, [])

	const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (e.currentTarget.contains(e.relatedTarget as Node)) {
			return
		}

		setState((prev) => ({ ...prev, isDragging: false }))
	}, [])

	const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
		e.preventDefault()
		e.stopPropagation()
	}, [])

	const handleDrop = useCallback(
		(e: DragEvent<HTMLElement>) => {
			e.preventDefault()
			e.stopPropagation()
			setState((prev) => ({ ...prev, isDragging: false }))

			// Don't process files if the input is disabled
			if (inputRef.current?.disabled) {
				return
			}

			if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				// In single file mode, only use the first file
				if (!multiple) {
					const file = e.dataTransfer.files[0]
					addFiles([file])
				} else {
					addFiles(e.dataTransfer.files)
				}
			}
		},
		[addFiles, multiple]
	)

	const handleFileChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files.length > 0) {
				addFiles(e.target.files)
			}
		},
		[addFiles]
	)

	const openFileDialog = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}, [])

	const getInputProps = useCallback(
		(props: InputHTMLAttributes<HTMLInputElement> = {}) => {
			return {
				...props,
				type: "file" as const,
				onChange: handleFileChange,
				accept: props.accept || accept,
				multiple: props.multiple !== undefined ? props.multiple : multiple,
				ref: inputRef,
			}
		},
		[accept, multiple, handleFileChange]
	)

	return [
		state,
		{
			addFiles,
			removeFile,
			clearFiles,
			clearErrors,
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			handleFileChange,
			openFileDialog,
			getInputProps,
		},
	]
}

// Helper function to format bytes to human-readable format
export const formatBytes = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return "0 Bytes"

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}
