"use client"

import { Slot } from "@radix-ui/react-slot"
import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useId,
	useLayoutEffect,
	useRef,
} from "react"
import { createPortal } from "react-dom"

export type MobilePickerView = {
	id: string
	label: string
	back: () => void
}

export const MobilePickerContext = createContext<{
	target: HTMLDivElement | null
	active: MobilePickerView | null
	setActive: Dispatch<SetStateAction<MobilePickerView | null>>
} | null>(null)

export function ThemerMobilePicker({
	trigger,
	open,
	onOpenChange,
	onBack,
	label,
	className,
	children,
}: {
	trigger: ReactNode
	open: boolean
	onOpenChange: (open: boolean) => void
	onBack?: () => void
	label: string
	className?: string
	children: ReactNode
}) {
	const navigation = useContext(MobilePickerContext)
	const setActive = navigation?.setActive
	const id = useId()
	const triggerRef = useRef<HTMLElement>(null)
	const viewRef = useRef<HTMLDivElement>(null)
	const back = onBack ?? (() => onOpenChange(false))
	const backRef = useRef(back)
	backRef.current = back

	useLayoutEffect(() => {
		if (!open || !setActive) return
		setActive({
			id,
			label,
			back: () => backRef.current(),
		})
		return () => {
			setActive((active) => (active?.id === id ? null : active))
		}
	}, [id, label, open, setActive])

	const active = open && navigation?.active?.id === id

	useLayoutEffect(() => {
		if (!active || !navigation?.target) return
		viewRef.current?.focus({ preventScroll: true })
		return () => {
			requestAnimationFrame(() =>
				triggerRef.current?.focus({ preventScroll: true })
			)
		}
	}, [active, navigation?.target])

	return (
		<>
			<Slot
				ref={triggerRef}
				aria-expanded={Boolean(active)}
				onClick={() => onOpenChange(true)}>
				{trigger}
			</Slot>
			{active &&
				navigation.target &&
				createPortal(
					<div ref={viewRef} tabIndex={-1} className={className}>
						{children}
					</div>,
					navigation.target
				)}
		</>
	)
}
