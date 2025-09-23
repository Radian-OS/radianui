"use client"

import type React from "react"
import { type ChangeEvent, type DragEvent, type InputHTMLAttributes, useCallback, useRef, useState } from "react"

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
	onError?: (errors: string[]) => void
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

export function useFileUpload(options: FileUploadOptions = {}): [FileUploadState, FileUploadActions] {
	const {
		maxFiles = Number.POSITIVE_INFINITY,
		maxSize = Number.POSITIVE_INFINITY,
		accept = "*",
		multiple = false,
		initialFiles = [],
		onFilesChange,
		onFilesAdded,
		onError,
	} = options

	const [state, setState] = useState<FileUploadState>({
		files: initialFiles.map(function (file) {
			return {
				file,
				id: file.id,
				preview: file.url,
			}
		}),
		isDragging: false,
		errors: [],
	})

	const inputRef = useRef<HTMLInputElement>(null)

	const validateFile = useCallback(
		function (file: File | FileMetadata): string | null {
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
				const acceptedTypes = accept.split(",").map(function (type) {
					return type.trim()
				})
				const fileType = file instanceof File ? file.type || "" : file.type
				const fileExtension = `.${file instanceof File ? file.name.split(".").pop() : file.name.split(".").pop()}`

				const isAccepted = acceptedTypes.some(function (type) {
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

	const createPreview = useCallback(function (file: File | FileMetadata): string | undefined {
		if (file instanceof File) {
			return URL.createObjectURL(file)
		}
		return file.url
	}, [])

	const generateUniqueId = useCallback(function (file: File | FileMetadata): string {
		if (file instanceof File) {
			return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
		}
		return file.id
	}, [])

	const clearFiles = useCallback(
		function () {
			setState(function (prev) {
				// Clean up object URLs
				for (const file of prev.files) {
					if (file.preview && file.file instanceof File && file.file.type.startsWith("image/")) {
						URL.revokeObjectURL(file.preview)
					}
				}

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
		},
		[onFilesChange]
	)

	const addFiles = useCallback(
		function (newFiles: FileList | File[]) {
			if (!newFiles || newFiles.length === 0) return

			const newFilesArray = Array.from(newFiles)
			const errors: string[] = []

			// Clear existing errors when new files are uploaded
			setState(function (prev) {
				return { ...prev, errors: [] }
			})

			// In single file mode, clear existing files first
			if (!multiple) {
				clearFiles()
			}

			// Check if adding these files would exceed maxFiles (only in multiple mode)
			if (multiple && maxFiles !== Number.POSITIVE_INFINITY && state.files.length + newFilesArray.length > maxFiles) {
				errors.push(`You can only upload a maximum of ${maxFiles} files.`)
				onError?.(errors)
				setState(function (prev) {
					return { ...prev, errors }
				})
				return
			}

			const validFiles: FileWithPreview[] = []

			for (const file of newFilesArray) {
				// Only check for duplicates if multiple files are allowed
				if (multiple) {
					const isDuplicate = state.files.some(function (existingFile) {
						return existingFile.file.name === file.name && existingFile.file.size === file.size
					})

					// Skip duplicate files silently
					if (isDuplicate) {
						return
					}
				}

				// Check file size
				if (file.size > maxSize) {
					errors.push(multiple ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.` : `File exceeds the maximum size of ${formatBytes(maxSize)}.`)
					continue
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
			}

			// Only update state if we have valid files to add
			if (validFiles.length > 0) {
				// Call the onFilesAdded callback with the newly added valid files
				onFilesAdded?.(validFiles)

				setState(function (prev) {
					const newFiles = !multiple ? validFiles : [...prev.files, ...validFiles]
					onFilesChange?.(newFiles)
					return {
						...prev,
						files: newFiles,
						errors,
					}
				})
			} else if (errors.length > 0) {
				onError?.(errors)
				setState(function (prev) {
					return {
						...prev,
						errors,
					}
				})
			}

			// Reset input value after handling files
			if (inputRef.current) {
				inputRef.current.value = ""
			}
		},
		[state.files, maxFiles, multiple, maxSize, validateFile, createPreview, generateUniqueId, clearFiles, onFilesChange, onFilesAdded]
	)

	const removeFile = useCallback(
		function (id: string) {
			setState(function (prev) {
				const fileToRemove = prev.files.find(function (file) {
					return file.id === id
				})
				if (fileToRemove && fileToRemove.preview && fileToRemove.file instanceof File && fileToRemove.file.type.startsWith("image/")) {
					URL.revokeObjectURL(fileToRemove.preview)
				}

				const newFiles = prev.files.filter(function (file) {
					return file.id !== id
				})
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

	const clearErrors = useCallback(function () {
		setState(function (prev) {
			return {
				...prev,
				errors: [],
			}
		})
	}, [])

	const handleDragEnter = useCallback(function (e: DragEvent<HTMLElement>) {
		e.preventDefault()
		e.stopPropagation()
		setState(function (prev) {
			return { ...prev, isDragging: true }
		})
	}, [])

	const handleDragLeave = useCallback(function (e: DragEvent<HTMLElement>) {
		e.preventDefault()
		e.stopPropagation()

		if (e.currentTarget.contains(e.relatedTarget as Node)) {
			return
		}

		setState(function (prev) {
			return { ...prev, isDragging: false }
		})
	}, [])

	const handleDragOver = useCallback(function (e: DragEvent<HTMLElement>) {
		e.preventDefault()
		e.stopPropagation()
	}, [])

	const handleDrop = useCallback(
		function (e: DragEvent<HTMLElement>) {
			e.preventDefault()
			e.stopPropagation()
			setState(function (prev) {
				return { ...prev, isDragging: false }
			})

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
		function (e: ChangeEvent<HTMLInputElement>) {
			if (e.target.files && e.target.files.length > 0) {
				addFiles(e.target.files)
			}
		},
		[addFiles]
	)

	const openFileDialog = useCallback(function () {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}, [])

	const getInputProps = useCallback(
		function (props: InputHTMLAttributes<HTMLInputElement> = {}) {
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
export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return "0 Bytes"

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i]
}
