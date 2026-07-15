import { Button } from "@/registry/ui/button"

function ButtonSizeExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Button size="28">Size 28</Button>
				<Button size="32">Size 32</Button>
				<Button size="36">Size 36</Button>
				<Button size="40">Size 40</Button>
				<Button size="44">Size 44</Button>
				<Button size="48">Size 48</Button>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Button variant="outline" color="neutral" size="28">
					Size 28
				</Button>
				<Button variant="outline" color="neutral" size="32">
					Size 32
				</Button>
				<Button variant="outline" color="neutral" size="36">
					Size 36
				</Button>
				<Button variant="outline" color="neutral" size="40">
					Size 40
				</Button>
				<Button variant="outline" color="neutral" size="44">
					Size 44
				</Button>
				<Button variant="outline" color="neutral" size="48">
					Size 48
				</Button>
			</div>
		</div>
	)
}

export default ButtonSizeExample
