import Image from "next/image"
import NewPasswordForm from "./components/new-password-form"

export default function Page() {
	return (
		<div className="bg-bg flex h-screen w-screen">
			<div className="flex w-full">
				<div className="hidden flex-1 lg:block">
					<Image
						className="h-full w-full object-cover"
						src="/blocks/bg-4.png"
						alt="Background Image"
						width={960}
						height={1024}
						priority
					/>
				</div>
				<div className="bg-bg flex h-full w-full flex-1 items-center justify-center p-5">
					<NewPasswordForm />
				</div>
			</div>
		</div>
	)
}
