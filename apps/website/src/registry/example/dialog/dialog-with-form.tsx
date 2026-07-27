"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Check,
	CheckCircle,
	ImagePlus,
	Link,
	MoreVertical,
	Trash2,
} from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { InputAddon, InputGroup } from "@/registry/ui/input"
import { TextArea } from "@/registry/ui/text-area"

const FormSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	username: z.string().min(1, "Username is required"),
	website: z.string().min(1, "Website is required"),
	description: z.string().optional(),
})

export default function DialogWithForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			fullName: "Alexa",
			username: "alexa_designer_123",
			website: "alexarivas",
			description:
				"Hey, I am Alexa, a User Experience Designer who loves turning ideas into amazing websites!",
		},
	})

	function onSubmit() {
		toast.custom(
			(t) => (
				<Alert
					variant="strong"
					color="success"
					onClose={() => toast.dismiss(t)}>
					<AlertIcon>
						<CheckCircle />
					</AlertIcon>
					<AlertTitle>Profile updated successfully</AlertTitle>
				</Alert>
			),
			{ duration: 5000 }
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Edit Profile
				</Button>
			</DialogTrigger>
			<DialogContent className="w-125 p-0">
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{/* Banner */}
						<div className="h-27 relative w-full">
							<Image
								src="/dialog-bg.png"
								alt="Profile banner"
								fill
								className="absolute inset-0 object-cover"
							/>
							<div className="absolute inset-0 flex items-center justify-center gap-2">
								<IconButton className="bg-fill4-alpha hover:bg-fill4-alpha rounded-full">
									<ImagePlus className="text-white" />
								</IconButton>
								<IconButton className="bg-fill4-alpha hover:bg-fill4-alpha rounded-full">
									<Trash2 className="text-white" />
								</IconButton>
							</div>

							{/* Avatar */}
							<div className="absolute bottom-0 left-5 translate-y-1/2">
								<Avatar
									rounded="square"
									size="80"
									className="ring-bg ring-offset-bg z-10 rounded-2xl ring-2 ring-offset-2">
									<AvatarImage src="/media/female-3.jpg" />
									<AvatarFallback>CH</AvatarFallback>
								</Avatar>
								<div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl transition-opacity">
									<IconButton className="bg-fill4-alpha hover:bg-fill4-alpha rounded-full opacity-0 hover:opacity-100">
										<ImagePlus className="text-white" />
									</IconButton>
								</div>
							</div>
						</div>
						<DialogBody className="flex flex-col gap-5 pt-14">
							{/* Profile info */}
							<div className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<div className="flex flex-col gap-0.5">
										<div className="flex items-center gap-2">
											<span className="text-fg text-base font-medium">
												Alexa Rivas
											</span>
											<Image src="/gb.png" alt="UK" width={24} height={16} />
										</div>
										<span className="text-fg-secondary text-sm">
											alexa@radian.com
										</span>
									</div>
									<IconButton type="button" variant="ghost" color="neutral">
										<MoreVertical />
									</IconButton>
								</div>

								{/* Action buttons */}
								<div className="flex gap-2">
									<Button
										type="button"
										size="28"
										variant="outline"
										color="neutral">
										<Link className="size-3.5" />
										Copy link
									</Button>
									<Button
										type="button"
										size="28"
										variant="outline"
										color="neutral">
										View profile
									</Button>
								</div>
							</div>

							{/* Full name + Username row */}
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="fullName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full name</FormLabel>
											<FormControl>
												<Input placeholder="Full name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="Username" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Website */}
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website</FormLabel>
										<FormControl>
											<InputGroup className="w-full">
												<InputAddon>radian.com//</InputAddon>
												<Input placeholder="yourhandle" {...field} />
												<InputAddon mode="icon">
													<Check className="size-4" />
												</InputAddon>
											</InputGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Description */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<TextArea
												placeholder="Tell us about yourself"
												rows={3}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</DialogBody>

						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" color="neutral" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" variant="strong">
								Update profile
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
