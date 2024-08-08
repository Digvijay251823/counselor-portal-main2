"use client";

import { useGlobalState } from "@/Components/context/state";
import Filter from "./Filter";
import Tabs from "./Tabs";
import ApproveAndAllotCounselor from "./ApproveAndAllotCounselor";

export default function ChangeCounselor({
  response,
}: {
  response: [attendanceCBM];
}) {
  const { state } = useGlobalState();
  return (
    <div className="w-screen">
      <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
        <div className="flex items-start mb-5">
          <Tabs />
        </div>
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
                <td className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>INITIATED NAME</p>
                    <Filter category="initiatedName" />
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>FIRST NAME</p>
                    <Filter category="firstName" />
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>LAST NAME</p>
                    <Filter category="lastName" />
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <p>PHONE NUMBER</p>
                    <Filter category="phoneNumber" />
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <p>CURRENT COUNSELOR</p>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>SPOKEN TO EXISTING</p>
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>SPOKEN TO NEW</p>
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>REASON TO CHANGE</p>
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>STATUS OF CHANGE</p>
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>PREFERENCE 1</p>
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>PREFERENCE 2</p>
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>PREFERENCE 3</p>
                  </div>
                </td>
                <td className={`px-6 py-3`}>
                  <div>
                    <p>ACTIONS</p>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody
              className={
                state.theme.theme === "LIGHT"
                  ? `bg-white border-b  hover:bg-stone-50`
                  : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
              }
            >
              {response.length > 0 ? (
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
                      {item.counselee.initiatedName ? (
                        <div>{item.counselee.initiatedName}</div>
                      ) : (
                        <div className="text-gray-400">Not Available</div>
                      )}
                    </td>
                    <td className={`px-4 py-1.5`}>
                      {item.counselee.firstName}
                    </td>
                    <td className={`px-4 py-1.5`}>{item.counselee.lastName}</td>
                    <td className={`px-4 py-1.5`}>
                      {item.counselee.phoneNumber}
                    </td>
                    <td className={`px-4 py-1.5`}>
                      {item.counselee.currentCounselor ? (
                        item.counselee.currentCounselor?.initiatedName ? (
                          item.counselee.currentCounselor?.initiatedName
                        ) : (
                          `${item.counselee.currentCounselor?.firstName} ${item.counselee.currentCounselor?.lastName}`
                        )
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </td>
                    <td className={`px-4 py-1.5`}>
                      {item.alreadySpokenToNewCounselor ? "Yes" : "NO"}
                    </td>
                    <td className={`px-4 py-1.5`}>
                      {item.alreadySpokenToExistingCounselor ? "Yes" : "No"}
                    </td>
                    <td className={`px-4 py-1.5`}>
                      {item.reasonForCounselorChange}
                    </td>
                    <td className={`px-4 py-1.5`}>{item.statusOfChange}</td>
                    <td className={`px-4 py-1.5`}>
                      {item.preferedCounselor1?.initiatedName ? (
                        item.preferedCounselor1?.initiatedName
                      ) : (
                        <p>Not Found</p>
                      )}
                    </td>
                    <td className={`px-4 py-1.5`}>
                      {item.preferedCounselor2?.initiatedName ? (
                        item.preferedCounselor2?.initiatedName
                      ) : (
                        <p>Not Found</p>
                      )}
                    </td>
                    <td className={`px-4 py-1.5`}>
                      {item.preferedCounselor2?.initiatedName ? (
                        item.preferedCounselor2?.initiatedName
                      ) : (
                        <p>Not Found</p>
                      )}
                    </td>
                    <td>
                      {item.statusOfChange === "APPROVED" ? (
                        <div className="text-gray-400 text-center">
                          Approved
                        </div>
                      ) : (
                        <div>
                          <ApproveAndAllotCounselor
                            changeFormId={item.id}
                            counseleeId={item.counselee.id}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-10 text-gray-400" colSpan={20}>
                    No Entries To Show
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
