export interface Author {
	name: string
	role: string
	avatarUrl: string
}

export interface BlogPost {
	id: string
	title: string
	slug: string
	description: string
	date: string
	readTime: string
	author: Author
	gradientClass: string
	badge?: string
}
