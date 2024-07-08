"use client";
import { useGlobalState } from "@/Components/context/state";
import SubmitHandlerButton from "@/Components/utils/SubmitHandlerButton";
// components/UpdateCounselor.tsx
import React, { useState, useEffect } from "react";
interface updateDetails {
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  age: string;
  email: string;
  address: string;
}

const UpdateCounselor: React.FC<{ counselor: counselor }> = ({ counselor }) => {
  const { state, dispatch } = useGlobalState();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    initiatedName: "",
    phoneNumber: "",
    age: 0,
    email: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, ariaChecked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? ariaChecked : value,
    }));
  };

  const handleSubmit = async (e: FormData) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(
        `/api/counslee/updatedetails/${counselor.id}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(formState),
        }
      );
      if (response.ok) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: "updated data Successfully" },
        });
      } else {
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
  };
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      ...counselor,
    }));
  }, []);

  return (
    <form
      action={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="initiatedName"
        >
          Initiated Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="initiatedName"
          type="text"
          placeholder="Initiated Name"
          name="initiatedName"
          value={formState.initiatedName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phoneNumber"
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          value={formState.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="age"
        >
          Age
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="age"
          type="number"
          placeholder="Age"
          name="age"
          value={formState.age}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address"
        >
          Address
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          placeholder="Address"
          name="address"
          value={formState.address}
          onChange={handleChange}
        />
      </div>

      {/* Add more fields as needed */}

      <div className="flex items-center justify-between">
        <SubmitHandlerButton btnStyles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
      </div>
    </form>
  );
};

export default UpdateCounselor;
