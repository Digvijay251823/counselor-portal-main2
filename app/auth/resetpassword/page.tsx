import ResetPassword from "@/Components/auth/resetpassword/ResetPassword";
import React from "react";

function page({ searchParams }: { searchParams: { resettoken: string } }) {
  return (
    <div className="w-full">
      <ResetPassword resettoken={searchParams.resettoken} />
    </div>
  );
}

export default page;
