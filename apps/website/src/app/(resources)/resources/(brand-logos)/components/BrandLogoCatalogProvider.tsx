"use client"
import { createContext, useContext, useMemo, type ReactNode } from "react"
import {
	createBrandLogoCatalog,
	type BrandLogoCatalog,
	type BrandLogosManifest,
} from "./brand-logos-data"
const CatalogContext = createContext<BrandLogoCatalog | null>(null)
export function BrandLogoCatalogProvider({
	manifest,
	children,
}: {
	manifest: BrandLogosManifest
	children: ReactNode
}) {
	const catalog = useMemo(() => createBrandLogoCatalog(manifest), [manifest])
	return (
		<CatalogContext.Provider value={catalog}>
			{children}
		</CatalogContext.Provider>
	)
}
export function useBrandLogoCatalog() {
	const catalog = useContext(CatalogContext)
	if (!catalog) throw new Error("Missing brand logo catalog provider")
	return catalog
}
