"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Divider } from "./divider";
import {
  InputProps,
  cvaInputVariants,
  defaultInputRadius,
  defaultInputSize,
} from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// Type definition for the SelectItem component props
type SelectItemProps = {
  value: string;
  children: React.ReactNode;
};
// SelectItem component representing an individual item in the select dropdown
function SelectItem({
  value,
  children,
  ref,
  ...props
}: SelectItemProps & React.ComponentPropsWithRef<typeof CommandItem>) {
  const commandRef = React.useRef<React.ElementRef<typeof CommandItem>>(null);
  React.useImperativeHandle(ref, () => commandRef.current!, []);

  const {
    values,
    setValues,
    selectionMode,
    setOpen,
    minSelectionCount,
    showSelectedCheck,
    open,
  } = useSelectContext();

  const isSelected = values.includes(value as string);

  /* When the popover is open and this item is selected, scroll it into view */
  React.useEffect(
    function () {
      if (open && isSelected && commandRef.current) {
        commandRef.current.scrollIntoView({
          block: "end",
        });
      }
    },
    [open, isSelected],
  );

  return (
    <CommandItem
      keywords={[value, children?.toString() || ""]}
      key={value}
      value={value}
      ref={commandRef}
      onSelect={function (currentValue) {
        /* For single selection, update the value and close the popover */
        if (selectionMode == "single") {
          if (minSelectionCount === 1 && values[0] === currentValue) return;
          setValues(isSelected ? [] : [currentValue]);
          setOpen(false);
        } else if (selectionMode == "multiple") {
          /* For multiple selections, add or remove the item from the list*/
          if (
            values.length === minSelectionCount &&
            values.includes(currentValue)
          )
            return;
          setValues(
            isSelected
              ? values.filter((v) => v !== currentValue)
              : [...values, currentValue],
          );
        }
      }}
      className="text-fg1 flex cursor-pointer gap-2"
      {...props}
    >
      <span className="flex flex-1 items-center gap-2 truncate [&_svg]:size-5">
        {children}
      </span>
      {showSelectedCheck &&
        (isSelected ? (
          <Check size={20} className="stroke-fg1" />
        ) : (
          <span className="size-5" />
        ))}
    </CommandItem>
  );
}
SelectItem.displayName = "SelectItem";
// Hook to use the Select context
function useSelectContext() {
  const context = React.use(SelectContext);
  if (context === undefined) {
    throw new Error("useTabsContext must be used within a Context Provider");
  }
  return context;
}
// Type definition for the SelectGroup component props
type SelectGroupProps = {
  children?: React.ReactNode;
  label?: string;
};
// SelectGroup component for grouping related select items
function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <CommandGroup heading={label ? label : undefined}>{children}</CommandGroup>
  );
}
// Variants for the Select trigger styling using class variance authority
const SelectTriggerVariations = cva(
  "active:bg-background justify-start gap-2 border-stroke px-3 py-2.5 text-fg1 drop-shadow-xs hover:bg-bg1",
  {
    variants: {
      ...cvaInputVariants,
    },
    defaultVariants: {
      size: defaultInputSize,
    },
  },
);
// Type definition for the Select context
type SelectContextType = {
  values: string[];
  setValues: (values: string[]) => void;
  selectionMode: "single" | "multiple";
  setOpen: (open: boolean) => void;
  open: boolean;
  minSelectionCount: number;
  showSelectedCheck: boolean;
};

const SelectContext = React.createContext<SelectContextType | undefined>(
  undefined,
);

export type SelectClassNames = {
  base?: string /* The div that wraps the whole component */;
  label?: string /* The label of the component */;
  trigger?: string /* The trigger of the component */;
  content?: string /* The content that is displayed in the popover */;
  input?: string /* The search input used inside the select */;
};

export type SelectProps = Pick<
  InputProps,
  | "label"
  | "placeholder"
  | "children"
  | "size"
  | "rounded"
  | "disabled"
  | "className"
> & {
  selectedValues?: string[];
  onSelectedChange?: (values: string[]) => void;
  selectionMode?: "single" | "multiple";
  isSearchable?: boolean;
  searchPlaceholder?: string;
  /* Allow user to render a custom trigger */
  renderTrigger?: (selectedValues: string[]) => React.ReactNode;
  defaultSelected?: string[];
  minSelectionCount?: number;
  showSelectedCheck?: boolean;
  classNames?: SelectClassNames;
};

// Select component for rendering a dropdown with selection options
function Select({
  children,
  label,
  placeholder,
  selectedValues,
  onSelectedChange,
  isSearchable = false,
  selectionMode = "single",
  searchPlaceholder = "Search",
  renderTrigger,
  size = defaultInputSize,
  rounded = defaultInputRadius,
  defaultSelected = [],
  minSelectionCount = 0,
  showSelectedCheck = true,
  disabled = false,
  className,
  classNames,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalSelectedValues, setInternalSelectedValues] =
    React.useState<string[]>(defaultSelected);
  const isControlled = selectedValues !== undefined;

  if (minSelectionCount < 0)
    throw new Error("minSelectionCount cannot be negative");

  function handleSelectionChange(newValues: string[]) {
    onSelectedChange?.(newValues);
    setInternalSelectedValues(newValues);
  }

  /**
   * Helper function to extract value and label information from children.
   * This flattens out both SelectItem and nested SelectGroup components.
   */
  function getChildrenArray(children: React.ReactNode): { value: string; label: string }[] {
    const childrenArr: { value: string; label: string }[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // Cast the child as a React element with props of either SelectItemProps or SelectGroupProps.
        const childElement = child as React.ReactElement<SelectItemProps | SelectGroupProps>;
        if (childElement.type === SelectItem) {
          const props = childElement.props as SelectItemProps;
          childrenArr.push({
            value: props.value,
            label: String(props.children),
          });
        }
        if (childElement.type === SelectGroup) {
          const groupProps = childElement.props as SelectGroupProps;
          childrenArr.push(...getChildrenArray(groupProps.children));
        }
      }
    });
    return childrenArr;
  }
  
  
  
  const childrenArr = getChildrenArray(children);

  /* Always use this values instead of internalSelectedValues */
  const values = isControlled ? selectedValues : internalSelectedValues;
  /* Retrieve the labels of the selected items to display in the trigger */
  const selectedLabels =
    values.length > 0
      ? childrenArr
          .filter((data) => values.includes(data.value))
          .map((data) => data.label)
      : [];

  return (
    <SelectContext.Provider
      value={{
        values: values,
        setValues: handleSelectionChange,
        selectionMode,
        setOpen,
        open,
        minSelectionCount,
        showSelectedCheck,
      }}
    >
      <div
        className={cn(
          "flex h-full w-full flex-col gap-1",
          className,
          classNames?.base,
        )}
      >
        {label && (
          <Label className={cn({ "text-fg3": disabled }, classNames?.label)}>
            {label}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen} align="start">
          <PopoverTrigger asChild>
            {renderTrigger ? (
              renderTrigger(values)
            ) : (
              <Button
                variant="outline"
                className={cn(
                  SelectTriggerVariations({ size, rounded }),
                  {
                    "text-fg3 cursor-not-allowed": disabled,
                    "border-primary ring-primary/10 border ring-2": open,
                  },
                  "w-full truncate",
                  classNames?.trigger,
                )}
                disabled={disabled}
              >
                <span
                  className={cn(
                    "text-fg1 flex-1 shrink-0 items-center gap-2 truncate text-start font-medium",
                    {
                      "body-base":
                        size === "44" || size === "48" || size === "56",
                    },
                  )}
                >
                  {selectedLabels.length == 0 && placeholder}
                  {selectionMode === "single" &&
                    selectedLabels.length == 1 &&
                    selectedLabels[0]}
                  {selectionMode === "multiple" &&
                    selectedLabels.length > 0 &&
                    selectedLabels.join(", ")}
                </span>
                {!open ? (
                  <ChevronDown size={16} className="text-fg3" />
                ) : (
                  <ChevronUp size={16} className="text-fg3" />
                )}
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Command
              className={cn(
                "max-h-96 min-w-[var(--radix-popover-trigger-width)]",
                classNames?.content,
              )}
            >
              {isSearchable && (
                <CommandInput
                  className={classNames?.input}
                  placeholder={searchPlaceholder}
                />
              )}
              <CommandList>
                <CommandEmpty>No items found</CommandEmpty>
                <CommandItem value="-" className="hidden" />
                {children}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </SelectContext.Provider>
  );
}

// SelectDivider component that renders a Divider with specific styling
function SelectDivider() {
  return <Divider className="-mx-1.5 w-[calc(100%+0.75rem)]" />;
}
// Command component that wraps the CommandPrimitive with additional styling
function Command({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "bg-bg1 text-fg1 flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}
Command.displayName = CommandPrimitive.displayName;
// CommandInput component that renders an input field with a search icon
function CommandInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Input>) {
  return (
    <div
      className="flex items-center gap-2 border-b px-3.5 py-1.5"
      cmdk-input-wrapper=""
    >
      <Search className="h-5 w-5 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        className={cn(
          "body-sm placeholder:text-fg3 flex h-8 w-full rounded-md bg-transparent py-3 font-normal outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}
CommandInput.displayName = CommandPrimitive.Input.displayName;
// CommandList component that renders a list of command items
function CommandList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(
        "no-scrollbar h-fit max-h-100 w-full overflow-x-hidden overflow-y-auto p-1.5",
        className,
      )}
      {...props}
    />
  );
}
CommandList.displayName = CommandPrimitive.List.displayName;
// CommandEmpty component that displays a message when the command list is empty
function CommandEmpty(
  props: React.ComponentPropsWithRef<typeof CommandPrimitive.Empty>,
) {
  return (
    <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
  );
}
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
// CommandGroup component that groups related command items together
function CommandGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "[&_[cmdk-group-heading]]:body-xs text-fg1 [&_[cmdk-group-heading]]:text-fg3 overflow-hidden p-0 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase",
        className,
      )}
      {...props}
    />
  );
}
CommandGroup.displayName = CommandPrimitive.Group.displayName;
// CommandItem component that represents an individual command item in the list
function CommandItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "body-sm hover:bg-bg3 relative flex cursor-default items-center gap-2 rounded-sm px-2.5 py-1.5 font-normal outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}
CommandItem.displayName = CommandPrimitive.Item.displayName;
// CommandShortcut component that displays a keyboard shortcut
function CommandShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}
CommandShortcut.displayName = "CommandShortcut";

export { Select, SelectDivider, SelectGroup, SelectItem };
