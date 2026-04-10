import { NuqsAdapter } from "nuqs/adapters/next/app"

export default function Layout({ children }: { children: React.ReactNode }) {
	return <NuqsAdapter>{children}</NuqsAdapter>
}
