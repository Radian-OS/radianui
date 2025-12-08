"use client"

import { usePreferences } from "@/lib/preferences"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export function InstallationTabs({ children }: { children: React.ReactNode }) {
	const { installMethod, setInstallMethod } = usePreferences()

	return (
		<Tabs value={installMethod} onValueChange={(value) => setInstallMethod(value as "cli" | "manual")} className="w-full">
			{children}
		</Tabs>
	)
}

export function InstallTabsList({ children }: { children: React.ReactNode }) {
	return (
		<TabsList width="full" variant="default" size="md">
			{children}
		</TabsList>
	)
}

export function InstallTabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
	return <TabsTrigger value={value}>{children}</TabsTrigger>
}

export function InstallTabsContent({ value, children }: { value: string; children: React.ReactNode }) {
	return <TabsContent value={value}>{children}</TabsContent>
}
