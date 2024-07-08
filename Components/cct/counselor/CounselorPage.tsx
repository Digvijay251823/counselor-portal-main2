"use client";
import { useGlobalState } from "@/Components/context/state";
import React, { useState } from "react";

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
  currentCounselor: Data;
  connectedToCounselorSinceYear: Date;
  husband: Data;
  children: Child[];
}

interface DataTableProps {
  data: Data[];
}

const CounselorPage: React.FC<DataTableProps> = ({ data }) => {
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
    <div className="px-10 w-full">
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
              <th className={`px-6 py-3`}>firstName</th>
              <th className={`px-6 py-3`}>lastName</th>
              <th className={`px-6 py-3`}>initiatedName</th>
              <th className={`px-6 py-3`}>phoneNumber</th>
              <th className={`px-6 py-3`}>gender</th>
              <th className={`px-6 py-3`}>age</th>
              <th className={`px-6 py-3`}>email</th>
              <th className={`px-6 py-3`}>maritalStatus</th>
              <th className={`px-6 py-3`}>address</th>
              <th className={`px-6 py-3`}>profession</th>
              <th className={`px-6 py-3`}>yourInitiatingSpiritualMaster</th>
              <th className={`px-6 py-3`}>harinamInitiationDate</th>
              <th className={`px-6 py-3`}>harinamInitiationPlace</th>
              <th className={`px-6 py-3`}>recommendedBy</th>
              <th className={`px-6 py-3`}>currentCounselor</th>
              <th className={`px-6 py-3`}>connectedToCounselorSinceYear</th>
              <th className={`px-6 py-3`}>husband</th>
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
                  <td className={`px-4 py-1.5`}>
                    {item.firstName ? (
                      <div>{item.firstName}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.lastName ? (
                      <div>{item.lastName}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.initiatedName ? (
                      <div>{item.initiatedName}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.phoneNumber ? (
                      <div>{item.phoneNumber}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.gender ? (
                      <div>{item.gender}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.age ? (
                      <div>{item.age}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.email ? (
                      <div>{item.email}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.maritalStatus ? (
                      <div>{item.maritalStatus}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.address ? (
                      <div>{item.address}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.profession ? (
                      <div>{item.profession}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.yourInitiatingSpiritualMaster ? (
                      <div>{item.yourInitiatingSpiritualMaster}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.harinamInitiationDate ? (
                      <div>{item.harinamInitiationDate.toString()}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.harinamInitiationPlace ? (
                      <div>{item.harinamInitiationPlace}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.recommendedBy ? (
                      <div>{item.recommendedBy}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.currentCounselor ? (
                      <div>{item.currentCounselor.initiatedName}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.connectedToCounselorSinceYear ? (
                      <div>{item.connectedToCounselorSinceYear.toString()}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
                  </td>
                  <td>
                    {item.husband ? (
                      <div>{item.husband.initiatedName}</div>
                    ) : (
                      <div className="text-gray-400 px-4">Not Found</div>
                    )}
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
  );
};

export default CounselorPage;
