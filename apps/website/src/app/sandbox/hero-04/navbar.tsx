"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bookmark, ChevronDown, Menu, Moon, Search, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Badge } from "@/styles/default/ui/badge"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"

const searchSchema = z.object({
	query: z.string().optional(),
})

type SearchFormValues = z.infer<typeof searchSchema>

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	const form = useForm<SearchFormValues>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			query: "",
		},
	})

	const onSubmit = (data: SearchFormValues) => {
		if (data.query) {
			console.log("Searching for:", data.query)
		}
	}

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark")
	}

	return (
		<header className="border-border/60 bg-bg/95 supports-[backdrop-filter]:bg-bg/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18 lg:px-8">
				{/* Left: Brand & Main Navigation */}
				<div className="flex items-center gap-6">
					{/* Mobile Menu Button */}
					<div className="flex lg:hidden">
						<IconButton
							type="button"
							variant="ghost"
							color="neutral"
							size="32"
							aria-label="Toggle navigation menu"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							{mobileMenuOpen ? (
								<X className="size-5" />
							) : (
								<Menu className="size-5" />
							)}
						</IconButton>
					</div>

					{/* Brand Logo */}
					<Link
						href="/sandbox/hero-04"
						className="flex items-center gap-2 hover:underline">
						<Image
							src="/icons/hero-04-logo.svg"
							alt="Logo"
							width={28}
							height={28}
							className="size-7 shrink-0 object-contain"
						/>
					</Link>

					{/* Desktop Navigation Links */}
					<nav
						aria-label="Main Navigation"
						className="hidden items-center gap-1 lg:flex">
						<Link
							href="#products"
							className="text-fg-muted hover:bg-elevation-level1 hover:text-fg inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors hover:underline">
							<span>Products</span>
							<Badge
								variant="soft"
								color="info"
								size="20"
								className="text-[10px] font-semibold tracking-wider uppercase">
								NEW
							</Badge>
						</Link>

						<button
							type="button"
							className="text-fg-muted hover:bg-elevation-level1 hover:text-fg inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors">
							<span>Services</span>
							<ChevronDown className="size-3.5 opacity-60" />
						</button>

						<Link
							href="#pricing"
							className="text-fg-muted hover:bg-elevation-level1 hover:text-fg inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:underline">
							<span>Pricing</span>
						</Link>
					</nav>
				</div>

				{/* Center: Search Input Bar with Validation Form */}
				<div className="hidden max-w-md flex-1 items-center px-4 lg:flex">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
							<FormField
								control={form.control}
								name="query"
								render={({ field }) => (
									<FormItem className="relative w-full space-y-0">
										<FormControl>
											<div className="relative flex w-full items-center">
												<Search className="text-fg-muted pointer-events-none absolute left-3 size-4" />
												<Input
													{...field}
													type="search"
													placeholder="Search..."
													className="bg-elevation-level1/70 border-border/60 focus:bg-bg placeholder:text-fg-muted focus:ring-primary h-8.5 w-full rounded-lg pr-3 pl-9 text-sm transition-all focus:ring-1"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>

				{/* Right: Actions */}
				<div className="flex items-center gap-2 sm:gap-3">
					<Button
						variant="outline"
						color="neutral"
						size="32"
						className="hidden rounded-lg px-3 text-xs font-medium lg:inline-flex">
						Create
					</Button>

					{/* Theme Toggler */}
					{mounted && (
						<IconButton
							type="button"
							variant="ghost"
							color="neutral"
							size="32"
							aria-label="Toggle theme"
							onClick={toggleTheme}
							className="text-fg-muted hover:text-fg hidden lg:inline-flex">
							{resolvedTheme === "dark" ? (
								<Sun className="size-4" />
							) : (
								<Moon className="size-4" />
							)}
						</IconButton>
					)}

					{/* Bookmark Action */}
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="32"
						aria-label="Bookmarks"
						className="text-fg-muted hover:text-fg hidden lg:inline-flex">
						<Bookmark className="size-4" />
					</IconButton>

					{/* Profile Avatar with Chevron */}
					<div className="hover:bg-elevation-level1/60 flex cursor-pointer items-center gap-1 rounded-full p-0.5 transition-colors">
						<Image
							src="https://alignui.com/images/avatar/illustration/james.png"
							alt="User Avatar"
							width={32}
							height={32}
							className="size-8 rounded-full object-cover"
						/>
						<ChevronDown className="text-fg-muted size-3.5" />
					</div>
				</div>
			</div>

			{/* Mobile Collapsible Navigation Menu */}
			{mobileMenuOpen && (
				<div className="border-border/60 bg-bg border-t px-4 py-4 lg:hidden">
					<div className="mb-4">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
								<FormField
									control={form.control}
									name="query"
									render={({ field }) => (
										<FormItem className="relative w-full space-y-0">
											<FormControl>
												<div className="relative flex w-full items-center">
													<Search className="text-fg-muted pointer-events-none absolute left-3 size-4" />
													<Input
														{...field}
														type="search"
														placeholder="Search..."
														className="bg-elevation-level1/80 border-border/60 placeholder:text-fg-muted h-9 w-full rounded-lg pr-3 pl-9 text-sm"
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</div>

					<nav className="flex flex-col space-y-2">
						<Link
							href="#products"
							onClick={() => setMobileMenuOpen(false)}
							className="text-fg-muted hover:bg-elevation-level1 hover:text-fg flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:underline">
							<span>Products</span>
							<Badge variant="soft" color="info" size="20">
								NEW
							</Badge>
						</Link>

						<Link
							href="#services"
							onClick={() => setMobileMenuOpen(false)}
							className="text-fg-muted hover:bg-elevation-level1 hover:text-fg flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:underline">
							<span>Services</span>
						</Link>

						<Link
							href="#pricing"
							onClick={() => setMobileMenuOpen(false)}
							className="text-fg-muted hover:bg-elevation-level1 hover:text-fg flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:underline">
							<span>Pricing</span>
						</Link>

						<div className="border-border/40 border-t pt-2">
							<Button
								variant="outline"
								color="neutral"
								size="36"
								className="w-full justify-center">
								Create
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}
