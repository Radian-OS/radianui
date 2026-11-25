import { ThemerMobilePicker } from "../themer-mobile-picker"
import { type ReactNode, useState } from "react"
import {
	Check,
	ChevronLeft,
	ChevronRight,
	RotateCcw,
	Shuffle,
} from "lucide-react"
import { Button as ControlButton, IconButton } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { cn } from "@/lib/utils"

export function MobileComponentSettings<T extends string>({
	name,
	children,
	variant,
	variants,
	onSelectVariant,
	renderVariant,
	preview,
	controls,
	onReset,
	onShuffle,
}: {
	name: string
	children: ReactNode
	variant: T
	variants: readonly { value: T; label: string }[]
	onSelectVariant: (variant: T) => void
	renderVariant: (variant: T) => ReactNode
	preview: ReactNode
	controls: ReactNode
	onReset: () => void
	onShuffle: () => void
}) {
	const [open, setOpen] = useState(false)
	const [choosingVariant, setChoosingVariant] = useState(false)

	return (
		<ThemerMobilePicker
			trigger={children}
			open={open}
			onOpenChange={(next) => {
				setOpen(next)
				if (!next) setChoosingVariant(false)
			}}
			onBack={choosingVariant ? () => setChoosingVariant(false) : undefined}
			label={choosingVariant ? "Default Variant" : name}
			className="flex min-h-0 flex-col outline-none">
			<div className="flex shrink-0 touch-none items-center justify-between px-3 pb-3">
				<div className="flex items-center gap-2">
					<IconButton
						size="md"
						color="neutral"
						variant="ghost"
						className="text-fg-secondary"
						aria-label={
							choosingVariant
								? `Back to ${name.toLowerCase()} settings`
								: "Back to UI Bits"
						}
						onClick={() => {
							if (choosingVariant) setChoosingVariant(false)
							else setOpen(false)
						}}>
						<ChevronLeft />
					</IconButton>
					<h2 className="text-fg text-base font-medium">
						{choosingVariant ? "Default Variant" : name}
					</h2>
					<p className="sr-only">
						Customize {name.toLowerCase()} in your theme.
					</p>
				</div>
				{!choosingVariant && (
					<div className="flex items-center gap-2">
						<IconButton
							size="md"
							color="neutral"
							variant="ghost"
							className="text-fg-secondary"
							aria-label={`Reset ${name.toLowerCase()} to Themer defaults`}
							onClick={onReset}>
							<RotateCcw />
						</IconButton>
						<IconButton
							size="md"
							color="neutral"
							variant="ghost"
							className="text-fg-secondary"
							aria-label={`Shuffle ${name.toLowerCase()} settings`}
							onClick={onShuffle}>
							<Shuffle />
						</IconButton>
					</div>
				)}
			</div>
			<ScrollArea
				key={choosingVariant ? "variants" : "settings"}
				type="auto"
				data-vaul-no-drag
				className="min-h-0 [&>[data-slot=scroll-area-viewport]]:max-h-[calc(85dvh-4.75rem)] [&>[data-slot=scroll-area-viewport]]:touch-pan-y [&>[data-slot=scroll-area-viewport]]:overscroll-y-contain">
				<div
					className={cn(
						"flex flex-col px-3 pb-[max(12px,env(safe-area-inset-bottom))]",
						choosingVariant ? "gap-2" : "gap-3"
					)}>
					{choosingVariant ? (
						variants.map(({ value, label }) => (
							<Card
								key={value}
								className={cn(
									"relative gap-1.5 rounded-xl border-0 bg-transparent p-1 shadow-none",
									variant === value && "bg-fill1"
								)}>
								<ControlButton
									variant="ghost"
									color="neutral"
									className="absolute inset-0 z-10 h-full w-full rounded-xl hover:bg-transparent"
									aria-label={`Use ${label} variant`}
									aria-pressed={variant === value}
									onClick={() => onSelectVariant(value)}>
									{null}
								</ControlButton>
								<span className="flex items-center justify-between px-1 pt-1 text-xs">
									{label}
									{variant === value && (
										<span
											className="bg-primary text-primary-fg grid size-3.5 place-items-center rounded-full"
											aria-hidden="true">
											<Check className="size-2.5" strokeWidth={3} />
										</span>
									)}
								</span>
								<CardContent className="pointer-events-none p-0" inert>
									{renderVariant(value)}
								</CardContent>
							</Card>
						))
					) : (
						<>
							<Card className="bg-fill1 gap-1 rounded-xl border-0 p-1 shadow-none">
								<ControlButton
									size="xs"
									color="neutral"
									variant="ghost"
									className="w-full justify-between px-1 text-xs"
									onClick={() => setChoosingVariant(true)}>
									Default variant
									<span className="flex items-center gap-1">
										{variants.find(({ value }) => value === variant)?.label}
										<ChevronRight className="text-fg-tertiary size-5!" />
									</span>
								</ControlButton>
								<CardContent className="p-0">{preview}</CardContent>
							</Card>
							{controls}
						</>
					)}
				</div>
			</ScrollArea>
		</ThemerMobilePicker>
	)
}
