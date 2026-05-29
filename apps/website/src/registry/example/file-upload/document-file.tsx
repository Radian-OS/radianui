"use client"

import { useState } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button, IconButton } from "@/registry/ui/button"
import {
	type FileWithPreview,
	formatBytes,
	useFileUpload,
} from "@/registry/ui/file-upload"
import { Progress } from "@/registry/ui/progress"

const initialFiles = [
	{
		name: "report.pdf",
		size: 524288,
		type: "application/pdf",
		url: "https://example.com/report.pdf",
		id: "report-001",
	},
	{
		name: "resume.docx",
		size: 1048576,
		type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		url: "https://example.com/resume.docx",
		id: "resume-001",
	},
	{
		name: "financials.xlsx",
		size: 2097152,
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		url: "https://example.com/financials.xlsx",
		id: "financials-001",
	},
	{
		name: "notes.txt",
		size: 10240,
		type: "text/plain",
		url: "https://example.com/notes.txt",
		id: "notes-001",
	},
]

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
	const fileType = file.file instanceof File ? file.file.type : file.file.type
	const fileName = file.file instanceof File ? file.file.name : file.file.name

	const iconMap = {
		pdf: {
			icon: <IconSlot slot="file-text" />,
			conditions: (type: string, name: string) =>
				type.includes("pdf") ||
				name.endsWith(".pdf") ||
				type.includes("word") ||
				name.endsWith(".doc") ||
				name.endsWith(".docx"),
		},
		archive: {
			icon: <IconSlot slot="file-archive" />,
			conditions: (type: string, name: string) =>
				type.includes("zip") ||
				type.includes("archive") ||
				name.endsWith(".zip") ||
				name.endsWith(".rar"),
		},
		excel: {
			icon: <IconSlot slot="file-spreadsheet" />,
			conditions: (type: string, name: string) =>
				type.includes("excel") ||
				name.endsWith(".xls") ||
				name.endsWith(".xlsx"),
		},
	}

	for (const { icon: Icon, conditions } of Object.values(iconMap)) {
		if (conditions(fileType, fileName)) {
			return Icon
		}
	}

	return <IconSlot slot="file-text" className="size-5 opacity-60" />
}

// Type for tracking upload progress
type UploadProgress = {
	fileId: string
	progress: number
	completed: boolean
}

// Function to simulate file upload with more realistic timing and progress
const simulateUpload = (
	totalBytes: number,
	onProgress: (progress: number) => void,
	onComplete: () => void
) => {
	let timeoutId: NodeJS.Timeout
	let uploadedBytes = 0
	let lastProgressReport = 0

	const simulateChunk = () => {
		// Simulate variable network conditions with random chunk sizes
		const chunkSize = Math.floor(Math.random() * 300000) + 2000
		uploadedBytes = Math.min(totalBytes, uploadedBytes + chunkSize)

		// Calculate progress percentage (0-100)
		const progressPercent = Math.floor((uploadedBytes / totalBytes) * 100)

		// Only report progress if it's changed by at least 1%
		if (progressPercent > lastProgressReport) {
			lastProgressReport = progressPercent
			onProgress(progressPercent)
		}

		// Continue simulation if not complete
		if (uploadedBytes < totalBytes) {
			// Variable delay between 50ms and 500ms to simulate network fluctuations (reduced for faster uploads)
			const delay = Math.floor(Math.random() * 450) + 50

			// Occasionally add a longer pause to simulate network congestion (5% chance, shorter duration)
			const extraDelay = Math.random() < 0.05 ? 500 : 0

			timeoutId = setTimeout(simulateChunk, delay + extraDelay)
		} else {
			// Upload complete
			onComplete()
		}
	}

	// Start the simulation
	timeoutId = setTimeout(simulateChunk, 100)

	// Return a cleanup function to cancel the simulation
	return () => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
	}
}

export default function Component() {
	const maxSizeMB = 5
	const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
	const maxFiles = 6

	// State to track upload progress for each file
	const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])

	// Function to handle newly added files
	const handleFilesAdded = (addedFiles: FileWithPreview[]) => {
		// Initialize progress tracking for each new file
		const newProgressItems = addedFiles.map((file) => ({
			fileId: file.id,
			progress: 0,
			completed: false,
		}))

		// Add new progress items to state
		setUploadProgress((prev) => [...prev, ...newProgressItems])

		// Store cleanup functions
		const cleanupFunctions: Array<() => void> = []

		// Start simulated upload for each file
		addedFiles.forEach((file) => {
			const fileSize =
				file.file instanceof File ? file.file.size : file.file.size

			// Start the upload simulation and store the cleanup function
			const cleanup = simulateUpload(
				fileSize,
				// Progress callback
				(progress) => {
					setUploadProgress((prev) =>
						prev.map((item) =>
							item.fileId === file.id ? { ...item, progress } : item
						)
					)
				},
				// Complete callback
				() => {
					setUploadProgress((prev) =>
						prev.map((item) =>
							item.fileId === file.id ? { ...item, completed: true } : item
						)
					)
				}
			)

			cleanupFunctions.push(cleanup)
		})

		// Return a cleanup function that cancels all animations
		return () => {
			cleanupFunctions.forEach((cleanup) => cleanup())
		}
	}

	// Remove the progress tracking for the file
	const handleFileRemoved = (fileId: string) => {
		setUploadProgress((prev) => prev.filter((item) => item.fileId !== fileId))
	}

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
		accept:
			"application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,application/vnd.oasis.opendocument.text",
		multiple: true,
		maxFiles,
		maxSize,
		initialFiles,
		onFilesAdded: handleFilesAdded,
	})

	return (
		<div className="w-90 flex flex-col gap-2">
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
								Files ({files.length})
							</h3>
							<div className="flex gap-2">
								<Button
									variant="outline"
									color="neutral"
									size="28"
									onClick={openFileDialog}>
									<IconSlot
										slot="upload"
										className="-ms-0.5 size-3.5 opacity-60"
										aria-hidden="true"
									/>
									Add files
								</Button>
								<Button
									variant="outline"
									size="28"
									color="neutral"
									onClick={() => {
										// Clear all progress tracking
										setUploadProgress([])
										clearFiles()
									}}>
									<IconSlot
										slot="trash"
										className="-ms-0.5 size-3.5 opacity-60"
										aria-hidden="true"
									/>
									Remove all
								</Button>
							</div>
						</div>

						<div className="w-full space-y-2">
							{files.map((file) => {
								// Find the upload progress for this file once to avoid repeated lookups
								const fileProgress = uploadProgress.find(
									(p) => p.fileId === file.id
								)
								const isUploading = fileProgress && !fileProgress.completed

								return (
									<div
										key={file.id}
										data-uploading={isUploading || undefined}
										className="bg-bg flex flex-col gap-1 rounded-lg border p-2 pe-3 transition-opacity duration-300">
										<div className="flex items-center justify-between gap-2">
											<div className="in-data-[uploading=true]:opacity-50 flex items-center gap-3 overflow-hidden">
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
												className="text-fg-tertiary hover:text-fg -me-2 size-8 hover:bg-transparent"
												onClick={() => {
													handleFileRemoved(file.id)
													removeFile(file.id)
												}}
												aria-label="Remove file">
												<IconSlot
													slot="cross"
													className="size-4"
													aria-hidden="true"
												/>
											</IconButton>
										</div>

										{/* Upload progress bar */}
										{fileProgress &&
											(() => {
												const progress = fileProgress.progress || 0
												const completed = fileProgress.completed || false

												if (completed) return null

												return (
													<div className="mt-1 flex items-center gap-2">
														<Progress value={progress} max={100} />
														<span className="text-fg-secondary w-10 text-xs tabular-nums">
															{progress}%
														</span>
													</div>
												)
											})()}
									</div>
								)
							})}
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
						<div
							className="bg-bg mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
							aria-hidden="true">
							<IconSlot slot="image" className="size-4 opacity-60" />
						</div>
						<p className="mb-1.5 text-sm font-medium">Drop your files here</p>
						<p className="text-fg-secondary text-xs">
							Max {maxFiles} files ∙ Up to {maxSizeMB}MB
						</p>
						<Button
							variant="outline"
							color="neutral"
							className="mt-4"
							onClick={openFileDialog}>
							<IconSlot
								slot="upload"
								className="-ms-1 opacity-60"
								aria-hidden="true"
							/>
							Select documents
						</Button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className="text-error-text flex items-center gap-1 text-xs"
					role="alert">
					<IconSlot slot="alert" className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	)
}
