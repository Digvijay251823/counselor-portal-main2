"use client";
import React, { useEffect, useState } from "react";

import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import {
  ArrowUpTrayIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function PlannningToRelocate({
  counselee,
}: {
  counselee: devoteePlanningToRelocate[];
}) {
  const [rowData, setRowData] = useState<devoteePlanningToRelocate[]>([]);
  const { state } = useGlobalState();

  const [expandedRow, setExpandedRow] = useState<number>(-1);

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(-1);
    } else {
      setExpandedRow(index);
    }
  };

  // Set the rowData from counselee prop
  useEffect(() => {
    if (counselee && counselee.length > 0) {
      setRowData(counselee);
    }
  }, [counselee]);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="w-screen flex flex-col items-center py-5">
      <div
        className={`md:w-[90vw] w-[95vw] h-full overflow-hidden ${
          state.theme.theme === "LIGHT" ? "" : "bg-stone-900"
        }`}
      >
        <div
          className={`overflow-x-scroll rounded-lg border ${
            state.theme.theme === "LIGHT"
              ? "border-gray-300"
              : "border-stone-600"
          }`}
        >
          <table className={`w-full text-left rtl:text-right `}>
            <thead
              className={`text-md uppercase ${
                state.theme.theme === "LIGHT"
                  ? " bg-stone-100 text-stone-700  "
                  : "bg-stone-900 text-stone-400"
              }`}
            >
              <tr className="border-b border-b-stone-400">
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>initiated Name</p>
                    {/* <Filter category="initiatedName" /> */}
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>firstName</p>
                    {/* <Filter category="firstName" /> */}
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>lastName</p>
                    {/* <Filter category="lastName" /> */}
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>Contact Number</p>
                    {/* <Filter category="phoneNumber" /> */}
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>Marital Status</p>
                    {/* <Filter category="maritalStatus" /> */}
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Joining Date</div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Email</div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Address</div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>Gender</p>
                    {/* <Filter category="gender" /> */}
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Age</div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>When Want To Relocate </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Where Planned To Live </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Expected Support From Temple </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData.length > 0 ? (
                rowData?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={
                        state.theme.theme === "LIGHT"
                          ? `bg-white border-b  hover:bg-stone-50`
                          : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
                      }
                    >
                      <td className={`px-6 py-2`}>
                        {item.initiatedName ? (
                          <div>{item.initiatedName}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.firstName ? (
                          <div>{item.firstName}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.lastName ? (
                          <div>{item.lastName}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.phoneNumber ? (
                          <div>{item.phoneNumber}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.maritalStatus ? (
                          <p>{item.maritalStatus}</p>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.createdAt ? (
                          <div>
                            {item.createdAt ? (
                              <DateFormatter
                                dateString={item.createdAt.toString()}
                              />
                            ) : (
                              <p className="text-gray-400">----</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.email ? (
                          <div>{item.email}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.address ? (
                          <div className=" truncate">{item.address}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.gender ? (
                          <div>{item.gender}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.age ? (
                          <div>{item.age}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.whenwanttorelocate ? (
                          <div>{item.whenwanttorelocate}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.whereplannedtolive ? (
                          <div>{item.whereplannedtolive}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                      <td className={`px-6 py-2`}>
                        {item.expectedsupportfromtemple ? (
                          <div>{item.expectedsupportfromtemple}</div>
                        ) : (
                          <p className="text-gray-400">----</p>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td className="text-center py-10" colSpan={10}>
                    No Counselee Found
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
