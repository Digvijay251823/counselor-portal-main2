import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import Pagination from "@/Components/utils/Pagination";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
const Counselees = dynamic(
  () => import("@/Components/cct/Counselees/CounseleesPage")
);

async function getCounselee(queryString: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/counselee?${queryString}`);
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
    const response = await getCounselee(queryString);

    return (
      <div className="flex flex-col items-center mt-20">
        <Counselees response={response.content} />
        <Pagination totalElements={response.total} skipped={response.skipped} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
