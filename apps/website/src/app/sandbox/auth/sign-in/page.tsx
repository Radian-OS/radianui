import { Suspense } from "react"
import SigninForm from "../sign-in"

export default function SignInPage() {
	return (
		<Suspense fallback={null}>
			<SigninForm />
		</Suspense>
	)
}
