import { SERVER_URL } from "@/Components/config/config";
import { unstable_noStore } from "next/cache";
import React from "react";
import ErrorPage from "@/Components/utils/ErrorPage";
import MarkCBMAttendance from "@/Components/cct/MarkAttendance/MarkAttendance";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import ErrorComponent from "@/Components/utils/ErrorPage";
import data from "@/Counselors.json";

async function getScheduledSessions(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings/id/${id}`);
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
    throw error;
  }
}

async function page({
  params,
  searchParams,
}: {
  params: { meetingid: string };
  searchParams: { query: string | number };
}) {
  try {
    const response = await getScheduledSessions(params.meetingid);
    if (!response) {
      return <NotExistsResource message="Session Doesn not exist" />;
    }
    const results = data.filter((item: any) => {
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
        <MarkCBMAttendance
          response={response.content}
          data={results.length > 0 ? results : data}
        />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
