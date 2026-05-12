export const COLORS = [
	{ title: "Red", value: "red", hex: "#F53D3D" },
	{ title: "Orange", value: "orange", hex: "#F97316" },
	{ title: "Amber", value: "amber", hex: "#FFAA00" },
	{ title: "Yellow", value: "yellow", hex: "#DFBB0C" },
	{ title: "Neon", value: "neon", hex: "#7EB80A" },
	{ title: "Green", value: "green", hex: "#13AE13" },
	{ title: "Emerald", value: "emerald", hex: "#1DA54A" },
	{ title: "Teal", value: "teal", hex: "#12A580" },
	{ title: "Cyan", value: "cyan", hex: "#12A5A5" },
	{ title: "Light Blue", value: "light-blue", hex: "#067FF9" },
	{ title: "Blue", value: "blue", hex: "#4755EB" },
	{ title: "Violet Blue (Default)", value: "violet-blue", hex: "#623DF5" },
	{ title: "Purple", value: "purple", hex: "#803DF5" },
	{ title: "Dark Orchid", value: "dark-orchid", hex: "#BB33FF" },
	{ title: "Fuchsia", value: "fuchsia", hex: "#EB47EB" },
	{ title: "Magenta", value: "magenta", hex: "#E519A1" },
	{ title: "Rose", value: "rose", hex: "#F53D7A" },
]

export const FONTS = [
	{ title: "Inter - Geist (Default)", value: "inter" },
	{ title: "Roboto", value: "roboto" },
	{ title: "Geist", value: "geist" },
	{ title: "DM Sans", value: "dm-sans" },
	{ title: "Open Sans", value: "open-sans" },
	{ title: "Rubik", value: "rubik" },
	{ title: "Lato", value: "lato" },
	{ title: "Manrope", value: "manrope" },
	{ title: "Raleway", value: "raleway" },
	{ title: "Work Sans", value: "work-sans" },
	{ title: "IBM Plex Sans", value: "ibm-plex-sans" },
	{ title: "Figtree", value: "figtree" },
]

export const ICON_LIBRARIES = [
	{ title: "Lucide (Default)", value: "lucide" },
	{ title: "Hugeicons", value: "hugeicons" },
] as const
export type IconLibrary = (typeof ICON_LIBRARIES)[number]["value"]

export const STYLES = ["default", "sera"] as const
export type Style = (typeof STYLES)[number]

export const DEFAULT_FRAMEWORK = "next-app"
export const DEFAULT_FONT = "inter"
export const DEFAULT_BRAND_COLOR = "amber"
export const DEFAULT_PROJECT_NAME = "my-app"
export const DEFAULT_STYLE: Style = "default"
export const DEFAULT_ICON_LIBRARY: IconLibrary = "lucide"
export const DEFAULT_USE_SRC_DIR = true
export const MAX_PROJECT_NAME_LENGTH = 128
export const PROJECT_DEPENDENCIES = [
	"tw-animate-css",
	"class-variance-authority",
	"clsx",
	"tailwind-merge",
	"lucide-react",
]
export const VITE_EXTRA_DEPENDENCIES = ["@tailwindcss/vite", "tailwindcss"]
export const FALLBACK_PACKAGE_MANAGER = "npm"

export const REGISTRY_URL =
	process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://radianui.com/r"

export const RADIANUI_URL = REGISTRY_URL.replace(/\/r\/?$/, "")

export const ICON_DEPENDENCIES: Record<IconLibrary, string[]> = {
	lucide: ["lucide-react"],
	hugeicons: ["@hugeicons/react", "@hugeicons/core-free-icons"],
}
