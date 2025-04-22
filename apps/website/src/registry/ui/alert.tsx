import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { CircleCheck, Info, Star, Trash2, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof alertVariants> & {
		title: string
		message: string
	}

const alertVariants = cva("w-full rounded-md p-4 flex gap-3", {
	variants: {
		type: {
			neutral: "bg-bg-level0",
			info: "border-info bg-info/10 text-info",
			success: "border-success bg-success/10 text-success",
			danger: "border-error bg-error/10 text-error",
			warning: "border-warning bg-warning/10 text-warning",
		},
		variant: {
			default: "",
			bordered: "border bg-transparent",
		},
	},
	defaultVariants: {
		type: "neutral",
		variant: "default",
	},
	compoundVariants: [
		{
			type: "neutral",
			variant: "bordered",
			className: "border bg-transparent",
		},
	],
})

const icons = {
	neutral: <Star className="h-5 w-5" />,
	info: <Info className="h-5 w-5" />,
	success: <CircleCheck className="h-5 w-5" />,
	danger: <Trash2 className="h-5 w-5" />,
	warning: <TriangleAlert className="h-5 w-5" />,
}

function Alert({ type = "neutral", variant = "default", title, message, className, ...props }: AlertProps) {
	return (
		<section className={cn(alertVariants({ type, variant, className }))} {...props}>
			<div>{icons[type as keyof typeof icons]}</div>
			<div className="flex flex-col gap-0.5">
				<p className="text-sm font-medium">{title}</p>
				<p className={cn("text-sm", type === "neutral" && "text-text-secondary")}>{message}</p>
			</div>
		</section>
	)
}

export { Alert }
