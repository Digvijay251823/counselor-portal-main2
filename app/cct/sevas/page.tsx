import CbmSevas from "@/Components/cct/CBMSevas/CBMSevas";
import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import React from "react";

async function cbmSevas(queryString: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-seva?${queryString}`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
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
    if (!searchParams.sort) {
      searchParams.sortField = "id";
      searchParams.sortOrder = "desc";
    }
    const queryString = new URLSearchParams(searchParams).toString();
    const responseData = await cbmSevas(queryString);
    return (
      <div>
        <CbmSevas response={responseData.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
