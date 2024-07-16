"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import TimeFormatter from "@/Components/utils/TimeFormatter";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";
import Filter from "./Filter";

function SadhanaPage({ response }: { response: Sadhana[] }) {
  const { state } = useGlobalState();
  return (
    <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
      <div className="w-full flex justify-end mb-5">
        <Link href={"/counselor/sadhana/configure"}>
          <button
            className={`px-3 py-1.5 rounded text-white bg-purple-600 flex items-center gap-1 font-semibold`}
          >
            <PencilSquareIcon className="h-5 w-5" />
            Configure
          </button>
        </Link>
      </div>
      <div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table
            className={`w-full text-left rtl:text-right ${
              state.theme.theme === "LIGHT" ? `text-black` : `text-stone-200`
            }`}
          >
            <thead
              className={`text-md uppercase ${
                state.theme.theme === "LIGHT"
                  ? " bg-stone-100 text-stone-700  "
                  : "bg-stone-900 text-stone-400"
              }`}
            >
              <tr className="border-b border-b-stone-400">
                <th className={`px-4 py-2`}>
                  <div className="flex items-center gap-2">
                    <p>Sadhana Date</p>
                    <Filter category="sadhanaDate" />
                  </div>
                </th>
                <th className={`px-4 py-2`}>
                  <div className="flex items-center gap-2">
                    <p>Counselee Initiated Name</p>
                    <Filter category="initiatedName" />
                  </div>
                </th>
                <th className={`px-4 py-2`}>
                  <div className="flex items-center gap-2">
                    <p>Counselee First Name</p>
                    <Filter category="firstName" />
                  </div>
                </th>
                <th className={`px-4 py-2`}>
                  <div className="flex items-center gap-2">
                    <p>Counselee Last Name</p>
                    <Filter category="lastName" />
                  </div>
                </th>
                <th className={`px-4 py-2`}>
                  <div className="flex items-center gap-2">
                    <p>Counselee Contact Number</p>
                    <Filter category="phoneNumber" />
                  </div>
                </th>
                <th className={`px-4 py-2`}>Number Of Rounds</th>
                <th className={`px-4 py-2`}>First 8 Rounds Completed Time</th>
                <th className={`px-4 py-2`}>Next 8Rounds Completed Time</th>
                <th className={`px-4 py-2`}>Wake Up Time</th>
                <th className={`px-4 py-2`}>Sleep Time</th>
                <th className={`px-4 py-2`}>Prabhupada Book Reading</th>
                <th className={`px-4 py-2`}> Book Name</th>
                <th className={`px-4 py-2`}>Prabhupada Class Hearing</th>
                <th className={`px-4 py-2`}>Guru Class Hearing</th>
                <th className={`px-4 py-2`}>Other Class Hearing</th>
                <th className={`px-4 py-2`}>speaker</th>
                <th className={`px-4 py-2`}>Attended Arti</th>
                <th className={`px-4 py-2`}>Mobile Internet Usage</th>
              </tr>
            </thead>
            <tbody>
              {response?.length > 0 ? (
                response?.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      state.theme.theme === "LIGHT"
                        ? `bg-white border-b  hover:bg-stone-50`
                        : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
                    }
                  >
                    <td className="px-4 py-1.5">
                      {item.sadhanaDate ? (
                        <DateFormatter dateString={item.sadhanaDate} />
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.counselee?.initiatedName ? (
                        item.counselee?.initiatedName
                      ) : (
                        <p>Not Available</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.counselee?.firstName ? (
                        item.counselee?.firstName
                      ) : (
                        <p>Not Available</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.counselee?.lastName ? (
                        item.counselee?.lastName
                      ) : (
                        <p>Not Available</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.counselee?.phoneNumber ? (
                        item.counselee?.phoneNumber
                      ) : (
                        <p>Not Available</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">{item.numberOfRounds}</td>
                    <td className="px-4 py-1.5">
                      {item?.earlyJapaRoundsBefore8AM ? (
                        item?.earlyJapaRoundsBefore8AM
                      ) : (
                        <p>Not Available</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.earlyJapaRoundsAfter8AM}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.first8RoundsCompletedTime}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.next8RoundsCompletedTime}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.wakeUpTime ? (
                        <TimeFormatter timeString={item.wakeUpTime} />
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.sleepTime ? (
                        <TimeFormatter timeString={item.sleepTime} />
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.prabhupadaBookReading}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.nonPrabhupadaBookReading}
                    </td>
                    <td className="px-4 py-1.5">
                      {item.prabhupadaClassHearing}
                    </td>
                    <td className="px-4 py-1.5">{item.guruClassHearing}</td>
                    <td className="px-4 py-1.5">{item.otherClassHearing}</td>
                    <td className="px-4 py-1.5">{item.speaker}</td>
                    <td className="px-4 py-1.5">{item.attendedArti}</td>
                    <td className="px-4 py-1.5">{item.mobileInternetUsage}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-10 text-gray-400" colSpan={20}>
                    No Sadhana To Show
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

export default SadhanaPage;
