import { SERVER_URL } from "@/Components/config/config";
import ActivitiesPage from "@/Components/counselor/activities/ActivitiesPage";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import { unstable_noStore } from "next/cache";
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
async function page() {
  try {
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
      <div className="w-screen justify-center">
        <ActivitiesPage response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
