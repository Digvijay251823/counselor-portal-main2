import { useGlobalState } from "@/Components/context/state";
import WarningPage from "@/Components/utils/WarningPageApproveAttendance";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

function ApproveAttendance({ item }: { item: Attendance }) {
  const [isApproved, setIsApproved] = useState(item?.approved);
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useGlobalState();
  async function onClose() {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(
        `/api/counselor/approveattendance/${item.id}`,
        { method: "POST", headers: headers }
      );

      if (response.ok) {
        const responseData = await response.json();
        setIsApproved(true);
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
  }

  return (
    <div>
      {item?.scheduledSession?.startTime ? (
        <div>
          {isApproved ? (
            <div className="border px-3 py-1.5 rounded flex items-center gap-2 text-green-500">
              <CheckCircleIcon className="h-5 w-5" />
              APPROVED
            </div>
          ) : (
            <div
              className="text-white px-3 py-1.5 rounded flex items-center gap-2 bg-orange-500 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <ClockIcon className="h-5 w-5" />
              PENDING
            </div>
          )}
        </div>
      ) : (
        <p>null</p>
      )}
      <WarningPage isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default ApproveAttendance;
