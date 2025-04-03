import { Divider } from "@/registry/ui/divider";

const DividerExample = () => {
  return (
    <div className="p-10">
      {/* Horizontal Divider */}
      <div className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Horizontal</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          tempore quasi accusantium aspernatur, fugit nam quia culpa quisquam
          reiciendis quaerat animi iste quae. Reprehenderit impedit totam rem
          repellat suscipit atque.
        </p>
        <Divider orientation="vertical" />
        <h2 className="mb-4 text-lg font-semibold">Horizontal</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          tempore quasi accusantium aspernatur, fugit nam quia culpa quisquam
          reiciendis quaerat animi iste quae. Reprehenderit impedit totam rem
          repellat suscipit atque.
        </p>
        <Divider orientation="horizontal" />
      </div>

      {/* Vertical Divider */}
      <div className="flex h-[200px] items-center justify-center">
        <Divider orientation="vertical" />
        <h2 className="mb-4 text-lg font-semibold">Vertical</h2>
        <Divider orientation="vertical" spacing="12" />
      </div>
    </div>
  );
};

export default DividerExample;
