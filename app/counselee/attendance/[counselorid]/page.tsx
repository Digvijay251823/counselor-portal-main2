import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
const CounseleeAttendance = dynamic(
  () => import("@/Components/counselee/attendance/CounseleeAttendance")
);

async function getScheduledSessions(counselorid: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/session/counselor/not-expired/${counselorid}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return null;
      }
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function page({ params }: { params: { counselorid: string } }) {
  try {
    const response = await getScheduledSessions(params.counselorid);
    if (!response) {
      return <NotExistsResource message="Counselor Might Not Exist" />;
    }
    if (response.content.length === 0) {
      return <NotExistsResource message="NO Sessions To Show" />;
    }
    return (
      <div className="w-full">
        <CounseleeAttendance response={response?.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
