"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { useGlobalState } from "../context/state";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdLock, MdOutlineTipsAndUpdates } from "react-icons/md";
import Link from "next/link";
import { LogoutCounselor } from "@/actions/ADMINREQUESTS";
interface Props {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

function LocationComponent({ response }: { response: Props }) {
  const pathname = usePathname();
  const { state } = useGlobalState();
  var parts = pathname.split("/");
  var actualPathname = parts[parts.length - 1];
  return (
    <div
      className={`flex flex-col md:px-10 justify-center w-full py-5 px-5 ${
        state.theme.theme === "LIGHT"
          ? " bg-gradient-to-r from-blue-100 via-purple-300 to-red-100"
          : " bg-gradient-to-r from-blue-950 via-stone-900 to-red-950"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold uppercase">{actualPathname}</p>{" "}
        <MenuCBM response={response} />
      </div>
      <div className="flex w-full justify-start">
        <PathWithIcons pathname={pathname} />
      </div>
    </div>
  );
}
export default LocationComponent;

const PathWithIcons = ({ pathname }: { pathname: string }) => {
  const { state } = useGlobalState();
  const parts = pathname.split("/");

  // Create JSX for each part with SVG icon and text
  const formattedPath = parts.map((part, index) => (
    <React.Fragment key={index}>
      <div className="flex items-center">
        {index > 0 && (
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180  w-2 h-2 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </div>
        )}
        <span className="ms-1 font-[400] text-gray-500 md:ms-2">{part}</span>
      </div>
    </React.Fragment>
  ));

  return (
    <nav
      className={`flex pr-5 py-0.5 rounded-lg ${
        state.theme.theme === "LIGHT" ? " text-gray-700 " : ""
      }`}
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center uppercase">{formattedPath}</ol>
    </nav>
  );
};

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
        <div className=" flex md:hidden items-center gap-2 border rounded-xl p-1">
          <p
            className={`p-3 rounded-full ${
              state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-900"
            }`}
          >
            <LuUser2 className="h-4 w-4" />
          </p>
          <div>
            <p className="font-bold text">
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
