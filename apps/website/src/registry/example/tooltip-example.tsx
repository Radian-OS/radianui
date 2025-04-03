"use client";

import { useState } from "react";
import { Button } from "@/registry/ui/button";
import Tooltip from "@/registry/ui/tooltip";

type TooltipPosition = "top" | "left" | "right" | "bottom";
type TooltipVariant = "default" | "arrow";

const TooltipExample = () => {
  const [selectedVariant, setSelectedVariant] =
    useState<TooltipPosition>("top");
  const [showArrow, setShowArrow] = useState<TooltipVariant>("default");

  const tooltipPositions: TooltipPosition[] = [
    "top",
    "left",
    "right",
    "bottom",
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <label className="flex flex-col gap-2">
          <span>Select Tooltip Position:</span>
          <select
            value={selectedVariant}
            onChange={(e) =>
              setSelectedVariant(e.target.value as TooltipPosition)
            }
            className="w-max rounded border p-2"
          >
            {tooltipPositions.map((position) => (
              <option key={position} value={position}>
                {position.charAt(0).toUpperCase() + position.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span>Show Arrow:</span>
          <select
            value={showArrow}
            onChange={(e) => setShowArrow(e.target.value as TooltipVariant)}
            className="w-max rounded border p-2"
          >
            <option value="default">default</option>
            <option value="arrow">arrow</option>
          </select>
        </label>
      </div>

      <Tooltip
        content="I am a tooltip"
        position={selectedVariant}
        variant={showArrow}
      >
        <Button className="w-max" variant="outline">
          {`Position: ${selectedVariant}, Arrow: ${showArrow}`}
        </Button>
      </Tooltip>
    </div>
  );
};

export default TooltipExample;
