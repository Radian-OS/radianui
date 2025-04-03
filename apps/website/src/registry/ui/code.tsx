"use client";

import { useEffect, useState } from "react";
import { Check, Clipboard } from "lucide-react";
import {
  BundledLanguage,
  BundledTheme,
  createHighlighter,
} from "shiki/bundle/web";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type CodeAreaProps = {
  theme?: BundledTheme;
  code: string;
  language: BundledLanguage;
  className?: string;
  showLineNumbers?: boolean;
  copiable?: boolean;
  pkg?: string[];
  tabs?: boolean;
};

const DEFAULT_THEME = "github-dark-default";

function CodeArea({
  code,
  theme = DEFAULT_THEME,
  language,
  className,
  showLineNumbers = false,
  copiable = true,
}: CodeAreaProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#0d1117");
  const [lineNumberColor, setLineNumberColor] = useState<string>("#808080");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const highlightCode = async () => {
      const highlighter = await createHighlighter({
        themes: [theme as BundledTheme],
        langs: [language as BundledLanguage],
      });
      const selectedTheme = highlighter.getTheme(theme);
      const bg = selectedTheme?.bg ?? "#0d1117";
      const lineColor =
        selectedTheme?.colors?.["terminal.foreground"] ?? "#808080";

      setBackgroundColor(bg);
      setLineNumberColor(lineColor);

      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme,
      });

      setHighlightedCode(html);
    };

    highlightCode();
  }, [code, language, theme]);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const lines = code.split("\n");

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "group box-border overflow-auto rounded-xl px-5 py-4 text-sm",
          className,
        )}
        style={{ backgroundColor }}
      >
        <div className="flex h-full">
          {showLineNumbers && (
            <div className="w-12 flex-none">
              {lines.map((_, i) => (
                <div
                  key={i}
                  className="text-left select-none"
                  style={{ color: lineNumberColor }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <code
            className="grow"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
        {copiable && (
          <Button
            onClick={handleCopy}
            className="absolute top-3 right-3 rounded-md bg-transparent p-1.5 text-white! hover:bg-[#ffffff1a]"
            aria-label="copy button"
            size="32"
            variant="neutral-soft"
          >
            {copied ? (
              <Check className="size-4!" />
            ) : (
              <Clipboard className="size-4!" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export { CodeArea, type CodeAreaProps };
