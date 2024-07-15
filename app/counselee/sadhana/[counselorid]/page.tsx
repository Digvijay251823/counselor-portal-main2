import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
const SadhanaForm = dynamic(
  () => import("@/Components/counselee/Sadhana/SadhanaForm")
);

import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";

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
async function getSadhana(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/sadhana/counselor/${id}`);
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

async function page({
  params,
  searchParams,
}: {
  params: { counselorid: string };
  searchParams: { query: string };
}) {
  try {
    const response = await getSadhana(params.counselorid);
    const counselees = await getCounselees(params.counselorid);
    if (!response) {
      return <NotExistsResource message="Sadhana Form Not Configured Yet" />;
    }

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
        <SadhanaForm
          counselorId={params.counselorid}
          sadhanaForm={response?.content}
          counseleeList={results}
          currentCounselor={counselees.currentCounselor}
        />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
