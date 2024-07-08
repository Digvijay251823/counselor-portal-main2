import { SERVER_URL } from "@/Components/config/config";
import CounseleePage from "@/Components/counselor/counselee/CounseleePage";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

async function getCounselees(counselorid: string) {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_URL}/Counselor/counselees/${counselorid}`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

async function page() {
  try {
    const authcontent = cookies().get("AUTH")?.value;
    const authparsed = authcontent && JSON.parse(authcontent);
    if (!authparsed) {
      return (
        <ErrorComponent message="Pleas Authenticate to access the resource" />
      );
    }
    const response = await getCounselees(authparsed.counselor.id);
    if (!response || response.content.length === 0) {
      return <NotExistsResource message="No counselee to show" />;
    }
    return (
      <div className="w-screen justify-center">
        <CounseleePage data={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
