import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import dynamic from "next/dynamic";
import React from "react";
const Registeration = dynamic(
  () => import("@/Components/counselee/registeration/Registeration")
);

async function getCounselor(counselorid: string) {
  try {
    const counselorList = await fetch(
      `${SERVER_URL}/Counselor/id/${counselorid}`
    );
    if (counselorList.ok) {
      const counselorData = await counselorList.json();

      return counselorData?.content;
    } else {
      const errorData = await counselorList.json();
      return errorData;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function page({
  params: { counselorid },
}: {
  params: { counselorid: string };
}) {
  try {
    const counselorList = await getCounselor(counselorid);
    return (
      <div className="w-full">
        <Registeration counselorList={counselorList} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
