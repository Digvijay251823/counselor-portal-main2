import { useState } from "react";
import Modal from "./Modal";
import { useGlobalState } from "../context/state";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function WarningPage({
  isOpen,
  onClose,
  counselorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  counselorId?: string;
}) {
  const { state } = useGlobalState();
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`md:w-[400px] w-[80vw] px-5 rounded-[30px] shadow-xl ${
          state.theme.theme === "LIGHT"
            ? "flex justify-center bg-white "
            : "flex justify-center bg-stone-950"
        }`}
      >
        <div className="flex flex-col items-center py-10 ">
          <ExclamationTriangleIcon className="w-10 h-10 text-yellow-500" />
          <h1 className="text-2xl font-bold">Please Register</h1>
          <div className="text-center">Your Are Not Registered</div>
          <p className="text-center">Click Ok To Proceed For Registration</p>
          <div className="flex items-center pt-10 gap-5">
            <button
              onClick={onClose}
              className="border w-[100px] py-1.5 rounded"
            >
              Cancel
            </button>
            <button
              className="border w-[100px] bg-orange-500 border-orange-500 text-white py-1.5 rounded"
              onClick={() =>
                router.push(`/counselee/registeration/${counselorId}`)
              }
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
