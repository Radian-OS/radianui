import { create } from "zustand"
import { persist } from "zustand/middleware"

type PreferencesState = {
	packageManager: "pnpm" | "npm" | "yarn" | "bun"
	installMethod: "cli" | "manual"
	setPackageManager: (pm: PreferencesState["packageManager"]) => void
	setInstallMethod: (method: PreferencesState["installMethod"]) => void
}

export const usePreferences = create<PreferencesState>()(
	persist(
		(set) => ({
			packageManager: "pnpm",
			installMethod: "cli",
			setPackageManager: (pm) => set({ packageManager: pm }),
			setInstallMethod: (method) => set({ installMethod: method }),
		}),
		{
			name: "radianui-preferences",
		}
	)
)
