"use client"

import { useEffect, useRef, useState } from "react"
import { CloudUpload, Download, Trash2, Upload, X } from "lucide-react"
import { Button, CompactButton, IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Divider } from "@/registry/ui/divider"
import {
	type FileMetadata,
	type FileWithPreview,
	formatBytes,
	useFileUpload,
} from "@/registry/ui/file-upload"
import { Progress } from "@/registry/ui/progress"

// ─── Types ────────────────────────────────────────────────────────────────────

type UploadStatus = "uploading" | "done" | "error"

type FileUploadProgress = {
	id: string
	progress: number
	status: UploadStatus
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPT = ".pdf,.png,.docx,.svg"

// Initial files that simulate in-progress uploads on mount
const INITIAL_FILES: FileMetadata[] = [
	{
		id: "initial-marketing",
		name: "Marketing_Collateral.png",
		size: 5 * 1024 * 1024,
		type: "image/png",
		url: "#",
	},
	{
		id: "initial-brief",
		name: "Project_Brief_v1.pdf",
		size: 2 * 1024 * 1024,
		type: "application/pdf",
		url: "#",
	},
	{
		id: "initial-icons",
		name: "Icon_Set_Final.svg",
		size: 1 * 1024 * 1024,
		type: "image/svg+xml",
		url: "#",
	},
]

// Which of the initial files should start as uploading (not yet done)
const UPLOADING_INITIAL_IDS = new Set(["initial-marketing"])

function getExtension(name: string) {
	return name.split(".").pop()?.toLowerCase() ?? ""
}

type BadgeVariant = "png" | "pdf" | "svg" | "docx" | "default"

const BADGE_STYLES: Record<BadgeVariant, { label: string }> = {
	png: {
		label: "PNG",
	},
	pdf: {
		label: "PDF",
	},
	svg: {
		label: "SVG",
	},
	docx: {
		label: "DOCX",
	},
	default: {
		label: "FILE",
	},
}

function FileBadge({ name }: { name: string }) {
	const ext = getExtension(name) as BadgeVariant
	const style = BADGE_STYLES[ext] ?? BADGE_STYLES.default
	return (
		<div
			className={`bg-fill1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[9px] font-medium tracking-wide`}>
			{style.label}
		</div>
	)
}

// ─── Per-file progress hook ───────────────────────────────────────────────────

function useFileProgress(
	files: FileWithPreview[],
	progressMap: Record<string, FileUploadProgress>,
	setProgressMap: React.Dispatch<
		React.SetStateAction<Record<string, FileUploadProgress>>
	>
) {
	const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval>>>(
		{}
	)
	// Track which ids we've already seeded so we never double-start
	const seededRef = useRef<Set<string>>(new Set())

	useEffect(() => {
		files.forEach((f) => {
			if (seededRef.current.has(f.id)) return // already started

			seededRef.current.add(f.id)
			const isRealFile = f.file instanceof File
			const isInitialUploading = UPLOADING_INITIAL_IDS.has(f.id)
			const startProgress = isInitialUploading ? 45 : 0
			const startStatus: UploadStatus =
				isRealFile || isInitialUploading ? "uploading" : "done"

			setProgressMap((prev) => ({
				...prev,
				[f.id]: { id: f.id, progress: startProgress, status: startStatus },
			}))

			// Nothing to animate for already-done files
			if (startStatus !== "uploading") return

			const id = f.id
			const interval = setInterval(() => {
				setProgressMap((prev) => {
					const current = prev[id]
					if (!current || current.status !== "uploading") return prev

					const next = Math.min(current.progress + Math.random() * 8 + 2, 100)
					const done = next >= 100

					if (done) {
						// Stop the interval right here, inside the callback
						clearInterval(intervalsRef.current[id])
						delete intervalsRef.current[id]
					}

					return {
						...prev,
						[id]: {
							...current,
							progress: done ? 100 : next,
							status: done ? "done" : "uploading",
						},
					}
				})
			}, 120)

			intervalsRef.current[id] = interval
		})
	}, [files, setProgressMap]) // ← progressMap intentionally removed from deps

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			Object.values(intervalsRef.current).forEach(clearInterval)
		}
	}, [])
}

// ─── File row ─────────────────────────────────────────────────────────────────

type FileRowProps = {
	fileWithPreview: FileWithPreview
	progress: FileUploadProgress | undefined
	onRemove: (id: string) => void
	onCancel: (id: string) => void
}

function FileRow({
	fileWithPreview,
	progress,
	onRemove,
	onCancel,
}: FileRowProps) {
	const { file, id } = fileWithPreview
	const isUploading = progress?.status === "uploading"
	const pct = progress?.progress ?? 0

	return (
		<div className="border-border1 bg-background flex items-center gap-3 rounded-lg border px-3 py-2.5">
			<FileBadge name={file.name} />

			<div className="min-w-0 flex-1">
				<p className="text-fg truncate text-sm font-medium">{file.name}</p>

				<div className="mt-0.5 flex items-center gap-1.5">
					<span className="text-fg-tertiary text-xs">
						{isUploading
							? `${formatBytes(Math.round((file.size * pct) / 100))} / ${formatBytes(file.size)}`
							: formatBytes(file.size)}
					</span>

					{isUploading && (
						<span className="text-text2 flex items-center gap-1 text-xs">
							<CloudUpload className="size-3.5" />
							Uploading...
						</span>
					)}
				</div>

				{isUploading && (
					<Progress
						value={pct}
						className="mt-1.5 h-1.5"
						indicatorClassName="bg-primary"
					/>
				)}
			</div>

			<div className="flex shrink-0 items-center gap-0.5">
				{isUploading ? (
					<CompactButton
						aria-label="Close Button"
						size="24"
						variant="soft"
						color="neutral"
						onClick={() => onCancel(id)}>
						<X />
					</CompactButton>
				) : (
					<>
						<CompactButton size="20" variant="ghost" color="neutral">
							<Download />
						</CompactButton>
						<CompactButton
							size="20"
							variant="ghost"
							color="neutral"
							onClick={() => onRemove(id)}>
							<Trash2 />
						</CompactButton>
					</>
				)}
			</div>
		</div>
	)
}

// ─── Main component ───────────────────────────────────────────────────────────

type FileUploadProps = {
	onContinue?: (files: FileWithPreview[]) => void
	onCancel?: () => void
}

export default function FileUpload({ onContinue, onCancel }: FileUploadProps) {
	const [progressMap, setProgressMap] = useState<
		Record<string, FileUploadProgress>
	>({})

	const [state, actions] = useFileUpload({
		multiple: true,
		maxSize: MAX_SIZE,
		accept: ACCEPT,
		initialFiles: INITIAL_FILES,
	})

	// Attach simulated upload progress to new files
	useFileProgress(state.files, progressMap, setProgressMap)

	function handleRemove(id: string) {
		actions.removeFile(id)
		setProgressMap((prev) => {
			const next = { ...prev }
			delete next[id]
			return next
		})
	}

	function handleCancel(id: string) {
		handleRemove(id)
	}

	return (
		<Card className="w-115 border-soft bg-bg flex flex-col gap-0 rounded-xl border p-0">
			{/* Header */}
			<div className="flex items-start gap-3 p-5">
				<IconButton
					aria-label="Rounded Upload Button"
					className="rounded-full"
					variant="soft"
					color="primary">
					<Upload />
				</IconButton>
				<div>
					<h2 className="text-fg text-base font-medium">Upload files</h2>
					<p className="text-fg-secondary mt-0.5 text-sm">
						Select or drag and drop files to add them to your workspace.
					</p>
				</div>
			</div>
			<Divider />

			{/* Dropzone */}
			<div className="flex flex-col gap-3 p-5">
				<div
					role="button"
					tabIndex={0}
					aria-label="Drop files here or click to browse"
					onDragEnter={actions.handleDragEnter}
					onDragLeave={actions.handleDragLeave}
					onDragOver={actions.handleDragOver}
					onDrop={actions.handleDrop}
					onClick={actions.openFileDialog}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") actions.openFileDialog()
					}}
					className="border-fg-disabled hover:bg-fill1-alpha data-[dragging=true]:bg-primary-accent has-[input:focus]:border-primary-focus has-[input:focus]:ring-primary has-disabled:pointer-events-none has-disabled:opacity-50 flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]">
					<input {...actions.getInputProps()} className="hidden" />

					<IconButton
						aria-label="Upload Button"
						color="neutral"
						variant="outline">
						<Upload />
					</IconButton>
					<div>
						<p className="text-fg text-sm font-medium">
							Drag and drop files here
						</p>
						<p className="text-fg-secondary text-xs font-normal">
							PDF, PNG or DOCX (max. 10 MB)
						</p>
					</div>
					<Button
						type="button"
						onClick={(e) => {
							e.stopPropagation()
							actions.openFileDialog()
						}}
						color="neutral"
						variant="outline">
						Browse Files
					</Button>
				</div>

				{/* Error messages */}
				{state.errors.length > 0 && (
					<div className="rounded-md bg-red-50 px-3 py-2">
						{state.errors.map((err) => (
							<p key={err} className="text-xs text-red-600">
								{err}
							</p>
						))}
					</div>
				)}

				{/* File list */}
				{state.files.length > 0 && (
					<div className="flex flex-col gap-2">
						{state.files.map((f) => (
							<FileRow
								key={f.id}
								fileWithPreview={f}
								progress={progressMap[f.id]}
								onRemove={handleRemove}
								onCancel={handleCancel}
							/>
						))}
					</div>
				)}
			</div>

			<Divider />

			{/* Footer */}
			<div className="flex justify-end gap-2 p-5">
				<Button
					type="button"
					onClick={onCancel}
					color="neutral"
					variant="outline">
					Cancel
				</Button>
				<Button
					type="button"
					color="primary"
					onClick={() => onContinue?.(state.files)}
					disabled={state.files.length === 0}>
					Continue
				</Button>
			</div>
		</Card>
	)
}
