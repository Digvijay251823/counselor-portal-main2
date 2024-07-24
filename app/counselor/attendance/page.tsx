import { SERVER_URL } from "@/Components/config/config";
import Pagination from "@/Components/utils/Pagination";
const AttendancePage = dynamic(
  () => import("@/Components/counselor/attendance/AttendancePage")
);
const ErrorComponent = dynamic(() => import("@/Components/utils/ErrorPage"));

import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
async function getAttendance(id: string, queryString: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/counselor/${id}?${queryString}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  try {
    const queryString = new URLSearchParams(searchParams).toString();
    const authcontent = cookies().get("AUTH")?.value;
    const authparsed = authcontent && JSON.parse(authcontent);
    if (!authparsed) {
      throw new Error("Sign in to access the resource");
    }
    const response = await getAttendance(authparsed?.counselor.id, queryString);

    return (
      <div className="flex flex-col items-center">
        <AttendancePage
          response={response.content}
          pendingRecordsCount={response.pendingRecordsCount}
          approvedRecordsCount={response.approvedRecordsCount}
        />
        <Pagination totalElements={response.total} skipped={response.skip} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
