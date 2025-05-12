import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "./input";

type CurrencyInputProps = {
  currency?: string;
};

function CurrencyInput({ currency = "usd", ...props }: InputProps & CurrencyInputProps) {
  const [rawValue, setRawValue] = useState<string>(props.value as string);
  const [currencySymbol, setCurrencySymbol] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRawValue(props.value as string);
    // Dynamically get the currency symbol
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    });

    const symbol = formatter.formatToParts(12345)[0].value; // Get the symbol by formatting a number
    setCurrencySymbol(symbol);  // Save the symbol to state
  }, [props.value, currency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      if (props.value === "") {
        setRawValue("");
        inputRef.current.value = "";
      } else {
        const numValue = parseFloat(props.value as string);
        setRawValue(props.value as string);
        const formattedValue = formatCurrency(numValue);
        inputRef.current.value = formattedValue;
      }
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.value = rawValue;
    }
  };

  // Display the dynamic currency symbol
  const currencyLead = (
    <div className="flex h-5 w-5 items-center justify-center">
      <span
        className={cn("text-text-tertiary text-sm uppercase", {
          "cursor-not-allowed": props.disabled,
        })}
      >
        {currencySymbol}
      </span>
    </div>
  );

  const currencyTrail = (
    <div className="flex h-5 w-5 items-center justify-center">
      <span
        className={cn("text-text-tertiary text-sm uppercase", {
          "cursor-not-allowed": props.disabled,
        })}
      >
        {currency}
      </span>
    </div>
  );

  return (
    <Input
      className={cn("text-text-tertiary")}
      ref={inputRef}
      lead={currencyLead}
      trial={currencyTrail}
      onKeyUp={handleKeyPress}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...props}
    />
  );
}

export { CurrencyInput };
