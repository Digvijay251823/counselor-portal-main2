"use client";
import { useGlobalState } from "@/Components/context/state";
import SubmitHandlerButton from "@/Components/utils/SubmitHandlerButton";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ScheduleSession({
  counselorId,
  response,
}: {
  counselorId: string;
  response: courses[];
}) {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [ModeofAttendance, setModeofAttendance] = useState("");
  const [startTimeDate, setStartTimeDate] = useState<any>("");
  const [startTime, setStartTime] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
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
  async function handleSubmit(e: FormData) {
    const datetimeConcatenated = handleDateTimeConcat();
    const courseId = selectedCourse;
    const name = e.get("name")?.toString();
    const description = e.get("description")?.toString();
    if (
      courseId === "" ||
      !name ||
      !description ||
      ModeofAttendance === "" ||
      !datetimeConcatenated
    ) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "please fill all the details" },
      });
      return;
    }
    const formData: any = {
      name: name,
      description: description,
      startTime: datetimeConcatenated,
      modeOfAttendance: ModeofAttendance,
      courseId: courseId,
      counselorId: counselorId,
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/counselor/schedulesession`, {
        headers: header,
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
        router.back();
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
      <div>
        <p className="pb-10 md:px-10 px-3 ">
          You should select a course and a session after selecting a course to
          schedule you own session
        </p>
        <div>
          <form
            action={handleSubmit}
            className={`mb-20 shadow-xl ${
              state.theme.theme === "LIGHT" ? "bg-stone-50" : "bg-stone-900"
            } bg-opacity-50 md:mx-10 mx-2`}
          >
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:p-5 p-2 justify-center">
              <div className={`flex flex-col gap-3 `}>
                <label htmlFor="" className="font-bold text-lg">
                  Select Course
                </label>
                <DropDownMenu
                  dataArr={response}
                  setSelected={(value) => setSelectedCourse(value)}
                />
              </div>
              <div className={`flex flex-col gap-3`}>
                <label htmlFor="name" className="font-bold text-lg">
                  Session Name
                </label>
                <input
                  name="name"
                  id="name"
                  className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between w-full lg:w-[400px] rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300 bg-white"
                      : "focus:ring-purple-950 focus:border-purple-300 border-stone-700 bg-stone-900 bg-opacity-10"
                  }`}
                />
              </div>
              <div className={`flex flex-col gap-3`}>
                <label htmlFor="description" className="font-bold text-lg">
                  Session Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between w-full lg:w-[400px] rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300 bg-white"
                      : "focus:ring-purple-950 focus:border-purple-300 border-stone-700 bg-stone-900 bg-opacity-10"
                  }`}
                />
              </div>
              <div className={`flex flex-col gap-5`}>
                <label
                  htmlFor="modeOfAttendance"
                  className="font-bold text-lg "
                >
                  Mode Of Attendance
                </label>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={ModeofAttendance === "ONLINE"}
                      onChange={() => setModeofAttendance("ONLINE")}
                      className="h-5 w-5"
                    />
                    <label className="font-bold text-lg">ONLINE</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={ModeofAttendance === "OFFLINE"}
                      onChange={() => setModeofAttendance("OFFLINE")}
                      className="h-5 w-5"
                    />
                    <label className="text-lg font-bold">OFFLINE</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={ModeofAttendance === "HYBRID"}
                      onChange={() => setModeofAttendance("HYBRID")}
                      className="h-5 w-5"
                    />
                    <div className="text-lg font-bold flex items-center">
                      HYBRID
                      <p className="text-xs text-gray-400">
                        (ONLINE & OFFLINE)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`flex flex-col gap-3`}>
                <label htmlFor="" className="font-bold text-lg">
                  Schedule At
                </label>
                <div className={`text-black font-bold`}>
                  <Calendar
                    onChange={(e) => setStartTimeDate(e?.toString())}
                    className={` rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "bg-white border-2 focus:ring-4"
                        : "bg-stone-900 text-white border-2 border-stone-800 focus:ring-4"
                    }`}
                    value={startTimeDate}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5">
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
            </div>

            <div className="flex justify-end p-5 gap-5">
              <button
                onClick={() => router.back()}
                type="button"
                className={`font-bold px-5 py-2 border rounded-lg focus:ring-4  ${
                  state.theme.theme === "LIGHT"
                    ? "bg-white border-gray-300 focus:ring-gray-300 hover:bg-gray-100"
                    : "bg-stone-800 border-stone-600 focus:ring-gray-600 hover:bg-stone-700"
                }`}
              >
                Cancel
              </button>
              <SubmitHandlerButton
                btnStyles={`font-bold bg-purple-600 text-white px-5 rounded-lg focus:ring-4 focus:ring-purple-500 hover:bg-purple-500`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ScheduleSession;

function DropDownMenu({
  dataArr,
  setSelected,
  position,
}: {
  setSelected: (value: any) => void;
  position?: string;
  dataArr: any;
  defaultValue?: any;
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
        className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between w-full lg:w-[400px] rounded-lg ${
          state.theme.theme === "LIGHT"
            ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300"
            : "focus:ring-purple-950 focus:border-purple-300 border-stone-700"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-950 shadow-black"
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
          <ul className={`flex flex-col gap-3 overflow-y-auto `} role="none">
            {dataArr?.map((item: courses, index: number) => (
              <li
                key={index}
                onClick={() => {
                  setSelected(item.id);
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
