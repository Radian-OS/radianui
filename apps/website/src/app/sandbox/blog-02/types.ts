export interface BlogArticle {
	id: string
	title: string
	slug: string
	category: "Insights" | "News"
	date: string
	imageUrl: string
	isFeatured?: boolean
}
