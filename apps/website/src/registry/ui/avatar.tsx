"use client";

import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  name: string;
  className?: string;
  size?: NonNullable<VariantProps<typeof avatarVariants>["size"]>;
  variant?: NonNullable<VariantProps<typeof avatarVariants>["variant"]>;
  onlineStatus?: NonNullable<
    VariantProps<typeof onlineIndicatorVariants>["status"]
  >;
};

type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children:
    | React.ReactElement<typeof Avatar>
    | React.ReactElement<typeof Avatar>[];
  size?: NonNullable<VariantProps<typeof avatarGroupVariants>["size"]>;
  max?: number;
  className?: string;
};

const avatarVariants = cva(
  "flex items-center justify-center shrink-0 overflow-hidden font-semibold text-fg2",
  {
    variants: {
      size: {
        "20": "size-5 text-[0.5rem]",
        "24": "size-6 text-[0.625rem]",
        "32": "size-8 text-xs",
        "36": "size-9 text-xs",
        "40": "size-10 text-sm",
        "48": "size-12 text-base",
        "64": "size-16 text-xl",
        "80": "size-20 text-2xl",
        "120": "size-30 text-[2rem]",
      },
      variant: {
        circle: "rounded-full",
        square: "",
      },
    },
    compoundVariants: [
      { size: "20", variant: "square", className: "rounded-md" },
      { size: "24", variant: "square", className: "rounded-md" },
      { size: "32", variant: "square", className: "rounded-lg" },
      { size: "36", variant: "square", className: "rounded-lg" },
      { size: "40", variant: "square", className: "rounded-xl" },
      { size: "48", variant: "square", className: "rounded-xl" },
      { size: "64", variant: "square", className: "rounded-2xl" },
      { size: "80", variant: "square", className: "rounded-[1.25rem]" },
      { size: "120", variant: "square", className: "rounded-3xl" },
    ],
    defaultVariants: {
      size: "40",
      variant: "circle",
    },
  },
);

const onlineIndicatorVariants = cva(
  "absolute z-20 border-bg1 box-content rounded-full",
  {
    variants: {
      size: {
        "20": "size-1 border-2 -bottom-0.5 -right-0.5",
        "24": "size-1.25 border-2 -bottom-0.5 -right-0.5",
        "32": "size-2 border-4 -bottom-1 -right-1",
        "36": "size-2 border-4 -bottom-1 -right-1",
        "40": "size-2.5 border-4 -bottom-1 -right-1",
        "48": "size-2.5 border-4 -bottom-1 -right-1",
        "64": "size-3.5 border-6 -bottom-1.5 -right-1.5",
        "80": "size-4 border-8 -bottom-2 -right-2",
        "120": "size-6 border-12 -bottom-3 -right-3",
      },
      status: {
        true: "bg-success",
        false: "bg-bg4",
      },
    },
    defaultVariants: {
      size: "40",
      status: false,
    },
  },
);

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    size: {
      "20": "-space-x-1.5",
      "24": "-space-x-2",
      "32": "-space-x-2.5",
    },
  },
  defaultVariants: {
    size: "32",
  },
});

function getInitials(name: string) {
  if (!name) return "";
  if (name.startsWith("+")) return name;
  const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
}

function Avatar({
  src,
  name,
  className,
  size = "40",
  variant = "circle",
  onlineStatus,
}: AvatarProps) {
  const [imageStatus, setImageStatus] = React.useState<
    "loading" | "loaded" | "error"
  >("loading");

  React.useEffect(() => {
    if (!src) {
      setImageStatus("error");
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setImageStatus("loaded");
    img.onerror = () => setImageStatus("error");

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div data-slot="avatar" className="relative">
      <div
        className={cn(avatarVariants({ size, variant }), "bg-bg3", className)}
      >
        {src && imageStatus === "loaded" && (
          <img src={src} alt={name} className="size-full object-cover" />
        )}

        {imageStatus !== "loaded" && (
          <span className="flex size-full items-center justify-center">
            {name ? (
              // Show initials if name is provided
              getInitials(name)
            ) : (
              // Show fallback icon if no name
              <UserIcon className={`size-${size}`} />
            )}
          </span>
        )}
      </div>

      {/* Only render indicator if onlineStatus is explicitly set */}
      {onlineStatus !== undefined && (
        <span
          className={onlineIndicatorVariants({
            size,
            status: onlineStatus,
          })}
        />
      )}
    </div>
  );
}

Avatar.displayName = "Avatar";

function AvatarGroup({
  children,
  size = "24",
  max = 4,
  className,
  ...props
}: AvatarGroupProps) {
  const getBorderStyles = (size: string): string | null => {
    if (size === "20") return "border-2 border-bg1";
    if (size === "24") return "border-2 border-bg1";
    if (size === "32") return "border-4 border-bg1";
    return null;
  };

  const avatarChildren = React.Children.toArray(children);

  // Calculate how many avatars to show and if we need a count
  const visibleAvatars = avatarChildren.slice(0, max);
  const remainingCount = Math.max(0, avatarChildren.length - max);
  const visibleCount = remainingCount > 99 ? "+99" : `+${remainingCount}`;

  return (
    <div
      data-slot="avatar-group"
      className={cn(avatarGroupVariants({ size }), className)}
      {...props}
    >
      {visibleAvatars.map((child, index) => (
        <div key={index}>
          {React.cloneElement(child as React.ReactElement<AvatarProps>, {
            size,
            className: cn(
              getBorderStyles(size),
              "box-content",
              (child as React.ReactElement<AvatarProps>).props.className,
            ),
          })}
        </div>
      ))}

      {/* Show remaining count if any */}
      {remainingCount > 0 && (
        <Avatar
          name={visibleCount}
          size={size}
          className={cn(
            getBorderStyles(size),
            "bg-primary box-content text-white",
          )}
        />
      )}
    </div>
  );
}

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
