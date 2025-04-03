import { useState } from "react";
import AccordionDemo from "@/registry/example/accordion-demo";
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

const AccordionPreview = () => {
  const [size, setSize] = useState<"sm" | "lg">("sm");
  const [variant, setVariant] = useState<"open" | "closed">("closed");
  const [collapsible, setCollapsible] = useState<boolean>(false);

  return (
    <Tabs defaultValue="preview" className="mb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownTrigger>Properties</DropdownTrigger>
            {/* Dropdown for 'type' */}
            <DropdownContent className="min-w-20">
              {/* Dropdown for 'size' */}
              <DropdownSub>
                <DropdownSubTrigger>Size</DropdownSubTrigger>
                <DropdownSubContent>
                  <DropdownGroup
                    selectionMode="single"
                    onSelectedChange={(keys) =>
                      setSize(Array.from(keys)[0] as "sm" | "lg")
                    }
                    minSelectionCount={1}
                    selectedValues={[size]}
                  >
                    <DropdownItem value="sm">Small</DropdownItem>
                    <DropdownItem value="lg">Large</DropdownItem>
                  </DropdownGroup>
                </DropdownSubContent>
              </DropdownSub>

              {/* Dropdown for 'variant' */}
              <DropdownSub>
                <DropdownSubTrigger>Variant</DropdownSubTrigger>
                <DropdownSubContent>
                  <DropdownGroup
                    selectionMode="single"
                    onSelectedChange={(keys) =>
                      setVariant(Array.from(keys)[0] as "open" | "closed")
                    }
                    minSelectionCount={1}
                    selectedValues={[variant]}
                  >
                    <DropdownItem value="open">Open</DropdownItem>
                    <DropdownItem value="closed">Closed</DropdownItem>
                  </DropdownGroup>
                </DropdownSubContent>
              </DropdownSub>

              {/* Dropdown for 'collapsible' */}
              <DropdownSub>
                <DropdownSubTrigger>Collapsible</DropdownSubTrigger>
                <DropdownSubContent>
                  <DropdownGroup
                    selectionMode="single"
                    onSelectedChange={(keys) =>
                      setCollapsible(Array.from(keys)[0] === "true")
                    }
                    minSelectionCount={1}
                    selectedValues={[collapsible.toString()]}
                  >
                    <DropdownItem value="true">True</DropdownItem>
                    <DropdownItem value="false">False</DropdownItem>
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
        <div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
          <AccordionDemo
            size={size}
            variant={variant}
            collapsible={collapsible}
          />
        </div>
      </TabsContent>

      <TabsContent value="code">
        <CodeArea
          language="tsx"
          showLineNumbers
          className="h-[420px]"
          code={`<Accordion variant="${variant}" size="${size}" ${collapsible ? "collapsible" : ""}>
	<AccordionItem value="value 1">
		<AccordionTrigger>What is Radian?</AccordionTrigger>
		<AccordionContent>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Laboriosam fuga nobis dolorem ipsam numquam. Dolorum reiciendis vero veniam repellendus! Eos
			sint sequi commodi voluptates voluptatum magni illum consequatur quae doloribus.
		</AccordionContent>
	</AccordionItem>

	<AccordionItem value="value 2">
		<AccordionTrigger>How can Radian speed up my development process?</AccordionTrigger>
		<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
	</AccordionItem>

	<AccordionItem value="value 3">
		<AccordionTrigger>Is Radian suitable for developers of all skill levels?</AccordionTrigger>
		<AccordionContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.</AccordionContent>
	</AccordionItem>
</Accordion>`}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AccordionPreview;
