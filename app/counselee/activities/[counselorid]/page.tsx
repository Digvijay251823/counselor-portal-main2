import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import dynamic from "next/dynamic";
import React from "react";
const CounseleeActivities = dynamic(
  () => import("@/Components/counselee/CounseleeActivities")
);

async function getActivities() {
  try {
    const response = await fetch(`${SERVER_URL}/activity`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
}

async function page() {
  try {
    const response = await getActivities();
    return (
      <div className="w-full">
        <CounseleeActivities activities={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
