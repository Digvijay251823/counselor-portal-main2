"use client";
import React, { useState } from "react";
import { useGlobalState } from "../../context/state";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import DateFormatter from "@/Components/utils/DateFormatter";
import { GiLovers } from "react-icons/gi";

interface Child {
  name: string;
  age: number;
}

interface Data {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: number;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: Date;
  harinamInitiationPlace: string;
  recommendedBy: string;
  currentCounselor: string;
  connectedToCounselorSinceYear: Date;
  husband: string;
  children: Child[];
  createdAt: Date;
  updatedAt: Date;
}

interface DataTableProps {
  data: Data[];
}

const CounseleePage: React.FC<DataTableProps> = ({ data }) => {
  const { state } = useGlobalState();
  const [expandedRow, setExpandedRow] = useState<number>(-1);

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(-1); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(index); // Expand the clicked row
    }
  };

  return (
    <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
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
                <th className={`px-6 py-3`}>initiatedName</th>
                <th className={`px-6 py-3`}>firstName</th>
                <th className={`px-6 py-3`}>lastName</th>
                <th className={`px-6 py-3`}>Contact Number</th>
                <th className={`px-6 py-3`}>Marital Status</th>
                <th className={`px-6 py-3`}>Joining Date</th>
                <th className={`px-6 py-3`}>Email</th>
                <th className={`px-6 py-3`}>Address</th>
                <th className={`px-6 py-3`}>Gender</th>
                <th className={`px-6 py-3`}>Age</th>
                <th className={`px-6 py-3`}>address</th>
                <th className={`px-6 py-3`}>Details</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
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
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.firstName ? (
                        <div>{item.firstName}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.lastName ? (
                        <div>{item.lastName}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.phoneNumber ? (
                        <div>{item.phoneNumber}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.maritalStatus ? (
                        <div>
                          {item.maritalStatus === "MARRIED" ? (
                            <div
                              className={` py-1.5 min-w-[100px] px-2 flex items-center gap-3 ${
                                state.theme.theme === "LIGHT"
                                  ? "text-yellow-500 border border-yellow-500 rounded-lg"
                                  : "text-yellow-600 border border-yellow-600 rounded-lg"
                              }`}
                            >
                              <GiLovers />
                              <p>MARRIED</p>
                            </div>
                          ) : (
                            <p
                              className={` py-1.5 min-w-[100px] px-2 ${
                                state.theme.theme === "LIGHT"
                                  ? "text-emerald-500 border border-emerald-500 rounded-lg"
                                  : "text-emerald-600 border border-emerald-600 rounded-lg"
                              }`}
                            >
                              UNMARRIED
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
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
                            <p className="text-gray-400">Not Available</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.email ? (
                        <div>{item.email}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.address ? (
                        <div>{item.address}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.gender ? (
                        <div>{item.gender}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.age ? (
                        <div>{item.age}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      {item.address ? (
                        <div>{item.address}</div>
                      ) : (
                        <p className="text-gray-400">Not Available</p>
                      )}
                    </td>
                    <td className={`px-6 py-2`}>
                      <div
                        className="flex items-center"
                        onClick={() => toggleRow(index)}
                      >
                        <p>Details</p>
                        <p>
                          <ChevronDownIcon
                            className={`h-5 w-5 transition-all duration-300 ${
                              expandedRow === index
                                ? " rotate-180"
                                : "-rotate-90"
                            }`}
                          />
                        </p>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td className="border-b" colSpan={10}>
                        <div>something</div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounseleePage;
