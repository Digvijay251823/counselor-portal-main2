import { SERVER_URL } from "@/Components/config/config";
import CounseleeList from "@/Components/counselor/counselee/CounseleeList";
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
import Pageable from "../../../Components/counselor/counselee/Pageable";

async function getCounselees(counselorid: string, queryString: string) {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_URL}/Counselor/counselees/${counselorid}?${queryString}`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
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
      return (
        <ErrorComponent message="Pleas Authenticate to access the resource" />
      );
    }
    const response = await getCounselees(authparsed.counselor.id, queryString);
    if (!response) {
      return <NotExistsResource message="No counselee to show" />;
    }
    return (
      <div className="flex flex-col items-center">
        <CounseleeList counselee={response.content} />
        <Pagination totalElements={response.total} skipped={response.skiped} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
