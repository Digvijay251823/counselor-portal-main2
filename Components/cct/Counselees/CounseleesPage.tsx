"use client";
import { useGlobalState } from "@/Components/context/state";

export default function Counselees({ response }: { response: counselee[] }) {
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
              className={`text-sm uppercase ${
                state.theme.theme === "LIGHT"
                  ? " bg-stone-100 text-stone-700 border-gray-300"
                  : "bg-stone-900 text-stone-400 border-stone-700"
              }`}
            >
              <tr
                className={`border-b-2 ${
                  state.theme.theme === "LIGHT"
                    ? "border-b-stone-300 font-bold"
                    : "border-b-stone-700 font-bold"
                }`}
              >
                <th className={`px-6 py-3`}>CURRENT COUNSELOR</th>
                <th className={`px-6 py-3`}>INITIATED NAME</th>
                <th className={`px-6 py-3`}>FIRST NAME</th>
                <th className={`px-6 py-3`}>LAST NAME</th>
                <th className={`px-6 py-3`}>PHONE NUMBER</th>
                <th className={`px-6 py-3`}>INITIATED NAME</th>
                <th className={`px-6 py-3`}>GENDER</th>
                <th className={`px-6 py-3`}>AGE</th>
                <th className={`px-6 py-3`}>MARITAL STATUS</th>
              </tr>
            </thead>
            <tbody
              className={
                state.theme.theme === "LIGHT"
                  ? `bg-white border-b  hover:bg-stone-50`
                  : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
              }
            >
              {response?.map((item, index) => (
                <tr
                  key={index}
                  className={
                    state.theme.theme === "LIGHT"
                      ? `bg-white border-b  hover:bg-stone-50`
                      : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
                  }
                >
                  <td className={`px-4 py-1.5`}>
                    {item?.currentCounselor?.initiatedName}
                  </td>
                  <td className={`px-4 py-1.5`}>
                    {item.initiatedName ? (
                      <div>{item.initiatedName}</div>
                    ) : (
                      <div className="text-gray-400">Not Available</div>
                    )}
                  </td>
                  <td className={`px-4 py-1.5`}>{item.firstName}</td>
                  <td className={`px-4 py-1.5`}>{item.lastName}</td>
                  <td className={`px-4 py-1.5`}>{item.phoneNumber}</td>
                  <td className={`px-4 py-1.5`}>{item?.initiatedName}</td>
                  <td className={`px-4 py-1.5`}>{item?.gender}</td>
                  <td className={`px-4 py-1.5`}>{item?.age}</td>
                  <td className={`px-4 py-1.5`}>{item?.maritalStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
