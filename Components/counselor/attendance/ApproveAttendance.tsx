import { useGlobalState } from "@/Components/context/state";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

function ApproveAttendance({ item }: { item: Attendance }) {
  const [isApproved, setIsApproved] = useState(item?.approved);
  const { state, dispatch } = useGlobalState();
  async function handleApprove() {
    try {
      const response = await fetch(
        `/api/counselee/approveattendance/${item.id}`
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
            <div className="bg-purple-600 text-white px-3 py-1 rounded-lg flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              APPROVED
            </div>
          ) : (
            <div
              className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
              onClick={handleApprove}
            >
              <ClockIcon className="h-5 w-5" />
              PENDING
            </div>
          )}
        </div>
      ) : (
        <p>null</p>
      )}
    </div>
  );
}

export default ApproveAttendance;
