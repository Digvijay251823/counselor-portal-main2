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
interface Counseler {
  PrabhujiName: any;
  PrabhujiPhone: any;
  MatajiName: any;
  MatajiPhone: any;
}

function MarkCBMAttendance({
  response,
  data,
}: {
  response: sessions;
  data: Counseler[];
}) {
  const [selectedCounselor, setSelectedCounselor] = useState<any>({});
  // const [onFocusPhone, setOnFocusPhone] = useState(false);
  const [counseleeDetails, setCounseleeDetails] = useState<any>({});
  const [ModeOfAttendance, setModeOfAttendance] = useState("OFFLINE");
  // const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({});
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch(`/api/cct/phone/${phoneNumber}`);
  //       if (response.ok) {
  //         const responseData = await response.json();
  //         setCounseleeDetails(responseData.content.content);
  //       } else {
  //         if (response.status === 404) {
  //           localStorage.setItem("PHONE", phoneNumber);
  //           dispatch({
  //             type: "SHOW_TOAST",
  //             payload: {
  //               type: "ERROR",
  //               message: "Participant Not Found",
  //             },
  //           });
  //         }
  //         const errorData = await response.json();
  //         dispatch({
  //           type: "SHOW_TOAST",
  //           payload: {
  //             type: "ERROR",
  //             message: errorData.message || errorData.statusText,
  //           },
  //         });
  //       }
  //     } catch (error: any) {
  //       dispatch({
  //         type: "SHOW_TOAST",
  //         payload: { type: "ERROR", message: error.message },
  //       });
  //     }
  //   })();
  // }, [phoneNumber]);
  const handleSearch = async (phoneNumber: string) => {
    try {
      const response = await fetch(`/api/cct/phone/${phoneNumber}`);
      if (response.ok) {
        const responseData = await response.json();
        setCounseleeDetails(responseData.content.content);
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
  };

  async function handleSubmitAttendance(e: FormData) {
    if (!response) {
      return;
    }
    const formData: any = {
      cbmmeetingId: response.id,
      counselorId: counseleeDetails.id,
      modeOfAttendance: ModeOfAttendance,
    };
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch("/api/cct/attendance", {
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
        const errroData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errroData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div className="md:px-10 md:pt-20 md:pb-10 px-5 pt-10 pb-5 ">
        <h1 className="md:text-4xl text-2xl font-bold">
          CBM Meeting Attendance
        </h1>
        <p className="text-gray-500">
          Select One Values Each as we are tracking the family details
        </p>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center w-full">
          <form className="md:w-[500px] mx-2 mb-10 flex flex-col gap-3">
            <label htmlFor="phonenumber" className="font-bold text-xl">
              Phone Number
            </label>
            <MenuIconAndDropDownDevotees
              DataArr={data}
              setSelected={(value) => {
                setSelectedCounselor(value);
                handleSearch(
                  value.PrabhujiPhone
                    ? value.PrabhujiPhone
                    : value.MatajiPhone
                    ? value.MatajiPhone
                    : ""
                );
                setFormData((prev) => {
                  const updatedFormData: any = { ...prev }; // Make a copy of previous form data
                  if (value) {
                    updatedFormData.prabhujiName = value.PrabhujiName;
                    updatedFormData.prabhujiPhone = value.PrabhujiPhone;
                    updatedFormData.matajiName = value.MatajiName;
                    updatedFormData.matajiPhone = value.MatajiPhone;
                  }
                  return updatedFormData;
                });
              }}
            />
          </form>
        </div>
        {Object.keys(counseleeDetails).length > 0 && (
          <>
            <div className="flex flex-col items-center my-5">
              <h1 className="font-bold md:text-3xl text-2xl">Hare Krishna!!</h1>
              <div className="flex items-center gap-2 px-5">
                <p
                  className={`rounded-full p-1.5 ${
                    state.theme.theme === "LIGHT"
                      ? "bg-gray-100 "
                      : "bg-stone-900"
                  }`}
                >
                  <UserIcon className="h-5 w-5" />
                </p>
                {selectedCounselor.PrabhujiName &&
                selectedCounselor.MatajiName ? (
                  <p className="text-gray-500 text-lg font-bold">
                    {`${selectedCounselor.PrabhujiName} & ${selectedCounselor.MatajiName}`}
                  </p>
                ) : (
                  <p className="text-purple-500 text-lg font-bold">{`${selectedCounselor.PrabhujiName} ${selectedCounselor.MatajiName}`}</p>
                )}
                {/* {counseleeDetails?.initiatedName ? (
                  <p className="text-gray-500 text-xl font-bold">
                    {counseleeDetails?.initiatedName}
                  </p>
                ) : (
                  <p className="text-purple-500 text-xl font-bold">{`${counseleeDetails.firstName} ${counseleeDetails.lastName}`}</p>
                )} */}
              </div>
            </div>
          </>
        )}
      </div>

      {Object.keys(counseleeDetails).length > 0 && (
        <div className="flex justify-center w-full">
          <div
            className={`md:mx-10 mx-3 mb-20 md:w-[50vw] w-[90vw] p-5 rounded-2xl shadow-xl ${
              state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
            }`}
          >
            <form action={handleSubmitAttendance}>
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col items-center gap-5">
                  <p
                    className={`font-bold text-xl border px-4 rounded-full py-1.5 ${
                      state.theme.theme === "LIGHT"
                        ? "border-black"
                        : "border-white"
                    }`}
                  >
                    {response?.name}
                  </p>
                  <div className="flex items-center gap-2 font-bold md:w-[400px] ">
                    <p>Scheduled At - </p>
                    <div>
                      {response && (
                        <DateFormatter dateString={response.startTime} />
                      )}
                    </div>
                  </div>
                  <div className="md:w-[400px] w-full">
                    <p className="font-bold text-xl">Mode Of Attendance</p>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="online"
                          id="ONLINE"
                          onChange={() => setModeOfAttendance("ONLINE")}
                          checked={"ONLINE" === ModeOfAttendance}
                          className="w-5 h-5"
                        />
                        <label htmlFor="ONLINE" className="font-semibold">
                          ONLINE
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="online"
                          id="OFFLINE"
                          onChange={() => setModeOfAttendance("OFFLINE")}
                          checked={"OFFLINE" === ModeOfAttendance}
                          className="w-5 h-5"
                        />
                        <label htmlFor="OFFLINE" className="font-semibold">
                          OFFLINE
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-5 gap-5">
                <SubmitHandlerButton />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarkCBMAttendance;

function SubmitHandlerButtonCounselor() {
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
          className="bg-purple-600 rounded font-bold text-lg px-4 py-1.5 mr-1 text-white flex items-center gap-2"
          type="submit"
          disabled={pending}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </button>
      )}
    </div>
  );
}

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

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: any[];
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
  const [onFocusPhone, setOnFocusPhone] = useState(false);
  const menuRef: any = useRef();
  const params = useParams();
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
  const { state } = useGlobalState();

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
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    toggleSelection(true);
    setSelectedOption(e.target.value);
    if (isNaN(Number(e.target.value))) {
      router.push(
        `/markattendance/cct/${params.meetingid}?query=${e.target.value}`
      );
    } else {
      router.push(
        `/markattendance/cct/${params.meetingid}?query=${Number(
          e.target.value
        )}`
      );
    }
  }
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div
        className={`flex items-center w-full border transition-all duration-500 px-5 ${
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
      >
        <FaMagnifyingGlass />
        <input
          type="text"
          className={`w-full px-4 py-3 outline-none ${
            state.theme.theme === "LIGHT" ? "bg-white " : "bg-stone-950 "
          }`}
          onFocus={() => setOnFocusPhone(true)}
          onBlur={() => setOnFocusPhone(false)}
          onChange={handleChange}
          value={selectedOption}
          placeholder="Search . . . "
        />
      </div>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg z-[1000] ${
            state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
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
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10 ? "md:h-[60vh] h-[80vh]" : "h-full"
              }`}
              role="none"
            >
              {DataArr?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      `${item.PrabhujiName} & ${item.MatajiName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } hover:bg-gray-100`}
                >
                  {item.PrabhujiName && item.MatajiName
                    ? `${item.PrabhujiName} & ${item.MatajiName}`
                    : `${item.PrabhujiName} ${item.MatajiName}`}
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
