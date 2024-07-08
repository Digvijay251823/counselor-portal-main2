"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import TimeFormatter from "@/Components/utils/TimeFormatter";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <th className={`px-4 py-2`}>COUNSELEE FIRST NAME</th>
                <th className={`px-4 py-2`}>COUNSELEE LAST NAME</th>
                <th className={`px-4 py-2`}>COUNSELEE PHONE NUMBER</th>
                <th className={`px-4 py-2`}>numberOfRounds</th>
                <th className={`px-4 py-2`}>earlyJapaRoundsBefore8AM</th>
                <th className={`px-4 py-2`}>earlyJapaRoundsAfter8AM</th>
                <th className={`px-4 py-2`}>first8RoundsCompletedTime</th>
                <th className={`px-4 py-2`}>next8RoundsCompletedTime</th>
                <th className={`px-4 py-2`}>wakeUpTime</th>
                <th className={`px-4 py-2`}>sleepTime</th>
                <th className={`px-4 py-2`}>prabhupadaBookReading</th>
                <th className={`px-4 py-2`}>nonPrabhupadaBookReading</th>
                <th className={`px-4 py-2`}>prabhupadaClassHearing</th>
                <th className={`px-4 py-2`}>guruClassHearing</th>
                <th className={`px-4 py-2`}>otherClassHearing</th>
                <th className={`px-4 py-2`}>speaker</th>
                <th className={`px-4 py-2`}>attendedArti</th>
                <th className={`px-4 py-2`}>mobileInternetUsage</th>
                <th className={`px-4 py-2`}>sadhanaDate</th>
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
                  <td className="px-4 py-1.5">{item.counselee.firstName}</td>
                  <td className="px-4 py-1.5">{item.counselee.lastName}</td>
                  <td className="px-4 py-1.5">{item.counselee.phoneNumber}</td>
                  <td className="px-4 py-1.5">{item.numberOfRounds}</td>
                  <td className="px-4 py-1.5">
                    {item.earlyJapaRoundsBefore8AM}
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
                  <td className="px-4 py-1.5">{item.prabhupadaBookReading}</td>
                  <td className="px-4 py-1.5">
                    {item.nonPrabhupadaBookReading}
                  </td>
                  <td className="px-4 py-1.5">{item.prabhupadaClassHearing}</td>
                  <td className="px-4 py-1.5">{item.guruClassHearing}</td>
                  <td className="px-4 py-1.5">{item.otherClassHearing}</td>
                  <td className="px-4 py-1.5">{item.speaker}</td>
                  <td className="px-4 py-1.5">{item.attendedArti}</td>
                  <td className="px-4 py-1.5">{item.mobileInternetUsage}</td>
                  <td className="px-4 py-1.5">
                    {item.sadhanaDate ? (
                      <DateFormatter dateString={item.sadhanaDate} />
                    ) : (
                      <p className="text-gray-500">null</p>
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

export default SadhanaPage;
