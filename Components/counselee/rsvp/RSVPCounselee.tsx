"use client";
import { useGlobalState } from "@/Components/context/state";
import CopyClipBoard from "@/Components/utils/CopyToClipBoard";
import DateFormatter from "@/Components/utils/DateFormatter";
import { LinksActivator } from "@/Components/utils/LinksActivator";
import Modal from "@/Components/utils/Modal";
import WarningPage from "@/Components/utils/WarningPage";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";

export default function RsvpPage({
  sessions,
  results,
  currentCounselor,
  rsvps,
  rsvpCount,
}: {
  sessions: sessions[];
  results: counselee[];
  currentCounselor: counselor;
  rsvps: any;
  rsvpCount: number;
}) {
  const router = useRouter();
  const [futureSessions, setFutureSessions] = useState<sessions | any>({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRSVP, setIsRsvp] = useState(false);
  const [CounseleeDetails, setCounseleeDetails] = useState<any>({});
  const [warning, setWarning] = useState(false);
  const [rsvpStringMessage, setRsvpStringMessage] = useState("");
  const [previousRsvp, setPreviousRsvp] = useState(rsvps ? rsvps : []);
  const [membersComming, setMembersComming] = useState(1);
  const [SubmittedSuccess, setSubmittedSuccess] = useState(false);
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { state, dispatch } = useGlobalState();
  const [computedFormattedString, setFormattedString] = useState("");

  useEffect(() => {
    if (phoneNumber.length === 10) {
      (async () => {
        try {
          const response = await fetch(`/api/counslee/${phoneNumber}`);
          if (response.ok) {
            const responseData = await response.json();
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
    }
  }, [phoneNumber]);

  // 💫🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁💫
  useEffect(() => {
    const futureSession: sessions[] = [];
    sessions.forEach((element) => {
      const newDate = new Date().toISOString();
      if (element.startTime > newDate.toString()) {
        futureSession.push(element);
      }
    });
    setFutureSessions(futureSession[0]);
  }, []);

  useEffect(() => {
    if (!futureSessions?.id) {
      return undefined;
    }
    router.push(`?scheduledSessionId=${futureSessions.id}`);
  }, [futureSessions?.id]);

  const linksActivator = LinksActivator();

  useEffect(() => {
    if (previousRsvp.length > 0) {
      const isRSVPStatus = previousRsvp.some((item: any) =>
        item?.counselee?.id === CounseleeDetails.id ? true : false
      );
      setIsRsvp(isRSVPStatus);
    }
  }, [previousRsvp.length, CounseleeDetails]);

  useEffect(() => {
    setFormattedString(() => {
      return previousRsvp
        .map((item: any, index: number) => {
          const { firstName, lastName } = item.counselee;
          return `${index + 1}. ${firstName} ${lastName} | members = ${
            item?.membersComming
          }`;
        })
        .join("\n");
    });
  }, [previousRsvp.length, SubmittedSuccess]);

  const handleShare = (previousRsvp: any) => {
    const messageString = previousRsvp
      .map((item: any, index: number) => {
        const { firstName, lastName } = item.counselee;
        return `${index + 1}. ${firstName} ${lastName} | ${
          item?.membersComming
        }`;
      })
      .join("\n");
    const message = `\n *━❀꧁Counselee Meeting꧂❀━* \n\n *Topic:* "${
      futureSessions.name
    }"\n \t  ${"Date : " + futureSessions?.startTime?.split("T")[0]} \n \t ${
      "Time : " +
      futureSessions?.startTime?.split("T")[1]?.split(":")[0] +
      ":" +
      futureSessions?.startTime?.split("T")[1]?.split(":")[1]
    } \n *Below* *are* *the* *List* *of* *Devotees*\n  *Confirmed* *their* *Presence* \n \n ${
      messageString ? messageString : computedFormattedString
    }\n \n *Use* *Below* *Link* *To* *Confirm* *Your* *Presence*\n  ${`${linksActivator}/counselee/attendance/${params.counselorid}`} \n\n`;
    setRsvpStringMessage(message);
  };

  async function handleSubmitRsvp(rsvp: boolean) {
    if (!CounseleeDetails.id) {
      return;
    }
    try {
      const formData: any = {
        scheduledSessionId: futureSessions?.id,
        counseleeId: CounseleeDetails?.id,
        counselorId: params?.counselorid,
        membersComming: membersComming,
        modeOfAttendance: futureSessions.modeOfAttendance,
        type: "RSVP",
        isRSVP: rsvp,
      };
      const formDatatoShare: any = {
        counselorId: params?.counselorid,
        membersComming: membersComming,
        modeOfAttendance: futureSessions?.modeOfAttendance,
        type: "RSVP",
        isRSVP: rsvp,
        counselee: CounseleeDetails,
        scheduledSession: futureSessions,
      };
      if (!rsvp) {
        setPreviousRsvp((prev: any) => {
          const previousRsvp = [...prev];
          const remaining = previousRsvp.filter(
            (item) => item?.counselee?.id !== CounseleeDetails.id
          );
          handleShare(remaining);
          return remaining;
        });
      } else {
        if (!isRSVP && rsvp) {
          const prevRvsp = [...previousRsvp, formDatatoShare];
          handleShare(prevRvsp);
          setPreviousRsvp(prevRvsp);
        }
      }

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(`/api/counslee/rsvp`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();

        setIsRsvp(rsvp);
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "SUCCESS" },
        });
        setSubmittedSuccess(true);
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
        payload: { message: error.message, type: "ERROR" },
      });
    }
  }

  return (
    <div className="w-full">
      <div className="md:px-10 md:pt-20 md:pb-10 px-5 pt-10 pb-5">
        <h1 className="text-4xl font-bold">Confirm Your Presence</h1>
        <p>you can confirm you presence for upcomming sessions here</p>
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
              DataArr={results}
              onPhoneNumberChange={(value: string) => setPhoneNumber(value)}
              setSelected={(value) => setCounseleeDetails(value)}
            />
          </form>
        </div>
      </div>
      {Object.keys(CounseleeDetails).length > 0 && (
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
              {CounseleeDetails?.initiatedName &&
              CounseleeDetails?.initiatedName !== "NA" &&
              CounseleeDetails?.initiatedName !== "Na" &&
              CounseleeDetails?.initiatedName !== "na" ? (
                <p className="text-gray-500 text-xl font-bold">
                  {CounseleeDetails?.initiatedName}
                </p>
              ) : (
                <p className="text-purple-500 text-xl font-bold">{`${CounseleeDetails?.firstName} ${CounseleeDetails?.lastName}`}</p>
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

      {futureSessions && Object?.keys(futureSessions)?.length > 0 ? (
        <div className="flex justify-center w-full">
          <div
            className={`md:mx-10 mx-3 mb-20 md:w-[80vw] w-[90vw] p-5 rounded-2xl shadow-xl ${
              state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
            }`}
          >
            <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-5">
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
                        {currentCounselor?.initiatedName}
                      </p>
                    </div>
                  )}
                  <div className="">
                    <h1 className="font-bold text-lg text-center">
                      Upcomming Session
                    </h1>
                  </div>
                  <h1 className="md:text-5xl text-3xl font-semibold text-center">
                    {futureSessions?.name
                      ? futureSessions?.name
                      : "No Session To Show"}
                  </h1>
                  <div className="flex justify-center">
                    {futureSessions?.startTime ? (
                      <DateFormatter dateString={futureSessions?.startTime} />
                    ) : (
                      ""
                    )}
                  </div>
                  {futureSessions?.startTime ? (
                    <div className="w-full flex flex-col items-center">
                      <label htmlFor="membersComming" className="font-semibold">
                        How Many Members Are Comming Including You{" "}
                        <i className="text-red-400">*</i>
                      </label>
                      <input
                        type="number"
                        id="membersComming"
                        value={membersComming}
                        name="membersComming"
                        className={`border px-2 py-1.5 w-full md:w-[400px] rounded-lg mt-2 ${
                          state.theme.theme === "LIGHT"
                            ? "border-gray-300"
                            : "border-stone-600 bg-stone-900"
                        }`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setMembersComming(Number(e.target.value))
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex justify-center p-5 gap-5 md:w-full">
                <button
                  className={`text-lg font-semibold w-[120px] py-1.5 border rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-300"
                      : "border-stone-700"
                  }`}
                  onClick={() => {
                    handleSubmitRsvp(false);
                  }}
                >
                  Cancel
                </button>
                {!isRSVP ? (
                  <button
                    className={`text-lg font-semibold w-[120px] py-1.5 border rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300"
                        : "border-stone-700"
                    }`}
                    onClick={() => {
                      handleSubmitRsvp(true);
                    }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    className={`text-lg font-semibold w-[120px] py-1.5 rounded-lg text-green-500 ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300"
                        : "border-stone-700"
                    }`}
                    disabled
                  >
                    Confirmed
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <Modal
        isOpen={SubmittedSuccess}
        onClose={() => setSubmittedSuccess(false)}
      >
        <div
          className={`flex flex-col items-center p-5 rounded-[40px]  ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <div className="p-5 flex flex-col gap-2 md:max-w-[40vw] max-w-[80vw]">
            <div className="text-xl font-semibold">
              Please Share Your Confirmation To Whatsapp
            </div>
          </div>
          <div className="flex items-center gap-5 py-5">
            {" "}
            <button
              onClick={() => {
                console.log(rsvpStringMessage);
                const encodedMessage = encodeURIComponent(rsvpStringMessage);
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
              url={rsvpStringMessage}
              whenCopied={<ClipboardDocumentListIcon className="h-8 w-8" />}
              NotCopied={<ClipboardDocumentCheckIcon className="h-8 w-8" />}
            />
            {/*this is not being used to store the url this is to store the text to share to whatsapp */}
          </div>
        </div>
      </Modal>
      <WarningPage
        isOpen={warning}
        onClose={() => setWarning(false)}
        counselorId={params?.counselorid.toString()}
      />
    </div>
  );
}

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: counselee[];
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
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
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
    const queryStr: any = {
      ...searchUrlParams,
      query: e.target.value,
    };
    const prevQueryString = Object.keys(queryStr)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
      )
      .join("&");
    toggleSelection(true);
    setSelectedOption(e.target.value);
    if (isNaN(Number(e.target.value))) {
      router.push(`/counselee/rsvp/${params.counselorid}?${prevQueryString}`);
    } else {
      onPhoneNumberChange(e.target.value);
      router.push(`/counselee/rsvp/${params.counselorid}?${prevQueryString}`);
    }
  }
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <div
        className={`flex items-center w-full border transition-all duration-500 px-5 rounded-xl ${
          onFocusPhone
            ? `${
                state.theme.theme === "LIGHT"
                  ? "ring-4 border-purple-700 ring-purple-100"
                  : "ring-4 border-purple-500 ring-purple-950"
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
          className={`w-full px-4 py-3 outline-none text-xl ${
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
                DataArr.length > 10 ? "md:h-[60vh] h-[70vh]" : "h-full"
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
                    item.id === selectedOption && "bg-blue-300"
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
