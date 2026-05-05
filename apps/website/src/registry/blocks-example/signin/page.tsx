import Image from "next/image"
import SigninForm from "./components/signin-form"

export default function Page() {
	return (
		<div className="bg-elevation-negative flex h-screen w-screen items-center justify-center px-5">
			<div className="w-90 lg:w-200 border-border bg-bg flex rounded-2xl border">
				<div className="flex-1">
					<SigninForm />
				</div>
				<div className="w-100 hidden lg:block">
					<Image
						className="h-full w-full rounded-r-2xl"
						src="/blocks/person-with-mobile.png"
						alt="Background Image"
						width={400}
						height={400}
					/>
				</div>
			</div>
		</div>
	)
}
