import { GradientWave } from "./gradient-wave"
import { LeftShowcase } from "./left-showcase"
import { SignupForm } from "./signup-form"

export default function Auth5Page() {
	return (
		<div className="bg-bg text-fg relative flex min-h-svh w-full items-stretch overflow-hidden">
			{/* Left Column: Split-screen ambient video showcase */}
			<LeftShowcase />

			{/* Right Column: Centered Signup Form */}
			<div className="relative flex min-h-svh flex-1 flex-col items-center justify-center overflow-hidden p-6 sm:p-10 lg:p-12 xl:p-16">
				<GradientWave />
				<main className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
					<SignupForm />
				</main>
			</div>
		</div>
	)
}
