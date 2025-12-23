import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { unsubscribe } from "@/app/actions/unsubscribe"
import { resend } from "@/lib/resend"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Empty, EmptyAction, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

type UnsubscribePageProps = {
	searchParams: Promise<{ id?: string }>
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
	const resolvedSearchParams = await searchParams
	const id = resolvedSearchParams.id

	if (!id) {
		return notFound()
	}

	const { error: contact_error } = await resend.contacts.get({ id })

	if (contact_error) {
		return notFound()
	}

	const result = await unsubscribe(id)

	if (result.status !== 200) return notFound()

	return (
		<div className="bg-fill1 flex min-h-screen items-center justify-center px-4">
			<div className="flex flex-col items-center justify-center gap-12">
				<Link href={"/"}>
					<Image src={"/radian.svg"} alt="Radian" width={150} height={36} className="block h-9 dark:hidden" priority />
					<Image src={"/radian-dark.svg"} alt="Radian" width={150} height={36} className="not-dark:hidden block h-9" priority />
				</Link>
				<Card className="bg-bg max-w-150 w-full px-16 py-12">
					<Empty className="gap-8 p-0 md:p-0">
						<EmptyMedia>
							<Image src={"/media/sad-emoji.png"} alt="Radian" width={80} height={20} />
						</EmptyMedia>
						<EmptyHeader className="max-w-full gap-3">
							<EmptyTitle className="heading-5">We are Sad To See You Go!</EmptyTitle>
							<EmptyDescription className="text-base/7">
								You have <span className="font-semibold">successfully unsubscribed</span>, you will no longer be receiving emails from Radian.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyAction className="max-w-full">
							<Button size={"40"} asChild>
								<Link href="/">Go to Homepage</Link>
							</Button>
						</EmptyAction>
					</Empty>
				</Card>
				<footer className="text-fg-tertiary text-center text-sm">
					<p>2025 &copy; Radian OS, all rights reserved</p>
					<p>8 The Green STE A Dover, Delaware 19901, US</p>
				</footer>
			</div>
		</div>
	)
}
