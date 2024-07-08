"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import React from "react";

interface Attendance {
  id: string;
  deityWorshipSeva: boolean;
  guruPuja: boolean;
  location: string;
  mangalAarti: boolean;
  morningJapa: boolean;
  otherSeva: boolean;
  sbClass: boolean;
  createdAt: string;
  updatedAt: string;
  counselor: counselor;
}

function CbmSevas({ response }: { response: Attendance[] }) {
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
                <th className={`px-6 py-3`}>SEVA NAME</th>
                <th className={`px-6 py-3`}>COUNSELOR</th>
                <th className={`px-6 py-3`}>CONTACT NUMBER</th>
                <th className={`px-6 py-3`}>LOCATION</th>
                <th className={`px-6 py-3`}>DATE</th>
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
                    {item.deityWorshipSeva
                      ? "Deity Worship Seva"
                      : item.guruPuja
                      ? "Guru Puja"
                      : item.mangalAarti
                      ? "Mangala Arti"
                      : item.morningJapa
                      ? "Morning Japa"
                      : item.otherSeva
                      ? "Other Seva"
                      : item.sbClass
                      ? "SB Class"
                      : "Other seva"}
                  </td>

                  <td className={`px-6 py-4`}>{""}</td>
                  <td className={`px-6 py-4`}>{item.counselor.phoneNumber}</td>
                  <td className={`px-6 py-4`}>{item.location}</td>
                  <td className={`px-6 py-4`}>
                    <div>
                      <DateFormatter dateString={item?.createdAt} />
                    </div>
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

export default CbmSevas;
