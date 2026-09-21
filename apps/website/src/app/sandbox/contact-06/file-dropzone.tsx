"use client"

import React, { useRef, useState } from "react"
import { FileText, UploadCloud, X } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface FileDropzoneProps {
	value?: string
	onChange: (fileName: string | undefined) => void
}

export function FileDropzone({ value, onChange }: FileDropzoneProps) {
	const [isDragging, setIsDragging] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		const files = e.dataTransfer.files
		if (files && files.length > 0) {
			onChange(files[0].name)
		}
	}

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			onChange(files[0].name)
		}
	}

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation()
		onChange(undefined)
		if (inputRef.current) {
			inputRef.current.value = ""
		}
	}

	return (
		<div className="w-full">
			<input
				ref={inputRef}
				type="file"
				className="hidden"
				accept=".jpg,.jpeg,.png,.pdf,.mp4"
				onChange={handleFileSelect}
			/>

			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={() => !value && inputRef.current?.click()}
				className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition-colors ${
					isDragging
						? "border-primary bg-primary/10"
						: "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50"
				}`}>
				{value ? (
					<div className="flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 text-left">
						<div className="flex items-center gap-2.5 overflow-hidden">
							<div className="text-primary flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-800">
								<FileText className="size-4" />
							</div>
							<div className="truncate text-xs">
								<p className="truncate font-medium text-white">{value}</p>
								<p className="text-zinc-500">File attached successfully</p>
							</div>
						</div>

						<Button
							type="button"
							variant="ghost"
							color="neutral"
							size="28"
							onClick={handleRemove}
							className="size-7 p-0 text-zinc-400 hover:text-white"
							aria-label="Remove attached file">
							<X className="size-4" />
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center">
						<div className="mb-3 flex size-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400">
							<UploadCloud className="size-5" />
						</div>

						<p className="text-xs font-medium text-zinc-200 sm:text-sm">
							Choose a file or drag &amp; drop it here
						</p>
						<p className="mt-1 text-[11px] text-zinc-500 sm:text-xs">
							JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
						</p>

						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="32"
							onClick={(e) => {
								e.stopPropagation()
								inputRef.current?.click()
							}}
							className="mt-4 rounded-md border-zinc-700 bg-zinc-900/80 px-4 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800">
							Browse File
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
