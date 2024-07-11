import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
const Counselees = dynamic(
  () => import("@/Components/cct/Counselees/CounseleesPage")
);

async function getCounselee() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/counselee`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData);
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

async function page() {
  try {
    const response = await getCounselee();

    return (
      <div>
        <Counselees response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
