"use client";

interface Props {
  PrabhujiName: string;
  PrabhujiPhone: number;
  MatajiName: string;
  MatajiPhone: number;
}

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

import { useGlobalState } from "@/Components/context/state";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SuccessPage from "../SuccessPage";
import { useFormStatus } from "react-dom";
import { useRouter, useParams } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Registeration({ counselorList }: { counselorList: counselor }) {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentCounselor, setCurrentCounselor] = useState("");
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
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
    comments: "",
    currentCounselor: counselorList.id,
    connectedToCounselorSinceYear: "",
    spouce: "",
    children: [
      {
        name: "",
        age: 0,
      },
    ],
  });

  const validateStep = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "age",
      "phoneNumber",
      "gender",
      "address",
    ];
    const stepErrors: any = {};

    requiredFields.forEach((field: any) => {
      if (!formState[field]) {
        stepErrors[field] = "This field is required";
      }
    });

    setErrors(stepErrors);

    return Object.keys(stepErrors).length === 0; // Return true if no errors
  };

  useEffect(() => {
    const phonenumber = localStorage.getItem("PHONE_NUMBER");
    if (phonenumber) {
      setFormState((prev: any) => {
        const previous = { ...prev };
        previous.phoneNumber = phonenumber;
        return previous;
      });
    }
  }, []);
  async function handleSubmit(e: FormData) {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch("/api/counslee/create", {
        method: "POST",
        headers,
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        const responseData = await response.json();
        router.back();
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
  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }
  function prevStep() {
    setCurrentStep((prev) => prev - 1);
  }

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

  const handleInputChangeChildrens = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newChildren = [...formState.children];
    newChildren[index][name] = value;

    setFormState({
      ...formState,
      children: newChildren,
    });
  };

  // Function to handle adding a new child
  const addNewChild = () => {
    setFormState((prevState: any) => ({
      ...prevState,
      children: [...prevState.children, { name: "", age: "" }],
    }));
  };
  const removeChild = (index: number) => {
    setFormState((prevState: any) => ({
      ...prevState,
      children: prevState.children.filter((_: any, i: any) => i !== index),
    }));
  };
  return (
    <div>
      <div className="md:px-10 md:pt-20 md:pb-10 px-5 pt-10 pb-5 relative">
        <h1 className="text-4xl font-bold">Registration</h1>
        <p>looks like you have not registered yet please register</p>
        <p
          className={`text-lg border rounded-full w-max px-2 py-1.5 my-2 ${
            state.theme.theme === "LIGHT" ? "border-black" : "border-white"
          }`}
        >
          Counselor :
          {counselorList.initiatedName
            ? counselorList.initiatedName
            : `${counselorList.firstName} ${counselorList.lastName}`}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-evenly gap-2 px-2">
          <div>
            <p
              className={`px-4 py-1 font-bold ${
                currentStep === 1
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-black text-white rounded-full"
                        : "bg-white text-black rounded-full"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "bg-white text-black border-2 border-black rounded-full"
                        : "border-white text-white border-2  bg-black rounded-full"
                    }`
              }`}
            >
              1
            </p>
          </div>
          <div className="border w-[300px] border-gray-300"></div>
          <div>
            <p
              className={`px-4 py-1 font-bold ${
                currentStep === 2
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-black text-white rounded-full"
                        : "bg-white text-black rounded-full"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "bg-white text-black border-2 border-black rounded-full"
                        : "border-white text-white border-2  bg-black rounded-full"
                    }`
              }`}
            >
              2
            </p>
          </div>
          <div className="border w-[300px] border-gray-300"></div>
          <div>
            <p
              className={`px-4 py-1 font-bold ${
                currentStep === 3
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-black text-white rounded-full"
                        : "bg-white text-black rounded-full"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "bg-white text-black border-2 border-black rounded-full"
                        : "border-white text-white border-2  bg-black rounded-full"
                    }`
              }`}
            >
              3
            </p>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-2 px-2">
          {currentStep === 1 ? (
            <p
              className={`${
                state.theme.theme === "LIGHT"
                  ? "font-bold text-xl bg-black text-white px-4 py-1.5 rounded-full my-6"
                  : "bg-white text-black rounded-full my-6 text-xl font-bold px-4 py-1.5"
              }`}
            >
              Personal Information
            </p>
          ) : currentStep === 2 ? (
            <p
              className={`${
                state.theme.theme === "LIGHT"
                  ? "font-bold text-xl bg-black text-white px-4 py-1.5 rounded-full my-6"
                  : "bg-white text-black rounded-full my-6 text-xl font-bold px-4 py-1.5"
              }`}
            >
              Family Information
            </p>
          ) : (
            <p
              className={`${
                state.theme.theme === "LIGHT"
                  ? "font-bold text-xl bg-black text-white px-4 py-1.5 rounded-full my-6"
                  : "bg-white text-black rounded-full my-6 text-xl font-bold px-4 py-1.5"
              }`}
            >
              Spiritual Information
            </p>
          )}
        </div>
      </div>
      <form action={handleSubmit} className="lg:mx-20 md:mx-14 mx-2 mb-10">
        <div>
          {currentStep === 1 ? (
            <>
              <Step1
                nextStep={() => {
                  console.log(validateStep());
                  if (validateStep()) {
                    nextStep();
                  }
                }}
                errors={errors}
                formData={formState}
                handleChange={handleChange}
              />
            </>
          ) : currentStep === 2 ? (
            <>
              <Step2
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formState}
                handleChange={handleChange}
                addNewChild={addNewChild}
                handleInputChangeChildrens={handleInputChangeChildrens}
                removeChild={removeChild}
              />
            </>
          ) : (
            <>
              <Step3
                prevStep={prevStep}
                formData={formState}
                handleChange={handleChange}
              />
            </>
          )}
        </div>
      </form>
      <SuccessPage isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
    </div>
  );
}

export default Registeration;

function Step1({
  nextStep,
  formData,
  handleChange,
  errors,
}: {
  nextStep: () => void;
  formData: FormInterface;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}) {
  const { state } = useGlobalState();
  return (
    <div
      className={`${
        state.theme.theme === "LIGHT"
          ? "bg-white"
          : "bg-stone-900 bg-opacity-40"
      } md:p-8 p-5 rounded-lg md:pb-5 shadow-lg`}
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={`${
              state.theme.theme === "LIGHT"
                ? `${
                    !errors.firstName
                      ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                      : "bg-white px-4 py-2 border ring-4 ring-red-200 border-red-500 text-lg rounded-xl"
                  }`
                : `${
                    !errors.firstName
                      ? "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                      : "bg-stone-950 px-4 py-2 border ring-4 ring-red-950 border-red-500 text-lg rounded-xl"
                  }`
            }`}
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="text-red-500">This Field iS required</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={`${
              state.theme.theme === "LIGHT"
                ? `${
                    !errors.lastName
                      ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                      : "bg-white px-4 py-2 border ring-4 ring-red-200 border-red-500 text-lg rounded-xl"
                  }`
                : `${
                    !errors.lastName
                      ? "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                      : "bg-stone-950 px-4 py-2 border ring-4 ring-red-950 border-red-500 text-lg rounded-xl"
                  }`
            }`}
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="text-red-500">This Field iS required</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="initiatedName">
            Initiated Name
          </label>
          <input
            type="text"
            name="initiatedName"
            id="initiatedName"
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
            }`}
            value={formData.initiatedName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="phoneNumber">
            Contact Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            className={`${
              state.theme.theme === "LIGHT"
                ? `${
                    !errors.phoneNumber
                      ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                      : "bg-white px-4 py-2 border ring-4 ring-red-200 border-red-500 text-lg rounded-xl"
                  }`
                : `${
                    !errors.phoneNumber
                      ? "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                      : "bg-stone-950 px-4 py-2 border ring-4 ring-red-950 border-red-500 text-lg rounded-xl"
                  }`
            }`}
            value={formData.phoneNumber}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                handleChange(e);
              }
            }}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="gender">
            Gender
          </label>
          <MenuOthersDropDown
            value={formData?.gender}
            errors={errors}
            dataArr={["MALE", "FEMALE"]}
            setSelected={(item: string) => {
              const e: any = {
                target: {
                  name: "gender",
                  value: item,
                },
              };
              handleChange(e);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className={`${
              state.theme.theme === "LIGHT"
                ? `${
                    !errors.age
                      ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                      : "bg-white px-4 py-2 border ring-4 ring-red-200 border-red-500 text-lg rounded-xl"
                  }`
                : `${
                    !errors.age
                      ? "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                      : "bg-stone-950 px-4 py-2 border ring-4 ring-red-950 border-red-500 text-lg rounded-xl"
                  }`
            }`}
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
            }`}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className={`${
              state.theme.theme === "LIGHT"
                ? `${
                    !errors.address
                      ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                      : "bg-white px-4 py-2 border ring-4 ring-red-200 border-red-500 text-lg rounded-xl"
                  }`
                : `${
                    !errors.address
                      ? "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                      : "bg-stone-950 px-4 py-2 border ring-4 ring-red-950 border-red-500 text-lg rounded-xl"
                  }`
            }`}
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="profession">
            Profession
          </label>
          <input
            type="text"
            name="profession"
            id="profession"
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
            }`}
            value={formData.profession}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end m-5">
        <button
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl text-purple-600 border-purple-600"
          type="button"
          disabled
        >
          Prev
        </button>
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl bg-purple-700 text-white"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
function Step2({
  nextStep,
  prevStep,
  handleChange,
  formData,
  addNewChild,
  handleInputChangeChildrens,
  removeChild,
}: {
  prevStep: () => void;
  nextStep: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: FormInterface;
  handleInputChangeChildrens: (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  addNewChild: () => void;
  removeChild: (index: number) => void;
}) {
  const [counseleeList, setCounseleeList] = useState<counselee[]>([]);
  const { state, dispatch } = useGlobalState();
  const params = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `/api/counslee/spoucelist/${params.counselorid}`
        );
        if (response.ok) {
          const responseData = await response?.json();

          setCounseleeList(responseData?.content?.content);
        } else {
          const responseData = await response.json();
          console.log(
            responseData.message ||
              responseData.title ||
              "unexpected error occured"
          );
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: error.message, type: "ERROR" },
        });
      }
    })();
  }, []);

  return (
    <div
      className={`${
        state.theme.theme === "LIGHT"
          ? "bg-white"
          : "bg-stone-900 bg-opacity-40"
      } md:p-8 p-5 rounded-lg md:pb-5 shadow-lg`}
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="maritalStatus">
            Marital Status
          </label>
          <MenuOthersDropDown
            dataArr={["UNMARRIED", "MARRIED"]}
            setSelected={(item: string) => {
              const e: any = {
                target: {
                  name: "maritalStatus",
                  value: item,
                },
              };
              handleChange(e);
            }}
          />
        </div>

        {formData.maritalStatus === "MARRIED" && (
          <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="spouce">
              Search Spouce phoneNumber / name
            </label>
            <MenuIconAndDropDownDevotees
              DataArr={counseleeList}
              setSelected={(value: counselee) => {
                const e: any = { target: { name: "spouce", value: value.id } };
                handleChange(e);
              }}
            />
          </div>
        )}
      </div>
      {formData.maritalStatus === "MARRIED" && (
        <div className="mt-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 w-full">
            {formData.children.map((child, index) => (
              <div
                key={index}
                className={`${
                  state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
                } p-5 flex-col gap-5 rounded-3xl`}
              >
                <div className="flex items-center justify-between">
                  <div className="bg-purple-500 text-white p-1 rounded-full px-3 flex items-center w-max gap-5">
                    <p>child</p>
                    <p>{index + 1}</p>
                  </div>
                  <button
                    className={`${
                      state.theme.theme === "LIGHT"
                        ? "bg-red-500 text-white"
                        : "bg-red-700 text-white"
                    } px-2 py-1.5 rounded-full`}
                    onClick={() => removeChild(index)}
                  >
                    - Remove
                  </button>
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={child.name}
                    onChange={(event) =>
                      handleInputChangeChildrens(index, event)
                    }
                    className={`${
                      state.theme.theme === "LIGHT"
                        ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                        : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                    }`}
                    required
                    id="name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={child.age}
                    onChange={(event) =>
                      handleInputChangeChildrens(index, event)
                    }
                    className={`${
                      state.theme.theme === "LIGHT"
                        ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                        : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                    }`}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <button
              type="button"
              onClick={addNewChild}
              className="px-4 py-2 bg-black m-5 text-white"
            >
              + Add Child
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-5 justify-end m-5">
        <button
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl text-purple-600 border-purple-600"
          type="button"
          onClick={prevStep}
        >
          Prev
        </button>
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl bg-purple-700 text-white"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
function Step3({
  prevStep,
  handleChange,
  formData,
}: {
  prevStep: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: FormInterface;
}) {
  const [harinamInitiationDate, setHarinamInitiationDate] = useState<
    Date | any
  >("");
  const [connectedToCounselorSinceYear, setConnectedToCounselorSinceYear] =
    useState<Date | any>("");
  const { state } = useGlobalState();
  return (
    <div
      className={`${
        state.theme.theme === "LIGHT"
          ? "bg-white"
          : "bg-stone-900 bg-opacity-40"
      } md:p-8 p-5 rounded-lg md:pb-5 shadow-lg`}
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="yourInitiatingSpiritualMaster">
            Your Initiating / Aspiring Spiritual Master
          </label>
          <input
            type="text"
            name="yourInitiatingSpiritualMaster"
            id="yourInitiatingSpiritualMaster"
            value={formData.yourInitiatingSpiritualMaster}
            onChange={handleChange}
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="harinamInitiationDate">
            Harinam Initiation Date
          </label>
          <DatePicker
            selected={harinamInitiationDate}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            onChange={(date) => {
              const e: any = {
                target: { name: "connectedToCounselorSinceYear", value: date },
              };
              handleChange(e);
              setHarinamInitiationDate(date);
            }}
            placeholderText="Enter the date of harinam initialisation"
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-purple-100 px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700 w-full"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400 w-full"
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="harinamInitiationPlace">
            Harinam Initiation Place
          </label>
          <input
            type="text"
            name="harinamInitiationPlace"
            id="harinamInitiationPlace"
            value={formData.harinamInitiationPlace}
            onChange={handleChange}
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="connectedToCounselorSinceYear">
            Connected To Counselor Since Year
          </label>
          <DatePicker
            selected={connectedToCounselorSinceYear}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            onChange={(date) => {
              const e: any = {
                target: { name: "connectedToCounselorSinceYear", value: date },
              };
              handleChange(e);
              setConnectedToCounselorSinceYear(date);
            }}
            placeholderText="Enter the date of connecting to counselor"
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-purple-100 px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700 w-full"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400 w-full"
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="comments">
            Comment
          </label>
          <input
            type="text"
            name="comments"
            id="comments"
            value={formData.comments}
            onChange={handleChange}
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
            }`}
          />
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end m-5">
        <button
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl text-purple-600 border-purple-600"
          type="button"
          onClick={prevStep}
        >
          Prev
        </button>
        <SubmitHandlerButton />
      </div>
    </div>
  );
}

function MenuOthersDropDown({
  setSelected,
  dataArr,
  position,
  errors,
  value,
}: {
  setSelected: (value: string) => void;
  dataArr: string[];
  position?: string;
  errors?: any;
  value?: string;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState(value ? value : "");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
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
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? `${
                !errors?.gender
                  ? "border-gray-300 bg-white focus:ring-purple-100 focus:border-purple-600"
                  : "border border-red-500 ring-4 ring-red-200"
              }`
            : `${
                !errors?.gender
                  ? "border-stone-800 bg-stone-950 focus:ring-purple-950 focus:border-purple-400"
                  : "border border-red-500 ring-4 ring-red-900"
              }`
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
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
              ? "bg-white border-gray-300 ring-1 ring-black"
              : "bg-stone-950 border-stone-700 ring-1 ring-white"
          } ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className={`flex flex-col gap-3 overflow-y-auto `} role="none">
            {dataArr?.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedOption(item);
                  setSelected(item);
                  toggleSelection(false);
                }}
                className={`px-2 py-1.5 rounded-lg`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: any[];
  onPhoneNumberChange?: (value: string) => void;
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
  const [queryStr, setQueryString] = useState("");
  const menuRef: any = useRef();
  const params = useParams();
  const [counseleeList, setCounseleeList] = useState(DataArr);
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

  useEffect;

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
    const queryStr = e.target.value;
    if (e.target.value.length > 0) {
      setQueryString(e.target.value);
    } else {
      setQueryString(e.target.value);
    }
    const results = DataArr?.filter((item: any) => {
      for (const key in item) {
        const value = item[key];
        if (typeof value === "string") {
          if (
            value.toLowerCase().includes(queryStr?.toString().toLowerCase())
          ) {
            return true;
          }
        } else if (typeof value === "number") {
          if (
            value
              .toString()
              .toLowerCase()
              .includes(queryStr?.toString().toLowerCase())
          ) {
            return true;
          }
        }
      }
      return false;
    });
    setCounseleeList(results);
    toggleSelection(true);
    setSelectedOption(e.target.value);
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
          {counseleeList?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                counseleeList.length > 10 ? "md:h-[60vh] h-[80vh]" : "h-full"
              }`}
              role="none"
            >
              {counseleeList?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item?.initiatedName &&
                        item?.initiatedName !== "NA" &&
                        item?.initiatedName !== "Na" &&
                        item?.initiatedName !== "na" &&
                        item?.initiatedName !== "No" &&
                        item?.initiatedName !== "no"
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
          className={`w-full font-medium rounded-lg text-sm px-6 py-2.5 text-center focus:ring-4 focus:outline-none ${
            state.theme.theme === "LIGHT"
              ? "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-300 "
              : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
          }`}
        >
          Submit
        </button>
      )}
    </div>
  );
}
