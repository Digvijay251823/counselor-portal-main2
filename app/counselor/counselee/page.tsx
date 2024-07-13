import { SERVER_URL } from "@/Components/config/config";
import Pagination from "@/Components/utils/Pagination";
const CounseleePage = dynamic(
  () => import("@/Components/counselor/counselee/CounseleePage")
);
const ErrorComponent = dynamic(() => import("@/Components/utils/ErrorPage"));
const NotExistsResource = dynamic(
  () => import("@/Components/utils/NotFoundComponent")
);
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
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
      <div className="w-screen justify-center md:px-10 px-5 mt-10">
        <CounseleePage data={response.content} />
        <Pagination totalElements={response.totalElements} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
