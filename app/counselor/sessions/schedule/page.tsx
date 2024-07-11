import { SERVER_URL } from "@/Components/config/config";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
const ScheduleSession = dynamic(
  () => import("@/Components/counselor/session/ScheduleSession")
);

async function getCourses() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/course`);
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
  const response = await getCourses();
  const auth = cookies().get("AUTH")?.value;
  const parsedauth = auth && JSON.parse(auth);
  if (!parsedauth) {
    throw new Error("please authenticate to access");
  }
  return (
    <div className="w-full">
      <ScheduleSession
        response={response?.content}
        counselorId={parsedauth?.counselor?.id}
      />
    </div>
  );
}

export default page;
