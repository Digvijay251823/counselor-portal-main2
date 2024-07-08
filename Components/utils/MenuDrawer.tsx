"use client";
import React from "react";
import { useGlobalState } from "../context/state";
import { usePathname } from "next/navigation";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const { state } = useGlobalState();
  const pathname = usePathname();
  return (
    <div
      className={`fixed inset-0 overflow-hidden z-[2500] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 w-4/5 flex ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform transform duration-300 ease-in-out`}
      >
        <div className="relative w-screen max-w-md">
          <div
            className={`h-full flex flex-col ${
              state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
            } shadow-2xl rounded-r-2xl overflow-hidden`}
          >
            <div
              className={`p-6 flex justify-between items-center border-b ${
                state.theme.theme === "LIGHT"
                  ? "border-b-gray-300"
                  : "border-b-stone-700"
              }`}
            >
              {pathname.startsWith("/counselor") ? (
                <h2 className="text-xl font-semibold ">Counselor Menu</h2>
              ) : pathname.startsWith("/cct") ? (
                <h2 className="text-xl font-semibold ">CCT Menu</h2>
              ) : (
                ""
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
