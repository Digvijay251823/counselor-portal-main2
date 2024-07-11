import LogoMain from "@/Components/utils/icons/LogoMain";
import dynamic from "next/dynamic";
import React from "react";
const Scanner = dynamic(() => import("@/Components/cct/scan/Scanner"));

function page() {
  return (
    <div>
      <Scanner />
    </div>
  );
}

export default page;
