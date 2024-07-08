import React from "react";
import Modal from "../utils/Modal";
import { useGlobalState } from "../context/state";
import { CheckIcon } from "@heroicons/react/16/solid";

function SuccessPage({
  message,
  isOpen,
  onClose,
}: {
  message?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state } = useGlobalState();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <div
          className={`p-5 rounded-[40px] shadow-2xl ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-900 shadow-black"
          }`}
        >
          <div className="flex flex-col items-center gap-5 ">
            <p
              className={`text-green-500 p-3 rounded-full border shadow-lg ${
                state.theme.theme === "LIGHT"
                  ? "bg-white border-gray-300"
                  : "bg-stone-950 border-stone-700"
              }`}
            >
              <CheckIcon className="h-10 w-10" />
            </p>
            <p className="text-2xl font-bold">{message}</p>
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="w-[200px] bg-blue-700 font-semibold text-lg text-white py-2 rounded-lg"
              onClick={onClose}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessPage;
