"use client";
import { useGlobalState } from "@/Components/context/state";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
}: {
  counselorId: string;
  sadhanaForm?: any;
}) {
  const [onFocusPhone, setOnFocusPhone] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const { state, dispatch } = useGlobalState();
  const [counseleeDetails, setCounseleeDetails] = useState<any>({});
  const router = useRouter();
  const [currentCounselor, setCurrentCounselor] = useState("");
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
            console.log(responseData?.content?.content);
            setOpenRegistration(false);
            setCounseleeDetails(responseData.content.content);
          } else {
            if (response.status === 404) {
              localStorage.setItem("PHONE_NUMBER", phoneNumber.toString());
              setOpenRegistration(true);
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

  // async function handleSubmitCounselor(e: FormData) {
  //   const phonenumber = e.get("phonenumber")?.valueOf();
  //   if (!phonenumber) {
  //     dispatch({
  //       type: "SHOW_TOAST",
  //       payload: { type: "ERROR", message: "please enter you phone number" },
  //     });
  //     return null;
  //   }
  //   try {
  //     const response = await fetch(`/api/counslee/${phonenumber}`);
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       setCounseleeDetails(responseData.content.content);
  //     } else {
  //       if (response.status === 404) {
  //         localStorage.setItem("PHONE_NUMBER", phonenumber.toString());
  //         router.push("/counselee/registeration");
  //       }
  //       const errorData = await response.json();
  //       dispatch({
  //         type: "SHOW_TOAST",
  //         payload: { type: "ERROR", message: errorData.message },
  //       });
  //     }
  //   } catch (error: any) {
  //     dispatch({
  //       type: "SHOW_TOAST",
  //       payload: { type: "ERROR", message: error.message },
  //     });
  //   }
  // }

  async function IfNotRegisteredSubmitAttendance(e: FormData) {
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const age = e.get("age")?.toString();
    const gender = e.get("gender")?.toString();
    const address = e.get("address")?.toString();
    const formDataParticipantRegistration = {
      firstName,
      lastName,
      age,
      gender,
      address,
      phoneNumber,
      currentCounselor,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const responseParticipant = await fetch(`/api/counslee/register`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formDataParticipantRegistration),
      });
      if (!responseParticipant.ok) {
        const responseData = await responseParticipant.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "ERROR" },
        });
        return;
      }

      const responseCounselee = await fetch(`/api/counslee/${phoneNumber}`);
      if (!responseCounselee.ok) {
        if (responseCounselee.status === 404) {
          localStorage.setItem("PHONE_NUMBER", phoneNumber.toString());
          setOpenRegistration(false);
          return;
        }
        const errorData = await responseCounselee.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
        return;
      }
      const responseData = await responseCounselee.json();
      setCounseleeDetails(responseData.content.content);
      //submitting attendance

      const formDataObject: any = {
        counselorId: counselorId,
        counseleeId: responseData?.content?.content.id,
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

      const response = await fetch(`/api/counslee/sadhana`, {
        method: "POST",
        headers: headers,
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
        payload: { type: "ERROR", message: error.message },
      });
    }
  }

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
          <form className="md:w-[500px] mx-2 mb-10 ">
            <label htmlFor="phonenumber" className="font-bold text-xl">
              Phone Number
            </label>
            <div
              className={`flex items-center w-full border transition-all duration-500 ${
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
            </div>
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
          {!counseleeDetails?.currentCounselor ? (
            <h1 className="text-lg font-bold text-red-500 text-center">
              You are not Alloted a counselor
            </h1>
          ) : (
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
          <form
            action={
              !openRegistration
                ? handleSubmitSadhana
                : IfNotRegisteredSubmitAttendance
            }
            className={`mt-10`}
          >
            {openRegistration && (
              <div>
                <RegistrationFormForAll
                  setCurrentCounselor={(value: string) =>
                    setCurrentCounselor(value)
                  }
                />
              </div>
            )}
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
    </div>
  );
}

export default SadhanaForm;

function SubmitHandlerButtonCounselor() {
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
          className="bg-purple-600 rounded font-bold text-lg px-4 py-1.5 mr-1 text-white flex items-center gap-2"
          type="submit"
          disabled={pending}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </button>
      )}
    </div>
  );
}
