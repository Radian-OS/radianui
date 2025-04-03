"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { OTPInput as OTP, REGEXP_ONLY_DIGITS, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";
import {
  Input,
  RoundedOptions,
  SizeOptions,
  cvaInputVariants,
  defaultInputRadius,
  defaultInputSize,
} from "./input";
import { Label } from "./label";

// Variants for the container of the OTP input
const otpContainerVariants = cva("", {
  variants: {
    variant: { box: "flex w-fit gap-1.5", flat: "" },
  },
  defaultVariants: { variant: "box" },
});
// Variants for the slots of the OTP input
const otpSlotVariants = cva("", {
  variants: {
    ...cvaInputVariants,
    variant: {
      box: cn(
        "relative text-fg1",
        "flex items-center justify-center transition-all duration-300",
        "border border-stroke bg-bg1 drop-shadow-xs",
      ),
      flat: "",
    },
    size: {
      "32": "size-8 body-sm px-3 py-1.5",
      "36": "size-9 body-sm px-3 py-2",
      "40": "size-10 body-sm px-3 py-2.5",
      "44": "size-11 body-base py-2.5 px-3.5",
      "48": "size-12 body-base py-3 px-3.5",
      "56": "size-14 body-base py-4 px-3.5",
    },
  },
  defaultVariants: { variant: "box", size: defaultInputSize },
});
// Type definition for OTP input props, extending OTP component props
type OTPInputProps = Pick<
  React.ComponentPropsWithoutRef<typeof OTP>,
  | "value"
  | "onChange"
  | "containerClassName"
  | "onComplete"
  | "placeholder"
  | "textAlign"
  | "inputMode"
  | "pattern"
  | "pasteTransformer"
  | "pushPasswordManagerStrategy"
  | "noScriptCSSFallback"
  | "className"
  | "disabled"
> & {
  maxLength?: number;
  length?: number;
  variant?: "box" | "flat";
  label?: string;
  placeholder?: string;
  id?: string;
  size?: SizeOptions;
  rounded?: RoundedOptions;
};
// OTPInput component definition
function OTPInput({
  maxLength = 12,
  length = 6,
  variant = "box",
  label,
  placeholder,
  id,
  onChange,
  size = defaultInputSize,
  rounded = defaultInputRadius,
  className,
  ...props
}: OTPInputProps) {
  // Value for the flat variant
  const [value, setValue] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  // If the variant is flat, render a simple Input component
  if (variant == "flat") {
    return (
      <Input
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        value={value}
        size={size}
        rounded={rounded}
        className={cn(otpContainerVariants({ variant }), className)}
        onChange={(e) => {
          const value = e.target.value;
          const regex =
            props.inputMode === "numeric"
              ? new RegExp(`^\\d{0,${length}}$`)
              : new RegExp("");

          if (regex.test(value)) {
            setValue(value);
            onChange?.(value);
            if (value.length === length) {
              inputRef.current?.blur();
              props.onComplete?.(value);
            }
          }
        }}
        id={id}
        disabled={props.disabled}
      />
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label
          className={cn("body-sm w-fit font-medium", {
            "text-fg3": props.disabled,
          })}
        >
          {label}
        </Label>
      )}
      <OTP
        render={({ slots }) => (
          <div className={otpContainerVariants({ variant })}>
            {slots.slice(0, length).map((slot, idx) => (
              <Slot
                key={idx}
                variant={variant}
                size={size}
                rounded={rounded}
                {...slot}
              />
            ))}
          </div>
        )}
        maxLength={maxLength}
        pattern={props.inputMode === "numeric" ? REGEXP_ONLY_DIGITS : undefined}
        onChange={onChange}
        disabled={props.disabled}
        className={cn({ "cursor-not-allowed": props.disabled })}
        {...props}
      />
    </div>
  );
}
// Slot component for individual OTP input slots
function Slot(
  props: SlotProps & {
    variant: "box" | "flat";
    size: SizeOptions;
    rounded: RoundedOptions;
  },
) {
  const slotRef = React.useRef<HTMLDivElement>(null);
  // Adding event listeners for mouse enter and leave
  React.useEffect(function () {
    if (slotRef.current) {
      slotRef.current.addEventListener("mouseenter", () => {
        slotRef.current?.classList.add("border-stroke-decorative!");
        slotRef.current?.classList.add("border-2");
      });

      slotRef.current.addEventListener("mouseleave", () =>
        slotRef.current?.classList.remove("border-stroke-decorative!"),
      );
    }
  }, []);

  return (
    <div
      className={cn(
        otpSlotVariants({
          variant: props.variant,
          size: props.size,
          rounded: props.rounded,
        }),
        {
          "border-primary ring-primary/10 ring-2": props.isActive,
        },
      )}
      ref={slotRef}
    >
      {props.char !== null ? (
        <div>{props.char}</div>
      ) : (
        props.isActive && (
          <div className="animate-caret-blink inline-block h-[1.2rem] w-[0.063rem] bg-current" />
        )
      )}
    </div>
  );
}
export default OTPInput;
