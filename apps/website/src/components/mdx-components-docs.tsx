"use client"

import React, { HTMLAttributes, useMemo } from "react"
import { Settings } from "lucide-react"
import { getMDXComponent } from "mdx-bundler/client"
import { MDXComponents } from "mdx/types"
import Link from "next/link"
import IconButtonPreview from "@/component-preview/Icon-button-preview"
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
import FormPreview from "@/component-preview/form-preview"
import HovercardPreview from "@/component-preview/hover-card-preview"
import InputOtpPreview from "@/component-preview/input-otp-preview"
import InputPreview from "@/component-preview/input-preview"
import LabelPreview from "@/component-preview/label-preview"
import LinkButtonPreview from "@/component-preview/link-button-preview"
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
import DisplayColor from "@/components/display-color"
import Installation from "@/components/installation"
import { cn } from "@/lib/utils"
import AccordionWithIconExample from "@/registry/example/accordion/accordion-example-preview"
import AlertCloseExamplePreview from "@/registry/example/alert/alert-close-example-preview"
import AlertExamplePreview from "@/registry/example/alert/alert-example-preview"
import BlurFadeExample from "@/registry/example/animated/blur-fade-example"
import CollaborationPointerExample from "@/registry/example/animated/collaboration-pointer-example"
import DragConstraintsExample from "@/registry/example/animated/drag-constraints-example"
import FadeOutExample from "@/registry/example/animated/fade-out-example"
import InfiniteScrollVerticalExample from "@/registry/example/animated/infinite-scroll-vertical"
import IndicatorAvatarPreview from "@/registry/example/avatar/indicator-avatar-preview"
import RingAvatarPreview from "@/registry/example/avatar/ring-avatar-preview"
import VerifiedAvatarPreview from "@/registry/example/avatar/verified-avatar-preview"
import BadgeExamplePreview from "@/registry/example/badge/badge-example-preview"
import BannerCloseExamplePreview from "@/registry/example/banner/banner-close-example-preview"
import BannerExamplePreview1 from "@/registry/example/banner/banner-example-preview1"
import BannerExamplePreview2 from "@/registry/example/banner/banner-example-preview2"
import BannerExamplePreview3 from "@/registry/example/banner/banner-example-preview3"
import BreadcrumbExample1 from "@/registry/example/breadcrumb/breadcrumb-example1"
import BreadcrumbExample2 from "@/registry/example/breadcrumb/breadcrumb-example2"
import BreadcrumbExample3 from "@/registry/example/breadcrumb/breadcrumb-example3"
import FooterCalendarPreview from "@/registry/example/calendar/calendar-footer-preview"
import NumberOfCalendarPreview from "@/registry/example/calendar/month-preview"
import QuickSelectionCalendarPreview from "@/registry/example/calendar/quick-selection-preview"
import IndeterminateCheckboxExample from "@/registry/example/checkbox/indeterminate-checkbox"
import SelectMamberCheckboxgroupExample from "@/registry/example/checkbox/select-member-checkboxgroup"
import CodeWithTabs from "@/registry/example/code/code-with-tabs-preview"
import ColorPickerExample from "@/registry/example/color-picker/color-picker-example"
import ColorSpinnerExample from "@/registry/example/color-spinner-example"
import CurrencyExamplePreview from "@/registry/example/currency-amount/Currency-Example-preview"
import DividerExamplePreview from "@/registry/example/divider/divider-example-preview"
import DropdownWithCheckboxExample from "@/registry/example/dropdown/dropdown-with-checkbox-example"
import { DropdownWithDropdownCheckbox } from "@/registry/example/dropdown/dropdown-with-dropdown-checkbox"
import DropdownWithRadioExample from "@/registry/example/dropdown/dropdown-with-radio"
import UserMenuDropdownExample from "@/registry/example/dropdown/user-profile-dropdown-example"
import FormExample1 from "@/registry/example/form/form-example1"
import FormExample2 from "@/registry/example/form/form-example2"
import FormExample3 from "@/registry/example/form/form-example3"
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
import {
	Accordion,
	AccordionContent,
	AccordionContentProps,
	AccordionItem,
	AccordionItemProps,
	AccordionProps,
	AccordionTrigger,
	AccordionTriggerProps,
} from "@/registry/ui/accordion"
import { Alert, AlertProps } from "@/registry/ui/alert"
import { Divider } from "@/registry/ui/divider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import CodeSnippet from "./code-snippet"
import { ComponentSource } from "./component-source"
import { FrameworkDocs } from "./framework-docs"
import PackageManagerTabs, { PackageManagerTabsProps } from "./package-manager-tabs"
import { PropsData, PropsTable } from "./props-table"
import SocialLinkCards from "./social-link-cards"

type MdxProps = {
	code: string
}

const components: MDXComponents = {
	PropsTable: ({ title, data, externalReference }: { title?: string; data: PropsData[]; externalReference?: string }) => (
		<PropsTable title={title} data={data} externalReference={externalReference} />
	),
	PropsTableWrapper: ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
		<div className="bg-elevation-negative mt-3 flex flex-col gap-2 rounded-xl p-1.5">{children}</div>
	),
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
	UserMenuDropdownExample: () => <UserMenuDropdownExample />,
	DropdownWithCheckboxExample: () => <DropdownWithCheckboxExample />,
	DropdownWithDropdownCheckboxExample: () => <DropdownWithDropdownCheckbox />,
	DropdownWithRadioExample: () => <DropdownWithRadioExample />,
	ResizablePreview: () => <ResizablePreview />,
	Installation: () => <Installation />,
	SocialButtonPreview: () => <SocialButtonPreview />,
	BadgeExamplePreview: () => <BadgeExamplePreview />,
	InputPreview: () => <InputPreview />,
	LabelPreview: () => <LabelPreview />,
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
	LinkButtonPreview: () => <LinkButtonPreview />,
	ContentBasedTextAreaExample: () => <ContentBasedTextAreaExample />,
	SvgButtonPreview: () => <SvgButtonPreview />,
	CodeWitTabsPreview: () => <CodeWithTabs />,
	FormPreview: () => <FormPreview />,
	FormExample1: () => <FormExample1 />,
	FormExample2: () => <FormExample2 />,
	FormExample3: () => <FormExample3 />,
	AlertExamplePreview: () => <AlertExamplePreview />,
	VerifiedAvatarPreview: () => <VerifiedAvatarPreview />,
	IndicatorAvatarPreview: () => <IndicatorAvatarPreview />,
	RingAvatarPreview: () => <RingAvatarPreview />,
	BreadcrumbExample1: () => <BreadcrumbExample1 />,
	BreadcrumbExample2: () => <BreadcrumbExample2 />,
	BreadcrumbExample3: () => <BreadcrumbExample3 />,
	IconButtonPreview: () => <IconButtonPreview />,
	BannerCloseExamplePreview: () => <BannerCloseExamplePreview />,
	AlertCloseExamplePreview: () => <AlertCloseExamplePreview />,
	DividerExamplePreview: () => <DividerExamplePreview />,
	QuickSelectionCalendarPreview: () => <QuickSelectionCalendarPreview />,
	NumberOfCalendarPreview: () => <NumberOfCalendarPreview />,
	FooterCalendarPreview: () => <FooterCalendarPreview />,
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
	PackageManagerTabs: ({ commands, className, withIcon = false }: PackageManagerTabsProps) => (
		<PackageManagerTabs commands={commands} className={cn(className)} withIcon={withIcon} />
	),
	CodeSnippet: ({ code, title, showLineNumbers, collapsible }: { code: string; title: string; showLineNumbers: boolean; collapsible?: boolean }) => (
		<CodeSnippet code={code} title={title} showLineNumber={showLineNumbers} collapsible={collapsible} />
	),
	ComponentSource: ({ name, title, collapsible }: { name: string; title: string; collapsible: boolean }) => <ComponentSource name={name} title={title} collapsible={collapsible} />,
	h1: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className={cn("heading-4", className)} {...props}>
			{children}
		</h1>
	),
	h2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("heading-5 font-semibold! mb-3 mt-10", className)} {...props}>
			{children}
		</h2>
	),
	h3: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className={cn("mb-3 mt-6 text-lg font-medium leading-7", className)} {...props}>
			{children}
		</h3>
	),
	a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a
			aria-label="Link"
			rel="noopener noreferrer"
			target="_blank"
			className={cn("text-primary hover:text-primary-hover font-medium underline underline-offset-4 transition-colors duration-200", className)}
			{...props}
		/>
	),
	p: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("text-fg-secondary", className)} {...props}>
			{children}
		</p>
	),
	strong: ({ children, className, ...props }: HTMLAttributes<HTMLBodyElement>) => (
		<strong className={cn("text-fg font-semibold", className)} {...props}>
			{children}
		</strong>
	),
	hr: () => <Divider orientation={"horizontal"} margin={"0"} className="mt-10" />,

	ul: ({ children, className }: { children: React.ReactNode; className?: string }) => {
		return <ul className={cn("space-y-4 pb-6", className)}>{children}</ul>
	},

	li: ({ children, className }: { children: React.ReactNode; className?: string }) => {
		return <li className={cn("text-fg-secondary", className)}>{children}</li>
	},

	VersionAlert: (props: Pick<AlertProps, "title" | "description" | "variant" | "color">) => {
		return (
			<Alert variant={props.variant} color={props.color}>
				<div className="flex w-full gap-3">
					<span className="flex flex-shrink-0 items-start">
						<Settings className="size-5" />
					</span>
					<div className="flex flex-1 flex-col">
						<p className="text-sm font-semibold">{props.title}</p>
						<p className="text-sm">{props.description}</p>
					</div>
				</div>
			</Alert>
		)
	},

	Accordion: (props: AccordionProps) => {
		return <Accordion {...props} size="lg" variant="open" />
	},
	AccordionItem: (props: AccordionItemProps) => {
		return <AccordionItem {...props} />
	},
	AccordionTrigger: (props: AccordionTriggerProps) => {
		return <AccordionTrigger {...props} />
	},
	AccordionContent: (props: AccordionContentProps) => {
		return <AccordionContent {...props} />
	},
	Tabs: (props: React.ComponentProps<typeof Tabs>) => {
		return <Tabs {...props} variant="default" size="md" />
	},
	TabsList: (props: React.ComponentProps<typeof TabsList>) => {
		return <TabsList width="full" {...props} />
	},
	TabsTrigger: (props: React.ComponentProps<typeof TabsTrigger>) => {
		return <TabsTrigger {...props} />
	},
	TabsContent: (props: React.ComponentProps<typeof TabsContent>) => {
		return <TabsContent {...props} />
	},
	Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"mb-3 mt-6 scroll-m-20 text-lg font-medium first:mt-0 last:mb-0",
				"relative [counter-increment:step]",
				"before:absolute before:-left-10 before:top-0 before:flex before:size-7 before:items-center before:justify-center",
				"before:border-soft-alpha before:bg-elevation-level1 before:text-fg before:rounded-lg before:border before:text-sm before:font-medium",
				"before:content-[counter(step)]",
				className
			)}
			{...props}
		/>
	),
	Steps: ({ ...props }) => <div className={cn("border-dashed [counter-reset:step] md:ml-4 md:border-l-2 md:pl-6")} {...props} />,
	SocialLinkCards: () => <SocialLinkCards />,
	FrameworkDocs: ({ className, ...props }: React.ComponentProps<typeof FrameworkDocs>) => <FrameworkDocs className={cn(className)} {...props} />,
	Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => <Link className={cn("font-medium text-amber-300 underline underline-offset-4", className)} {...props} />,
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
