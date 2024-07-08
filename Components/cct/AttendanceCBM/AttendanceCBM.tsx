"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import React from "react";

function CBMAttendance({ response }: { response: Attendance[] }) {
  const { state } = useGlobalState();
  return (
    <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
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
                <th className={`px-6 py-3`}>NAME</th>
                <th className={`px-6 py-3`}>CONTACT NUMBER</th>
                <th className={`px-6 py-3`}>MODE OF ATTENDANCE</th>
                <th className={`px-6 py-3`}>SESSION NAME</th>
                <th className={`px-6 py-3`}>DESCRIPTION</th>
                <th className={`px-6 py-3`}>ATTENDED ON</th>
                <th className={`px-6 py-3`}>START TIME</th>
              </tr>
            </thead>
            <tbody>
              {response?.map((item, index) => (
                <tr
                  key={index}
                  className={
                    state.theme.theme === "LIGHT"
                      ? `bg-white border-b  hover:bg-stone-50`
                      : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
                  }
                >
                  <td className={`px-6 py-4`}>
                    {item?.counselor.initiatedName ? (
                      <p>{`${item?.counselor.initiatedName}`}</p>
                    ) : (
                      <p>{`${item?.counselor.firstName} ${item?.counselor.lastName}`}</p>
                    )}
                  </td>
                  <td className={`px-6 py-4`}>
                    {item?.counselor?.phoneNumber}
                  </td>
                  <td className={`px-6 py-4`}>
                    {item?.modeOfAttendance === "ONLINE" ? (
                      <div className="text-red-500">ONLINE</div>
                    ) : item?.modeOfAttendance == "OFFLINE" ? (
                      <div className="text-green-600 border border-green-600 rounded-lg w-max px-3 py-1">
                        OFFLINE
                      </div>
                    ) : (
                      <div className="text-yellow-600 border border-yellow-600 rounded-lg w-max px-3 py-1">
                        HYBRID
                      </div>
                    )}
                  </td>
                  <td className={`px-6 py-4`}>{item?.cbmMeeting?.name}</td>
                  <td className={`px-6 py-4`}>
                    {item?.cbmMeeting?.description}
                  </td>
                  <td className={`px-6 py-4`}>
                    {item?.cbmMeeting?.startTime ? (
                      <div>
                        <DateFormatter
                          dateString={item?.cbmMeeting?.startTime}
                        />
                      </div>
                    ) : (
                      <p>null</p>
                    )}
                  </td>
                  <td className={`px-6 py-4`}>
                    {item?.cbmMeeting?.startTime ? (
                      <div>
                        <DateFormatter
                          dateString={item?.cbmMeeting?.startTime}
                        />
                      </div>
                    ) : (
                      <p>null</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CBMAttendance;
