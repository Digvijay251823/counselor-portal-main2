"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "./state";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Modal from "../utils/Modal";

function Toast() {
  const { state, dispatch } = useGlobalState();
  // useEffect(() => {
  //   if (state.toast.toast.isVisible) {
  //     setTimeout(() => {
  //       dispatch({ type: "HIDE_TOAST" });
  //     }, 3000);
  //   }
  // }, [state.toast.toast.isVisible, dispatch]);

  return (
    <Modal
      isOpen={state.toast.toast.isVisible}
      onClose={() => dispatch({ type: "HIDE_TOAST" })}
    >
      {state.toast.toast.type === "LOADING" ? (
        <div className="flex items-center">
          <i>Loading</i>
          <div className="flex items-center">{state.toast.toast.message}</div>
        </div>
      ) : state.toast.toast.type === "SUCCESS" ? (
        <div
          className={`flex flex-col items-center md:gap-5 gap-3 shadow-lg px-10 py-5 rounded-[30px] ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-900 shadow-black"
          }`}
        >
          <i className="bg-green-600 p-1 rounded-full text-white">
            <CheckIcon className="h-12 w-12" />
          </i>
          <div className="flex items-center text-2xl font-bold">
            {state.toast.toast.message}
          </div>

          <button
            className="w-[100px] bg-orange-600 text-white py-2 rounded-lg"
            onClick={() => dispatch({ type: "HIDE_TOAST" })}
          >
            OK
          </button>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center md:gap-5 gap-3 shadow-lg px-10 py-5 rounded-[30px] ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-900 shadow-black"
          }`}
        >
          <i className="bg-red-600 p-2 rounded-full text-white">
            <XMarkIcon className="h-8 w-8" />
          </i>
          <div className="flex items-center text-2xl font-bold">
            {state.toast.toast.message}
          </div>
          <button
            className="w-[100px] bg-orange-600 text-white py-2 rounded-lg"
            onClick={() => dispatch({ type: "HIDE_TOAST" })}
          >
            OK
          </button>
        </div>
      )}
    </Modal>
  );
}

export default Toast;
