import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
const MeetingsPage = dynamic(
  () => import("@/Components/cct/CBMMeetings/MeetingsPage")
);

async function getCBMMeetings(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings`);
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
async function page() {
  try {
    const auth = cookies().get("AUTH")?.value;
    const parsedauth = auth && JSON.parse(auth);
    if (!parsedauth) {
      return <ErrorComponent message="please authenticate to access" />;
    }
    const response = await getCBMMeetings(parsedauth?.counselor?.id);

    return (
      <div>
        <MeetingsPage response={response?.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
