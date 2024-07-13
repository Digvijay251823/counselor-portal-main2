import { SERVER_URL } from "@/Components/config/config";
const ActivitiesPage = dynamic(
  () => import("@/Components/counselor/activities/ActivitiesPage")
);
const ErrorComponent = dynamic(() => import("@/Components/utils/ErrorPage"));
const NotExistsResource = dynamic(
  () => import("@/Components/utils/NotFoundComponent")
);
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
async function getActivities(counselorid: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-activity/counselor/${counselorid}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        throw new Error("Counselor might not exist");
      }
      console.log(counselorid);
      const errorData = await response.json();
      return new Error(errorData.message);
    }
  } catch (error: any) {
    return new Error(error.message || error.title);
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
    const response = await getActivities(authparsed.counselor.id);

    if (!response || response.length === 0) {
      return <NotExistsResource message="No Activities to show" />;
    }
    return (
      <div className="w-screen justify-center pt-10">
        <ActivitiesPage response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
