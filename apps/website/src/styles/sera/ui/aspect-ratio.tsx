import { AspectRatio as AspectRatioPrimitive } from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

export type AspectRatioProps = React.ComponentProps<typeof AspectRatioPrimitive>

function AspectRatio({ className, ...props }: AspectRatioProps) {
	return (
		<AspectRatioPrimitive
			data-slot="aspect-ratio"
			className={cn(className)}
			{...props}
		/>
	)
}

AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
