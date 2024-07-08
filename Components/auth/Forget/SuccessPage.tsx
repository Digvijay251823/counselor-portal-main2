import { useGlobalState } from "@/Components/context/state";
import Modal from "@/Components/utils/Modal";
import React from "react";
import { BsFillSendCheckFill } from "react-icons/bs";

function SuccessPage({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state } = useGlobalState();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`flex flex-col items-center py-20 rounded-[40px] gap-10 px-5 shadow-2xl ${
          state.theme.theme === "LIGHT"
            ? "bg-white"
            : "bg-stone-900 shadow-black"
        }`}
      >
        <div>
          <p
            className={`flex justify-center p-8 rounded-full ${
              state.theme.theme === "LIGHT"
                ? "bg-stone-100 text-green-500"
                : "bg-stone-700 text-green-600"
            }`}
          >
            <BsFillSendCheckFill className="h-16 w-16 " />
          </p>
        </div>
        <div>
          <p className="text-blue-600 text-xl font-bold text-center">
            Reset Password Link has been sent to your email please check
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessPage;
