import React from "react";
import data from "@/Counselors.json";
import dynamic from "next/dynamic";
const Signin = dynamic(() => import("@/Components/auth/signin/SignIn2"));

function page({ searchParams }: { searchParams: { query: string } }) {
  const results = data.filter((item: any) => {
    for (const key in item) {
      const value = item[key];
      if (typeof value === "string") {
        if (
          value
            .toLowerCase()
            .includes(searchParams.query?.toString().toLowerCase())
        ) {
          return true;
        }
      } else if (typeof value === "number") {
        if (
          value
            .toString()
            .toLowerCase()
            .includes(searchParams.query?.toString().toLowerCase())
        ) {
          return true;
        }
      }
    }
  });
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Signin response={results} />
    </div>
  );
}

export default page;
