import "server-only"
import { cache } from "react"
import { createBrandLogoCatalog } from "./brand-logos-data"
import { fetchBrandLogosManifest } from "./brand-logos-manifest"

export const getBrandLogosManifest = cache(fetchBrandLogosManifest)
export const getBrandLogoCatalog = cache(async () =>
	createBrandLogoCatalog(await getBrandLogosManifest())
)
