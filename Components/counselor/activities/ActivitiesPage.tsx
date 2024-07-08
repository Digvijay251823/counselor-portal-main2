"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import React from "react";

function ActivitiesPage({ response }: { response: counseleeActivities[] }) {
  const { state } = useGlobalState();
  return (
    <div>
      <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
        <div>
          <div className="relative overflow-x-auto shadow-md rounded">
            <table
              className={`w-full text-left border ${
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
                  <th className={`px-6 py-3`}>ACTIVITY NAME</th>
                  <th className={`px-6 py-3`}>COUNSELOR NAME</th>
                  <th className={`px-6 py-3`}>COUNSELEE FIRSTNAME</th>
                  <th className={`px-6 py-3`}>COUNSELEE LASTNAME</th>
                  <th className={`px-6 py-3`}>COUNSELEE PHONE</th>
                  <th className={`px-6 py-3`}>ACTIVITY DATE</th>
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
                    <td className={`px-6 py-4`}>{item?.activity?.name}</td>
                    <td className={`px-6 py-4`}>
                      {item?.counselor?.initiatedName}
                    </td>
                    <td className={`px-6 py-4`}>
                      {item?.counselee?.firstName}
                    </td>
                    <td className={`px-6 py-4`}>{item?.counselee?.lastName}</td>
                    <td className={`px-6 py-4`}>
                      {item?.counselee?.phoneNumber}
                    </td>
                    <td className={`px-6 py-4`}>
                      {item.activityDate && (
                        <DateFormatter dateString={item?.activityDate} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;
