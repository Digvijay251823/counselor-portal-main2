import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
const Scanner = dynamic(() => import("@/Components/counselor/Scanner"));

function page() {
  const authcontent = cookies().get("AUTH")?.value;
  const authparsed = authcontent && JSON.parse(authcontent);

  return (
    <div className="flex flex-col items-center pt-10">
      <Scanner response={authparsed && authparsed.counselor} />
    </div>
  );
}

export default page;
