import { SERVER_URL } from "@/Components/config/config";
const SadhanaPage = dynamic(
  () => import("@/Components/counselor/sadhana/SadhanaPage")
);
const ErrorComponent = dynamic(() => import("@/Components/utils/ErrorPage"));
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";

async function getSadhanaEntries() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/counselee-sadhana`);
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

async function page() {
  try {
    const response = await getSadhanaEntries();

    return (
      <div className="w-screen justify-center">
        <SadhanaPage response={response?.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
