export interface TourStep {
	id: string
	stepNumber: number
	title: string
	description: string
	previewLabel: string
	iconName: "dashboard" | "analytics" | "team" | "settings"
}

export const TOUR_STEPS: TourStep[] = [
	{
		id: "dashboard",
		stepNumber: 1,
		title: "Your Dashboard",
		description:
			"This is your home base. View key metrics, recent activity, and quick actions at a glance.",
		previewLabel: "Dashboard overview",
		iconName: "dashboard",
	},
	{
		id: "analytics",
		stepNumber: 2,
		title: "Analytics & Growth",
		description:
			"Track real-time traffic, conversion funnels, and customer retention trends with interactive charts.",
		previewLabel: "Analytics breakdown",
		iconName: "analytics",
	},
	{
		id: "team",
		stepNumber: 3,
		title: "Team Collaboration",
		description:
			"Invite teammates, assign role permissions, and collaborate on shared workspaces seamlessly.",
		previewLabel: "Team workspace",
		iconName: "team",
	},
	{
		id: "integrations",
		stepNumber: 4,
		title: "Integrations & API",
		description:
			"Connect your favorite third-party services and generate webhook keys for custom automated flows.",
		previewLabel: "Connected apps",
		iconName: "settings",
	},
]
