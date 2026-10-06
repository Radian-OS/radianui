export type StepStatus = "completed" | "active" | "pending"

export interface ChecklistStep {
	id: string
	title: string
	description: string
	actionText?: string
}

export interface TourFeature {
	id: string
	iconName: "undo" | "database" | "help"
	title: string
	description: string
}

export const INITIAL_STEPS: ChecklistStep[] = [
	{
		id: "workspace",
		title: "Create your workspace",
		description: "Name it and pick a region",
	},
	{
		id: "channel",
		title: "Connect your first channel",
		description: "Email, ads, or social",
	},
	{
		id: "contacts",
		title: "Import your contacts",
		description: "CSV upload or a CRM sync",
	},
	{
		id: "campaign",
		title: "Send a test campaign",
		description: "To yourself, from a template",
		actionText: "Resume",
	},
	{
		id: "team",
		title: "Invite your team",
		description: "Roles are set per member",
	},
]

export const TOUR_FEATURES: TourFeature[] = [
	{
		id: "skip",
		iconName: "undo",
		title: "Skip anything, come back later",
		description:
			"Every step is optional and the checklist waits for you on the home screen.",
	},
	{
		id: "sample",
		iconName: "database",
		title: "Sample data until yours arrives",
		description:
			"Charts and lists are pre filled, so nothing looks broken while you connect.",
	},
	{
		id: "support",
		iconName: "help",
		title: "A human checks in if you stall",
		description:
			"Stuck on the same step for a day and onboarding support reaches out.",
	},
]
