import { useGlobalState } from "@/Components/context/state";
import Modal from "@/Components/utils/Modal";
import {
  ExclamationTriangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function DeleteSession({
  sessionData,
  deletedSession,
}: {
  sessionData: sessions;
  deletedSession: (value: sessions) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useGlobalState();
  async function handleDelete() {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(
        `/api/counselor/schedulesession/${sessionData.id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        deletedSession(sessionData);
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
        payload: { type: "SUCCESS", message: error.message },
      });
    }
  }
  return (
    <div>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-red-500 font-bold border border-red-500 px-2 py-1.5 rounded hover:bg-red-500 hover:text-white"
        >
          <TrashIcon className="h-5 w-5" />
          Delete
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          className={`shadow-lg rounded-[30px] ${
            state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
          }`}
        >
          <div className="md:w-[400px] w-[80vw] p-5 py-10 ">
            <div className="flex flex-col items-center gap-6">
              <ExclamationTriangleIcon className="h-10 w-10" />
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg">
                  Do You Really Want To Delete
                </p>
                <p className="text-center">
                  Deleting this session can break your pace of counselling
                </p>
              </div>
              <div className="flex items-center gap-5">
                <button
                  className="font-bold border px-6 py-1.5 rounded hover:opacity-60"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="font-bold px-6 py-1.5 rounded bg-red-500 hover:opacity-60"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
