"use client";

import { useGlobalState } from "@/Components/context/state";
import Link from "next/link";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import PasswordToggleComp from "./PasswordToggle";
import LogoComponent from "@/Components/utils/icons/Logo";
import LogoMain from "@/Components/utils/icons/LogoMain";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useGlobalState();

  const handleSubmit = async (e: FormData) => {
    const phoneNumber = e.get("phoneNumber")?.toString();
    const email = e.get("email")?.toString();
    const passwordInput = e.get("password")?.toString();
    try {
      const formData: any = { phoneNumber, email, password: passwordInput };
      const headers = new Headers();
      const response = await fetch(`/api/auth/signup`, {
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
    }
  };

  return (
    <section
      className={
        state.theme.theme === "LIGHT"
          ? `bg-stone-50 min-h-screen py-10`
          : ` bg-stone-900 min-h-screen py-10`
      }
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="mb-6 flex flex-col items-center">
          <LogoMain height={50} width={50} />
          <LogoComponent />
        </div>
        <div
          className={`w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ${
            state.theme.theme === "LIGHT"
              ? "bg-white border"
              : "dark:bg-stone-800 border dark:border-stone-700"
          }`}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className={`text-xl font-bold leading-tight md:text-2xl tracking-tight `}
            >
              Sign up to your account
            </h1>

            <form className="space-y-4 md:space-y-6" action={handleSubmit}>
              <div>
                <label
                  htmlFor="phone-input"
                  className={`block mb-2 text-sm font-medium `}
                >
                  Phone number:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className={`w-4 h-4 ${
                        state.theme.theme === "LIGHT"
                          ? "text-stone-500"
                          : "text-stone-400"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 19 18"
                    >
                      <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="phone-input"
                    name="phoneNumber"
                    aria-describedby="helper-text-explanation"
                    className={`border  text-sm rounded-lg block w-full ps-10 p-2.5 outline-none focus:ring-4 ${
                      state.theme.theme === "LIGHT"
                        ? "bg-stone-50 border-stone-300 text-stone-900 focus:ring-purple-100 focus:border-purple-500"
                        : "bg-stone-700 border-stone-600 placeholder-stone-400 text-white focus:ring-purple-500 focus:border-purple-500"
                    }`}
                    placeholder="123-456-7890"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium `}
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`border sm:text-sm rounded-lg block w-full p-2.5 focus:ring-4 outline-none ${
                    state.theme.theme === "LIGHT"
                      ? "bg-stone-50 border-stone-300 text-stone-900 focus:ring-purple-100 focus:border-purple-500"
                      : "bg-stone-700 border-stone-600 placeholder-stone-400  focus:ring-purple-950 focus:border-purple-500"
                  }`}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <PasswordToggleComp
                password={password}
                setPassword={(password: string) => setPassword(password)}
              />

              <SubmitHandlerButton />
              <p className="text-sm font-light text-stone-500 dark:text-stone-400">
                Already have an account?{" "}
                <Link
                  href={"/auth/signin"}
                  className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

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
              className="w-full py-2.5 px-5 justify-center text-sm font-medium text-stone-900 bg-white rounded-lg border border-stone-200 hover:bg-stone-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-600 dark:hover:text-white dark:hover:bg-stone-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-stone-200 animate-spin dark:text-stone-600"
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
          Sign up
        </button>
      )}
    </div>
  );
}
