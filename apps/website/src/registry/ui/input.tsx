"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export type SizeOptions = "32" | "36" | "40" | "44" | "48" | "56";
export type RoundedOptions = "square" | "rounded" | "full";
// Variants for input styles based on size and rounded options
export const cvaInputVariants = {
  rounded: {
    square: "rounded-none",
    rounded: "rounded-md",
    full: "rounded-full",
  },
  size: {
    "32": "h-8 body-sm px-3 py-1.5",
    "36": "h-9 body-sm px-3 py-2",
    "40": "h-10 body-sm px-3 py-2.5",
    "44": "h-11 body-base py-2.5 px-3.5",
    "48": "h-12 body-base py-3 px-3.5",
    "56": "h-14 body-base py-4 px-3.5",
  },
};

export const defaultInputSize = "40";
export const defaultInputRadius = "rounded";
// Creating a variant for input styles using cva
const inputVariants = cva(
  "flex h-10 w-full items-center justify-center gap-2 border hover:bg-bg2 drop-shadow-xs bg-bg1 cursor-text",
  {
    variants: {
      ...cvaInputVariants,
    },
    defaultVariants: {
      size: defaultInputSize,
      rounded: defaultInputRadius,
    },
  },
);
// Type definition for custom class names for various parts of the input
export type InputClassNames = {
  base?: string /* The div that wraps the component */;
  label?: string /* The label of the input */;
  wrapper?: string /* The wrapper div for the input and icons (used for showing borders) */;
  input?: string /* The actual input element used inside */;
  error?: string /* The error message */;
};
// Type definition for input props, extending standard input attributes
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  errorMsg?: string;
  hasError?: boolean;
  type?: "text" | "email" | "url" | "number" | "password";
  /* 
	It is not recommended to use type=password, instead use the <Password> component,
	'password' is added here because the <Password> uses <Input> component under the hood
	*/
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  size?: SizeOptions;
  rounded?: RoundedOptions;
  id?: string;
  classNames?: InputClassNames;
  ref?: React.Ref<HTMLInputElement>;
};
// Input component definition
function Input({
  label,
  disabled,
  errorMsg,
  hasError = false,
  type = "text",
  prefixIcon,
  suffixIcon,
  size = defaultInputSize,
  rounded = defaultInputRadius,
  id,
  className,
  classNames,
  ...props
}: InputProps) {
  let htmlId = React.useId();
  if (id) htmlId = id;

  return (
    <div
      className={cn(
        "body-sm text-fg-1 flex w-full flex-col gap-1.5",
        { "cursor-not-allowed": disabled },
        className,
        classNames?.base,
      )}
    >
      {label && (
        <Label
          id={htmlId}
          className={cn({ "text-fg3": disabled }, classNames?.label)}
        >
          {label}
        </Label>
      )}
      <label
        htmlFor={htmlId}
        className={cn(
          inputVariants({ size, rounded }),
          {
            "border-error focus-within:ring-error/10 focus-within:ring-2":
              hasError,
            "focus-within:border-primary! focus-within:ring-primary/10 hover:border-stroke-decorative focus-within:ring-2":
              !hasError,
            "text-fg3 pointer-events-none": disabled,
          },
          classNames?.wrapper,
        )}
      >
        {prefixIcon && <span>{prefixIcon}</span>}
        <input
          id={htmlId}
          className={cn(
            "text-fg-1 placeholder-fg3 h-fit w-full border border-none bg-transparent p-0 outline-hidden select-none placeholder:text-sm placeholder:font-normal focus:ring-0",
            {
              "text-fg3 cursor-not-allowed": disabled,
            },
            classNames?.input,
          )}
          type={type}
          disabled={disabled}
          {...props}
        />
        {suffixIcon && <span className="ml-auto">{suffixIcon}</span>}
      </label>
      {hasError && (
        <Label className={cn("body-xs text-error font-medium", className)}>
          {errorMsg}
        </Label>
      )}
    </div>
  );
}

Input.displayName = "Input";

export { Input };
