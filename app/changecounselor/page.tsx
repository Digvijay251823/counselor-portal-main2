"use client";
import React from "react";
import ErrorComponent from "@/Components/utils/ErrorPage";
import data from "@/Counselors.json";
import ChangeForm from "@/Components/counselee/ChangeForm";

async function page() {
  try {
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
