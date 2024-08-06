"use client";
import { useGlobalState } from "@/Components/context/state";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChildrenAdd from "./ChildrenAdd";
import SubmitHandlerButton from "../utils/SubmitHandlerButton";

interface FormInterface {
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: number;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  harinamInitiationPlace: string;
  comments: string;
  currentCounselor: string;
  connectedToCounselorSinceYear: string;
  spouce: string;
  children: [
    {
      name: string;
      age: number;
    }
  ];
}

export default function PlanningToRelocate() {
  const { state, dispatch } = useGlobalState();
  const [formState, setFormState] = useState<any>({
    firstName: "",
    lastName: "",
    initiatedName: "",
    phoneNumber: "",
    gender: "MALE",
    age: 0,
    email: "",
    maritalStatus: "UNMARRIED",
    address: "",
    profession: "",
    yourInitiatingSpiritualMaster: "",
    harinamInitiationDate: "",
    legalNameOfSpouce: "",
    harinamInitiationPlace: "",
    chantingRounds: 0,
    chantingStartedThisRoundsDate: "",
    recommendedBy: "",
    comments: "",
    whenwanttorelocate: "",
    whereplannedtolive: "",
    expectedsupportfromtemple: "",
    children: [
      {
        name: "",
        age: 0,
      },
    ],
  });

  const [errors, setErrors] = useState([]);
  const [chantingStartedThisRoundsDate, setChantingStartedThisRoundsDate] =
    useState<any>("");
  const [harinamInitiationDate, setHarinamInitiationDate] = useState<any>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "phoneNumber" && value.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Contact number must be 10 digits",
      }));
    } else if (name === "age" && value.length < 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "please enter you age",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormData) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/counslee/planningrelocate/`, {
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
        payload: { type: "SUCCESS", message: error.message },
      });
    }
  }

  return (
    <div>
      <div className="p-10">
        <h1 className="font-bold text-4xl ">Planning To Relocate To Pune?</h1>
        <p>Please Fill The Form If You Are Planning To Relocate To Pune</p>
      </div>
      <div>
        <form action={handleSubmit} className="font-semibold">
          <p
            className={`md:px-20 px-8 py-5 border text-xl font-semibold mb-2 ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300"
                : "border-stone-800 bg-stone-900"
            }`}
          >
            Important Info
          </p>
          <div className="flex flex-col md:px-20 px-5 py-5 gap-5">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="whenwanttorelocate" className="font-semibold">
                  When Do You Want To Relocate To Pune
                </label>
                <input
                  type="text"
                  value={formState.whenwanttorelocate}
                  onChange={handleChange}
                  name="whenwanttorelocate"
                  className={`px-4 py-1.5 border focus:ring-4 outline-none w-full rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                      : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                  }`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="whereplannedtolive" className="font-semibold">
                  Where Did You Planned To Live In Pune
                </label>
                <input
                  type="text"
                  name="whereplannedtolive"
                  value={formState.whereplannedtolive}
                  onChange={handleChange}
                  className={`px-4 py-1.5 border focus:ring-4 outline-none w-full rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                      : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="expectedsupportfromtemple"
                className="font-semibold"
              >
                What kind of support/help are you looking from
                Temple/Congregation
              </label>
              <textarea
                name="expectedsupportfromtemple"
                value={formState.expectedsupportfromtemple}
                onChange={(e) => {
                  const field: any = {
                    target: {
                      name: e.target.name,
                      value: e.target.value,
                    },
                  };
                  handleChange(field);
                }}
                className={`px-4 py-1.5 border focus:ring-4 outline-none w-full rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>
          </div>
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
              <label htmlFor="firstName" className="font-semibold">
                First Name
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
              <label htmlFor="lastName" className="font-semibold">
                Last Name
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
              <label htmlFor="initiatedName" className="font-semibold">
                Initiated Name
              </label>
              <input
                type="text"
                name="initiatedName"
                value={formState.initiatedName}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="font-semibold">
                Phone Number
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
              <label htmlFor="gender" className="font-semibold">
                Gender
              </label>
              <MenuIconAndDropDown
                DataArr={["MALE", "FEMALE"]}
                setSelected={(value) => console.log(value)}
                defaultVal="MALE"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="age" className="font-semibold">
                Age
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
              <label htmlFor="address" className="font-semibold">
                Address
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
              <label htmlFor="profession" className="font-semibold">
                Profession
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
            Family Info
          </p>
          <div className="md:px-20 px-8">
            <div className="flex flex-col gap-2 my-5">
              <label htmlFor="maritalStatus" className="font-semibold">
                Marital Status
              </label>
              <MenuIconAndDropDown
                defaultVal="UNMARRIED"
                DataArr={["UNMARRIED", "MARRIED"]}
                setSelected={(e) => console.log(e)}
              />
            </div>
            {formState.maritalStatus === "MARRIED" && (
              <>
                <div className="flex flex-col gap-2 my-5">
                  <label htmlFor="profession" className="font-semibold">
                    Legal Name Of Spouce (If Applicable)
                  </label>
                  <input
                    type="text"
                    name="legalNameOfSpouce"
                    value={formState.legalNameOfSpouce}
                    onChange={handleChange}
                    className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                        : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="profession" className="font-semibold">
                    Childrens
                  </label>
                  <ChildrenAdd
                    formData={formState}
                    setFormState={setFormState}
                  />
                </div>
              </>
            )}
            <div className="flex flex-col gap-2 my-5">
              <label htmlFor="recommendedBy" className="font-semibold">
                recommendedBy
              </label>
              <input
                type="text"
                name="recommendedBy"
                value={formState.recommendedBy}
                onChange={handleChange}
                className={`px-4 py-1.5 border focus:ring-4 outline-none rounded-lg ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                    : "bg-stone-950 border-stone-800 focus:ring-blue-950 focus:border-blue-500"
                }`}
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
            Spiritual Info
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-20 px-5 py-5 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="chantingRounds" className="font-semibold">
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
                onChange={(e: any) =>
                  setChantingStartedThisRoundsDate(e.toISOString())
                }
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
              <label htmlFor="harinamInitiationDate" className="font-semibold">
                Harinam Initiating Date
              </label>
              <DatePicker
                selected={harinamInitiationDate}
                onChange={(e: any) => setHarinamInitiationDate(e.toISOString())}
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

  async function selectedOptionFetch(phoneNumber: string) {
    try {
      const response = await fetch(`/api/counselor/phone/${phoneNumber}`);

      if (response.ok) {
        const responseData = await response.json();
        const counselorId = responseData?.content?.id;
        setSelected(counselorId);
      } else {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: "not able to find counselor" },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
  }
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
                    selectedOptionFetch(item);
                    // console.log(item.PrabhujiPhone);
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
