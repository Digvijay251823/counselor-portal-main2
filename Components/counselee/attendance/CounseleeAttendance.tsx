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
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { HiUsers } from "react-icons/hi";
import RegistrationFormForAll from "../RegistrationFormForAll";

function CounseleeAttendance({ response }: { response: sessions[] }) {
  const [selectedSession, setSelectedSession] = useState("");
  const [onFocusPhone, setOnFocusPhone] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [counseleeDetails, setCounseleeDetails] = useState<any>({});
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const { counselorid } = useParams();

  useEffect(() => {
    if (phoneNumber.length === 10) {
      (async () => {
        try {
          const response = await fetch(`/api/counslee/${phoneNumber}`);
          if (response.ok) {
            const responseData = await response.json();
            setCounseleeDetails(responseData.content.content);
          } else {
            if (response.status === 404) {
              localStorage.setItem("PHONE_NUMBER", phoneNumber.toString());
              setOpenRegistration(true);
            }
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
      })();
    }
  }, [phoneNumber]);

  async function handleSubmitCounselor(e: FormData) {
    const phonenumber = e.get("phonenumber")?.valueOf();
    if (!phonenumber) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "please enter you phone number" },
      });
      return null;
    }
    try {
      const response = await fetch(`/api/counslee/${phonenumber}`);
      if (response.ok) {
        const responseData = await response.json();
        setCounseleeDetails(responseData.content.content);
      } else {
        if (response.status === 404) {
          localStorage.setItem("PHONE_NUMBER", phonenumber.toString());
          router.push("/counselee/registeration");
        }
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

  async function IfNotRegisteredSubmitAttendance(e: FormData) {
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const age = e.get("age")?.toString();
    const gender = e.get("gender")?.toString();
    const address = e.get("address")?.toString();
    const formDataParticipantRegistration = {
      firstName,
      lastName,
      age,
      gender,
      address,
      phoneNumber,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const responseParticipant = await fetch(`/api/counslee/register`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formDataParticipantRegistration),
      });
      if (!responseParticipant.ok) {
        const responseData = await responseParticipant.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "ERROR" },
        });
        return;
      }

      const responseCounselee = await fetch(`/api/counslee/${phoneNumber}`);
      if (!responseCounselee.ok) {
        if (responseCounselee.status === 404) {
          localStorage.setItem("PHONE_NUMBER", phoneNumber.toString());
          setOpenRegistration(true);
          return;
        }
        const errorData = await responseCounselee.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
        return;
      }
      const responseData = await responseCounselee.json();
      setCounseleeDetails(responseData.content.content);
      //submitting attendance

      const formData: any = {
        scheduledSessionId: selectedSession,
        counseleeId: responseData?.content?.content?.id,
        counselorId: counselorid,
      };
      if (
        !formData.scheduledSessionId ||
        !formData.counseleeId ||
        !formData.counselorId
      ) {
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            type: "ERROR",
            message: "neccessory fields are not present to mark attendance",
          },
        });
        return;
      }
      const response = await fetch("/api/counslee/attendance", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: responseData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
  }

  async function handleSubmitAttendance(e: FormData) {
    const formData: any = {
      scheduledSessionId: selectedSession,
      counseleeId: counseleeDetails.id,
      counselorId: counselorid,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch("/api/counslee/attendance", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: responseData.message },
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
    <div className="w-full">
      <div className="md:px-10 md:pt-20 md:pb-10 px-5 pt-10 pb-5">
        <h1 className="text-4xl font-bold">Attendance</h1>
        <p>Looks like you have not marked your attendance yet, please do so</p>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center w-full">
          <form
            action={handleSubmitCounselor}
            className="md:w-[500px] mx-2 mb-10 "
          >
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
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder="7879859267"
                className={`w-full px-4 py-3 outline-none ${
                  state.theme.theme === "LIGHT" ? "bg-white " : "bg-stone-950 "
                }`}
              />
            </div>
          </form>
        </div>
        {Object.keys(counseleeDetails).length > 0 && (
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
                {counseleeDetails?.initiatedName ? (
                  <p className="text-gray-500 text-xl font-bold">
                    {counseleeDetails?.initiatedName}
                  </p>
                ) : (
                  <p className="text-purple-500 text-xl font-bold">{`${counseleeDetails.firstName} ${counseleeDetails.lastName}`}</p>
                )}
              </div>
              <button
                className={`flex items-center gap-2 mt-5 ${
                  state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-900"
                } px-4 py-2`}
              >
                <PencilSquareIcon className="h-5 w-5" />
                update details
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center w-full">
        <div
          className={`md:mx-10 mx-3 mb-20 md:w-[80vw] w-[90vw] p-5 rounded-2xl shadow-xl ${
            state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
          }`}
        >
          <form
            action={
              openRegistration
                ? handleSubmitAttendance
                : IfNotRegisteredSubmitAttendance
            }
          >
            {openRegistration && (
              <div>
                <RegistrationFormForAll />
              </div>
            )}
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col gap-5">
                {!counseleeDetails?.currentCounselor ? (
                  <h1 className="text-lg font-bold text-red-500 text-center">
                    You Have Not Been Alloted a counselor
                  </h1>
                ) : (
                  <div className="flex md:flex-row flex-col items-center md:gap-5">
                    <div className="flex items-center gap-4">
                      <p
                        className={`w-max p-2 rounded-full ${
                          state.theme.theme === "LIGHT"
                            ? "bg-gray-50"
                            : "bg-stone-800"
                        }`}
                      >
                        <HiUsers />
                      </p>
                      <p className="font-bold text-xl">Current Counselor:</p>
                    </div>
                    <p className="font-semibold text-lg">
                      {counseleeDetails?.currentCounselor?.initiatedName
                        ? counseleeDetails?.currentCounselor?.initiatedName
                        : `${counseleeDetails?.currentCounselor?.firstName} ${counseleeDetails?.currentCounselor?.lastName}`}
                    </p>
                  </div>
                )}

                <div className="">
                  <h1 className="font-bold text-lg">Select Session</h1>
                  {response?.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <div
                        className={`bg-gray-50 w-full p-2 flex items-center gap-3`}
                      >
                        <input
                          type="checkbox"
                          name={item.name}
                          onChange={(e) => setSelectedSession(item.id)}
                          checked={item.id === selectedSession}
                          id={item.name}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={item.name}
                          className="font-bold text-lg"
                        >
                          {item.name}
                        </label>
                      </div>
                      <div className="flex items-center font-semibold">
                        scheduled At :
                        <DateFormatter dateString={item.startTime} />
                      </div>
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
    </div>
  );
}

export default CounseleeAttendance;

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
