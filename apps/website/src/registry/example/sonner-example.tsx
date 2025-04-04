"use client"

import { useState } from "react"
import { Box } from "lucide-react"
import { Button } from "@/registry/ui/button"
import Toast, { Toaster } from "@/registry/ui/sonner"

const positions = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"]

const SonnerExample = () => {
	const [variant, setVariant] = useState<"default" | "information" | "success" | "error" | "warning">("default")

	const [position, setPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right">("top-left")
	const [visibleToasts, setVisibleToasts] = useState(3)
	const [stack, setStack] = useState<boolean>(true)
	const [closable, setClosable] = useState<boolean>(true)

	return (
		<div className="flex w-max flex-col gap-2">
			<div className="flex gap-2">
				<div className="flex flex-col">
					<label>Position</label>
					<select className="rounded border p-2" value={position} onChange={(e) => setPosition(e.target.value as typeof position)}>
						{positions.map((pos) => (
							<option key={pos} value={pos}>
								{pos.replace("-", " ").toUpperCase()}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col">
					<label>Total Toast</label>
					<select className="rounded border p-2" value={visibleToasts} onChange={(e) => setVisibleToasts(Number(e.target.value))}>
						{[1, 2, 3, 4, 5].map((count) => (
							<option key={count} value={count}>
								{count} {count === 1 ? "Toast" : "Toasts"}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex gap-2">
				<Toaster position={position} gap={8} expand={!stack} bgColor={variant} visibleToasts={visibleToasts} />

				<div className="flex flex-col">
					<label>Variant</label>
					<select className="rounded border p-2" value={variant} onChange={(e) => setVariant(e.target.value as typeof variant)}>
						<option value="default">Default</option>
						<option value="information">Information</option>
						<option value="success">Success</option>
						<option value="error">Error</option>
						<option value="warning">Warning</option>
					</select>
				</div>

				<div className="flex flex-col">
					<label>Stackable</label>
					<select className="rounded border p-2" value={stack.toString()} onChange={(e) => setStack(e.target.value === "true")}>
						<option value="true">True</option>
						<option value="false">False</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label>Closable</label>
					<select className="rounded border p-2" value={closable.toString()} onChange={(e) => setClosable(e.target.value === "true")}>
						<option value="true">True</option>
						<option value="false">False</option>
					</select>
				</div>
			</div>

			<Button
				variant="outline"
				onClick={() =>
					Toast({
						variant,
						closable,
						description: "New card added",
					})
				}>
				Normal Toast
			</Button>

			<Button
				variant="outline"
				onClick={() =>
					Toast({
						variant,
						closable,
						title: "New card added",
						description: "New card added",
					})
				}>
				Title and Desc Toast
			</Button>

			<Button
				variant="outline"
				onClick={() =>
					Toast({
						variant,
						icon: <Box />,
						closable,
						title: "New card added",
						description: "New card added",
						buttons: [
							{
								label: "Undo",
								onClick: () => console.log("Undo clicked"),
								dismiss: true,
							},
						],
					})
				}>
				Icon Toast
			</Button>

			<Button
				variant="outline"
				onClick={() =>
					Toast({
						variant,
						closable,
						content: <h1 className="!p-[12px]">New Toast</h1>,
					})
				}>
				Custom Toast
			</Button>
		</div>
	)
}

export default SonnerExample
