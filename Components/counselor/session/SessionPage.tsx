"use client";
import { SERVER_URL } from "@/Components/config/config";
import { useGlobalState } from "@/Components/context/state";
import DateFormatter from "@/Components/utils/DateFormatter";
import Modal from "@/Components/utils/Modal";
import { PUT } from "@/actions/POSTREQUESTS";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiFillSchedule } from "react-icons/ai";
import DeleteSession from "./DeleteSession";

function SessionPage({ response }: { response: sessions[] }) {
  const { state } = useGlobalState();
  const [sessionArray, setSessionArray] = useState<sessions[]>([]);
  useEffect(() => {
    setSessionArray(response);
  }, [response]);

  return (
    <div>
      <div>
        <div className="flex justify-end mt-5">
          <Link href={"sessions/schedule"}>
            <button className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text px-3 py-2 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 gap-2 md:mx-10">
              <p>
                <AiFillSchedule className="h-5 w-5" />
              </p>
              <p>Schedule</p>
            </button>
          </Link>
        </div>
        <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
          <div>
            <div
              className={`overflow-x-auto shadow-md sm:rounded-lg border ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-400"
                  : "border-stone-700"
              }`}
            >
              <table
                className={`w-full text-left rtl:text-right ${
                  state.theme.theme === "LIGHT"
                    ? `text-black`
                    : `text-stone-200`
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
                    <th className={`px-6 py-3`}>NAME</th>
                    <th className={`px-6 py-3`}>DESCRIPTION</th>
                    <th className={`px-6 py-3`}>STARTTIME</th>
                    <th className={`px-6 py-3`}>CREATED DATE</th>
                    <th className={`px-6 py-3`}>LAST UPDATED</th>
                    <th className={`px-6 py-3`}>ACTIONS</th>
                    <th className={`px-6 py-3`}>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionArray?.length > 0 ? (
                    sessionArray?.map((session, index) => (
                      <tr
                        key={index}
                        className={
                          state.theme.theme === "LIGHT"
                            ? `bg-white border-b  hover:bg-stone-50`
                            : `border-b hover:bg-stone-600 bg-stone-800 border-stone-700`
                        }
                      >
                        <td className={`px-4 py-1.5`}>{session.name}</td>
                        <td className={`px-4 py-1.5`}>{session.description}</td>
                        <td className={`px-4 py-1.5`}>
                          {session.startTime ? (
                            <DateFormatter dateString={session.startTime} />
                          ) : (
                            ""
                          )}
                        </td>
                        <td className={`px-4 py-1.5`}>
                          {session.createdAt ? (
                            <DateFormatter dateString={session.createdAt} />
                          ) : (
                            ""
                          )}
                        </td>
                        <td className={`px-4 py-1.5`}>
                          {session.updatedAt ? (
                            <DateFormatter dateString={session.updatedAt} />
                          ) : (
                            ""
                          )}
                        </td>
                        <td className={`px-4 py-1.5`}>
                          <div className="p-2 flex justify-center">
                            <Reschedule session={session} />
                          </div>
                        </td>
                        <td className={`px-4 py-1.5`}>
                          <div>
                            {session.expired ? (
                              <div className="text-gray-400">Expired</div>
                            ) : (
                              <DeleteSession
                                sessionData={session}
                                deletedSession={(value: sessions) => {
                                  setSessionArray((prev) =>
                                    prev.filter((item) => item.id !== value.id)
                                  );
                                }}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={20}>
                        <div className="text-center py-10 text-gray-400">
                          No Sessions To Show
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionPage;

function Reschedule({ session }: { session: sessions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState<any>("");
  const { state, dispatch } = useGlobalState();

  async function updateDetails(e: FormData) {
    const formData: any = {
      startTime: new Date(startTime).toISOString(),
    };
    try {
      const header = new Headers();
      const response = await fetch(
        `/api/counselor/schedulesession/${session.id}`,
        {
          method: "PUT",
          headers: header,
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        if (response.status === 404) {
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "ERROR", message: "Rescheduled Successfully" },
          });
        }
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
    <div>
      <button
        type="button"
        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg px-2 py-2 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 gap-2"
        onClick={() => setIsOpen(true)}
      >
        <AiFillSchedule className="w-5 h-5" />
        Reschedule
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          className={`md:p-10 rounded-xl ${
            state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
          }`}
        >
          <div className="md:py-0 py-10">
            <form action={updateDetails}>
              <div>
                <div className="font-bold text-3xl text-center pb-6">
                  StartTime
                </div>
                <Calendar
                  value={startTime}
                  onChange={(e) => setStartTime(e?.toString())}
                  className={` rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "bg-white border"
                      : "bg-stone-900 text-black border border-stone-800"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center justify-center pt-10 gap-3">
                <button
                  type="submit"
                  className={`bg-purple-600 text-white px-5 py-2 text-lg w-[200px]`}
                >
                  Submit
                </button>
                <div className="flex items-center w-[200px] gap-3">
                  <p
                    className={`border h-0.5 w-full ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-400"
                        : "border-stone-600"
                    }`}
                  ></p>
                  <p>OR</p>
                  <p
                    className={`border h-0.5 w-full ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-400"
                        : "border-stone-600"
                    }`}
                  ></p>
                </div>
                <button
                  type="submit"
                  className={`text-purple-600 border border-purple-600 px-5 py-2 text-lg w-[200px]`}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
