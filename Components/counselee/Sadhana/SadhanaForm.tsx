"use client";
import { useGlobalState } from "@/Components/context/state";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, usePathname, useRouter } from "next/navigation";
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
import SuccessPage from "../SuccessPage";
import { FaMagnifyingGlass } from "react-icons/fa6";
import WarningPage from "@/Components/utils/WarningPage";
import CopyClipBoard from "@/Components/utils/CopyToClipBoard";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/utils/Modal";
import { LinksActivator } from "@/Components/utils/LinksActivator";
interface FieldTypeFormList {
  id: number;
  type: string;
  valueType: string;
  functionName: string;
  databaseField: string;
}

function formatDate(date: Date) {
  // Extract day, month, and year components
  const dateObject = new Date(date);
  const day = dateObject.getDate().toString().padStart(2, "0"); // Ensure two-digit day
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = dateObject.getFullYear().toString().slice(2); // Get last two digits of the year

  // Format the date as DD-MM-YY
  return `${day}-${month}-${year}`;
}

function SadhanaForm({
  currentCounselor,
  counselorId,
  sadhanaForm,
  counseleeList,
}: {
  currentCounselor?: counselor;
  counseleeList: counselee[];
  counselorId: string;
  sadhanaForm?: any;
}) {
  console.log(currentCounselor);
  const [isSuccess, setIsSuccess] = useState(false);
  const [SubmittedSuccess, setSubmittedSuccess] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const [sadhanaDate, setSadhanaDate] = useState<any>(new Date());
  const [sadhanaDateToShow, setSadhanaDateToShow] = useState<any>();
  const { state, dispatch } = useGlobalState();
  const pathname = usePathname();
  const [counseleeDetails, setCounseleeDetails] = useState<any>({});
  const [warning, setWarning] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sadhanaFormData, setSadhanaFormData] = useState("");
  const [visibleSadhana, setvisibleSadhana] = useState<any>("");
  const [attendedArthi, setAttendedArthi] = useState<any>("");
  const linksActivator = LinksActivator();
  const formRef = useRef<HTMLFormElement>(null);

  console.log(counseleeDetails);

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
  const name =
    counseleeDetails?.initiatedName &&
    counseleeDetails?.initiatedName !== "NA" &&
    counseleeDetails?.initiatedName !== "Na" &&
    counseleeDetails?.initiatedName !== "No" &&
    counseleeDetails?.initiatedName !== "no" &&
    counseleeDetails?.initiatedName !== "na"
      ? counseleeDetails?.initiatedName
      : counseleeDetails.firstName && counseleeDetails.lastName
      ? `${counseleeDetails.firstName} ${counseleeDetails.lastName}`
      : `${counseleeDetails.firstName || counseleeDetails.lastName}`;

  const handleShare = (text: any) => {
    // Encode the message for URL
    let message = `*!!Sadhana Submitted* \n \n *${name}* \n \n`;
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

  async function handleSubmitSadhana(e: FormData) {
    if (Object.keys(counseleeDetails).length === 0) {
      return;
    }
    const formDataObject: any = {
      counselorId: counselorId,
      counseleeId: counseleeDetails.id,
      sadhanaDate: sadhanaDate,
    };

    checkedItems.forEach((value: FieldTypeFormList) => {
      console.log(value);
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

    const formDataObjectShare: any = {
      ...formDataObject,
      sadhanaDate: sadhanaDateToShow
        ? formatDate(sadhanaDateToShow)
        : formatDate(new Date()),
      sadhanaLink: `${linksActivator}/${pathname}`,
    };
    delete formDataObjectShare.counseleeId;
    delete formDataObjectShare.counselorId;

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
        setSubmittedSuccess(true);
        setFormData(formDataObjectShare);
        handleShare(formDataObjectShare);
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
      // formRef.current?.reset();
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
            <p className="mb-5">
              If You Dont Find Your Name Try Entering Your Full Contact Number
            </p>
            <MenuIconAndDropDownDevotees
              DataArr={counseleeList}
              onPhoneNumberChange={(value: string) => setPhoneNumber(value)}
              setSelected={(value) => setCounseleeDetails(value)}
            />
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
              {counseleeDetails?.initiatedName &&
              counseleeDetails?.initiatedName !== "NA" &&
              counseleeDetails?.initiatedName !== "Na" &&
              counseleeDetails?.initiatedName !== "na" ? (
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
          {currentCounselor && (
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
                <p className="font-bold text-xl">Counselor:</p>
              </div>
              <p className="font-semibold text-lg">
                {currentCounselor.initiatedName}
              </p>
            </div>
          )}
          <form action={handleSubmitSadhana} className={`mt-10`} ref={formRef}>
            <div className="flex flex-col py-5 gap-2">
              <label htmlFor="sadhanaDate" className="font-bold text-lg">
                Sadhana Date
              </label>
              <DatePicker
                selected={sadhanaDate}
                onChange={(date) => {
                  setSadhanaDateToShow(date?.toISOString().toString());
                  setSadhanaDate(date);
                }}
                placeholderText="enter the date of sadhana"
                className={`text-lg border px-4 py-1.5 font-normal outline-none w-full flex items-center justify-between ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-300 bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    : "border-stone-700 bg-stone-900 focus:border-purple-300 focus:ring-4 focus:ring-purple-950"
                }`}
              />
            </div>
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
                      <BNRComponent
                        key={index}
                        label={"Which book are you reading?"}
                      />
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
      <Modal
        isOpen={SubmittedSuccess}
        onClose={() => setSubmittedSuccess(false)}
      >
        <div
          className={`flex flex-col items-center p-5 rounded-[40px]  ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <p className="text-red-600 font-bold text-xl">Preview Message</p>
          <div className="p-5 flex flex-col gap-2 md:max-w-[40vw] max-w-[80vw]">
            <p className="font-bold">Sadhana Submitted</p>
            <p className="font-semibold w-full">{`Name : ${name}`}</p>
            <div>
              {Object.keys(formData).map((key) => (
                <p key={key} className="mb-2">
                  <span className="font-bold">{key}:</span> {formData[key]}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 py-5">
            {" "}
            <button
              onClick={() => {
                const encodedMessage = encodeURIComponent(sadhanaFormData);
                // Construct the shareable link
                const shareableLink = `whatsapp://send?text=${encodedMessage}`;
                // Open the shareable link in a new window
                window.open(shareableLink);
              }}
              className={`flex items-center border px-4 py-1.5 ${
                state.theme.theme === "LIGHT"
                  ? "border-green-400 bg-green-200"
                  : "border-green-900 bg-green-950"
              } px-2 rounded-2xl`}
            >
              Whatsapp
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                  ></path>
                  <path
                    fill="#cfd8dc"
                    d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                  ></path>
                  <path
                    fill="#40c351"
                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </i>
            </button>
            copy
            <CopyClipBoard
              url={sadhanaFormData}
              whenCopied={<ClipboardDocumentListIcon className="h-8 w-8" />}
              NotCopied={<ClipboardDocumentCheckIcon className="h-8 w-8" />}
            />
            {/*this is not being used to store the url this is to store the text to share to whatsapp */}
          </div>
        </div>
      </Modal>
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
          maxLength={10}
          minLength={3}
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
                      item?.initiatedName &&
                        item?.initiatedName !== "NA" &&
                        item?.initiatedName !== "Na" &&
                        item?.initiatedName !== "na"
                        ? item.initiatedName
                        : `${item.firstName} ${item.lastName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-200"
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item?.initiatedName &&
                  item?.initiatedName !== "NA" &&
                  item?.initiatedName !== "Na" &&
                  item?.initiatedName !== "na" &&
                  item?.initiatedName !== "No" &&
                  item?.initiatedName !== "no"
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
