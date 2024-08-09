"use client";
import { LogoutCounselor } from "@/actions/ADMINREQUESTS";
import { useGlobalState } from "@/Components/context/state";
import LogoMain from "@/Components/utils/icons/LogoMain";
import Drawer from "@/Components/utils/MenuDrawer";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsActivity, BsGear, BsQrCodeScan } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { MdLock, MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbClock } from "react-icons/tb";

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export default function HeaderCounselor({ response }: { response: Props }) {
  const { state } = useGlobalState();
  const pathname = usePathname();
  return (
    <div className={`z-[100] shadow-2xl`}>
      <div
        className={`flex justify-between items-center ${
          state.theme.theme === "LIGHT"
            ? "border-b border-b-stone-200"
            : "border-b border-b-stone-800"
        }`}
      >
        <div className="flex items-center gap-1.5 md:px-5 px-2 py-1">
          <LogoMain height={50} width={50} />
          <div className=" md:block hidden">
            <p className="text-lg font-bold">Counselor Care System</p>
            <p className="text-gray-400">by Sanjivani</p>
          </div>
          <div className="md:hidden block">
            <p className="text-lg font-bold ">C C System</p>
            <p className="text-gray-400">by Sanjivani</p>
          </div>
        </div>
        <div className="items-center gap-3 pr-5 flex">
          <div className="md:flex gap-3 items-center hidden">
            <MenuCBM response={response} />
            <p
              className={`w-1 h-[15px] ${
                state.theme.theme === "LIGHT"
                  ? "border-r-2 border-gray-400"
                  : "border-r-2"
              }`}
            ></p>
          </div>
          <ChangeTheme />
          <Link href={"/counselor/settings"}>
            <BsGear className="h-5 w-5 cursor-pointer" />
          </Link>
          <div className="md:hidden block">
            <NavigationMenu />
          </div>
        </div>
      </div>
      <div className="md:flex items-center gap-2 py-1.5 px-3 hidden">
        <Link href={"/counselor"}>
          <p
            className={`px-3 py-2 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? `${
                    pathname === "/counselor"
                      ? "text-purple-500 bg-purple-100 px-2 py-1.5"
                      : ""
                  }`
                : `${
                    pathname === "/counselor"
                      ? "text-purple-300 bg-purple-950 bg-opacity-40 px-2 py-1.5 "
                      : ""
                  }`
            } font-semibold text-gray-500`}
          >
            Analytics
          </p>
        </Link>
        <Link href={"/counselor/counselee"}>
          <p
            className={`px-3 py-2 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? `${
                    pathname === "/counselor/counselee"
                      ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
                      : "hover:bg-purple-200"
                  }`
                : `${
                    pathname === "/counselor/counselee"
                      ? "text-purple-300 bg-purple-900 bg-opacity-40 hover:bg-purple-950 hover:bg-opacity-45"
                      : "hover:bg-purple-950 hover:bg-opacity-45"
                  }`
            } font-semibold text-gray-500`}
          >
            Counselee
          </p>
        </Link>
        <Link href={"/counselor/sessions"}>
          <p
            className={`px-3 py-2 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? `${
                    pathname === "/counselor/sessions"
                      ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
                      : "hover:bg-purple-200"
                  }`
                : `${
                    pathname === "/counselor/sessions"
                      ? "text-purple-300 bg-purple-900 bg-opacity-40 hover:bg-purple-950 hover:bg-opacity-45"
                      : "hover:bg-purple-950 hover:bg-opacity-45"
                  }`
            } font-semibold text-gray-500`}
          >
            Sessions
          </p>
        </Link>
        <Link href={"/counselor/activities"}>
          <p
            className={`px-3 py-2 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? `${
                    pathname === "/counselor/activities"
                      ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
                      : "hover:bg-purple-200"
                  }`
                : `${
                    pathname === "/counselor/activities"
                      ? "text-purple-300 bg-purple-900 bg-opacity-40 hover:bg-purple-950 hover:bg-opacity-45"
                      : "hover:bg-purple-950 hover:bg-opacity-45"
                  }`
            } font-semibold text-gray-500`}
          >
            Activities
          </p>
        </Link>
        <Link href={"/counselor/attendance?size=30"}>
          <p
            className={`px-3 py-2 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? `${
                    pathname === "/counselor/attendance"
                      ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
                      : "hover:bg-purple-200"
                  }`
                : `${
                    pathname === "/counselor/attendance"
                      ? "text-purple-300 bg-purple-900 bg-opacity-40 hover:bg-purple-950 hover:bg-opacity-45"
                      : "hover:bg-purple-950 hover:bg-opacity-45"
                  }`
            } font-semibold text-gray-500`}
          >
            Attendance
          </p>
        </Link>
        <Link href={"/counselor/sadhana?page=0&size=30"}>
          <p
            className={`px-3 py-2 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? `${
                    pathname === "/counselor/sadhana"
                      ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
                      : "hover:bg-purple-200"
                  }`
                : `${
                    pathname === "/counselor/sadhana"
                      ? "text-purple-300 bg-purple-900 bg-opacity-40 hover:bg-purple-950 hover:bg-opacity-45"
                      : "hover:bg-purple-950 hover:bg-opacity-45"
                  }`
            } font-semibold text-gray-500`}
          >
            Sadhana
          </p>
        </Link>
        <Link href={"/counselor/scan"}>
          <p
            className={`px-3 py-2 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? `${
                    pathname === "/counselor/scan"
                      ? "text-purple-500 bg-purple-100 hover:bg-purple-200"
                      : "hover:bg-purple-200"
                  }`
                : `${
                    pathname === "/counselor/scan"
                      ? "text-purple-300 bg-purple-900 bg-opacity-40 hover:bg-purple-950 hover:bg-opacity-45"
                      : "hover:bg-purple-950 hover:bg-opacity-45"
                  }`
            } font-semibold text-gray-500`}
          >
            Scan
          </p>
        </Link>
      </div>
    </div>
  );
}

function MenuCBM({ response }: { response: Props }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { state } = useGlobalState();
  const router = useRouter();

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
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        ref={menuRef}
      >
        <div className=" flex items-center gap-2">
          <p
            className={`p-3 rounded-full ${
              state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-900"
            }`}
          >
            <LuUser2 className="h-4 w-4" />
          </p>
          <div>
            <p className="font-bold">
              {response?.initiatedName
                ? response?.initiatedName
                : `${response?.firstName} ${response?.lastName}`}
            </p>
            <p
              className={`font-semibold ${
                state.theme.theme === "LIGHT"
                  ? "text-gray-500"
                  : "text-stone-500"
              }`}
            >
              {response?.role}
            </p>
          </div>
        </div>
        <div
          className={`absolute top-full w-max right-0 mt-2 z-[2500] ${
            state.theme.theme === "LIGHT"
              ? "bg-white text-black"
              : "bg-stone-900 text-white"
          } rounded-lg shadow-lg transform transition-transform duration-300 ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="p-2 flex flex-col gap-2">
            <Link href={"/changepassword"}>
              <li
                className={`flex items-center gap-5 py-3 px-1.5 rounded-lg whitespace-nowrap ${
                  state.theme.theme === "LIGHT"
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-stone-800 hover:bg-stone-700"
                }`}
              >
                <MdLock />
                Change Password
              </li>
            </Link>
            <Link href={`/updatedetails/${response.id}`}>
              <li
                className={`flex items-center gap-5 py-3 px-1.5 rounded-lg whitespace-nowrap ${
                  state.theme.theme === "LIGHT"
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-stone-800 hover:bg-stone-700"
                }`}
              >
                <MdOutlineTipsAndUpdates />
                Update Details
              </li>
            </Link>
            <li
              onClick={() => {
                LogoutCounselor();
                router.push("/auth/signin");
              }}
              className={`flex items-center gap-5 py-3 px-1.5 rounded-lg whitespace-nowrap ${
                state.theme.theme === "LIGHT"
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "bg-stone-800 hover:bg-stone-700"
              }`}
            >
              <RiLogoutCircleLine />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function ChangeTheme() {
  const { state, dispatch } = useGlobalState();
  return (
    <div>
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
          className={`p-2.5 rounded-lg bg-stone-900 bg-opacity-40 text-yellow-500`}
        >
          <SunIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function NavigationMenu() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const pathname = usePathname();
  const { state } = useGlobalState();
  return (
    <div className="md:hidden block">
      <button className="" onClick={() => setIsOpenDrawer(true)}>
        <Bars3Icon className="h-5 w-5" />
      </button>
      <Drawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
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
            href="/counselor/counselee"
            onClick={() => setIsOpenDrawer(false)}
          >
            <div
              className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                pathname === "/counselor/counselee"
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
            href={"/counselor/sessions"}
            onClick={() => setIsOpenDrawer(false)}
          >
            <div
              className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                pathname === "/counselor/sessions"
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
              <p className={`text-lg font-semibold`}>sessions</p>
            </div>
          </Link>
          <Link
            href={"/counselor/activities"}
            onClick={() => setIsOpenDrawer(false)}
          >
            <div
              className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                pathname === "/counselor/activities"
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
              <p className={`text-lg font-semibold`}>activities</p>
            </div>
          </Link>
          <Link
            href={"/counselor/attendance"}
            onClick={() => setIsOpenDrawer(false)}
          >
            <div
              className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                pathname === "/counselor/attendance"
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
              <p className={`text-lg font-semibold`}>attendance</p>
            </div>
          </Link>
          <Link
            href={"/counselor/sadhana"}
            onClick={() => setIsOpenDrawer(false)}
          >
            <div
              className={`px-5 py-2.5 rounded-lg flex items-center gap-5 ${
                pathname === "/counselor/sadhana"
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
              <p className={`text-lg font-semibold`}>sadhana</p>
            </div>
          </Link>
          <Link href={"/counselor/scan"} onClick={() => setIsOpenDrawer(false)}>
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
  );
}
