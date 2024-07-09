import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useGlobalState } from "../context/state";
import data from "@/Counselors.json";
import { useCallback, useEffect, useRef, useState } from "react";

interface Counselor {
  PrabhujiName: any;
  PrabhujiPhone: any;
  MatajiName: any;
  MatajiPhone: any;
}

export default function RegistrationFormForAll({
  setCurrentCounselor,
}: {
  setCurrentCounselor: (value: string) => void;
}) {
  const { state } = useGlobalState();

  return (
    <div className="w-full py-2.5 mb-5 flex flex-col gap-3">
      <div
        className={`px-5 py-1.5 text-lg font-semibold rounded-t-lg ${
          state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-800"
        }`}
      >
        Please register yourself
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="firstName" className="font-bold text-lg">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="John"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="lastName" className="font-bold text-lg">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="Doe"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="age" className="font-bold text-lg">
          age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="23"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="gender" className="font-bold text-lg">
          gender
        </label>
        <input
          type="text"
          name="gender"
          id="gender"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="MALE"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="address" className="font-bold text-lg">
          Where do you live in pune
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="Pune City"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label className="font-bold text-lg">
          Select Current Counselor (Not Mandetory)
        </label>
        <MenuIconAndDropDown
          DataArr={data}
          setSelected={(value: string) => setCurrentCounselor(value)}
        />
      </div>
    </div>
  );
}
// data

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
        className={`flex items-center justify-between border px-2 py-2 rounded gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? `border-gray-300 bg-white focus:ring-purple-100 focus:border-purple-600 ${
                disabled ? "text-gray-400" : "text-black"
              }`
            : `border-stone-700 bg-stone-950 focus:ring-purple-950 focus:border-purple-600 ${
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
          } w-full rounded-lg shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
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
          <li
            className={`px-2 py-1.5 rounded-lg list-none ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100 "
                : "hover:bg-stone-700"
            }`}
            onClick={() => {
              setSelectedOption("Let Temple Decide");
              setSelected("");
              closeModal();
            }}
          >
            Let Temple Decide
          </li>
          {DataArr && DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item.PrabhujiName && item.MatajiName
                        ? `${item.PrabhujiName} & ${item.MatajiName}`
                        : `${item.PrabhujiName} ${item.MatajiName}`
                    );
                    selectedOptionFetch(item.PrabhujiPhone);

                    // console.log(item.PrabhujiPhone);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
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
