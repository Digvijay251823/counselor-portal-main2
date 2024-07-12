import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
const Registeration = dynamic(
  () => import("@/Components/counselee/registeration/Registeration")
);

async function getCounselee(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/Counselor/counselees/${id}`);
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
  searchParams,
}: {
  params: { counselorid: string };
  searchParams: { query: string };
}) {
  try {
    const counselorList = await getCounselor(counselorid);
    const counseleeList = await getCounselee(counselorid);
    const results = counseleeList.content.filter((item: any) => {
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
        <Registeration counselorList={counselorList} counseleeList={results} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
