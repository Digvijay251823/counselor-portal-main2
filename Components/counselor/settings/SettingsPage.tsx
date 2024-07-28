"use client";

import { useGlobalState } from "@/Components/context/state";
import { useState } from "react";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";

export default function SettingsPageAutoApproval({
  isAutoApproveOn,
}: {
  isAutoApproveOn: boolean;
}) {
  const { state, dispatch } = useGlobalState();
  const [isOpen, setIsOpen] = useState(
    isAutoApproveOn ? isAutoApproveOn : false
  );

  async function handleAutoApprove(value: boolean) {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      setIsOpen(value);
      const response = await fetch(`/api/autoapprove`, {
        method: "POST",
        headers,
      });
      if (response.ok) {
        const responseData = await response.json();
        setIsOpen(!isOpen);
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "SUCCESS" },
        });
      } else {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "SUCCESS" },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: error.message, type: "ERRROR" },
      });
    }
  }
  return (
    <div>
      <div
        className={`md:w-[400px] w-[90vw] border p-8 flex flex-col gap-5 rounded-[30px] shadow-lg ${
          state.theme.theme === "LIGHT"
            ? "border-stone-300 bg-stone-50"
            : "border-stone-700 bg-stone-900"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-[600] text-xl">Attendance Auto Approval </h1>
          {!isOpen ? (
            <button
              className="text-gray-500"
              onClick={() => handleAutoApprove(true)}
            >
              <BsToggle2Off className="h-8 w-8" />
            </button>
          ) : (
            <button
              className="text-green-500"
              onClick={() => handleAutoApprove(false)}
            >
              <BsToggle2On className="h-8 w-8" />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          The AutoApprove feature simplifies and streamlines the attendance
          management process by automatically approving attendance entries. This
          intelligent system eliminates the need for manual intervention,
          ensuring timely approvals.
        </p>
      </div>
    </div>
  );
}
