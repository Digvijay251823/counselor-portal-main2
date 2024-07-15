"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

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

import { usePathname, useRouter } from "next/navigation";
import { useGlobalState } from "@/Components/context/state";
import SubmitHandlerButton from "@/Components/utils/SubmitHandlerButton";

function ConfigureSadhana({
  sadhanaResponse,
  counselorData,
}: {
  sadhanaResponse?: any;
  counselorData: counselor;
}) {
  const pathname = usePathname();
  const { state, dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visibleSadhana, setvisibleSadhana] = useState<any>("");
  const router = useRouter();
  const [attendedArthi, setAttendedArthi] = useState<
    | {
        target: { name: any; value: any };
      }
    | any
  >({});
  const [checkedItems, setCheckedItems] = useState<
    {
      id: number;
      type: string;
      valueType: string;
      functionName: string;
      databaseField: string;
    }[]
  >([]);
  const [checkedItemsObj, setCheckedItemsObj] = useState<any>({
    numberOfRounds: false,
    earlyJapaRoundsBefore8AM: false,
    earlyJapaRoundsAfter8AM: false,
    first8RoundsCompletedTime: false,
    next8RoundsCompletedTime: false,
    wakeUpTime: false,
    sleepTime: false,
    prabhupadaBookReading: false,
    nonPrabhupadaBookReading: false,
    prabhupadaClassHearing: false,
    guruClassHearing: false,
    otherClassHearing: false,
    speaker: false,
    attendedArti: false,
    mobileInternetUsage: false,
  });
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    item: {
      id: number;
      type: string;
      valueType: string;
      functionName: string;
      databaseField: string;
    }
  ) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, item]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.id !== item.id)
      );
      setCheckedItemsObj((prevState: any) => ({
        ...prevState,
        [item.databaseField]: checked, // Set to the checkbox status
      }));
    }
  };

  useEffect(() => {
    if (sadhanaResponse) {
      const filteredArrForChecked = FormListItems.filter(
        (item: any) => sadhanaResponse[item.databaseField] === true
      );
      setCheckedItems(filteredArrForChecked);
    }
  }, [sadhanaResponse]);

  useEffect(() => {
    setCheckedItemsObj((prevState: any) => {
      const newState = { ...prevState };
      checkedItems.forEach((key) => {
        if (newState.hasOwnProperty(key.databaseField)) {
          newState[key.databaseField] = true;
        } else {
          console.log(newState[key.databaseField]);
        }
      });
      return newState;
    });
  }, [checkedItems]);

  async function handleSubmit(e: FormData) {
    if (Object.keys(checkedItemsObj).length <= 1) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "you haven't selected any field" },
      });
      return;
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    if (sadhanaResponse > 0) {
      checkedItemsObj.id = sadhanaResponse.sadhanaForm;
      try {
        const response = await fetch(
          `/api/counselor/sadhana/${counselorData.id}`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(checkedItemsObj),
          }
        );
        if (response.ok) {
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              type: "SUCCESS",
              message: "successfully updated form",
            },
          });
        } else {
          const responseData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              type: "ERROR",
              message: responseData.message,
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      }
    } else {
      try {
        const response = await fetch(
          `/api/counselor/sadhana/${counselorData.id}`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(checkedItemsObj),
          }
        );
        if (response.ok) {
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              type: "SUCCESS",
              message: "successfully generated form",
            },
          });
        } else {
          const responseData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              type: "ERROR",
              message: responseData.message,
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      }
    }
  }

  return (
    <div className="flex items-center ">
      <form action={handleSubmit}>
        <div className="px-5 py-5">
          <p className="text-gray-500">
            select some fields below to customize the sadhana form
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          {FormListItems?.map((item, index) => (
            <div key={index} className="mx-10 flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                id={item.type}
                className="w-5 h-5 "
                checked={checkedItems.some(
                  (checkedItem) => checkedItem.id === item.id
                )}
                onChange={(e) => handleChange(e, item)}
              />
              <label htmlFor={item.type} className="font-bold text-lg">
                {item.type}
              </label>
            </div>
          ))}
        </div>

        <SubmitHandlerButton
          btnStyles={`flex items-center justify-between text-lg font-bold m-3 ml-6 px-5 py-2 rounded-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-purple-600 text-white"
              : " bg-purple-700 text-white"
          }`}
          text="Generate Form"
        />
      </form>
      <div className="pt-20 w-[45vw] ml-auto  md:block hidden">
        <div
          className={`px-5 rounded drop-shadow-lg  ml-auto mx-10 ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "border-stone-700 bg-stone-900 bg-opacity-40"
          }`}
        >
          <p className="text-center font-semibold text-gray-400">
            Preview Form
          </p>
          <h1 className="text-center font-bold text-xl py-8">Sadhana Form</h1>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold ">PHONE NUMBER</label>
              <input
                type="tel"
                disabled={true}
                className={`rounded px-4 py-2 text-lg border transition-all duration-500 ${
                  state.theme.theme === "LIGHT"
                    ? "focus:border-purple-600 outline-none focus:ring-4 focus:ring-purple-100 bg-white"
                    : "focus:border-purple-600 outline-none focus:ring-4 focus:ring-purple-950 bg-stone-950 border-stone-800"
                }`}
                placeholder="8888959287"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <button
              className={`px-4 py-2 text-lg rounded-xl my-5 w-full font-bold ${
                state.theme.theme === "LIGHT"
                  ? "bg-purple-200 text-purple-600"
                  : "bg-purple-900 bg-opacity-40 text-purple-600"
              } `}
              type="submit"
              disabled
            >
              {isLoading ? "loading..." : "Search"}
            </button>
          </div>
          <p className="text-center p-5 text-gray-400">
            This form is to track your daily progress in the path of
            <i className="text-red-400 ml-2">Krsna consiousness</i>
          </p>
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
                    <MIUComponent key={index} label={"Mobile/Internet-Usage"} />
                  );
                // Add more cases as needed
                default:
                  return null;
              }
            })}
          </div>
          {checkedItems?.length > 0 ? (
            <div className="flex justify-center w-full ">
              <button
                disabled={pathname !== `/sadhana`}
                className={`px-4 py-2 text-lg rounded-xl my-5 w-full font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "bg-purple-200 text-purple-600"
                    : "bg-purple-900 bg-opacity-40 text-purple-600"
                } `}
                type="submit"
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="text-center font-semibold my-10 text-gray-400">
              No Configured Fields
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfigureSadhana;
/** */
