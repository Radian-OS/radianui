"use client"

import React, { HTMLAttributes, useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { MDXComponents } from "mdx/types"
import Link from "next/link"
import AccordionPreview from "@/component-preview/accordion-preview"
import AlertPreview from "@/component-preview/alert-preview"
import AnimatedListPreview from "@/component-preview/animations/animated-list-preview"
import BorderBeamPreview from "@/component-preview/animations/border-beam-preview"
import ChangingTextPreview from "@/component-preview/animations/changing-text-preview"
import DraggablePreview from "@/component-preview/animations/draggable-preview"
import FadePreview from "@/component-preview/animations/fade-preview"
import GradientTextPreview from "@/component-preview/animations/gradient-text-preview"
import InfiniteScrollPreview from "@/component-preview/animations/infinite-scroll-preview"
import PointerPreview from "@/component-preview/animations/pointer-preview"
import TextRevealPreview from "@/component-preview/animations/text-reveal-preview"
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
import CompactButtonPreview from "@/component-preview/compact-button-preview"
import CurrencyAmountPreview from "@/component-preview/currency-amount-preview"
import DatePickerPreview from "@/component-preview/date-picker-preview"
import DividerPreview from "@/component-preview/divider-preview"
import DrawerPreview from "@/component-preview/drawer-preview"
import DropdownPreview from "@/component-preview/dropdown-preview"
import FancyButtonPreview from "@/component-preview/fancy-button-preview"
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
import SpinnerPreview from "@/component-preview/spinner-preview"
import SvgButtonPreview from "@/component-preview/svg-button-preview"
import SwitchPreview from "@/component-preview/switch-preview"
import TablePreview from "@/component-preview/table-preview"
import TabsPreview from "@/component-preview/tabs-preview"
import TextAreaPreview from "@/component-preview/text-area-preview"
import TimePickerPreview from "@/component-preview/time-picker-preview"
import ToastPreview from "@/component-preview/toast-preview"
import TooltipPreview from "@/component-preview/tooltip-preview"
import Cli from "@/components/cli"
import CommandLineTabs, { type InstallMode } from "@/components/cli-tabs"
import DisplayColor from "@/components/display-color"
import Installation from "@/components/installation"
import Manual from "@/components/manual"
import Nextjs from "@/components/nextjs"
import { cn } from "@/lib/utils"
import AccordionWithIconExample from "@/registry/example/accordion/accordion-example-preview"
import BlurFadeExample from "@/registry/example/animated/blur-fade-example"
import CollaborationPointerExample from "@/registry/example/animated/collaboration-pointer-example"
import DragConstraintsExample from "@/registry/example/animated/drag-constraints-example"
import FadeOutExample from "@/registry/example/animated/fade-out-example"
import InfiniteScrollVerticalExample from "@/registry/example/animated/infinite-scroll-vertical"
import BadgeExamplePreview from "@/registry/example/badge/badge-example-preview"
import BannerExamplePreview1 from "@/registry/example/banner/banner-example-preview1"
import BannerExamplePreview2 from "@/registry/example/banner/banner-example-preview2"
import BannerExamplePreview3 from "@/registry/example/banner/banner-example-preview3"
import IndeterminateCheckboxExample from "@/registry/example/checkbox/indeterminate-checkbox"
import SelectMamberCheckboxgroupExample from "@/registry/example/checkbox/select-member-checkboxgroup"
import CodeWithTabs from "@/registry/example/code/code-with-tabs-preview"
import ColorPickerExample from "@/registry/example/color-picker/color-picker-example"
import ColorSpinnerExample from "@/registry/example/color-spinner-example"
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
import ContentBasedTextAreaExample from "@/registry/example/text-area/ContentBasedTextAreaExample"
import ToastExample from "@/registry/example/toast/toast-example"
import { CodeArea, CodeAreaProps } from "@/registry/ui/code"
import { Divider } from "@/registry/ui/divider"
import CodeSnippet from "./code-snippet"
import { FrameworkDocs } from "./framework-docs"
import { PropsData, PropsTable } from "./props-table"

type MdxProps = {
	code: string
}

const components: MDXComponents = {
	PropsTable: ({ title, data, externalUrl }: { title?: string; data: PropsData[]; externalUrl?: string }) => <PropsTable title={title} data={data} externalUrl={externalUrl} />,
	PropsTableWrapper: ({ children }: { children: React.ReactNode | React.ReactNode[] }) => <div className="bg-bg-level0 mt-6 flex flex-col gap-2 rounded-xl p-1.5">{children}</div>,
	AccordionPreview: () => (
		<div className="pb-6">
			<AccordionPreview />
		</div>
	),
	AccordionWithIconExample: () => (
		<div className="pb-6">
			<AccordionWithIconExample />
		</div>
	),
	AlertPreview: () => (
		<div className="pb-6">
			<AlertPreview />
		</div>
	),
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
	ToastPreview: () => <ToastPreview />,
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
	SpinnerPreview: () => <SpinnerPreview />,
	ColorPickerExample: () => <ColorPickerExample />,
	ToastExample: () => <ToastExample />,
	ColorSpinnerExample: () => <ColorSpinnerExample />,
	FancyButtonPreview: () => <FancyButtonPreview />,
	CompactButtonPreview: () => <CompactButtonPreview />,
	ContentBasedTextAreaExample: () => <ContentBasedTextAreaExample />,
	SvgButtonPreview: () => <SvgButtonPreview />,
	CodeWitTabsPreview: () => <CodeWithTabs />,
	// Animation components
	TypingTextPreview: () => <TypingTextPreview />,
	GradientTextPreview: () => <GradientTextPreview />,
	DraggablePreview: () => <DraggablePreview />,
	FadePreview: () => <FadePreview />,
	InfiniteScrollPreview: () => <InfiniteScrollPreview />,
	PointerPreview: () => <PointerPreview />,
	BorderBeamPreview: () => <BorderBeamPreview />,
	ChangingTextPreview: () => <ChangingTextPreview />,
	InfiniteScrollVerticalExample: () => <InfiniteScrollVerticalExample />,
	CollaborationPointerExample: () => <CollaborationPointerExample />,
	DragConstraintsExample: () => <DragConstraintsExample />,
	AnimatedListPreview: () => <AnimatedListPreview />,
	TextRevealPreview: () => <TextRevealPreview />,
	BlurFadeExample: () => <BlurFadeExample />,
	FadeOutExample: () => <FadeOutExample />,

	CLI: ({ code, mode = "execute" }: { code: string; mode: InstallMode }) => {
		return (
			<div className="pb-6">
				<CommandLineTabs mode={mode} code={code} />
			</div>
		)
	},
	CodeSnippet: ({ code, title, showLineNumbers }: { code: string; title: string; showLineNumbers: boolean }) => (
		<div className="pb-6">
			<CodeSnippet code={code} title={title} showLineNumber={showLineNumbers} />
		</div>
	),
	Code: ({ language, tabs = false, code, showLineNumbers, copiable = true, className, ...props }: CodeAreaProps) =>
		tabs ? (
			<div className="pb-6">
				<CommandLineTabs mode="execute" code={code} />
			</div>
		) : (
			<div className="pb-6">
				<CodeArea language={language} code={code} showLineNumbers={showLineNumbers} copiable={copiable} className={cn("", className)} {...props} />
			</div>
		),
	h1: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className={cn("heading-4", className)} {...props}>
			{children}
		</h1>
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("heading-5 font-semibold! pb-4 pt-6", className)} {...props}>
			{children}
		</h2>
	),
	h3: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className={cn("heading-6 font-semibold! pb-3", className)} {...props}>
			{children}
		</h3>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-text-secondary text-base", className)} {...props}>
			{children}
		</p>
	),

	Divider: () => <Divider orientation={"horizontal"} spacing={"16"} />,

	ul: ({ children }: { children?: React.ReactNode }) => (
		<ul className="[&>li>strong]:text-text-secondary ml-4 mt-2 flex list-disc flex-col gap-2 [&>li>strong]:font-medium">{children}</ul>
	),
	Preview: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
		<div className={cn("mb-5 flex min-h-[30rem] items-center justify-center rounded-lg border p-10", className)} {...props}>
			<div className="w-full">{children}</div>
		</div>
	),
	Steps: ({ ...props }) => <div className="[&>h3]:step steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8" {...props} />,
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

	return <Component components={components} />
}
