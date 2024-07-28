"use client";
import { FaPlus } from "react-icons/fa6";
import { useGlobalState } from "@/Components/context/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { useDebounce } from "use-debounce";

export default function SettingSessionExpiration({
  numberOfDays,
}: {
  numberOfDays: number;
}) {
  const { state, dispatch } = useGlobalState();
  const [expirationTime, setexpirationTime] = useState(numberOfDays);

  const handleSubmit = async (expirationTime: number) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(`/api/counselor/sessionexpiration`, {
        method: "POST",
        headers,
        body: JSON.stringify({ expirationTime: expirationTime }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setexpirationTime(expirationTime);
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
        payload: { message: error.message, type: "ERRROR" },
      });
    }
  };

  return (
    <div>
      <div
        className={`md:w-[400px] w-[90vw] border p-8 flex flex-col gap-3 rounded-[30px] shadow-lg ${
          state.theme.theme === "LIGHT"
            ? "border-stone-300 bg-stone-50"
            : "border-stone-700 bg-stone-900"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-[600] text-xl">Session Expiration Time </h1>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-red-500"
            onClick={() => {
              if (expirationTime > 2) {
                handleSubmit(expirationTime - 1);
              }
            }}
          >
            <FaMinus className="h-8 w-8" />
          </button>
          <p className="text-xl font-semibold">{expirationTime} Days</p>
          <button
            className="text-green-500"
            onClick={() => {
              if (expirationTime < 6) {
                handleSubmit(expirationTime + 1);
              }
            }}
          >
            <FaPlus className="h-8 w-8" />
          </button>
        </div>
        <p className="text-sm text-gray-500">
          The Session Expiration feature simplifies the process of managing the
          expiration time in days for each session to allow your counselee to
          mark their attendance after session
        </p>
      </div>
    </div>
  );
}
