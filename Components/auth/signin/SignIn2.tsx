"use client";
import { useGlobalState } from "@/Components/context/state";
import Link from "next/link";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PasswordToggleComp from "./PasswordToggle";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import LogoComponent from "@/Components/utils/icons/Logo";
import { FaMagnifyingGlass } from "react-icons/fa6";
import LogoMain from "@/Components/utils/icons/LogoMain";
interface Counseler {
  PrabhujiName: any;
  PrabhujiPhone: any;
  MatajiName: any;
  MatajiPhone: any;
}

const Signin: React.FC<{ response: Counseler[] }> = ({ response }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  const [selectedCounselor, setSelectedCounselor] = useState({});
  const [password, setPassword] = useState("");
  const [remembered, setRemembered] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const router = useRouter();

  const { state, dispatch } = useGlobalState();

  const handleSubmit = async (e: FormData) => {
    // const email = e.get("email")?.toString();
    // const passwordInput = e.get("password")?.toString();

    try {
      //   const formData: any = { email, password: passwordInput };
      const formData: any = { phoneNumber };
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.counselor.role === "cct") {
          router.push("/cct/counselee");
        } else {
          router.push("/counselor/counselee");
        }
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData?.message },
        });
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData?.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: error.message },
      });
    }
  };

  return (
    <section
      className={
        state.theme.theme === "LIGHT"
          ? `bg-stone-50 w-full`
          : ` bg-stone-900 w-full`
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
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action={handleSubmit}>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="phoneNumber"
                  className={`block mb-2 text-sm font-medium `}
                >
                  Your PhoneNumber
                </label>
                <MenuIconAndDropDownDevotees
                  DataArr={response}
                  setSelected={(value) => {
                    setSelectedCounselor(value);
                    setPhoneNumber(
                      value.PrabhujiPhone
                        ? value.PrabhujiPhone
                        : value.MatajiPhone
                        ? value.MatajiPhone
                        : ""
                    );

                    setFormData((prev: any) => {
                      const updatedFormData: any = { ...prev }; // Make a copy of previous form data
                      if (value) {
                        updatedFormData.prabhujiName = value.PrabhujiName;
                        updatedFormData.prabhujiPhone = value.PrabhujiPhone;
                        updatedFormData.matajiName = value.MatajiName;
                        updatedFormData.matajiPhone = value.MatajiPhone;
                      }
                      return updatedFormData;
                    });
                  }}
                />
                {/* <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`border sm:text-sm rounded-lg block w-full p-2.5 focus:ring-4 outline-none ${
                    state.theme.theme === "LIGHT"
                      ? "bg-stone-50 border-stone-300 text-stone-900 focus:ring-purple-100 focus:border-purple-500"
                      : "bg-stone-700 border-stone-600 placeholder-stone-400  focus:ring-purple-950 focus:border-purple-500"
                  }`}
                  placeholder="8080359815"
                  required
                /> */}
                {/* <input
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
                /> */}
              </div>
              {/* <PasswordToggleComp
                password={password}
                setPassword={(password: string) => setPassword(password)}
              /> */}
              <div className="flex items-center justify-between">
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      checked={remembered}
                      onChange={() => setRemembered(!remembered)}
                      className={`w-4 h-4 border rounded ${
                        state.theme.theme === "LIGHT"
                          ? "border-stone-300  bg-stone-50 focus:ring-3 focus:ring-purple-300"
                          : "bg-stone-700 border-stone-600 focus:ring-purple-600 ring-offset-stone-800"
                      }`}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember">Remember me</label>
                  </div>
                </div> */}
                {/* <Link href={"/auth/forgetpassword"}>
                  <p className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-500">
                    Forgot password?
                  </p>
                </Link> */}
              </div>
              <SubmitHandlerButton />
              {/* <p className="text-sm font-light text-stone-500 dark:text-stone-400">
                Don’t have an account yet?{" "}
                <Link
                  href={"/auth/signup"}
                  className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                >
                  Sign up
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

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
          Sign in
        </button>
      )}
    </div>
  );
}

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: any[];
  defaultVal?: string;
  position?: string;
};

function MenuIconAndDropDownDevotees({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: PropsMenu) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const [onFocusPhone, setOnFocusPhone] = useState(false);
  const menuRef: any = useRef();
  const params = useParams();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
  const [isClosing, setIsClosing] = useState(false);
  const { state } = useGlobalState();

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    toggleSelection(true);
    setSelectedOption(e.target.value);
    if (isNaN(Number(e.target.value))) {
      router.push(`/auth/signin?query=${e.target.value}`);
    } else {
      router.push(`/auth/signin?query=${Number(e.target.value)}`);
    }
  }
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div
        className={`flex items-center gap-5 border sm:text-sm rounded-lg w-full p-2.5 focus:ring-4 outline-none ${
          state.theme.theme === "LIGHT"
            ? "bg-stone-50 border-stone-300 text-stone-900 focus:ring-purple-100 focus:border-purple-500"
            : "bg-stone-700 border-stone-600 placeholder-stone-400  focus:ring-purple-950 focus:border-purple-500"
        }`}
      >
        <FaMagnifyingGlass />
        <input
          type="text"
          className={`w-full outline-none ${
            state.theme.theme === "LIGHT" ? "bg-white " : "bg-stone-700 "
          }`}
          onFocus={() => setOnFocusPhone(true)}
          onBlur={() => setOnFocusPhone(false)}
          onChange={handleChange}
          value={selectedOption}
          placeholder="Search . . . "
        />
      </div>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg z-[1000] ${
            state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
          } border-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto custom-scrollbar ${
                DataArr.length > 10 ? "md:h-[30vh] h-[40vh]" : "h-full"
              }`}
              role="none"
            >
              {DataArr?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      `${item.PrabhujiName} & ${item.MatajiName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100"
                      : "hover:bg-stone-800"
                  }`}
                >
                  {item.PrabhujiName && item.MatajiName
                    ? `${item.PrabhujiName} & ${item.MatajiName}`
                    : `${item.PrabhujiName} ${item.MatajiName}`}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
