import { CircleCheckBig } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { unsubscribe } from "@/app/actions/unsubscribe"
import { resend } from "@/lib/resend"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"

export default async function UnsubscribePage({ searchParams }: { searchParams: { id?: string } }) {
	const id = searchParams.id

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
		<div className="bg-bg flex min-h-screen items-center justify-center px-4">
			<div className="flex flex-col items-center justify-center gap-10">
				<>
					<Image src={"/radian.svg"} alt="Radian" width={500} height={100} className="h-15 block dark:hidden" />
					<Image src={"/radian-dark.svg"} alt="Radian" width={112} height={36} className="not-dark:hidden block" />
				</>
				<Card className="p-6">
					<CardHeader className="gap-10">
						<CircleCheckBig className="text-success-text mx-auto size-20" />
						<CardTitle className="heading-6 text-center">Unsubscription Successful</CardTitle>
					</CardHeader>
					<CardContent>
						<p>You have successfully been removed from our mailing list.</p>
					</CardContent>
					<CardFooter className="items-center justify-center">
						<Button variant={"smooth"} size={"40"} asChild>
							<Link href="/">Go to Homepage</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
