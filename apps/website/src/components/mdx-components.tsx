"use client"

import { HTMLAttributes, useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { MDXComponents } from "mdx/types"
import Link from "next/link"
import AccordionPreview from "@/component-preview/accordion-preview"
import AlertPreview from "@/component-preview/alert-preview"
import DraggablePreview from "@/component-preview/animations/draggable-preview"
import FadeInPreview from "@/component-preview/animations/fade-in-preview"
import GradientTextPreview from "@/component-preview/animations/gradient-text-preview"
import InfiniteScrollPreview from "@/component-preview/animations/infinite-scroll-preview"
import PointerPreview from "@/component-preview/animations/pointer-preview"
import TypingTextPreview from "@/component-preview/animations/typing-text-preview"
import AvatarPreview from "@/component-preview/avatar-preview"
import AvatargroupPreview from "@/component-preview/avatargroup-preview"
import BadgePreview from "@/component-preview/badge-preview"
import BannerPreview from "@/component-preview/banner-preview"
import BreadCrumbPreview from "@/component-preview/breadcrumb-preview"
import ButtonGroupPreview from "@/component-preview/button-group-preview"
import ButtonPreview from "@/component-preview/button-preview"
import CalendarPreview from "@/component-preview/calendar-preview"
import CheckboxgroupPreview from "@/component-preview/checkbox-group-preview"
import CheckboxPreview from "@/component-preview/checkbox-preview"
import CodeAreaPreview from "@/component-preview/code-area-preview"
import ColorPickerPreview from "@/component-preview/color-picker-preview"
import CurrencyAmountPreview from "@/component-preview/currency-amount-preview"
import DatePickerPreview from "@/component-preview/date-picker-preview"
import DividerPreview from "@/component-preview/divider-preview"
import DrawerPreview from "@/component-preview/drawer-preview"
import DropdownPreview from "@/component-preview/dropdown-preview"
import FileUploadPreview from "@/component-preview/file-upload-preview"
import HovercardPreview from "@/component-preview/hover-card-preview"
import InputOtpPreview from "@/component-preview/input-otp-preview"
import InputPreview from "@/component-preview/input-preview"
import ModalPreview from "@/component-preview/modal-preview"
import PaginationPreview from "@/component-preview/pagination-preview"
import PhoneNumberPreview from "@/component-preview/phone-number-preview"
import PopoverPreview from "@/component-preview/popover-preview"
import ProgressBarPreview from "@/component-preview/progress-bar-preview"
import RadiogroupPreview from "@/component-preview/radio-group-preview"
import ResizablePreview from "@/component-preview/resizable-preview"
import SearchPreview from "@/component-preview/search-preview"
import SelectPreview from "@/component-preview/select-preview"
import SkeletonPreview from "@/component-preview/skeleton-preview"
import SliderPreview from "@/component-preview/slider-preview"
import SocialButtonPreview from "@/component-preview/social-button-preview"
import SonnerPreview from "@/component-preview/sonner-preview"
import SwitchPreview from "@/component-preview/switch-preview"
import TablePreview from "@/component-preview/table-preview"
import TabsPreview from "@/component-preview/tabs-preview"
import TextAreaPreview from "@/component-preview/text-area-preview"
import TimePickerPreview from "@/component-preview/time-picker-preview"
import TooltipPreview from "@/component-preview/tooltip-preview"
import Cli from "@/components/cli"
import DisplayColor from "@/components/display-color"
import Installation from "@/components/installation"
import Manual from "@/components/manual"
import Nextjs from "@/components/nextjs"
import PackageManagerTabs from "@/components/package-manager-tab"
import { cn } from "@/lib/utils"
import AccordionWithIconExample from "@/registry/example/accordion/accordion-example-preview"
import BadgeExamplePreview from "@/registry/example/badge/badge-example-preview"
import BannerExamplePreview1 from "@/registry/example/banner/banner-example-preview1"
import BannerExamplePreview2 from "@/registry/example/banner/banner-example-preview2"
import BannerExamplePreview3 from "@/registry/example/banner/banner-example-preview3"
import IndeterminateCheckboxExample from "@/registry/example/checkbox/indeterminate-checkbox"
import SelectMamberCheckboxgroupExample from "@/registry/example/checkbox/select-member-checkboxgroup"
import ColorPickerExample from "@/registry/example/color-picker/color-picker-example"
import CurrencyExamplePreview from "@/registry/example/currency-amount/Currency-Example-preview"
import CreditCardPreview from "@/registry/example/input/credit-card-input-preview"
import EmailPreview from "@/registry/example/input/email-input-preview"
import NumberInputPreview from "@/registry/example/input/number-input-preview"
import PasswordInputPreview from "@/registry/example/input/password-input-preview1"
import PasswordInputPreview2 from "@/registry/example/input/password-input-preview2"
import PasswordInputPreview3 from "@/registry/example/input/password-input-preview3"
import UrlPreview from "@/registry/example/input/url-input-preview"
import DeleteModalExample from "@/registry/example/modal/delete-modal"
import GithubIntegrationModalExample from "@/registry/example/modal/github-integration-modal"
import ARMRadiogroupExample from "@/registry/example/radiogroup/arm-radiogroup-example"
import DisabledRadiogroupExample from "@/registry/example/radiogroup/disabled-radiogroup-example"
import SearchInputExample from "@/registry/example/search-input/search-input-example"
import ShimmerSkeletonExample from "@/registry/example/skeleton/shimmer-skeleton-example"
import IconCounterTabsExample from "@/registry/example/tabs/icon-counter-tabs-example"
import VerticaTabsWithIconExample from "@/registry/example/tabs/vertical-tabs-with-icon-example"
import { CodeArea, CodeAreaProps } from "@/registry/ui/code"
import { FrameworkDocs } from "./framework-docs"

type MdxProps = {
	code: string
}

const components: MDXComponents = {
	AccordionPreview: () => <AccordionPreview />,
	AccordionWithIconExample: () => <AccordionWithIconExample />,
	AlertPreview: () => <AlertPreview />,
	AvatarPreview: () => <AvatarPreview />,
	AvatargroupPreview: () => <AvatargroupPreview />,
	BadgePreview: () => <BadgePreview />,
	BreadCrumbPreview: () => <BreadCrumbPreview />,
	BannerPreview: () => <BannerPreview />,
	CheckboxPreview: () => <CheckboxPreview />,
	CheckboxgroupPreview: () => <CheckboxgroupPreview />,
	IndeterminateCheckboxExample: () => <IndeterminateCheckboxExample />,
	SelectMemberCheckboxgroupExample: () => <SelectMamberCheckboxgroupExample />,
	DividerPreview: () => <DividerPreview />,
	ButtonPreview: () => <ButtonPreview />,
	ButtonGroupPreview: () => <ButtonGroupPreview />,
	ModalPreview: () => <ModalPreview />,
	DeleteModalExample: () => <DeleteModalExample />,
	GithubIntegrationModalExample: () => <GithubIntegrationModalExample />,
	TooltipPreview: () => <TooltipPreview />,
	CodeAreaPreview: () => <CodeAreaPreview />,
	SonnerPreview: () => <SonnerPreview />,
	PaginationPreview: () => <PaginationPreview />,
	PopoverPreview: () => <PopoverPreview />,
	TablePreview: () => <TablePreview />,
	DrawerPreview: () => <DrawerPreview />,
	RadiogroupPreview: () => <RadiogroupPreview />,
	ARMRadiogroupExample: () => <ARMRadiogroupExample />,
	DisabledRadiogroupExample: () => <DisabledRadiogroupExample />,
	DisplayColor: () => <DisplayColor />,
	HovercardPreview: () => <HovercardPreview />,
	InputOtpPreview: () => <InputOtpPreview />,
	TabsPreview: () => <TabsPreview />,
	IconCounterTabsExample: () => <IconCounterTabsExample />,
	VerticalTabsWithIconExample: () => <VerticaTabsWithIconExample />,
	DropdownPreview: () => <DropdownPreview />,
	ResizablePreview: () => <ResizablePreview />,
	Nextjs: () => <Nextjs />,
	Cli: () => <Cli />,
	Installation: () => <Installation />,
	Manual: () => <Manual />,
	SocialButtonPreview: () => <SocialButtonPreview />,
	BadgeExamplePreview: () => <BadgeExamplePreview />,
	InputPreview: () => <InputPreview />,
	UrlPreview: () => <UrlPreview />,
	EmailPreview: () => <EmailPreview />,
	CreditCardPreview: () => <CreditCardPreview />,
	BannerExamplePreview1: () => <BannerExamplePreview1 />,
	BannerExamplePreview2: () => <BannerExamplePreview2 />,
	BannerExamplePreview3: () => <BannerExamplePreview3 />,
	DatePickerPreview: () => <DatePickerPreview />,
	CalendarPreview: () => <CalendarPreview />,
	PasswordInputPreview: () => <PasswordInputPreview />,
	PasswordInputPreview2: () => <PasswordInputPreview2 />,
	PasswordInputPreview3: () => <PasswordInputPreview3 />,
	SliderPreview: () => <SliderPreview />,
	SwitchPreview: () => <SwitchPreview />,
	CurrencyAmountPreview: () => <CurrencyAmountPreview />,
	CurrencyExamplePreview: () => <CurrencyExamplePreview />,
	SearchPreview: () => <SearchPreview />,
	SkeletonPreview: () => <SkeletonPreview />,
	ShimmerSkeletonExample: () => <ShimmerSkeletonExample />,
	SearchInputExample: () => <SearchInputExample />,
	ProgressBarPreview: () => <ProgressBarPreview />,
	FileUploadPreview: () => <FileUploadPreview />,
	NumberInputPreview: () => <NumberInputPreview />,
	TextAreaPreview: () => <TextAreaPreview />,
	TimePickerPreview: () => <TimePickerPreview />,
	SelectPreview: () => <SelectPreview />,
	PhoneNumberPreview: () => <PhoneNumberPreview />,
	ColorPickerPreview: () => <ColorPickerPreview />,
	ColorPickerExample: () => <ColorPickerExample />,
	// Animation components
	TypingTextPreview: () => <TypingTextPreview />,
	GradientTextPreview: () => <GradientTextPreview />,
	DraggablePreview: () => <DraggablePreview />,
	FadeInPreview: () => <FadeInPreview />,
	InfiniteScrollPreview: () => <InfiniteScrollPreview />,
	PointerPreview: () => <PointerPreview />,
	Code: ({ language, pkg = ["pnpm", "yarn", "npm", "bun"], tabs = false, code, showLineNumbers, copiable = true, className, ...props }: CodeAreaProps) =>
		tabs ? (
			<PackageManagerTabs language={language} pkg={pkg} code={code} />
		) : (
			<CodeArea language={language} code={code} showLineNumbers={showLineNumbers} copiable={copiable} className={cn("", className)} {...props} />
		),
	h1: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className={cn("heading-1", className)} {...props}>
			{children}
		</h1>
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("heading-2", className)} {...props}>
			{children}
		</h2>
	),
	h3: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className={cn("heading-3", className)} {...props}>
			{children}
		</h3>
	),
	h4: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h4 className={cn("heading-4", className)} {...props}>
			{children}
		</h4>
	),
	h5: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h5 className={cn("heading-5 font-semibold! mb-4 mt-9", className)} {...props}>
			{children}
		</h5>
	),
	h6: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h6 className={cn("heading-6 font-semibold! mb-4", className)} {...props}>
			{children}
		</h6>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-primary-foreground text-base", className)} {...props}>
			{children}
		</p>
	),
	table: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
		<div className="no-scrollbar mb-9 overflow-x-scroll">
			<table className={cn("border-border w-full table-auto border", className)} {...props}>
				{children}
			</table>
		</div>
	),
	th: ({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
		<th className={cn("border-border border px-3 py-2.5 text-left text-sm font-semibold", className)} {...props}>
			{children}
		</th>
	),
	tr: ({ children, className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={cn("border-border border", className)} {...props}>
			{children}
		</tr>
	),
	td: ({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
		<td className={cn("border-border border px-3 py-2.5 text-sm", className)} {...props}>
			{children}
		</td>
	),
	ul: ({ children }: { children?: React.ReactNode }) => (
		<ul className="[&>li>strong]:text-text-secondary ml-4 mt-2 flex list-disc flex-col gap-2 [&>li>strong]:font-medium">{children}</ul>
	),
	Preview: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
		<div className={cn("mb-5 flex min-h-[30rem] items-center justify-center rounded-lg border p-10", className)} {...props}>
			<div className="w-full">{children}</div>
		</div>
	),
	Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"step relative mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				"before:absolute before:left-[-2.9rem] before:top-1/2 before:-translate-y-1/2",
				"before:flex before:h-7 before:w-7 before:items-center before:justify-center",
				"before:rounded-full before:bg-gray-200 before:text-sm before:font-medium before:text-gray-800",
				"before:counter-increment-[step] before:content-[counter(step)]",
				className
			)}
			{...props}
		/>
	),
	Steps: ({ ...props }) => <div className="[&>h3]:step steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8" {...props} />,
	FrameworkDocs: ({ className, ...props }: React.ComponentProps<typeof FrameworkDocs>) => <FrameworkDocs className={cn(className)} {...props} />,
	Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => <Link className={cn("font-medium underline underline-offset-4", className)} {...props} />,
	LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
		<Link
			className={cn("bg-card text-card-foreground hover:bg-muted/50 flex w-full flex-col items-center rounded-xl border p-6 shadow transition-colors sm:p-10", className)}
			{...props}
		/>
	),
}

/**
 * @returns A React component that renders an error message
 */

function ErrorComponent() {
	return <div className="text-error-text">Error rendering content</div>
}

/**
 * Mdx component to render MDX content
 * @param code - The MDX code to render
 * @returns A React component that renders the MDX content
 */

export function Mdx({ code }: MdxProps) {
	const Component = useMemo(() => {
		if (!code) return () => null
		try {
			return getMDXComponent(code)
		} catch (error) {
			console.log(error)
			return ErrorComponent
		}
	}, [code])

	return <Component className="flex flex-col gap-12" components={components} />
}
