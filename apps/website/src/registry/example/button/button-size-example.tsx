import { Button } from "@/registry/ui/button"

function ButtonSizeExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Button size="xs">Size xs</Button>
				<Button size="sm">Size sm</Button>
				<Button size="md">Size md</Button>
				<Button size="lg">Size lg</Button>
				<Button size="xl">Size xl</Button>
				<Button size="2xl">Size 2xl</Button>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Button variant="outline" color="neutral" size="xs">
					Size xs
				</Button>
				<Button variant="outline" color="neutral" size="sm">
					Size sm
				</Button>
				<Button variant="outline" color="neutral" size="md">
					Size md
				</Button>
				<Button variant="outline" color="neutral" size="lg">
					Size lg
				</Button>
				<Button variant="outline" color="neutral" size="xl">
					Size xl
				</Button>
				<Button variant="outline" color="neutral" size="2xl">
					Size 2xl
				</Button>
			</div>
		</div>
	)
}

export default ButtonSizeExample
