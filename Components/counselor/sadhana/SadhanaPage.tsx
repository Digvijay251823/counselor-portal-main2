"use client";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import TimeFormatter from "@/Components/utils/TimeFormatter";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import DateFilter from "./DateFilter";
import { BarsArrowDownIcon } from "@heroicons/react/24/outline";
import { HidableColumns } from "@/Components/utils/TableUtils/HidableColumns";

function SadhanaPage({ response }: { response: Sadhana[] }) {
  const { state } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);

  useEffect(() => {
    const columnsNames = localStorage.getItem("SadhanaColumns");
    if (columnsNames) {
      setColumnNamesArr(JSON.parse(columnsNames));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("SadhanaColumns", JSON.stringify(columnNamesArr));
  }, [columnNamesArr.length]);

  const handleAddItemToColumnNameArr = (option: { value: string }) => {
    if (columnNamesArr?.includes(option.value)) {
      setColumnNamesArr(
        columnNamesArr.filter((selected) => selected !== option.value)
      );
    } else {
      setColumnNamesArr([...columnNamesArr, option.value]);
    }
  };
  return (
    <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
      <div className="w-full flex justify-between mb-5">
        <DateFilter />

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
        <div className="flex justify-between pb-2">
          <Link href={"/counselor/sadhana?page=0&size=30"}>
            <button className="bg-blue-600 text-white border px-2 py-1.5 rounded-lg">
              Clear Filters
            </button>
          </Link>
          <HeadlessMenu
            onSelect={handleAddItemToColumnNameArr}
            columnNames={[
              { columnName: "SADHANA DATE", field: "Sadhana_Date" },
              {
                columnName: "COUNSELEE INITIATED NAME",
                field: "Counselee_Initiated_Name",
              },
              {
                columnName: "COUNSELEE FIRST NAME",
                field: "Counselee_First_Name",
              },
              {
                columnName: "COUNSELEE LAST NAME",
                field: "Counselee_Last_Name",
              },
              {
                columnName: "COUNSELEE CONTACT NUMBER",
                field: "Counselee_Contact_Number",
              },
              { columnName: "NUMBER OF ROUND", field: "Number_Of_Round" },
              {
                columnName: "FIRST 8 ROUND COMPLETED TIME",
                field: "first_8_Round_Completed_Time",
              },
              {
                columnName: "NEXT 8 ROUND COMPLETED TIME",
                field: "next_8_Rounds_Completed_Time",
              },
              { columnName: "WAKE UP TIME", field: "wake_up_time" },
              { columnName: "SLEEP TIME", field: "sleep_Time" },
              {
                columnName: "PRABHUPADA BOOK READING",
                field: "Prabhupada_Book_Reading",
              },
              {
                columnName: "BOOK NAME",
                field: "Book_Name_Reading",
              },
              {
                columnName: "PRABHUPADA CLASS HEARING",
                field: "Prabhupada_Class_Hearing",
              },
              { columnName: "GURU CLASS HEARING", field: "Guru_Class_Hearing" },
              {
                columnName: "OTHERS CLASS HEARING",
                field: "Other_Class_Hearing",
              },
              { columnName: "SPEAKER NAME(OTHERS)", field: "Speaker_Name" },
              { columnName: "ATTENDED ARTHI", field: "Attended_Arthi" },
              {
                columnName: "MOBILE/INTERNET-USAGE",
                field: "Mobile/Internet-Usage",
              },
              {
                columnName: "TOPIC",
                field: "Topic",
              },
              {
                columnName: "VISIBLE SADHANA",
                field: "Visible_Sadhana",
              },
            ]}
            options={columnNamesArr}
          />
        </div>
        <p className="text-xs text-red-500">
          You Can Hide Unneccessory Columns by checking the checkboxes in the
          button right below the configure
        </p>
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
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Sadhana_Date"
                  stylesClassNames={`px-4 py-2`}
                >
                  <div className="flex items-center gap-2">
                    <p>Sadhana Date</p>
                  </div>
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Counselee_Initiated_Name"
                  stylesClassNames={`px-4 py-2`}
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                >
                  <div className="flex items-center gap-2">
                    <p>Counselee Initiated Name</p>
                    <Filter category="initiatedName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Counselee_First_Name"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  <div className="flex items-center gap-2">
                    <p>Counselee First Name</p>
                    <Filter category="firstName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Counselee_Last_Name"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  <div className="flex items-center gap-2">
                    <p>Counselee Last Name</p>
                    <Filter category="lastName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Counselee_Contact_Number"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  <div className="flex items-center gap-2">
                    <p>Counselee Contact Number</p>
                    <Filter category="phoneNumber" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  ColumnToHide="Number_Of_Round"
                  stylesClassNames={`px-4 py-2`}
                >
                  Number Of Rounds
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="first_8_Round_Completed_Time"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  First 8 Rounds Completed Time
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="next_8_Rounds_Completed_Time"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Next 8 Rounds Completed Time
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="wake_up_time"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Wake Up Time
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="sleep_Time"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Sleep Time
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Prabhupada_Book_Reading"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Prabhupada Book Reading
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Book_Name_Reading"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Book Name
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Prabhupada_Class_Hearing"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader
                  stylesClassNames={`px-4 py-2`}
                >
                  Prabhupada Class Hearing
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Guru_Class_Hearing"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader
                  stylesClassNames={`px-4 py-2`}
                >
                  Guru Class Hearing
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Other_Class_Hearing"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Other Class Hearing
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Speaker_Name"
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames={`px-4 py-2`}
                >
                  speaker
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Attended_Arthi"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Attended Arti
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Mobile/Internet-Usage"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Mobile Internet Usage
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Topic"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Topic
                </HidableColumns>
                <HidableColumns
                  ColumnToHide="Visible_Sadhana"
                  columnNamesArray={columnNamesArr}
                  isColumnHeader={true}
                  stylesClassNames={`px-4 py-2`}
                >
                  Visible Sadhana
                </HidableColumns>
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
                    <HidableColumns
                      columnNamesArray={columnNamesArr}
                      ColumnToHide="Sadhana_Date"
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.sadhanaDate ? (
                        <DateFormatter dateString={item.sadhanaDate} />
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                      ColumnToHide="Counselee_Initiated_Name"
                    >
                      {item.counselee?.initiatedName ? (
                        item.counselee?.initiatedName
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Counselee_First_Name"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.counselee?.firstName ? (
                        item.counselee?.firstName
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Counselee_Last_Name"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.counselee?.lastName ? (
                        item.counselee?.lastName
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Counselee_Contact_Number"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.counselee?.phoneNumber ? (
                        item.counselee?.phoneNumber
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Number_Of_Round"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.numberOfRounds}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="first_8_Round_Completed_Time"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.first8RoundsCompletedTime ? (
                        <TimeFormatter
                          timeString={item.first8RoundsCompletedTime}
                        />
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="next_8_Rounds_Completed_Time"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.next8RoundsCompletedTime ? (
                        <TimeFormatter
                          timeString={item.first8RoundsCompletedTime}
                        />
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="wake_up_time"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.wakeUpTime ? (
                        <TimeFormatter timeString={item.wakeUpTime} />
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="sleep_Time"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.sleepTime ? (
                        <TimeFormatter timeString={item.sleepTime} />
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Prabhupada_Book_Reading"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.prabhupadaBookReading ? (
                        item.prabhupadaBookReading
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Book_Name_Reading"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.nonPrabhupadaBookReading ? (
                        item.nonPrabhupadaBookReading
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Prabhupada_Class_Hearing"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.prabhupadaClassHearing ? (
                        item.prabhupadaClassHearing
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Guru_Class_Hearing"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.guruClassHearing ? (
                        item.guruClassHearing
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Other_Class_Hearing"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.otherClassHearing ? (
                        item.otherClassHearing
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      columnNamesArray={columnNamesArr}
                      ColumnToHide="Speaker_Name"
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.speaker ? (
                        item.speaker
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Attended_Arthi"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.attendedArti ? (
                        item.attendedArti
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Mobile/Internet-Usage"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.mobileInternetUsage ? (
                        item.mobileInternetUsage
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Topic"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.topic ? (
                        item.topic
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Visible_Sadhana"
                      columnNamesArray={columnNamesArr}
                      isColumnHeader={false}
                      stylesClassNames="px-4 py-1.5"
                    >
                      {item.visibleSadhana ? (
                        item.visibleSadhana
                      ) : (
                        <p className="text-gray-400">----</p>
                      )}
                    </HidableColumns>
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

function HeadlessMenu({
  options,
  onSelect,
  columnNames,
}: {
  options: any;
  onSelect: any;
  columnNames: { columnName: string; field: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef: any = useRef();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: Event) => {
    if (menuRef.current && !menuRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Attach click outside listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          onClick={handleButtonClick}
        >
          <BarsArrowDownIcon className="h-5 w-5 rotate-90" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]">
          <div className="py-1">
            {columnNames?.map(
              (
                option: { columnName: string; field: string },
                index: number
              ) => (
                <label
                  key={index}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                    value={option.field}
                    checked={options.includes(option.field)}
                    onChange={(e) => {
                      onSelect(e.target);
                      setIsOpen(false);
                    }}
                  />
                  <span className="ml-2 whitespace-nowrap">
                    {option.columnName}
                  </span>
                </label>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
