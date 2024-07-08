"use client";
import { SERVER_URL } from "@/Components/config/config";
import { useGlobalState } from "@/Components/context/state";
import CopyClipBoard from "@/Components/utils/CopyToClipBoard";
import DateFormatter from "@/Components/utils/DateFormatter";
import { LinksActivator } from "@/Components/utils/LinksActivator";
import Modal from "@/Components/utils/Modal";
import QRCodeOverlay from "@/Components/utils/QRCodeOverlay";
import QRCodeSmall from "@/Components/utils/QRCodeSmall";
import { PUT } from "@/actions/POSTREQUESTS";
import { ClockIcon } from "@heroicons/react/16/solid";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiFillSchedule } from "react-icons/ai";

function MeetingsPage({ response }: { response: sessions[] }) {
  const { state } = useGlobalState();
  const linksActivator = LinksActivator().toString();
  return (
    <div>
      <div>
        <div className="flex justify-end">
          <Link href={"cbmmeetings/schedule"}>
            <button className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 gap-2 md:mx-10">
              <p>
                <AiFillSchedule className="h-5 w-5" />
              </p>
              <p>Schedule</p>
            </button>
          </Link>
        </div>
        <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
          <div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
                    <th className={`px-6 py-3`}>UPDATED DATE</th>
                    <th className={`px-6 py-3`}>RESCHEDULE</th>
                    <th className={`px-6 py-3`}>LINK</th>
                  </tr>
                </thead>
                <tbody>
                  {response?.map((session, index) => (
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
                        {!session.expired ? (
                          <div className="p-2 flex justify-center">
                            <Reschedule session={session} />
                          </div>
                        ) : (
                          <div className="text-gray-500">Expired</div>
                        )}
                      </td>
                      <td className={`px-4 py-1.5`}>
                        <div className="p-2 flex justify-center ">
                          {!session.expired ? (
                            <div className="flex gap-5">
                              <CopyClipBoard
                                url={`${linksActivator}/markattendance/cct/${session.id}`}
                                NotCopied={
                                  <div className="flex items-center">
                                    <i>Copy</i>
                                    <i>
                                      <ClipboardDocumentCheckIcon className="h-5 w-5" />
                                    </i>
                                  </div>
                                }
                                whenCopied={
                                  <div className="flex items-center">
                                    <i>Copy</i>
                                    <i>
                                      <ClipboardDocumentIcon className="h-5 w-5" />
                                    </i>
                                  </div>
                                }
                              />
                              <Link
                                href={`${linksActivator}/markattendance/cct/${session.id}`}
                              >
                                <p className="underline text-blue-500 text-lg">
                                  Link
                                </p>
                              </Link>
                              <QRCodeSmall
                                url={`${linksActivator}/markattendance/cct/${session.id}`}
                                content="CBM Meetings Attendance"
                              />
                            </div>
                          ) : (
                            <div className="text-gray-500">Expired</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingsPage;

function Reschedule({ session }: { session: sessions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState<any>("");
  const [startTimeDate, setStartTimeDate] = useState<any>("");
  const { state, dispatch } = useGlobalState();

  const handleDateTimeConcat = () => {
    if (startTimeDate !== "" && startTime !== "") {
      const selectedDate = new Date(startTimeDate);
      const [hours, minutes] = startTime.split(":").map(Number);
      selectedDate.setHours(hours);
      selectedDate.setMinutes(minutes);

      return selectedDate.toISOString();
    } else {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "please select date and time" },
      });
      return null;
    }
  };

  async function updateDetails(e: FormData) {
    const concatenatedStartTime = handleDateTimeConcat();
    const formData: any = {
      startTime:
        concatenatedStartTime && new Date(concatenatedStartTime).toISOString(),
    };
    try {
      const Header = new Headers();
      const response = await fetch(`/api/cct/reschedulemeeting/${session.id}`, {
        method: "PUT",
        headers: Header,
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
    <div>
      <button
        type="button"
        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 gap-2"
        onClick={() => setIsOpen(true)}
      >
        <AiFillSchedule className="w-5 h-5" />
        Reschedule
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          className={`md:p-10 rounded-xl shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-900 shadow-black"
          }`}
        >
          <div className="md:py-0 py-10">
            <form action={updateDetails}>
              <div>
                <div className="font-bold text-3xl text-center pb-6">
                  StartTime
                </div>
                <Calendar
                  value={startTimeDate}
                  onChange={(e) => setStartTimeDate(e?.toString())}
                  className={` rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "bg-white border"
                      : "bg-stone-900 text-black border border-stone-800"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label htmlFor="Time" className="text-lg font-bold">
                  Time
                </label>
                <input
                  type="time"
                  id="Time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between  ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300 bg-white"
                      : "focus:ring-purple-950 focus:border-purple-300 border-stone-700 bg-stone-900 bg-opacity-10"
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
                    className={`border border-dashed h-0.5 w-full ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-400"
                        : "border-stone-600"
                    }`}
                  ></p>
                  <p>OR</p>
                  <p
                    className={`border border-dashed h-0.5 w-full ${
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
