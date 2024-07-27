"use client";
import { useGlobalState } from "@/Components/context/state";
import Filter from "./Filter";

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
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>COUNSELOR</p>
                    <Filter category="counselorInitiatedName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>INITIATED NAME</p>
                    <Filter category="initiatedName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>FIRST NAME</p>
                    <Filter category="firstName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>LAST NAME</p>
                    <Filter category="lastName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>PHONE NUMBER</p>
                    <Filter category="phoneNumber" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>GENDER</p>
                    <Filter category="gender" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>
                    <p>AGE</p>
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>MARITAL STATUS</p>
                    <Filter category="maritalStatus" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              className={
                state.theme.theme === "LIGHT"
                  ? `bg-white border-b  hover:bg-stone-50`
                  : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
              }
            >
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
                    <td className={`px-4 py-1.5`}>{item?.gender}</td>
                    <td className={`px-4 py-1.5`}>{item?.age}</td>
                    <td className={`px-4 py-1.5`}>{item?.maritalStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={20} className="text-gray-400 text-center py-10">
                    No Counselee To Show
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
