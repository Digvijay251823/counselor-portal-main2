"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import ApproveAttendance from "./ApproveAttendance";
import AutoApprove from "./AutoApprove";
import { useRouter, useSearchParams } from "next/navigation";

function AttendancePage({
  pendingRecordsCount,
  response,
  approvedRecordsCount,
}: {
  response: Attendance[];
  pendingRecordsCount: number;
  approvedRecordsCount: number;
}) {
  const { state } = useGlobalState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ApprovedState, setApprovedState] = useState<boolean>();

  useEffect(() => {
    if (searchParams.size !== 0) {
      const approvedState = searchParams.get("approved");
      if (approvedState?.valueOf() === "true") {
        setApprovedState(true);
      } else {
        setApprovedState(true);
      }
    }
  }, [searchParams]);

  return (
    <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
      <div className="flex justify-between mb-5 ">
        <div
          className={`flex items-center gap-2 px-2 md:px-1 rounded-lg ${
            state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-900"
          }`}
        >
          <div
            className={`w-[90px] text-center py-1.5 rounded-lg font-semibold flex items-center justify-center px-0.5 ${
              ApprovedState === true
                ? ` shadow ${
                    state.theme.theme === "LIGHT"
                      ? "text-purple-500 bg-white"
                      : "bg-purple-900 bg-opacity-30 text-purple-500"
                  }`
                : `${
                    state.theme.theme === "LIGHT"
                      ? "text-black"
                      : "text-gray-400"
                  }`
            }`}
            onClick={() => {
              setApprovedState(true);
              router.push("/counselor/attendance?approved=true");
            }}
          >
            <p>{approvedRecordsCount?.toString()}</p>
            Approved
          </div>
          <div
            className={`w-[90px] text-center py-1.5 rounded-lg font-semibold flex items-center justify-center px-0.5 ${
              ApprovedState === false
                ? `${
                    state.theme.theme === "LIGHT"
                      ? "text-purple-500 bg-white shadow "
                      : "text-purple-400 bg-purple-900 bg-opacity-30"
                  }`
                : `${
                    state.theme.theme === "LIGHT"
                      ? "text-black"
                      : "text-gray-400"
                  }`
            }`}
            onClick={() => {
              setApprovedState(false);
              router.push("/counselor/attendance?approved=false");
            }}
          >
            <p>{pendingRecordsCount?.toString()}</p>
            Pending
          </div>
        </div>
        <AutoApprove />
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md rounded">
          <table
            className={`w-full text-left border  ${
              state.theme.theme === "LIGHT"
                ? `text-black border-gray-200`
                : `text-stone-200 border-stone-700`
            }`}
          >
            <thead
              className={`text-sm uppercase border ${
                state.theme.theme === "LIGHT"
                  ? " bg-stone-100 text-stone-700 border-gray-300"
                  : "bg-stone-900 text-stone-400 border-stone-700"
              }`}
            >
              <tr
                className={`border-b-2 ${
                  state.theme.theme === "LIGHT"
                    ? "border-b-stone-300"
                    : "border-b-stone-700"
                }`}
              >
                <th className={`px-6 py-3`}>MODE OF ATTENDANCE</th>
                <th className={`px-6 py-3`}>STATUS</th>
                <th className={`px-6 py-3`}>NAME</th>
                <th className={`px-6 py-3`}>CONTACT NUMBER</th>
                <th className={`px-6 py-3`}>SESSION NAME</th>
                <th className={`px-6 py-3`}>DESCRIPTION</th>
                <th className={`px-6 py-3`}>START TIME</th>
              </tr>
            </thead>
            <tbody>
              {response && response.length > 0 ? (
                response?.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      state.theme.theme === "LIGHT"
                        ? `bg-white border-b  hover:bg-stone-50`
                        : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
                    }
                  >
                    <td className={`px-6 py-4`}>
                      {item?.scheduledSession?.modeOfAttendance === "ONLINE" ? (
                        <div className="text-red-500">ONLINE</div>
                      ) : item?.scheduledSession?.modeOfAttendance ==
                        "OFFLINE" ? (
                        <div className="text-green-600 border border-green-600 rounded-lg w-max px-3 py-1">
                          OFFLINE
                        </div>
                      ) : (
                        <div className="text-yellow-600 border border-yellow-600 rounded-lg w-max px-3 py-1">
                          HYBRID
                        </div>
                      )}
                    </td>
                    <td className={`px-6 py-4`}>
                      <ApproveAttendance item={item} />
                    </td>
                    <td
                      className={`px-6 py-4`}
                    >{`${item?.counselee.firstName} ${item?.counselee.lastName}`}</td>
                    <td className={`px-6 py-4`}>
                      {item?.counselee?.phoneNumber}
                    </td>
                    <td className={`px-6 py-4`}>
                      {item?.scheduledSession?.name}
                    </td>
                    <td className={`px-6 py-4`}>
                      {item?.scheduledSession?.description}
                    </td>
                    <td className={`px-6 py-4`}>
                      {item?.scheduledSession?.startTime ? (
                        <div>
                          <DateFormatter
                            dateString={item?.scheduledSession?.startTime}
                          />
                        </div>
                      ) : (
                        <p>null</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-10">
                    No Data To Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
