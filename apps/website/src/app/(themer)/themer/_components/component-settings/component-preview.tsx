import {
	type CSSProperties,
	type ReactNode,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react"
import { useTheme } from "next-themes"
import { useThemerPreset } from "@/lib/themer-preset"
import { buildRegistryConfig } from "@/registry/config"

export type PreviewDimensions = {
	radius: number
	padding: number
}

export function ComponentPreview({
	children,
	defaultSample,
	onMeasure,
}: {
	children: ReactNode
	defaultSample?: ReactNode
	onMeasure?: (dimensions: PreviewDimensions) => void
}) {
	const [params] = useThemerPreset()
	const { resolvedTheme } = useTheme()
	const defaultSampleRef = useRef<HTMLDivElement>(null)
	const { cssVars } = useMemo(() => buildRegistryConfig(params), [params])

	useLayoutEffect(() => {
		const sample = defaultSampleRef.current?.firstElementChild
		if (!sample || !onMeasure) return

		const style = getComputedStyle(sample)
		onMeasure({
			radius: Number.parseFloat(style.borderTopLeftRadius),
			padding: Number.parseFloat(style.paddingInlineStart),
		})
	}, [params, resolvedTheme, onMeasure])

	return (
		<div
			style={
				{
					...cssVars.light,
					...(resolvedTheme === "dark" ? cssVars.dark : {}),
					...cssVars.theme,
				} as CSSProperties
			}
			className={`style-${params.style} border-soft bg-bg relative flex min-h-[104px] items-center justify-center gap-2 rounded-lg border p-4`}>
			{children}
			{defaultSample && (
				<div
					ref={defaultSampleRef}
					aria-hidden="true"
					className="invisible absolute">
					{defaultSample}
				</div>
			)}
		</div>
	)
}
