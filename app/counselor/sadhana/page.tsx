import { SERVER_URL } from "@/Components/config/config";
import Pagination from "@/Components/utils/Pagination";
const SadhanaPage = dynamic(
  () => import("@/Components/counselor/sadhana/SadhanaPage")
);
const ErrorComponent = dynamic(() => import("@/Components/utils/ErrorPage"));
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";

async function getSadhanaEntries(counselorid: string, queryString: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-sadhana/counselor/${counselorid}?${queryString}`
    );
    if (response.ok) {
      const responseData = await response.json();

      return responseData;
    } else {
      if (response.status === 404) {
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.message);
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
      return (
        <ErrorComponent message="Pleas Authenticate to access the resource" />
      );
    }
    const response = await getSadhanaEntries(
      authparsed.counselor.id,
      queryString
    );
    return (
      <div className="flex flex-col items-center pt-5">
        <SadhanaPage response={response?.content} />
        <Pagination totalElements={response.total} skipped={response.skip} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
