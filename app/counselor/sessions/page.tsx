import { SERVER_URL } from "@/Components/config/config";
import Pagination from "@/Components/utils/Pagination";
const SessionPage = dynamic(
  () => import("@/Components/counselor/session/SessionPage")
);
const ErrorComponent = dynamic(() => import("@/Components/utils/ErrorPage"));
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";

async function getScheduledSessions(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/session/counselor/${id}`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw error;
  }
}

async function page() {
  try {
    const auth = cookies().get("AUTH")?.value;
    const parsedauth = auth && JSON.parse(auth);
    if (!parsedauth) {
      return <ErrorComponent message="please authenticate to access" />;
    }
    const response = await getScheduledSessions(parsedauth?.counselor?.id);
    return (
      <div className="flex flex-col items-center">
        <SessionPage response={response.content} />
        <Pagination totalElements={response.total} skipped={response.skiped} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
