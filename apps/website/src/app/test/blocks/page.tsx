import { blocks } from "@/data/blocks";
import BlockPreview from "./block-viewer";

const page = () => {
  return (
    <div>
      {blocks.map((block, index) => (
        <BlockPreview
          preview={block.preview}
          code={block.code}
          title={block.title}
          category={block.category}
          key={index}
        />
      ))}
    </div>
  );
};

export default page;
