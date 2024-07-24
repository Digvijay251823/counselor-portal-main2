"use client";
import React, { useState } from "react";
import { useGlobalState } from "../context/state";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsActivity } from "react-icons/bs";
import Drawer from "./MenuDrawer";
import LogoComponent from "./icons/Logo";
import { TbClock } from "react-icons/tb";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { GoChecklist } from "react-icons/go";
import { HiOutlineSparkles } from "react-icons/hi2";
import { IoAnalyticsSharp } from "react-icons/io5";
import { BsQrCodeScan } from "react-icons/bs";
import LogoMain from "./icons/LogoMain";

function Header() {
  const pathname = usePathname();
  const { state, dispatch } = useGlobalState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <header
      className={`w-screen border-b ${
        state.theme.theme === "LIGHT"
          ? "bg-white border-b-gray-200"
          : "bg-stone-900 bg-opacity-20 border-stone-800"
      }  py-1.5 px-5`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <LogoMain height={50} width={50} />
          <LogoComponent />
        </div>
        <nav className="md:flex items-center gap-1  hidden">
          <p
            className={`font-semibold px-5 py-2.5 rounded-lg ${
              pathname === "/counselor"
                ? `${
                    state.theme.theme === "LIGHT"
                      ? "bg-purple-100 text-purple-500"
                      : "bg-purple-400 text-purple-500"
                  }`
                : ``
            } ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100"
                : "hover:bg-purple-950 bg-opacity-10"
            }`}
          >
            Analytics
          </p>
          <Link href="/counselor/counselee">
            <p
              className={`font-semibold px-5 py-2.5 rounded-lg ${pathname} ${
                pathname === "/counselor/counselee"
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-400 text-purple-500"
                    }`
                  : ``
              } ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-purple-950 bg-opacity-10"
              }`}
            >
              counselee
            </p>
          </Link>
          <Link href={"/counselor/sessions"}>
            <p
              className={`font-semibold px-5 py-2.5 rounded-lg ${
                pathname === "/counselor/sessions"
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-400 text-purple-500"
                    }`
                  : ``
              } ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-purple-950 bg-opacity-10"
              }`}
            >
              sessions
            </p>
          </Link>
          <Link href={"/counselor/activities"}>
            <p
              className={`font-semibold px-5 py-2.5 rounded-lg ${
                pathname === "/counselor/activities"
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-400 text-purple-500"
                    }`
                  : ``
              } ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-purple-950 bg-opacity-10"
              }`}
            >
              activities
            </p>
          </Link>
          <Link href={"/counselor/attendance"}>
            <p
              className={`font-semibold px-5 py-2.5 rounded-lg ${
                pathname === "/counselor/attendance"
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-400 text-purple-500"
                    }`
                  : ``
              } ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-purple-950 bg-opacity-10"
              }`}
            >
              attendance
            </p>
          </Link>
          <Link href={"/counselor/sadhana"}>
            <p
              className={`font-semibold px-5 py-2.5 rounded-lg ${
                pathname === "/counselor/sadhana"
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-400 text-purple-500"
                    }`
                  : ``
              } ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-purple-950 bg-opacity-10"
              }`}
            >
              sadhana
            </p>
          </Link>
          <Link href={"/counselor/scan"}>
            <p
              className={`font-semibold px-5 py-2.5 rounded-lg ${
                pathname === "/counselor/scan"
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-400 text-purple-500"
                    }`
                  : ``
              } ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-purple-950 bg-opacity-[0.2]"
              }`}
            >
              scan
            </p>
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          {state.theme.theme === "LIGHT" ? (
            <button
              onClick={() => {
                dispatch({ type: "DARK" });
                localStorage.setItem("THEME", "DARK");
              }}
              className={`p-2.5 rounded-lg bg-gray-50`}
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({ type: "LIGHT" });
                localStorage.setItem("THEME", "LIGHT");
              }}
              className={`p-2.5 rounded-lg bg-yellow-950 bg-opacity-40`}
            >
              <SunIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
