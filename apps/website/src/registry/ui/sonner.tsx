import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Toaster as Sonner, toast } from "sonner";
import { Button } from "./button";

// Define the styles for the toast using `class-variance-authority`
const SonnerVariant = cva(
  "relative group toast rounded-lg w-full h-auto text-xl group-[.toaster]:text-fg1",
  {
    variants: {
      variant: {
        default: "bg-bg1 text-black",
        success: "bg-success text-white!",
        error: "bg-error text-white!",
        warning: "bg-warning text-white!",
        information: "bg-information text-white!",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Define the type for the toast variant
type VariantType = VariantProps<typeof SonnerVariant>["variant"];

// Define the type for the button in the toast
type ButtonType = {
  label: string;
  onClick: (id: string | number) => void;
  className?: string;
  dismiss?: boolean;
};
// Define the type for the toast position
type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";
// Define the props for the toast
type ToastProps = {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
  buttons?: ButtonType[];
  duration?: number;
  variant?: VariantType;
  content?: React.ReactNode;
  closable?: boolean;
  position?: Position;
  stack?: boolean;
  visibleToasts?: number;
};

const Sonners: React.FC<ToastProps> = function ({
  title,
  content,
  description,
  buttons,
  icon,
  closable = true,
  variant = "default",
  duration = 50000,
}) {
  // Create a toast with the provided content
  const toastId = toast(
    <div className="w-full">
      {content ? (
        // Render custom content if provided
        <div>
          <div className={SonnerVariant({ variant })}>{content}</div>
          <div className="flex gap-2 pr-2">
            {/* Render buttons if provided */}
            {buttons?.map((btn, index) => (
              <Button
                variant="outline"
                size="32"
                className={`${variant === "default" ? "border-stroke!" : "border-white!"} text-sm font-semibold`}
                key={index}
                onClick={function () {
                  btn.onClick(toastId);
                  if (btn.dismiss) {
                    toast.dismiss(toastId);
                  }
                }}
              >
                {btn.label}
              </Button>
            ))}
          </div>
          {/* Render close button if closable */}
          {closable && (
            <div
              onClick={function () {
                toast.dismiss(toastId);
              }}
              className={`absolute top-2.5 right-2.5 cursor-pointer ${variant === "default" ? "text-black" : "!text-white"} group-[.toaster]:text-fg1`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
          )}
        </div>
      ) : (
        // Render default toast content if no custom content is provided
        <>
          <div
            className={`group toast relative rounded-lg ${variant === "default" ? "bg-bg1" : `bg-${variant}`} flex h-auto w-full items-center justify-between gap-3 p-4 text-xl ${variant === "default" ? "text-black" : "text-white!"} group-[.toaster]:text-fg1`}
          >
            <div className="flex items-center justify-center gap-2 text-sm/5">
              {/* Render icon if provided */}
              {icon && (
                <div
                  className={`${React.isValidElement(icon) && icon.props?.className ? "" : "h-5 w-5"} flex items-center justify-center`}
                >
                  {icon}
                </div>
              )}
              {/* Render title and description */}
              {title && description && (
                <div className="flex flex-col">
                  <p className="font-semibold">{title}</p>
                  {description && <p className="">{description}</p>}
                </div>
              )}

              {!title && description && (
                <p className="font-semibold">{description}</p>
              )}
            </div>
            {/* Render close button if closable */}
            {closable && (
              <div
                onClick={function () {
                  toast.dismiss(toastId);
                }}
                className={`absolute top-2.5 right-2.5 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>
            )}
            {/* Render buttons if provided */}
            <div className="flex gap-2 pr-2">
              {buttons?.map(function (btn, index) {
                return (
                  <Button
                    variant="outline"
                    size="32"
                    className={`${variant === "default" ? "border-stroke!" : "border-white!"} text-sm font-semibold`}
                    key={index}
                    onClick={() => {
                      btn.onClick(toastId);
                      if (btn.dismiss) {
                        toast.dismiss(toastId);
                      }
                    }}
                  >
                    {btn.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>,
    {
      duration,
    },
  );
  return null;
};
// Define the props for the Toaster component
type ToasterProps = React.ComponentProps<typeof Sonner> & {
  bgColor?: string | null;
};
// Define the styles for the toaster using `class-variance-authority`
const toastClass = cva("group !p-0 toast w-96 group-[.toaster]:text-fg1", {
  variants: {
    bgColor: {
      default: "group-[.toaster]:!bg-bg1 group-[.toaster]:!border-stroke",
      success: "group-[.toaster]:!bg-success group-[.toaster]:!border-none",
      error: "group-[.toaster]:!bg-error group-[.toaster]:!border-none",
      warning: "group-[.toaster]:!bg-warning group-[.toaster]:!border-none",
      information:
        "group-[.toaster]:!bg-information group-[.toaster]:!border-none",
    },
    position: {
      bottom:
        "group-[.toaster]:!shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.1),0_-10px_10px_-5px_rgba(0,0,0,0.04)]",
      top: "group-[.toaster]:!shadow-[0_10px_10px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]",
    },
  },
  defaultVariants: {
    bgColor: "default",
    position: "bottom",
  },
});
// Define the type for the toaster variant
type VariantToasterType = VariantProps<typeof toastClass>["bgColor"];
// The Toaster component
export const Toaster = function ({
  bgColor = "default",
  ...props
}: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: toastClass({
            bgColor: bgColor as VariantToasterType,
            position: props.position?.charAt(0) === "b" ? "bottom" : "top",
          }),
        },
      }}
      {...props}
    />
  );
};
export default Sonners;
