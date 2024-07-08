"use client";
import { SERVER_URL } from "@/Components/config/config";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import { POST } from "@/actions/POSTREQUESTS";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const sevas = [
  { name: "Mangal Arthi", type: "mangalAarti" },
  { name: "Morning Japa", type: "morningJapa" },
  { name: "Guru Puja", type: "guruPuja" },
  { name: "SB Class", type: "sbClass" },
  { name: "Deity Worship Seva", type: "deityWorshipSeva" },
  { name: "Other Seva", type: "otherSeva" },
];

function MarkCCTSeva() {
  const [onFocusPhone, setOnFocusPhone] = useState(false);
  const [counselorDetails, setCounselorDetails] = useState<any>({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCounselor, setSelectedCounselor] = useState<any>({});
  const [formData, setFormData] = useState({
    mangalAarti: false,
    morningJapa: false,
    sbClass: false,
    deityWorshipSeva: false,
    otherSeva: false,
    location: "NVCC TEMPLE",
    guruPuja: false,
  });

  const { state, dispatch } = useGlobalState();
  const [selectedSevas, setSelectedSevas] = useState<any>([]);

  useEffect(() => {
    if (phoneNumber.length === 10) {
      (async () => {
        try {
          const response = await fetch(`/api/cct/phone/${phoneNumber}`);
          if (response.ok) {
            const responseData = await response.json();
            setCounselorDetails(responseData.content.content);
          } else {
            if (response.status === 404) {
              localStorage.setItem("PHONE", phoneNumber);
              dispatch({
                type: "SHOW_TOAST",
                payload: {
                  type: "ERROR",
                  message: "Participant Not Found",
                },
              });
            }
            const errorData = await response.json();
            dispatch({
              type: "SHOW_TOAST",
              payload: {
                type: "ERROR",
                message: errorData.message || errorData.statusText,
              },
            });
          }
        } catch (error: any) {
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "ERROR", message: error.message },
          });
        }
      })();
    }
  }, [phoneNumber, dispatch]);

  useEffect(() => {
    const date = new Date().toISOString();
    setFormData((prevData) => ({
      ...prevData,
      counselorId: counselorDetails.id,
      programDate: date,
    }));
  }, [counselorDetails?.id]);

  async function handleSubmitAttendance(e: FormData) {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch("/api/cct/seva", {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
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
        payload: { type: "ERROR", message: error.message },
      });
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    if (checked) {
      setSelectedSevas([...selectedSevas, value]);
    } else {
      setSelectedSevas(selectedSevas.filter((item: any) => item !== value));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  return (
    <div className="w-full">
      <div className="md:px-10 md:pt-20 md:pb-10 px-5 pt-10 pb-5">
        <h1 className="text-4xl font-bold">Morning Attendance</h1>
        <p>Select one values each as we are tracking the family Details</p>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center w-full">
          <form className="md:w-[500px] mx-2 mb-10 ">
            <label htmlFor="phonenumber" className="font-bold text-xl">
              Phone Number
            </label>
            <div
              className={`flex items-center w-full border transition-all duration-500 ${
                onFocusPhone
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "ring-4 border-purple-700 ring-purple-100"
                        : "ring-4 border-purple-300 ring-purple-950"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300"
                        : "border-stone-800"
                    }`
              }`}
              onFocus={() => setOnFocusPhone(true)}
              onBlur={() => setOnFocusPhone(false)}
            >
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                value={phoneNumber}
                placeholder="7879859267"
                className={`w-full px-4 py-3 outline-none ${
                  state.theme.theme === "LIGHT" ? "bg-white " : "bg-stone-950 "
                }`}
              />
            </div>
          </form>
        </div>
        {Object.keys(counselorDetails).length > 0 && (
          <>
            <div className="flex flex-col items-center my-5">
              <h1 className="font-bold text-3xl">Hare Krishna!!</h1>
              <div className="flex items-center gap-2">
                <p
                  className={`rounded-full p-1.5 ${
                    state.theme.theme === "LIGHT"
                      ? "bg-gray-100 "
                      : "bg-stone-900"
                  }`}
                >
                  <UserIcon className="h-5 w-5" />
                </p>
                {counselorDetails?.initiatedName ? (
                  <p className="text-gray-500 text-xl font-bold">
                    {counselorDetails?.initiatedName}
                  </p>
                ) : (
                  <p className="text-purple-500 text-xl font-bold">{`${counselorDetails.firstName} ${counselorDetails.lastName}`}</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {Object.keys(counselorDetails).length > 0 && (
        <div className="flex justify-center w-full">
          <div
            className={`md:mx-10 mx-3 mb-20 md:w-[80vw] w-[90vw] p-5 rounded-2xl shadow-xl ${
              state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
            }`}
          >
            <form action={handleSubmitAttendance}>
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-5">
                  <label htmlFor="" className="font-bold text-xl">
                    Select Location
                  </label>
                  <MenuOthersDropDown
                    dataArr={[
                      { name: "NVCC TEMPLE", value: "NVCC TEMPLE" },
                      { name: "HINJEWADI CENTER", value: "HINJEWADI CENTER" },
                      { name: "MAYAPUR TEMPLE", value: "MAYAPUR TEMPLE" },
                      { name: "CAMP TEMPLE", value: "CAMP TEMPLE" },
                    ]}
                    selectedValue={formData.location}
                    setSelected={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        location: value.name,
                      }));
                    }}
                  />
                </div>

                <div>
                  <h1 className="my-5 font-bold text-lg">
                    You can select multiple sevas
                  </h1>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 ">
                    {sevas?.map((item, index) => (
                      <div className="flex items-center gap-3" key={index}>
                        <input
                          type="checkbox"
                          id={item.name}
                          value={item.type}
                          className="h-5 w-5"
                          name={item.type}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={item.name}
                          className="font-semibold text-lg"
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-5 gap-5">
                <SubmitHandlerButton />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarkCCTSeva;

function SubmitHandlerButton() {
  const { state } = useGlobalState();
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <div className="flex justify-end">
          {state.theme.theme === "LIGHT" ? (
            <button
              disabled
              type="button"
              className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full py-2.5 px-5 justify-center text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
          )}
        </div>
      ) : (
        <button
          type="submit"
          className={`w-full font-medium rounded-lg text-sm px-6 py-2.5 text-center focus:ring-4 focus:outline-none ${
            state.theme.theme === "LIGHT"
              ? "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-300 "
              : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
          }`}
        >
          Submit
        </button>
      )}
    </div>
  );
}

function MenuOthersDropDown({
  setSelected,
  position,
  dataArr,
  selectedValue,
}: {
  setSelected: (value: { name: string; value: string }) => void;
  position?: string;
  dataArr: { name: string; value: string }[];
  selectedValue: string;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
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
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`text-lg border px-4 py-1.5 font-normal outline-none w-full flex items-center justify-between ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
            : "border-stone-700 bg-stone-900 focus:border-purple-300 focus:ring-4 focus:ring-purple-950"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedValue === "" ? "Select" : selectedValue}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-900 shadow-black"
          } border-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className={`flex flex-col overflow-y-auto `} role="none">
            {dataArr?.map((item, index) => (
              <li
                className={`py-2 ${
                  state.theme.theme === "LIGHT"
                    ? "hover:bg-gray-200"
                    : "hover:bg-stone-800"
                }`}
                key={index}
                onClick={() => {
                  setSelected(item);
                  setSelectedOption(item.name);
                  closeModal();
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
