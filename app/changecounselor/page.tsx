import React from "react";
import ErrorComponent from "@/Components/utils/ErrorPage";
import data from "@/Counselors.json";
import dynamic from "next/dynamic";
const ChangeForm = dynamic(() => import("@/Components/counselee/ChangeForm"));

// async function getCounselors() {
//   unstable_noStore();
//   const response = await fetch(`${SERVER_URL}/Counselor`);
//   try {
//     if (response.ok) {
//       const responseData = await response.json();
//       return responseData;
//     } else {
//       const errorData = await response.json();
//       throw new Error(errorData);
//     }
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

async function page() {
  try {
    // const response = await getCounselors();
    // if (response)
    return (
      <div className="w-full">
        <ChangeForm counselors={data} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
