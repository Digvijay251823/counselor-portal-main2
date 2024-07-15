import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
const CounseleeActivities = dynamic(
  () => import("@/Components/counselee/CounseleeActivities")
);

async function getCounselees(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/Counselor/dropdown/counselees/${id}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

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

async function page({
  params,
  searchParams,
}: {
  params: { counselorid: string };
  searchParams: { query: string };
}) {
  try {
    const response = await getActivities();
    const counselees = await getCounselees(params.counselorid);

    const results = counselees.content.filter((item: any) => {
      for (const key in item) {
        const value = item[key];
        if (typeof value === "string") {
          if (
            value
              .toLowerCase()
              .includes(searchParams.query?.toString().toLowerCase())
          ) {
            return true;
          }
        } else if (typeof value === "number") {
          if (
            value
              .toString()
              .toLowerCase()
              .includes(searchParams.query?.toString().toLowerCase())
          ) {
            return true;
          }
        }
      }
      return false;
    });
    return (
      <div className="w-full">
        <CounseleeActivities
          activities={response.content}
          counseleeList={results}
          currentCounselor={counselees.currentCounselor}
        />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
