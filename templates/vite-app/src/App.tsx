import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function App() {
	return (
		<div className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-16">
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="bg-primary/20 absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
				<div className="bg-success/20 absolute top-1/3 left-1/4 h-72 w-72 rounded-full blur-3xl" />
				<div className="bg-warning/20 absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full blur-3xl" />
			</div>

			<main className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
				<Badge size="24" className="rounded-full">
					<span className="bg-success h-1.5 w-1.5 rounded-full" />
					Generated with Radianos
				</Badge>

				<h1 className="heading-1 from-fg to-fg-tertiary bg-gradient-to-br bg-clip-text text-transparent">
					Welcome to your new project
				</h1>

				<p className="text-fg-secondary max-w-xl text-base leading-relaxed sm:text-lg">
					Your design system is wired up and ready to go. Start building
					something beautiful. The tokens, themes, and components are all set
					for you.
				</p>

				<div className="flex flex-wrap items-center justify-center gap-3 pt-2">
					<Button size="44" variant="glossy" className="rounded-full" asChild>
						<a href="https://radianos.com">Explore the docs</a>
					</Button>
					<Button
						size="44"
						className="rounded-full"
						variant="soft"
						color="neutral"
						asChild
					>
						<a href="https://vite.dev/guide/">Vite guide</a>
					</Button>
				</div>

				<div className="text-fg-tertiary mt-6 text-xs">
					Press{" "}
					<kbd className="border-border bg-fill2 rounded border px-1.5 py-0.5 font-mono text-[0.7rem]">
						d
					</kbd>{" "}
					to toggle dark mode
				</div>
			</main>
		</div>
	)
}
