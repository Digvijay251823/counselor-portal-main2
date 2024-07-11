import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
const CBMAttendance = dynamic(
  () => import("@/Components/cct/AttendanceCBM/AttendanceCBM")
);

async function getAttendance() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbmattendance`);
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
    throw new Error(error.message);
  }
}

async function page() {
  try {
    const authcontent = cookies().get("AUTH")?.value;
    const authparsed = authcontent && JSON.parse(authcontent);

    if (!authparsed) {
      throw new Error("Sign in to access the resource");
    }
    const response = await getAttendance();

    return (
      <div>
        <CBMAttendance response={response?.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
