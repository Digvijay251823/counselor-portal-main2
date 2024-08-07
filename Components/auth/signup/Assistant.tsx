import { useGlobalState } from "@/Components/context/state";
import SubmitHandlerButton from "@/Components/utils/SubmitHandlerButton";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AssistantSignUp() {
  const { state, dispatch } = useGlobalState();
  const [formState, setFormState] = useState<any>({
    firstName: "",
    lastName: "",
    initiatedName: "",
    phoneNumber: 0,
    gender: "",
    age: 0,
    email: "",
    maritalStatus: "",
    address: "",
    profession: "",
    yourInitiatingSpiritualMaster: "",
    harinamInitiationDate: "",
    harinamInitiationPlace: "",
    chantingStartedThisRoundsDate: "",
    chantingRounds: 0,
  });
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [chantingStartedThisRoundsDate, setChantingStartedThisRoundsDate] =
    useState<any>("");
  const [harinamInitiationDate, setHarinamInitiationDate] = useState<any>("");

  async function handleSubmit(e: FormData) {
    const password = e.get("password")?.toString();
    const Confirmpassword = e.get("Confirmpassword")?.toString();
    if (Confirmpassword !== password) {
      setErrors({
        password: "password and confirm password is not matching",
        Confirmpassword: "password and confirm password is not matching",
      });
    }
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(`/api/auth/assistant/signup/`, {
        method: "POST",
        headers,
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        const responseData = await response.json();
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
        payload: { type: "ERROR", message: error.message },
      });
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "password" || name === "Confirmpassword") {
      delete errors.password;
      delete errors.Confirmpassword;
    }
    if (name === "phoneNumber" && value.length > 10) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: "Contact number must be 10 digits",
      }));
      return;
    } else if (name === "age" && value.length < 1) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: "please enter you age",
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [name]: value,
    }));
  }

  return (
    <div>
      <h1 className="font-bold text-4xl p-10">
        Assistant Counselor Registration
      </h1>
      <div>
        <form action={handleSubmit} ref={formRef} className={"font-semibold"}>
          <p
            className={`md:px-20 px-8 py-5 border text-xl font-semibold mb-2 ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300"
                : "border-stone-800 bg-stone-900"
            }`}
          >
            Personal Info
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-20 px-5 gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="font-semibold flex items-center gap-1"
              >
                First Name <i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="font-semibold flex items-center gap-1"
              >
                Last Name<i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="initiatedName"
                className="font-semibold flex items-center gap-1"
              >
                Initiated Name
              </label>
              <input
                type="text"
                name="initiatedName"
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold flex items-center gap-1"
              >
                email
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phoneNumber"
                className="font-semibold flex items-center gap-1"
              >
                Phone Number<i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="gender"
                className="font-semibold flex items-center gap-1"
              >
                Gender<i className="text-red-400 text-xl">*</i>
              </label>
              <MenuIconAndDropDown
                DataArr={["MALE", "FEMALE"]}
                setSelected={(value) => {
                  const e: any = {
                    target: {
                      name: "gender",
                      value: value,
                    },
                  };
                  handleChange(e);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="age"
                className="font-semibold flex items-center gap-1"
              >
                Age<i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="number"
                name="age"
                value={formState.age}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="address"
                className="font-semibold flex items-center gap-1"
              >
                Address<i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="text"
                name="address"
                value={formState.address}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="profession"
                className="font-semibold flex items-center gap-1"
              >
                Profession<i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="text"
                name="profession"
                value={formState.profession}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
            </div>
          </div>
          <p
            className={`md:px-20 px-8 py-5 border text-xl font-semibold my-2 ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300"
                : "border-stone-800 bg-stone-900"
            }`}
          >
            Password Confirmation
          </p>
          <div className="grid md:grid-cols-2 grid-cols-1 md:px-20 px-10 gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-semibold flex items-center gap-1"
              >
                password<i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  errors?.password
                    ? state.theme.theme === "LIGHT"
                      ? "border-red-400 ring-4 ring-red-200 focus:border-red-500"
                      : "bg-stone-950 border-red-500 ring-red-950 focus:border-red-500"
                    : state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
              {errors.password && (
                <p className="text-red-500 font-semibold">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Confirmpassword"
                className="font-semibold flex items-center gap-1"
              >
                Confirm password<i className="text-red-400 text-xl">*</i>
              </label>
              <input
                type="password"
                name="Confirmpassword"
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  errors?.Confirmpassword
                    ? state.theme.theme === "LIGHT"
                      ? "border-red-400 ring-4 ring-red-200 focus:border-red-500"
                      : "bg-stone-950 border-red-500 ring-red-950 focus:border-red-500"
                    : state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
                required
              />
              {errors.Confirmpassword && (
                <p className="text-red-500 font-semibold">
                  {errors.Confirmpassword}
                </p>
              )}
            </div>
          </div>
          <p
            className={`md:px-20 px-8 py-5 border text-xl font-semibold my-2 ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300"
                : "border-stone-800 bg-stone-900"
            }`}
          >
            Spiritual Info
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-20 px-5 py-5 gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="chantingRounds"
                className="font-semibold flex items-center gap-1"
              >
                Chanting Rounds
              </label>
              <input
                type="number"
                name="chantingRounds"
                value={formState.chantingRounds}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="chantingStartedThisRoundsDate"
                className="font-semibold"
              >
                Chanting Started Date
              </label>
              <DatePicker
                selected={chantingStartedThisRoundsDate}
                onChange={(event: any) => {
                  const e: any = {
                    target: {
                      name: "chantingStartedThisRoundsDate",
                      value: event.toISOString(),
                    },
                  };
                  handleChange(e);
                  setChantingStartedThisRoundsDate(event.toISOString());
                }}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                name="chantingStartedThisRoundsDate"
                className={`px-4 py-1.5 border focus:ring-4 outline-none w-full rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="yourInitiatingSpiritualMaster"
                className="font-semibold"
              >
                Your Initiating Spiritual Master
              </label>
              <input
                type="text"
                name="yourInitiatingSpiritualMaster"
                value={formState.yourInitiatingSpiritualMaster}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="harinamInitiationDate"
                className="font-semibold flex items-center gap-1"
              >
                Harinam Initiating Date
              </label>
              <DatePicker
                selected={harinamInitiationDate}
                onChange={(e: any) => {
                  const event: any = {
                    target: {
                      name: "harinamInitiationDate",
                      value: e.toISOString(),
                    },
                  };
                  handleChange(event);
                  setHarinamInitiationDate(e.toISOString());
                }}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                name="harinamInitiationDate"
                className={`px-4 py-1.5 border focus:ring-4 outline-none w-full rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-5 py-5 px-5">
            <button
              className={`font-semibold border px-7 py-1.5 rounded-lg ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300"
                  : " border-stone-700"
              }`}
              onClick={() => formRef.current?.reset()}
            >
              Reset
            </button>
            <SubmitHandlerButton
              btnStyles={` px-7 py-1.5 rounded-lg font-semibold ${
                state.theme.theme === "LIGHT"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-700 text-white"
              }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

interface PropsMenu<T> {
  setSelected: (state: string) => void;
  DataArr?: T[];
  defaultVal?: string;
  position?: string;
  disabled?: boolean;
}

function MenuIconAndDropDown<T>({
  setSelected,
  DataArr,
  defaultVal,
  position,
  disabled = false,
}: PropsMenu<T>) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state, dispatch } = useGlobalState();
  const menuRef: any = useRef();
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

  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-lg gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? `border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600 ${
                disabled ? "text-gray-400" : "text-black"
              }`
            : `border-stone-800 bg-stone-950 focus:ring-blue-950 focus:border-blue-600 ${
                disabled ? "text-gray-400" : "text-while"
              }`
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
        disabled={disabled}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full shadow-lg rounded-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-800"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr && DataArr?.length > 0 ? (
            <ul className={`flex flex-col gap-3 overflow-y-auto `} role="none">
              {DataArr?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item}
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
