"use client";
import { useGlobalState } from "@/Components/context/state";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import SuccessPage from "./SuccessPage";
import { MdOutlineLockOpen } from "react-icons/md";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function ResetPassword({ resettoken }: { resettoken: string }) {
  const { state, dispatch } = useGlobalState();
  const [newPassword, setNewPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  async function handleresetToken(e: FormData) {
    const token = resettoken;
    if (reenteredPassword !== newPassword) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "both passwords should match" },
      });
      return null;
    }
    const formData: any = {
      token,
      newPassword,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/auth/resetpassword`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    } finally {
      setNewPassword("");
      setReenteredPassword("");
    }
  }
  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center ${
        state.theme.theme === "LIGHT" ? `bg-stone-50` : ` bg-stone-900`
      }`}
    >
      <div className="mb-6 flex flex-col items-center">
        <h1 className={`flex items-center text-2xl font-bold `}>Portal</h1>
        <p className="text-lg">Counselor</p>
      </div>
      <div
        className={`w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ${
          state.theme.theme === "LIGHT"
            ? "bg-white border"
            : "dark:bg-stone-800 border dark:border-stone-700"
        }`}
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex flex-col items-center justify-center ">
            <p
              className={`p-3 rounded-full mb-5 ${
                state.theme.theme === "LIGHT" ? "bg-stone-100" : "bg-stone-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </p>
            <h1
              className={`text-xl font-bold leading-tight md:text-2xl tracking-tight `}
            >
              Recover Password
            </h1>
          </div>
          <form
            className="max-w-sm mx-auto md:w-[500px] w-[90vw] flex flex-col gap-5"
            action={handleresetToken}
          >
            <PasswordToggleComp
              name={"newPassword"}
              password={newPassword}
              setPassword={(value) => setNewPassword(value)}
            />
            <PasswordToggleComp
              name={"ConfirmPassword"}
              password={reenteredPassword}
              setPassword={(value) => setReenteredPassword(value)}
            />
            <SubmitHandlerButton />
          </form>
        </div>
      </div>
      <SuccessPage isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
    </div>
  );
}

export default ResetPassword;

function SubmitHandlerButton() {
  const { state } = useGlobalState();
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <div className="flex justify-end">
          {state.theme.theme === "LIGHT" ? (
            <button
              disabled
              type="button"
              className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full py-2.5 px-5 justify-center text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
          )}
        </div>
      ) : (
        <button
          type="submit"
          className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none ${
            state.theme.theme === "LIGHT"
              ? "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-300 "
              : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
          }`}
        >
          Reset password
        </button>
      )}
    </div>
  );
}

function PasswordToggleComp({
  name,
  password,
  setPassword,
}: {
  name: string;
  password: string;
  setPassword: (value: string) => void;
}) {
  const { state } = useGlobalState();
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <div className="relative">
      <label htmlFor={name} className={`block mb-2 text-sm font-medium `}>
        {name}
      </label>
      <input
        type={togglePassword ? "text" : "password"}
        name={name}
        id={name}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className={`border sm:text-sm rounded-lg block w-full p-2.5 focus:ring-4 outline-none ${
          state.theme.theme === "LIGHT"
            ? "bg-stone-50 border-stone-300 text-stone-900 focus:ring-purple-100 focus:border-purple-500"
            : "bg-stone-700 border-stone-600 placeholder-stone-400  focus:ring-purple-950 focus:border-purple-500"
        }`}
        required
      />
      <p
        className="absolute top-10 right-0 mx-5"
        onClick={() => setTogglePassword(!togglePassword)}
      >
        {!togglePassword ? (
          <EyeIcon className="h-5 w-5" />
        ) : (
          <EyeSlashIcon className="h-5 w-5" />
        )}
      </p>
    </div>
  );
}
