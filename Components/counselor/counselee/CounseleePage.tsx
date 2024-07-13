"use client";
import React, { useState } from "react";
import { useGlobalState } from "../../context/state";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import DateFormatter from "@/Components/utils/DateFormatter";
import { GiLovers } from "react-icons/gi";
import Modal from "@/Components/utils/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DetailsPage from "./DetailsPage";
import Filter from "./Filter";

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
    <div className="w-full">
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
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>initiated Name</p>
                    <Filter category="initiatedName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>firstName</p>
                    <Filter category="firstName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>lastName</p>
                    <Filter category="lastName" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>Contact Number</p>
                    <Filter category="phoneNumber" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div className="flex items-center">
                    <p>Marital Status</p>
                    <Filter category="maritalStatus" />
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
                    <Filter category="gender" />
                  </div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Age</div>
                </th>
                <th className={`px-6 py-3`}>
                  <div>Details</div>
                </th>
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
                        <div className=" truncate">{item.address}</div>
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
                        <Modal
                          isOpen={expandedRow === index}
                          onClose={() => toggleRow(index)}
                        >
                          <div
                            className={`lg:w-[60vw] md:w-[80vw] w-[95vw] lg:h-[80vh] md:h-[85vh] h-[90vh] shadow-xl ${
                              state.theme.theme === "LIGHT"
                                ? "bg-white"
                                : "bg-stone-950"
                            }`}
                          >
                            <button
                              onClick={() => toggleRow(index)}
                              className={`absolute text-red-500 flex items-center gap-2 text-xl right-0 px-4 py-1.5 m-5 rounded-lg ${
                                state.theme.theme === "LIGHT"
                                  ? "bg-gray-100"
                                  : "bg-stone-900"
                              }`}
                            >
                              <XMarkIcon className="h-5 w-5" /> Close
                            </button>
                            <p className="text-xl md:px-10 px-5 font-bold py-5 border-b">
                              Counselee Details
                            </p>
                            <DetailsPage counseleeId={item?.id} />
                          </div>
                        </Modal>
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
