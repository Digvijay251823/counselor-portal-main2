"use client";

import { useGlobalState } from "@/Components/context/state";
import Modal from "@/Components/utils/Modal";
import SubmitHandlerButton from "@/Components/utils/SubmitHandlerButton";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export default function ChangeCounselor({
  response,
}: {
  response: [attendanceCBM];
}) {
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
                <td className={`px-6 py-3`}>FIRST NAME</td>
                <td className={`px-6 py-3`}>LAST NAME</td>
                <td className={`px-6 py-3`}>PHONE NUMBER</td>
                <td className={`px-6 py-3`}>SPOKEN TO EXISTING</td>
                <td className={`px-6 py-3`}>SPOKEN TO NEW</td>
                <td className={`px-6 py-3`}>REASON TO CHANGE</td>
                <td className={`px-6 py-3`}>STATUS OF CHANGE</td>
                <td className={`px-6 py-3`}>PREFERENCE 1</td>
                <td className={`px-6 py-3`}>PREFERENCE 2</td>
                <td className={`px-6 py-3`}>PREFERENCE 3</td>
                <td className={`px-6 py-3`}>Actions</td>
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
                  <td className={`px-4 py-1.5`}>{item.counselee.firstName}</td>
                  <td className={`px-4 py-1.5`}>{item.counselee.lastName}</td>
                  <td className={`px-4 py-1.5`}>
                    {item.counselee.phoneNumber}
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
                    {item.preferedCounselor1?.initiatedName ? (
                      item.preferedCounselor1?.initiatedName
                    ) : (
                      <p>Not Found</p>
                    )}
                  </td>
                  <td className={`px-4 py-1.5`}>
                    {item.preferedCounselor1?.initiatedName ? (
                      item.preferedCounselor1?.initiatedName
                    ) : (
                      <p>Not Found</p>
                    )}
                  </td>
                  <td>
                    <div>
                      <ApproveAndAllotCounselor
                        changeFormId={item.id}
                        counseleeId={item.counselee.id}
                      />
                    </div>
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

function ApproveAndAllotCounselor({
  changeFormId,
  counseleeId,
}: {
  changeFormId: string;
  counseleeId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [counselors, setCounselors] = useState([]);
  const { state, dispatch } = useGlobalState();
  const [selectedCounselor, setSelectedCounselor] = useState<any>({});
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/counselor`);
        console.log(response);
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setCounselors(responseData.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "ERROR", message: errorData.message },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: error.message, type: "ERROR" },
        });
      }
    })();
  }, []);
  async function handleSubmit(e: FormData) {
    const formData = {
      counseleeId,
      changeRequestId: changeFormId,
      counselorId: selectedCounselor.id,
    };
    try {
      const headers = new Headers();
      const response = await fetch(`/api/changecounselor`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "SUCCESS" },
        });
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: error.message, type: "ERROR" },
      });
    }
  }
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-400 font-bold text-lg px-3 py-1.5 rounded-lg"
      >
        Approve
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          className={`md:px-10 py-10 rounded-xl shadow-xl ${
            state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
          }`}
        >
          <form action={handleSubmit}>
            <div>
              <div>
                <label htmlFor="Counselor" className="font-bold text-xl ">
                  Allot One Counselor
                </label>
                <MenuIconAndDropDownDevotees
                  DataArr={counselors}
                  setSelected={(value) => setSelectedCounselor(value)}
                />
              </div>
            </div>
            <div className="flex justify-center py-10">
              <SubmitHandlerButton
                btnStyles={`w-[140px] py-2 focus:ring-4 text-lg font-semibold ${
                  state.theme.theme === "LIGHT"
                    ? "bg-purple-400 focus:ring-purple-500"
                    : "bg-purple-400 focus:ring-purple-800"
                }`}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: any;
  defaultVal?: string;
  position?: string;
};

function MenuIconAndDropDownDevotees({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: PropsMenu) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const [QueriedArr, setQueriedArr] = useState<counselor[]>([]);
  const menuRef: any = useRef();
  const { state } = useGlobalState();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    toggleSelection(true);
    setSelectedOption(e.target.value);
    const results: counselor[] = DataArr.filter((item: any) => {
      for (const key in item) {
        const value = item[key];
        if (typeof value === "string") {
          if (
            value
              .toLowerCase()
              .includes(e.target.value?.toString().toLowerCase())
          ) {
            return true;
          }
        } else if (typeof value === "number") {
          if (
            value
              .toString()
              .toLowerCase()
              .includes(e.target.value?.toString().toLowerCase())
          ) {
            return true;
          }
        }
      }
      return false;
    });
    setQueriedArr(results.length > 0 ? results : DataArr);
  }
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <div className={"w-full"}>
        <input
          type="text"
          onChange={onChange}
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-purple-100 px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700 w-full"
              : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400 w-full"
          }`}
          value={selectedOption}
          placeholder="Start typing something . . . "
        />
      </div>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg z-[1000] ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300 ring-2 ring-purple-950"
              : "bg-stone-950 border-stone-700 ring-2 ring-purple-950"
          } ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {QueriedArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10 ? "md:h-[45vh] h-[60vh]" : "h-full"
              }`}
              role="none"
            >
              {QueriedArr?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item.initiatedName
                        ? `${item.initiatedName} `
                        : `${item.firstName} ${item.lastName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`${
                    state.theme.theme === "LIGHT"
                      ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                      : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                  }`}
                >
                  {item.initiatedName
                    ? `${item.initiatedName}`
                    : `${item.firstName} ${item.lastName}`}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
