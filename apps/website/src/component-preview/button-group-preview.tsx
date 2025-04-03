import { useState } from "react";
import { Button, ButtonGroup } from "@/registry/ui/button";
import { CodeArea } from "@/registry/ui/code";
import {
  Dropdown,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
} from "@/registry/ui/dropdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";

const ButtonGroupPreview = () => {
  type variants =
    | "strong"
    | "soft"
    | "outline"
    | "ghost"
    | "neutral-soft"
    | "neutral-outline";
  type sizes = "32" | "36" | "40" | "44" | "48" | "56";
  type roundness = "square" | "rounded" | "full";
  const [variant, setVariant] = useState<variants>("strong");
  const [size, setSize] = useState<sizes>("40");
  const [rounded, setRounded] = useState<roundness>("rounded");
  return (
    <Tabs defaultValue="preview" className="mb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownTrigger>Properties</DropdownTrigger>
            <DropdownContent className="min-w-20">
              <DropdownSub>
                <DropdownSubTrigger>variant</DropdownSubTrigger>
                <DropdownSubContent>
                  <DropdownGroup
                    selectionMode="single"
                    onSelectedChange={(keys) => {
                      setVariant(Array.from(keys)[0] as variants);
                    }}
                    minSelectionCount={1}
                    selectedValues={[variant]}
                  >
                    <DropdownItem value="strong">strong</DropdownItem>
                    <DropdownItem value="soft">soft</DropdownItem>
                    <DropdownItem value="outline">outline</DropdownItem>
                    <DropdownItem value="ghost">ghost</DropdownItem>
                    <DropdownItem value="neutral-soft">
                      neutral-soft
                    </DropdownItem>
                    <DropdownItem value="neutral-outline">
                      neutral-outline
                    </DropdownItem>
                  </DropdownGroup>
                </DropdownSubContent>
              </DropdownSub>

              <DropdownSub>
                <DropdownSubTrigger>size</DropdownSubTrigger>
                <DropdownSubContent>
                  <DropdownGroup
                    selectionMode="single"
                    onSelectedChange={(keys) => {
                      setSize(Array.from(keys)[0] as sizes);
                    }}
                    minSelectionCount={1}
                    selectedValues={[size]}
                  >
                    <DropdownItem value="32">32</DropdownItem>
                    <DropdownItem value="36">36</DropdownItem>
                    <DropdownItem value="40">40</DropdownItem>
                    <DropdownItem value="44">44</DropdownItem>
                    <DropdownItem value="48">48</DropdownItem>
                    <DropdownItem value="56">56</DropdownItem>
                  </DropdownGroup>
                </DropdownSubContent>
              </DropdownSub>

              <DropdownSub>
                <DropdownSubTrigger>rounded</DropdownSubTrigger>
                <DropdownSubContent>
                  <DropdownGroup
                    selectionMode="single"
                    onSelectedChange={(keys) => {
                      setRounded(Array.from(keys)[0] as roundness);
                    }}
                    minSelectionCount={1}
                    selectedValues={[rounded]}
                  >
                    <DropdownItem value="rounded">rounded</DropdownItem>
                    <DropdownItem value="square">square</DropdownItem>
                    <DropdownItem value="full">full</DropdownItem>
                  </DropdownGroup>
                </DropdownSubContent>
              </DropdownSub>
            </DropdownContent>
          </Dropdown>
        </div>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="preview">
        <div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
          <ButtonGroup rounded={rounded} variant={variant} size={size}>
            <Button>Button1</Button>
            <Button>Button2</Button>
            <Button>Button3</Button>
            <Button>Button4</Button>
          </ButtonGroup>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeArea
          language="tsx"
          showLineNumbers
          className="h-[420px]"
          code={`<ButtonGroup  rounded="${rounded}" variant="${variant}" size="${size}" >
<Button>Button1</Button>
<Button>Button2</Button>
<Button>Button3</Button>
<Button>Button4</Button>
</ButtonGroup>`}
        />
      </TabsContent>
    </Tabs>
  );
};
export default ButtonGroupPreview;
