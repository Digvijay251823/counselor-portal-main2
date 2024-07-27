import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import Pagination from "@/Components/utils/Pagination";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
const MeetingsPage = dynamic(
  () => import("@/Components/cct/CBMMeetings/MeetingsPage")
);

async function getCBMMeetings(queryString: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings?${queryString}`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return;
      }
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
    const queryString = new URLSearchParams(searchParams).toString();
    const auth = cookies().get("AUTH")?.value;
    const parsedauth = auth && JSON.parse(auth);
    if (!parsedauth) {
      return <ErrorComponent message="please authenticate to access" />;
    }
    const response = await getCBMMeetings(queryString);

    return (
      <div className="flex flex-col items-center mt-10">
        <MeetingsPage response={response?.content} />
        <Pagination totalElements={response.total} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
