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
						: "border-border bg-fill1 hover:border-border-active hover:bg-fill2"
				}`}>
				{value ? (
					<div className="border-border bg-fill2 flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left">
						<div className="flex items-center gap-2.5 overflow-hidden">
							<div className="text-primary bg-fill3 flex size-8 shrink-0 items-center justify-center rounded-md">
								<FileText className="size-4" />
							</div>
							<div className="truncate text-xs">
								<p className="text-fg truncate font-medium">{value}</p>
								<p className="text-fg-tertiary">File attached successfully</p>
							</div>
						</div>

						<Button
							type="button"
							variant="ghost"
							color="neutral"
							size="28"
							onClick={handleRemove}
							className="text-fg-secondary hover:text-fg size-7 p-0"
							aria-label="Remove attached file">
							<X className="size-4" />
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center">
						<div className="border-border bg-fill2 text-fg-secondary mb-3 flex size-10 items-center justify-center rounded-full border">
							<UploadCloud className="size-5" />
						</div>

						<p className="text-fg text-xs font-medium sm:text-sm">
							Choose a file or drag &amp; drop it here
						</p>
						<p className="text-fg-tertiary mt-1 text-[11px] sm:text-xs">
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
							className="mt-4 rounded-md px-4 text-xs font-medium transition-colors">
							Browse File
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
