import dynamic from "next/dynamic";

const MarkCCTSeva = dynamic(() => import("@/Components/cct/MarkSeva/MarkSeva"));

export default async function page() {
  return (
    <div className="w-full">
      <MarkCCTSeva />
    </div>
  );
}
