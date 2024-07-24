"use client";

import { useGlobalState } from "@/Components/context/state";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pageable({
  skipped,
  totalElements,
}: {
  skipped: number;
  totalElements: number;
}) {
  const { state } = useGlobalState();
  const searchParams = useSearchParams();
  return (
    <div>
      <div className="flex flex-col items-center">
        <span
          className={`${
            state.theme.theme === "LIGHT"
              ? "text-gray-700 "
              : "dark:text-gray-400"
          }`}
        >
          Showing{" "}
          <span
            className={`font-semibold ${
              state.theme.theme === "LIGHT" ? "text-gray-900" : "text-white"
            }`}
          >
            {skipped + 1}
          </span>{" "}
          to{" "}
          <span
            className={`font-semibold ${
              state.theme.theme === "LIGHT" ? "text-gray-900" : "text-white"
            }`}
          >
            {skipped + 10}
          </span>{" "}
          of{" "}
          <span
            className={`font-semibold ${
              state.theme.theme === "LIGHT" ? "text-gray-900" : "text-white"
            }`}
          >
            {totalElements}
          </span>{" "}
          Entries
        </span>

        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className={`flex items-center justify-center px-4 h-10 text-base font-medium rounded-s ${
              state.theme.theme === "LIGHT"
                ? " bg-gray-300 "
                : "hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Prev
          </button>

          <button
            className={`flex items-center justify-center px-4 h-10 text-base font-medium border-0 border-s  rounded-e ${
              state.theme.theme === "LIGHT"
                ? "bg-gray-300 "
                : "hover:bg-gray-900 border-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
