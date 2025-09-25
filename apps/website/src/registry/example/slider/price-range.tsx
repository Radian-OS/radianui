import { zodResolver } from "@hookform/resolvers/zod"
import { PoundSterling } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Slider, SliderThumb } from "@/registry/ui/slider"

const MIN_PRICE = 100
const MAX_PRICE = 2000

const schema = z.object({
	range: z
		.array(z.number())
		.length(2, "You must select both minimum and maximum values.")
		.refine(([min, max]) => max > min, {
			error: "Maximum value must be greater than minimum value.",
		})
		.refine(([min, max]) => min >= MIN_PRICE && max <= MAX_PRICE, {
			error: `Values must be within range of ${MIN_PRICE} and ${MAX_PRICE}`,
		}),
})

type FormValues = z.infer<typeof schema>

export default function PriceRange() {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			range: [550, 1500],
		},
	})

	function onSubmit(data: FormValues) {
		toast("You submitted the following values:", {
			description: JSON.stringify(data, null, 2),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="range"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price Range</FormLabel>

							<FormControl>
								<Slider
									min={MIN_PRICE}
									max={MAX_PRICE}
									value={field.value}
									onValueChange={(values) => field.onChange(values)}
									className="w-[420px]"
									defaultValue={[MIN_PRICE, MAX_PRICE]}>
									<SliderThumb />
									<SliderThumb />
								</Slider>
							</FormControl>

							<div className="mt-4 flex items-center gap-5">
								<div className="flex flex-col gap-1.5">
									<Label htmlFor="min-price-input">Min Price</Label>

									<InputWrapper id="min-price-input">
										<Input
											value={field.value[0]}
											onChange={(e) => {
												const value = Number(e.target.value)
												if (isNaN(value)) return
												field.onChange([value, field.value[1]])
											}}
											onBlur={() => field.onChange([Math.min(MAX_PRICE, field.value[0]), field.value[1]])}
										/>
										<PoundSterling className="size-4" />
									</InputWrapper>
								</div>
								<div className="flex flex-col gap-1.5">
									<Label htmlFor="max-price-input">Max Price</Label>
									<InputWrapper id="max-price-input">
										<Input
											value={field.value[1]}
											onChange={(e) => {
												const value = Number(e.target.value)
												if (isNaN(value)) return
												field.onChange([field.value[0], value])
											}}
											onBlur={() => field.onChange([field.value[0], Math.min(MAX_PRICE, field.value[1])])}
										/>
										<PoundSterling className="size-4" />
									</InputWrapper>
								</div>
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center justify-end gap-2">
					<Button variant="outline" color="neutral" onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	)
}
