import { SERVER_URL } from "@/Components/config/config";
import Registeration from "@/Components/counselee/registeration/Registeration";
import ErrorComponent from "@/Components/utils/ErrorPage";
import React from "react";

async function getCounselorList() {
  try {
    const counselorList = await fetch(`${SERVER_URL}/Counselor?limit=100`);
    if (counselorList.ok) {
      const counselorData = await counselorList.json();
      return counselorData;
    } else {
      const errorData = await counselorList.json();
      return errorData;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function page() {
  try {
    const counselorList = await getCounselorList();
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
