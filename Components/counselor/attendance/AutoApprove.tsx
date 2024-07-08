import { useGlobalState } from "@/Components/context/state";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  role: string;
  autoApprove: boolean;
}

function AutoApprove() {
  const [autoApprove, setAutoApprove] = useState(false);

  useEffect(() => {
    const autoapprove = localStorage.getItem("autoApprove");
    if (autoapprove === "true") {
      setAutoApprove(JSON.parse(autoapprove));
    }
  }, []);
  const { state, dispatch } = useGlobalState();
  async function handleAutoApprove() {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(`/api/autoapprove`, {
        method: "POST",
        headers: headers,
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
        localStorage.setItem("autoApprove", "true");
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: errorData.message },
        });
        localStorage.removeItem("autoApprove");
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
      <div
        className={`inline-flex items-center md:gap-4 gap-2 md:px-2 px-1 py-2 font-medium text-center rounded-lg border focus:ring-4 ${
          state.theme.theme === "LIGHT"
            ? "border-stone-200"
            : "border-stone-800 "
        }`}
      >
        <input
          type="checkbox"
          name="AutoApprove"
          id="AutoApprove"
          onChange={handleAutoApprove}
          className="h-5 w-5"
          checked={autoApprove}
        />
        <label htmlFor="AutoApprove">AutoApprove</label>
      </div>
    </div>
  );
}

export default AutoApprove;
