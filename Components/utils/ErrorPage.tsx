"use client";
import React from "react";
import { useGlobalState } from "../context/state";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
function ErrorComponent({ message }: { message: string }) {
  const { state } = useGlobalState();
  return (
    <div
      className={`h-screen flex flex-col items-center justify-center w-screen gap-5 ${
        state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
      }`}
    >
      <p className="font-bold text-4xl text-center">
        <ExclamationCircleIcon className="h-10 w-10" />
      </p>
      <p className="font-bold text-4xl text-center">{message}</p>
      <p className="text-lg">Please Check Your Internet Connection</p>
    </div>
  );
}

export default ErrorComponent;
