import React, {
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cva } from "class-variance-authority";
import ReactDOM from "react-dom";

type TooltipProps = {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactElement;
  variant?: "default" | "arrow";
};

function Tooltip({
  content,
  position = "top",
  children,
  variant = "default",
}: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLElement | null>(null);
  const hoverStartRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  // Updates the tooltip position based on the target element's position
  const updateTooltipPosition = useCallback(
    function () {
      if (childRef.current && tooltipRef.current) {
        const childRect = childRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let top = childRect.top - tooltipRect.height - 6;
        let left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;

        if (position === "bottom") {
          top = childRect.bottom + 6;
        } else if (position === "left") {
          top = childRect.top + childRect.height / 2 - tooltipRect.height / 2;
          left = childRect.left - tooltipRect.width - 6;
        } else if (position === "right") {
          top = childRect.top + childRect.height / 2 - tooltipRect.height / 2;
          left = childRect.right + 6;
        }
        setCoords(function (prevCoords) {
          // Only update state if the position actually changed
          if (prevCoords.top !== top || prevCoords.left !== left) {
            return { top, left };
          }
          return prevCoords;
        });
      }
    },
    [position],
  );

  // Handles mouse enter event, 700ms delays tooltip appearance
  function handleMouseEnter() {
    hoverStartRef.current = Date.now();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(function () {
      if (Date.now() - hoverStartRef.current >= 100) {
        setShowTooltip(true);
      }
    }, 700);
  }
  // Hides tooltip on mouse leave
  function handleMouseLeave() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  }
  // Shows tooltip on focus (for keyboard users)
  function handleFocus() {
    setShowTooltip(true);
    updateTooltipPosition();
  }
  // Hides tooltip when losing focus
  function handleBlur() {
    setShowTooltip(false);
  }
  // Closes tooltip when the Escape key is pressed
  useEffect(
    function () {
      if (!showTooltip) return;

      const handleKeyDown = function (event: KeyboardEvent) {
        if (event.key === "Escape") {
          setShowTooltip(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [showTooltip],
  );
  // Recalculates tooltip position when window resizes or scrolls
  useEffect(
    function () {
      if (!showTooltip) return;
      updateTooltipPosition();
      function handleUpdate() {
        requestAnimationFrame(updateTooltipPosition);
      }

      window.addEventListener("scroll", handleUpdate, { passive: true });
      window.addEventListener("resize", handleUpdate, { passive: true });

      if (childRef.current) {
        observerRef.current = new MutationObserver(updateTooltipPosition);
        observerRef.current.observe(childRef.current, { attributes: true });
      }

      return function () {
        window.removeEventListener("scroll", handleUpdate);
        window.removeEventListener("resize", handleUpdate);
        if (observerRef.current) observerRef.current.disconnect();
      };
    },
    [showTooltip, updateTooltipPosition],
  );

  // Tooltip position variants
  const getArrowPositionClasses = cva("absolute", {
    variants: {
      position: {
        top: "left-1/2 bottom-[0.2rem] transform -translate-x-1/2 translate-y-full",
        bottom:
          "left-1/2 top-[0.2rem] transform -translate-x-1/2 -translate-y-full rotate-180",
        left: "top-1/2 right-[0.4rem] -rotate-90 transform -translate-y-1/2 translate-x-full",
        right:
          "top-1/2 left-[0.35rem] transform -translate-y-1/2 -translate-x-full rotate-90",
      },
    },
    defaultVariants: {
      position: "top",
    },
  });

  const tooltip = showTooltip
    ? ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          aria-live="polite"
          className="fixed z-50 flex h-6 w-max items-center justify-center rounded-md bg-black px-2 text-xs font-semibold text-white"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {content}
          {variant === "arrow" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="8"
              viewBox="0 0 15 8"
              fill="none"
              className={getArrowPositionClasses({ position })}
            >
              <path
                d="M8.48529 6.58579C7.70424 7.36684 6.43791 7.36684 5.65686 6.58579L7.15256e-06 0.928933L7.07107 0.928932L14.1421 0.928932L8.48529 6.58579Z"
                className="fill-black"
              />
            </svg>
          )}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {React.cloneElement(children, {
        ref: function (node: HTMLElement | null) {
          childRef.current = node;
          if (typeof children.type === "string") return;

          const childWithRef = children as React.ReactElement & {
            ref?: React.Ref<HTMLElement>;
          };
          if (typeof childWithRef.ref === "function") childWithRef.ref(node);
          else if (childWithRef.ref)
            (childWithRef.ref as MutableRefObject<HTMLElement | null>).current =
              node;
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        "aria-describedby": showTooltip ? "tooltip-content" : undefined,
        tabIndex: 0,
      })}

      {tooltip}
    </>
  );
}

export default Tooltip;
