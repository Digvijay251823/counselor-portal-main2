"use client";
import { useGlobalState } from "@/Components/context/state";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useParams, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  NOR as NORComponent,
  F8RCT as F8RCTComponent,
  N8RCT as N8RCTComponent,
  WUT as WUTComponent,
  ST as STComponent,
  PBR as PBRComponent,
  BNR as BNRComponent,
  PCH as PCHComponent,
  GCH as GCHComponent,
  CH as CHComponent,
  S as SComponent,
  AA as AAComponent,
  MIU as MIUComponent,
  T as TComponent,
  VS as VSComponent,
  FormListItems,
} from "@/Components/counselor/sadhana/configure/ConfigSadhanaForm";
import { HiUsers } from "react-icons/hi";
import SubmitHandlerButton from "@/Components/utils/SubmitHandlerButton";
import { POST } from "@/actions/POSTREQUESTS";
import { SERVER_URL } from "@/Components/config/config";
import SuccessPage from "../SuccessPage";
import { useFormStatus } from "react-dom";
import RegistrationFormForAll from "../RegistrationFormForAll";
import { FaMagnifyingGlass } from "react-icons/fa6";
import WarningPage from "@/Components/utils/WarningPage";
interface FieldTypeFormList {
  id: number;
  type: string;
  valueType: string;
  functionName: string;
  databaseField: string;
}

function SadhanaForm({
  counselorId,
  sadhanaForm,
  counseleeList,
}: {
  counseleeList: counselee[];
  counselorId: string;
  sadhanaForm?: any;
}) {
  const [onFocusPhone, setOnFocusPhone] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const { state, dispatch } = useGlobalState();
  const [counseleeDetails, setCounseleeDetails] = useState<any>({});
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [currentCounselor, setCurrentCounselor] = useState("");
  const [warning, setWarning] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sadhanaFormData, setSadhanaFormData] = useState("");
  const [visibleSadhana, setvisibleSadhana] = useState<any>("");
  const [attendedArthi, setAttendedArthi] = useState<any>("");

  useEffect(() => {
    if (phoneNumber.length === 10) {
      (async () => {
        try {
          const response = await fetch(`/api/counslee/${phoneNumber}`);
          if (response.ok) {
            const responseData = await response.json();
            setOpenRegistration(false);
            setCounseleeDetails(responseData.content.content);
          } else {
            if (response.status === 404) {
              setWarning(true);
              localStorage.setItem("PHONE_NUMBER", phoneNumber.toString());
              return;
            }
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
      })();
    } else {
      setOpenRegistration(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (!sadhanaForm) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "no sadhana configuration found", type: "ERROR" },
      });
      return;
    }
    const filteredArrForChecked = FormListItems.filter(
      (item) => sadhanaForm[item?.databaseField] === true
    );
    setCheckedItems(filteredArrForChecked);
  }, [sadhanaForm]);

  const handleShare = (text: any) => {
    // Encode the message for URL
    let message = `*!!Sadhana Submitted* \n \n *${counseleeDetails.firstName}${counseleeDetails.lastName}* \n \n`;
    for (const key in text) {
      if (
        Object.hasOwnProperty.call(text, key) &&
        key !== "programId" &&
        key !== "participantId"
      ) {
        message += `*${key}*: ${text[key]}\n`; // Wrapping keys in asterisks for bold formatting
      }
    }
    setSadhanaFormData(message);
  };
  const params = useParams();

  async function handleSubmitSadhana(e: FormData) {
    const formDataObject: any = {
      counselorId: counselorId,
      counseleeId: counseleeDetails.id,
      sadhanaDate: new Date(),
    };
    checkedItems.forEach((value: FieldTypeFormList) => {
      if (value.valueType === "Time") {
        formDataObject[value.databaseField] =
          e.get(value.databaseField)?.toString() + ":00";
      } else if (value.valueType === "Number") {
        formDataObject[value.databaseField] = Number(
          e.get(value.databaseField)?.toString()
        );
      } else {
        formDataObject[value.databaseField] = e
          .get(value.databaseField)
          ?.toString();
      }
    });
    console.log(formDataObject);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/counslee/sadhana`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formDataObject),
      });
      if (response.ok) {
        const responseData = await response.json();
        setFormData(formDataObject);
        handleShare(formDataObject);
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "SUCCESS" },
        });
      } else {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "ERROR" },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: error.message || "something unexpected happened",
          type: "ERROR",
        },
      });
    } finally {
      setCounseleeDetails({});
    }
  }
  return (
    <div className="w-full">
      <div className="md:px-10 md:pt-20 md:pb-10 px-5 pt-10 pb-5">
        <h1 className="text-4xl font-bold">Sadhana</h1>
        <p>We are trying to track your spiritual growth</p>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center w-full">
          <form className="md:w-[500px] mx-2 mb-10 flex flex-col">
            <label htmlFor="phonenumber" className="font-bold text-xl">
              Enter PhoneNumber / Your Name
            </label>
            <MenuIconAndDropDownDevotees
              DataArr={counseleeList}
              onPhoneNumberChange={(value: string) => setPhoneNumber(value)}
              setSelected={(value) => setCounseleeDetails(value)}
            />
            {/* <div
              className={`flex items-center )w-full border transition-all duration-500 ${
                onFocusPhone
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "ring-4 border-purple-700 ring-purple-100"
                        : "ring-4 border-purple-300 ring-purple-950"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300"
                        : "border-stone-800"
                    }`
              }`}
              onFocus={() => setOnFocusPhone(true)}
              onBlur={() => setOnFocusPhone(false)}
            >
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder="7879859267"
                className={`w-full px-4 py-3 outline-none ${
                  state.theme.theme === "LIGHT" ? "bg-white " : "bg-stone-950 "
                }`}
              />
            </div> */}
          </form>
        </div>
      </div>
      {Object.keys(counseleeDetails).length > 0 && (
        <>
          <div className="flex flex-col items-center my-5">
            <h1 className="font-bold text-3xl">Hare Krishna!!</h1>
            <div className="flex items-center gap-2">
              <p
                className={`rounded-full p-1.5 ${
                  state.theme.theme === "LIGHT"
                    ? "bg-gray-100 "
                    : "bg-stone-900"
                }`}
              >
                <UserIcon className="h-5 w-5" />
              </p>
              {counseleeDetails?.initiatedName ? (
                <p className="text-gray-500 text-xl font-bold">
                  {counseleeDetails?.initiatedName}
                </p>
              ) : (
                <p className="text-purple-500 text-xl font-bold">{`${counseleeDetails.firstName} ${counseleeDetails.lastName}`}</p>
              )}
            </div>
            <button
              className={`flex items-center gap-2 mt-5 ${
                state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-900"
              } px-4 py-2`}
            >
              <PencilSquareIcon className="h-5 w-5" />
              update details
            </button>
          </div>
        </>
      )}

      <div className="flex justify-center w-full">
        <div
          className={`md:mx-10 mx-3 mb-20 md:w-[80vw] w-[90vw] p-5 rounded-2xl shadow-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-900 bg-opacity-40"
          }`}
        >
          {counseleeDetails?.currentCounselor && (
            <div className="flex md:flex-row flex-col items-center md:gap-5">
              <div className="flex items-center gap-4">
                <p
                  className={`w-max p-2 rounded-full ${
                    state.theme.theme === "LIGHT"
                      ? "bg-gray-50"
                      : "bg-stone-800"
                  }`}
                >
                  <HiUsers />
                </p>
                <p className="font-bold text-xl">Current Counselor:</p>
              </div>
              <p className="font-semibold text-lg">
                {counseleeDetails?.currentCounselor?.initiatedName
                  ? counseleeDetails?.currentCounselor?.initiatedName
                  : `${counseleeDetails?.currentCounselor?.firstName} ${counseleeDetails?.currentCounselor?.lastName}`}
              </p>
            </div>
          )}
          <form action={handleSubmitSadhana} className={`mt-10`}>
            <div className="flex flex-col gap-5">
              {checkedItems.map((item, index) => {
                switch (item.functionName) {
                  case "NOR":
                    return (
                      <NORComponent key={index} label={"Number of Rounds "} />
                    );
                  // case "EJRB8A":
                  //   return (
                  //     <EJRB8AComponent
                  //       key={index}
                  //       label={"Early Japa rounds before 8 AM "}
                  //     />
                  //   );
                  // case "AJRA8A":
                  //   return (
                  //     <AJRA8AComponent
                  //       key={index}
                  //       label={"Early Japa rounds after 8 AM "}
                  //     />
                  //   );
                  case "F8RCT":
                    return (
                      <F8RCTComponent
                        key={index}
                        label={"First 8 rounds completed time "}
                      />
                    );
                  case "N8RCT":
                    return (
                      <N8RCTComponent
                        key={index}
                        label={"Next 8 rounds completed time "}
                      />
                    );
                  case "WUT":
                    return <WUTComponent key={index} label={"Wake up time "} />;
                  case "ST":
                    return <STComponent key={index} label={"Sleep time "} />;
                  case "PBR":
                    return (
                      <PBRComponent
                        key={index}
                        label={"Prabhupada Book Reading Time(in minutes)"}
                      />
                    );
                  case "BNR":
                    return (
                      <BNRComponent key={index} label={"Book Name Reading"} />
                    );
                  case "PCH":
                    return (
                      <PCHComponent
                        key={index}
                        label={"Prabhupada Class Hearing Time(in minutes)"}
                      />
                    );
                  case "GCH":
                    return (
                      <GCHComponent
                        key={index}
                        label={"Guru Maharaj Class Hearing Time(in minutes)"}
                      />
                    );
                  case "CH":
                    return (
                      <CHComponent
                        key={index}
                        label={"Class Hearing Time(in minutes)"}
                      />
                    );
                  case "S":
                    return <SComponent key={index} label={"Speaker Name"} />;
                  case "AA":
                    return (
                      <AAComponent
                        key={index}
                        label={"Attended Arthi"}
                        onChange={(value: {
                          target: { name: any; value: any };
                        }) => setAttendedArthi(value)}
                      />
                    );
                  case "T":
                    return <TComponent key={index} label={"Topic"} />;
                  case "VS":
                    return (
                      <VSComponent
                        key={index}
                        label={"Visible Sadhana"}
                        onChange={(value: {
                          target: { name: any; value: any };
                        }) => setvisibleSadhana(value)}
                      />
                    );
                  case "MIU":
                    return (
                      <MIUComponent
                        key={index}
                        label={"Mobile/Internet-Usage"}
                      />
                    );
                  // Add more cases as needed
                  default:
                    return null;
                }
              })}
            </div>
            <div className="mt-10">
              <SubmitHandlerButton btnStyles="font-medium rounded-lg px-5 py-1.5 text-center me-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-800 inline-flex items-center text-white text-lg" />
            </div>
          </form>
        </div>
      </div>
      <SuccessPage isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
      <WarningPage
        isOpen={warning}
        onClose={() => setWarning(false)}
        counselorId={counselorId}
      />
    </div>
  );
}

export default SadhanaForm;

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: any[];
  onPhoneNumberChange: (value: string) => void;
  defaultVal?: string;
  position?: string;
};

function MenuIconAndDropDownDevotees({
  setSelected,
  DataArr,
  onPhoneNumberChange,
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
      router.push(
        `/counselee/sadhana/${params.counselorid}?query=${e.target.value}`
      );
    } else {
      onPhoneNumberChange(e.target.value);
      router.push(
        `/counselee/sadhana/${params.counselorid}?query=${Number(
          e.target.value
        )}`
      );
    }
  }
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div
        className={`flex items-center w-full border transition-all duration-500 px-5 ${
          onFocusPhone
            ? `${
                state.theme.theme === "LIGHT"
                  ? "ring-4 border-purple-700 ring-purple-100"
                  : "ring-4 border-purple-300 ring-purple-950"
              }`
            : `${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300"
                  : "border-stone-800"
              }`
        }`}
      >
        <FaMagnifyingGlass />
        <input
          type="text"
          className={`w-full px-4 py-3 outline-none ${
            state.theme.theme === "LIGHT" ? "bg-white " : "bg-stone-950 "
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
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10 ? "md:h-[60vh] h-[80vh]" : "h-full"
              }`}
              role="none"
            >
              {DataArr?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item.initiatedName
                        ? item.initiatedName
                        : `${item.firstName} ${item.lastName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } hover:bg-gray-100`}
                >
                  {item.initiatedName
                    ? `${item.initiatedName} | ${item.phoneNumber}`
                    : `${item.firstName} ${item.lastName} | ${item.phoneNumber}`}
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
