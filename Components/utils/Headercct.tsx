"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "../context/state";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { FaUserFriends } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./MenuDrawer";
import LogoComponent from "./icons/Logo";
import { BsActivity, BsQrCodeScan } from "react-icons/bs";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi";
import { GoChecklist } from "react-icons/go";
import { TbClock } from "react-icons/tb";
import { IoAnalyticsSharp } from "react-icons/io5";
import LogoMain from "./icons/LogoMain";

function Headercct() {
  const { state, dispatch } = useGlobalState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`w-full px-5 py-2 ${
        state.theme.theme === "LIGHT"
          ? "border-b-gray-200"
          : "border-b-stone-800"
      } border-b`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-0">
            <div className="flex items-center">
              <LogoMain height={50} width={50} />
              <LogoComponent />
            </div>
          </div>
          <div className="md:block hidden">
            <nav
              className={`flex items-center gap-2 border ${
                state.theme.theme === "LIGHT"
                  ? "rounded-lg p-1 bg-purple-100 border-purple-200"
                  : "bg-stone-800 rounded-lg p-1 bg-opacity-40 border-stone-800"
              }`}
            >
              <Link href={"/cct/analytics"}>
                <p
                  className={`font-semibold text-lg ${
                    pathname === "/cct/analytics"
                      ? `${
                          state.theme.theme === "LIGHT"
                            ? "bg-purple-900 px-3 rounded-lg text-purple-50 p-1 border border-purple-200 hover:bg-purple-950 hover:text-white"
                            : "bg-purple-950 bg-opacity-25 p-1 px-3 rounded-lg border border-purple-950 text-purple-400 hover:bg-purple-900"
                        }`
                      : "hover:bg-purple-900 p-1 px-3 rounded-lg hover:text-white"
                  }`}
                >
                  Analytics
                </p>
              </Link>
              <Link href={"/cct/counselee"}>
                <p
                  className={`font-semibold text-lg ${
                    pathname === "/cct/counselee"
                      ? `${
                          state.theme.theme === "LIGHT"
                            ? "bg-purple-900 px-3 rounded-lg text-purple-50 p-1 border border-purple-200 hover:bg-purple-950 hover:text-white"
                            : "bg-purple-950 bg-opacity-25 p-1 px-3 rounded-lg border border-purple-950 text-purple-400 hover:bg-purple-900"
                        }`
                      : "hover:bg-purple-900 p-1 px-3 rounded-lg hover:text-white"
                  }`}
                >
                  Counselees
                </p>
              </Link>
              <Link href="/cct/counselors">
                <p
                  className={`font-semibold text-lg ${
                    pathname === "/cct/counselors"
                      ? `${
                          state.theme.theme === "LIGHT"
                            ? "bg-purple-900 px-3 rounded-lg text-purple-50 p-1 border border-purple-200 hover:bg-purple-950 hover:text-white"
                            : "bg-purple-950 bg-opacity-25 p-1 px-3 rounded-lg border border-purple-950 text-purple-400 hover:bg-purple-900"
                        }`
                      : "hover:bg-purple-900 p-1 px-3 rounded-lg hover:text-white"
                  }`}
                >
                  Counselors
                </p>
              </Link>
              <div>
                <MenuCBM />
              </div>
              <Link href="/cct/scan">
                <p
                  className={`font-semibold text-lg ${
                    pathname === "/cct/scan"
                      ? `${
                          state.theme.theme === "LIGHT"
                            ? "bg-purple-900 px-3 rounded-lg text-purple-50 p-1 border border-purple-200 hover:bg-purple-950 hover:text-white"
                            : "bg-purple-950 bg-opacity-25 p-1 px-3 rounded-lg border border-purple-950 text-purple-400 hover:bg-purple-900"
                        }`
                      : "hover:bg-purple-900 p-1 px-3 rounded-lg hover:text-white"
                  }`}
                >
                  Scan
                </p>
              </Link>
              <Link href="/cct/changecounselor">
                <p
                  className={`font-semibold text-lg ${
                    pathname === "/cct/changecounselor"
                      ? `${
                          state.theme.theme === "LIGHT"
                            ? "bg-purple-900 px-3 rounded-lg text-purple-50 p-1 border border-purple-200 hover:bg-purple-950 hover:text-white"
                            : "bg-purple-950 bg-opacity-25 p-1 px-3 rounded-lg border border-purple-950 text-purple-400 hover:bg-purple-900"
                        }`
                      : "hover:bg-purple-900 p-1 px-3 rounded-lg hover:text-white"
                  }`}
                >
                  ChangeCounselor
                </p>
              </Link>
              <OthersMore />
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-5">
          {state.theme.theme === "LIGHT" ? (
            <button
              onClick={() => dispatch({ type: "DARK" })}
              className={`p-2.5 rounded-lg bg-gray-50`}
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: "LIGHT" })}
              className={`p-2.5 rounded-lg bg-yellow-950 bg-opacity-40`}
            >
              <SunIcon className="h-5 w-5" />
            </button>
          )}
          <div className="md:hidden block">
            <button className="" onClick={() => setIsOpenDrawer(true)}>
              <Bars3Icon className="h-5 w-5" />
            </button>
            <Drawer
              isOpen={isOpenDrawer}
              onClose={() => setIsOpenDrawer(false)}
            >
              <nav className="flex flex-col gap-4">
                <div
                  className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                    pathname === ""
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100"
                      : "hover:bg-purple-950 bg-opacity-10"
                  }`}
                >
                  <IoAnalyticsSharp className="h-6 w-6" />
                  <p className={`text-lg font-semibold`}>Analytics</p>
                </div>

                <Link
                  href="/cct/counselors"
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <div
                    className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                      pathname === "/cct/counselors"
                        ? `${
                            state.theme.theme === "LIGHT"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-800 text-purple-400"
                          }`
                        : ""
                    } ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-purple-950 bg-opacity-10"
                    }`}
                  >
                    <FaRegUser className="h-6 w-6" />
                    <p className={`text-lg font-semibold`}>counselor</p>
                  </div>
                </Link>
                <Link
                  href="/cct/counselee"
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <div
                    className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                      pathname === "/cct/counselee"
                        ? `${
                            state.theme.theme === "LIGHT"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-800 text-purple-400"
                          }`
                        : ""
                    } ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-purple-950 bg-opacity-10"
                    }`}
                  >
                    <HiOutlineAcademicCap className="h-6 w-6" />
                    <p className={`text-lg font-semibold`}>counselee</p>
                  </div>
                </Link>
                <Link
                  href={"/cct/cbmmeetings"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <div
                    className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                      pathname === "/cct/cbmmeetings"
                        ? `${
                            state.theme.theme === "LIGHT"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-800 text-purple-400"
                          }`
                        : ""
                    } ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-purple-950 bg-opacity-10"
                    }`}
                  >
                    <TbClock className="h-6 w-6" />
                    <p className={`text-lg font-semibold`}>Cbm Meetings</p>
                  </div>
                </Link>
                <Link
                  href={"/cct/cbmattendance"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <div
                    className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                      pathname === "/cct/cbmattendance"
                        ? `${
                            state.theme.theme === "LIGHT"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-800 text-purple-400"
                          }`
                        : ""
                    } ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-purple-950 bg-opacity-10"
                    }`}
                  >
                    <GoChecklist className="h-6 w-6" />
                    <p className={`text-lg font-semibold`}>Cbm Attendance</p>
                  </div>
                </Link>
                <Link
                  href={"/cct/sevas"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <div
                    className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                      pathname === "/cct/sevas"
                        ? `${
                            state.theme.theme === "LIGHT"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-800 text-purple-400"
                          }`
                        : ""
                    } ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-purple-950 bg-opacity-10"
                    }`}
                  >
                    <BsActivity className="h-6 w-6" />

                    <p className={`text-lg font-semibold`}>Sevas</p>
                  </div>
                </Link>
                <Link
                  href={"/cct/changecounselor"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <div
                    className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                      pathname === "/cct/changecounselor"
                        ? `${
                            state.theme.theme === "LIGHT"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-800 text-purple-400"
                          }`
                        : ""
                    } ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-purple-950 bg-opacity-10"
                    }`}
                  >
                    <HiOutlineSparkles className="h-6 w-6" />
                    <p className={`text-lg font-semibold`}>Change Counselor</p>
                  </div>
                </Link>
                <Link
                  href={"/counselor/scan"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <div
                    className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                      pathname === "/counselor/scan"
                        ? `${
                            state.theme.theme === "LIGHT"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-800 text-purple-400"
                          }`
                        : ""
                    } ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-purple-100"
                        : "hover:bg-purple-950 bg-opacity-15"
                    }`}
                  >
                    <BsQrCodeScan className="h-6 w-6" />
                    <p className={`text-lg font-semibold`}>scan</p>
                  </div>
                </Link>
              </nav>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Headercct;

function MenuCBM() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { state } = useGlobalState();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleMouseEnterMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="relative" onMouseLeave={handleMouseLeave}>
      <div
        className="cursor-pointer "
        onMouseEnter={handleMouseEnter}
        ref={menuRef}
      >
        <span className="font-semibold text-lg flex items-center">
          <p>CBM</p>

          <ChevronDownIcon
            className={`h-5 w-5 transition-all duration-300 ${
              isOpen && "-rotate-180"
            }`}
          />
        </span>
        <div
          className={`absolute top-full w-[400px] lg:left-0 right-0 mt-2  ${
            state.theme.theme === "LIGHT"
              ? "bg-white text-black"
              : "bg-stone-900 text-white"
          } rounded-[30px] shadow-lg transform transition-transform duration-300 ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="p-5 z-[2500]">
            <li
              className={`px-4 py-2 ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-50"
                  : "hover:bg-stone-950"
              } rounded-[20px]`}
            >
              <Link href="/cct/cbmmeetings">
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`rounded-full ${
                        state.theme.theme === "LIGHT"
                          ? "bg-purple-100"
                          : "bg-purple-950 bg-opacity-45"
                      } p-2`}
                    >
                      <FaUserFriends />
                    </p>
                    <h1 className="text-xl font-bold whitespace-nowrap">
                      CBM Sessions
                    </h1>
                  </div>
                  <p>Here you can manage all the meetings of past and future</p>
                </div>
              </Link>
            </li>
            <li
              className={`px-4 py-2 ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-50"
                  : "hover:bg-stone-950"
              } rounded-[20px]`}
            >
              <Link href="/cct/cbmattendance?size=30">
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`rounded-full ${
                        state.theme.theme === "LIGHT"
                          ? "bg-purple-100"
                          : "bg-purple-950 bg-opacity-45"
                      } p-2`}
                    >
                      <GrTask />
                    </p>
                    <h1 className="text-xl font-bold whitespace-nowrap">
                      CBM Attendance
                    </h1>
                  </div>
                  <p>
                    Manage All the counselor board&apos;s attendance and
                    regulations
                  </p>
                </div>
              </Link>
            </li>
            <li
              className={`px-4 py-2 ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-50"
                  : "hover:bg-stone-950"
              } rounded-[20px]`}
            >
              <Link href="/cct/sevas">
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`rounded-full ${
                        state.theme.theme === "LIGHT"
                          ? "bg-purple-100"
                          : "bg-purple-950 bg-opacity-45"
                      } p-2`}
                    >
                      <IoMdCheckmarkCircleOutline />
                    </p>
                    <h1 className="text-xl font-bold whitespace-nowrap">
                      Sevas
                    </h1>
                  </div>
                  <p>Here you can manage all the meetings of past and future</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
function OthersMore() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { state } = useGlobalState();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleMouseEnterMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="relative" onMouseLeave={handleMouseLeave}>
      <div
        className="cursor-pointer "
        onMouseEnter={handleMouseEnter}
        ref={menuRef}
      >
        <span className="font-semibold text-lg flex items-center">
          <p>More</p>

          <ChevronDownIcon
            className={`h-5 w-5 transition-all duration-300 ${
              isOpen && "-rotate-180"
            }`}
          />
        </span>
        <div
          className={`absolute top-full w-[400px] lg:left-0 right-0 mt-2  ${
            state.theme.theme === "LIGHT"
              ? "bg-white text-black"
              : "bg-stone-900 text-white"
          } rounded-[30px] shadow-lg transform transition-transform duration-300 ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="p-5 z-[2500]">
            <li
              className={`px-4 py-2 ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-50"
                  : "hover:bg-stone-950"
              } rounded-[20px]`}
            >
              <Link href="/cct/planningrelocate">
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`rounded-full ${
                        state.theme.theme === "LIGHT"
                          ? "bg-purple-100"
                          : "bg-purple-950 bg-opacity-45"
                      } p-2`}
                    >
                      <FaUserFriends />
                    </p>
                    <h1 className="text-xl font-bold whitespace-nowrap">
                      Relocate To pune
                    </h1>
                  </div>
                  <p>
                    Here is the list of all devotees who want to relocate to
                    pune
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
