"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type AccordionDemoType = {
  size: "sm" | "lg";
  variant: "open" | "closed";
  collapsible: boolean;
};

const AccordionDemo = ({ size, variant, collapsible }: AccordionDemoType) => {
  return (
    <Accordion
      variant={variant}
      size={size}
      {...(collapsible ? { collapsible } : {})}
    >
      <AccordionItem value="value 1">
        <AccordionTrigger>What is Radian?</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
          facere. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laboriosam fuga nobis dolorem ipsam numquam. Dolorum reiciendis vero
          veniam repellendus! Eos sint sequi commodi voluptates voluptatum magni
          illum consequatur quae doloribus.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="value 2">
        <AccordionTrigger>
          How can Radian speed up my development process?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
          facere.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="value 3">
        <AccordionTrigger>
          Is Radian suitable for developers of all skill levels?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
          facere.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionDemo;
