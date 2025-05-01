import { CodeArea } from "../ui/code"

export default async function CodeAreaExample() {
  const codeExample = `import {Accordion, AccordionItem} from "@radian-os/react";
export default function App() {
  const defaultContent =
    "I am Ashmit3"
  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}`

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-3 py-12">
      <CodeArea showLineNumbers theme="one-dark-pro" code={codeExample} language="tsx" />
      <CodeArea showLineNumbers theme="github-dark-high-contrast" copiable={false} code={codeExample} language="tsx" />
      <CodeArea showLineNumbers code="npm radianos@beta initttt" language="bash" />
      <CodeArea code="npm radianos@beta initttt" language="shell" />
      <CodeArea theme="github-light" language="tsx" copiable={false} showLineNumbers code={codeExample} />
    </div>
  )
}
