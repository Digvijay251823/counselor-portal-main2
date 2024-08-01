"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import React, { useEffect, useState } from "react";
import ApproveAttendance from "./ApproveAttendance";
import { useRouter, useSearchParams } from "next/navigation";
import Filter from "./Filter";
import Tabs from "./Tabs";

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
  const [rowData, setRowData] = useState<Attendance[]>([]);
  const approvedState = searchParams.get("approved");

  useEffect(() => {
    if (searchParams.size !== 0) {
      if (approvedState?.valueOf() === "true") {
        setApprovedState(true);
      } else {
        setApprovedState(true);
      }
    }
  }, [searchParams, response]);

  useEffect(() => {
    if (response.length > 0) {
      setRowData(response);
    }
  }, [response.length, approvedState]);

  return (
    <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
      <div className="flex justify-between mb-5 ">
        <Tabs />
      </div>
      <div>
        <div className="overflow-x-auto shadow-md rounded">
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
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>Session Name</p>
                    <Filter category="sessionName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Description</div>
                </th>

                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>Initiated Name</p>
                    <Filter category="initiatedName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>First Name</p>
                    <Filter category="firstName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>Last Name</p>
                    <Filter category="lastName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>Contact Number</p>
                    <Filter category="phoneNumber" />
                  </div>
                </th>

                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>Start Time</p>
                    <Filter category="startTime" />
                  </div>
                </th>

                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>Status</p>
                    <Filter category="approved" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>Mode Of Attendance</th>
              </tr>
            </thead>
            <tbody>
              {rowData.length > 0 ? (
                rowData?.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      state.theme.theme === "LIGHT"
                        ? `bg-white border-b  hover:bg-stone-50`
                        : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
                    }
                  >
                    <td className={`px-6 py-4`}>
                      {item?.scheduledSession?.name}
                    </td>
                    <td className={`px-6 py-4`}>
                      {item?.scheduledSession?.description}
                    </td>
                    <td className={`px-6 py-4`}>
                      {item.counselee?.initiatedName
                        ? item.counselee?.initiatedName
                        : "Not Available"}
                    </td>
                    <td
                      className={`px-6 py-4`}
                    >{`${item?.counselee?.firstName}`}</td>
                    <td
                      className={`px-6 py-4`}
                    >{`${item?.counselee?.lastName}`}</td>
                    <td className={`px-6 py-4`}>
                      {item?.counselee?.phoneNumber}
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
                    <td className={`px-6 py-4`}>
                      {item?.modeOfAttendance === "OFFLINE" ? (
                        <div className="text-green-600 border border-green-600 rounded-lg w-max px-3 py-1">
                          OFFLINE
                        </div>
                      ) : item?.modeOfAttendance == "ONLINE" ? (
                        <div className="text-red-500">ONLINE</div>
                      ) : (
                        <div className="text-yellow-600 border border-yellow-600 rounded-lg w-max px-3 py-1">
                          HYBRID
                        </div>
                      )}
                    </td>
                    <td className={`px-6 py-4`}>
                      <ApproveAttendance item={item} />
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
