import Scanner from "@/Components/counselor/Scanner";
import { cookies } from "next/headers";
import React from "react";

function page() {
  const authcontent = cookies().get("AUTH")?.value;
  const authparsed = authcontent && JSON.parse(authcontent);

  return (
    <div className="w-screen justify-center">
      <Scanner response={authparsed && authparsed.counselor} />
    </div>
  );
}

export default page;
