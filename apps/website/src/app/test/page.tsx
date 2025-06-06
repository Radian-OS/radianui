import AccordionExample from "@/registry/example/accordion-example"
import AlertExample from "@/registry/example/alert-example"
import AvatarExample from "@/registry/example/avatar-example"
import AvatarGroupExample from "@/registry/example/avatar-group-example"
import BannerExample from "@/registry/example/banner-example"
import BreadcrumbExample from "@/registry/example/breadcrumb-example"
// import BadgeExample from "@/registry/example/badge-example";
import ButtonExample from "@/registry/example/button-example"
import CheckboxExample from "@/registry/example/checkbox-example"
import CodeAreaExample from "@/registry/example/code-area-example"
import DividerExample from "@/registry/example/divider-example"
import DrawerExample from "@/registry/example/drawer-example"
import DropdownExample from "@/registry/example/dropdown-example"
// import FontTogglerExample from "@/registry/example/font-toggler-example"
import InputExample from "@/registry/example/input-example"
import ModalExample from "@/registry/example/modal-example"
import PaginationExample from "@/registry/example/pagination-example"
import PopoverExample from "@/registry/example/popover-example"
import RadioGroupExample from "@/registry/example/radiogroup-example"
import ResizeableExample from "@/registry/example/resizable-example"
import SelectExample from "@/registry/example/select-example"
import SonnerExample from "@/registry/example/sonner-example"
import SwitchExample from "@/registry/example/switch-example"
import TableExample from "@/registry/example/table-example"
import TabsExample from "@/registry/example/tabs-example"
import TooltipExample from "@/registry/example/tooltip-example"
import ColorPicker from "@/registry/ui/color-picker"
import { Spinner } from "@/registry/ui/spinner"

const page = () => {
	return (
		<div className="mx-auto max-w-[80rem]">
			<div className="px-4 md:px-5 lg:px-6">
				<BannerExample />
				<Spinner />
				<BreadcrumbExample />
				<ButtonExample />
				<CodeAreaExample />
				<DividerExample />
				<DrawerExample />
				<AccordionExample />
				<AlertExample />
				<AvatarExample />
				<AvatarGroupExample />
				<TooltipExample />
				<TabsExample />
				<SonnerExample />
				<SwitchExample />
				<DropdownExample />
				<CheckboxExample />
				<PopoverExample />
				<RadioGroupExample />
				<ModalExample />
				<SelectExample />
				<InputExample />
				<TableExample />
				<PaginationExample />
				<ResizeableExample />
				<ColorPicker />
			</div>
		</div>
	)
}

export default page
