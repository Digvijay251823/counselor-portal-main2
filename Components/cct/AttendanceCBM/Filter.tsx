"use client";
import { useGlobalState } from "@/Components/context/state";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

function Filter({
  category,
}: {
  category:
    | "firstName"
    | "lastName"
    | "initiatedName"
    | "phoneNumber"
    | "sessionName";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="ml-2">
      <button onClick={() => setIsOpen(true)}>
        <FunnelIcon className="h-5 w-5" />
      </button>
      <div
        ref={componentRef}
        className={`absolute w-full lg:right-32 right-0 left-0 transition-all duration-500 z-[2500] ${
          isOpen ? " -translate-y-28 " : " -translate-y-[500px]"
        }`}
      >
        <div className="md:w-[400px] lg:ml-10 ">
          <div className="mx-5">
            <ActionFilter category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

function ActionFilter({
  category,
}: {
  category:
    | "firstName"
    | "lastName"
    | "initiatedName"
    | "phoneNumber"
    | "sessionName";
}) {
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const pathname = usePathname();

  if (category === "firstName") {
    return <FirstName />;
  } else if (category === "lastName") {
    return <LastName />;
  } else if (category === "initiatedName") {
    return <InitiatedName />;
  } else if (category === "phoneNumber") {
    return <PhoneNumber />;
  } else if (category === "sessionName") {
    return <SessionName />;
  }
}

function FirstName() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    firstName: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "firstName"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 bg-white"
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`Search First Name`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}

function PhoneNumber() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    phoneNumber: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "phoneNumber"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 bg-white"
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`Search Contact Number`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
function LastName() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    lastName: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "lastName"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 bg-white"
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`Search Last Name`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}

function InitiatedName() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    initiatedName: value,
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 bg-white"
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`Search Initiated Name`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}

function SessionName() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    sessionName: value,
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 bg-white"
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`Search Session Name`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
