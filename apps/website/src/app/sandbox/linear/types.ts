export type IssueStatus =
	| "todo"
	| "in_progress"
	| "done"
	| "backlog"
	| "canceled"
	| "duplicate"

export type IssuePriority = "urgent" | "high" | "medium" | "low" | "none"

export interface IssueTag {
	label: string
	dotColorClass: string
}

export interface Issue {
	id: string
	title: string
	parentTitle?: string
	status: IssueStatus
	priority: IssuePriority
	tags: IssueTag[]
	dueDate?: string
	createdDate: string
	hasAssignee?: boolean
}

export interface ColumnData {
	id: IssueStatus
	title: string
	countDisplay: string
	issues: Issue[]
}
