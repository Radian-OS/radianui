import type { ReactNode } from "react"
import { SandboxAuthProvider } from "./auth/auth-context"
import { GlobalKeyboardListener } from "./components/global-keyboard-listener"

export default function SandboxLayout({ children }: { children: ReactNode }) {
	return (
		<SandboxAuthProvider>
			<GlobalKeyboardListener />
			{children}
		</SandboxAuthProvider>
	)
}
