import React from "react";

type ColorVariant = {
  hex: string;
  weight: number;
};

type ColorProps = {
  variants?: ColorVariant[];
  name?: string;
  defaultWeight?: number;
};

export default function Color({
  variants,
  name,
  defaultWeight = 600,
}: ColorProps) {
  return (
    <div className="mb-5 flex min-h-24.5 flex-col items-start justify-start gap-2">
      <h1 className="body-base font-semibold">{name}</h1>
      <div className="flex w-full flex-wrap items-center justify-start gap-1.75">
        {variants?.map((variant, index) => (
          <div
            key={index}
            className={`body-xs size-16.5 rounded-lg relative flex cursor-pointer flex-col items-center justify-center transition-all duration-200`}
            style={{ background: variant.hex }}
          >
            {variant.weight === defaultWeight && (
              <div
                className="absolute top-2 right-2 h-2 w-2 rounded-full bg-white"
                style={{
                  boxShadow: index >= 5 ? "0 0 3px rgba(0,0,0,0.3)" : "none",
                }}
              />
            )}
            <span className={index >= 5 ? "text-white" : "text-black"}>
              {variant.weight}
            </span>
            <span className={index >= 5 ? "text-white" : "text-black"}>
              {variant.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
