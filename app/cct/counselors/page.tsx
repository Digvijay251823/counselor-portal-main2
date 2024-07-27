import { SERVER_URL } from "@/Components/config/config";
import Filter from "@/Components/counselor/counselee/Filter";
import ErrorComponent from "@/Components/utils/ErrorPage";
import Pagination from "@/Components/utils/Pagination";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
const CounselorPage = dynamic(
  () => import("@/Components/cct/counselor/CounselorPage")
);

async function getCounselors(queryStr: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/Counselor?${queryStr}`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw errorData.message;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  try {
    const queryString = new URLSearchParams(searchParams).toString();
    const response = await getCounselors(queryString);
    return (
      <div className="flex flex-col items-center mt-20">
        <CounselorPage data={response.content} />
        <Pagination totalElements={response.total} skipped={response.skiped} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
