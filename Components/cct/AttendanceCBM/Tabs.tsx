import { useGlobalState } from "@/Components/context/state";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Tabs() {
  const pathname = usePathname();
  const { state } = useGlobalState();
  const searchParams = useSearchParams();
  const UrlsearchParams = new URLSearchParams(searchParams).get(
    "modeOfAttendance"
  );

  return (
    <div>
      <ul className="text-sm font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full focus-within:z-10">
          <Link
            href={{
              pathname,
              query: {
                ...Object.fromEntries(new URLSearchParams(searchParams)),
                modeOfAttendance: "ONLINE",
              },
            }}
            className={
              UrlsearchParams === "ONLINE"
                ? `inline-block w-full p-4  rounded-l-lg active  focus:ring-4 focus:ring-blue-300 focus:outline-none ${
                    state.theme.theme === "LIGHT"
                      ? "text-gray-900 bg-gray-100 border-r border-gray-200"
                      : "dark:bg-gray-700 dark:text-white dark:border-gray-700 "
                  }`
                : `inline-block w-full p-4 rounded-l-lg focus:ring-4 focus:outline-none border-s-0   ${
                    state.theme.theme === "LIGHT"
                      ? "bg-white  border-gray-200 dark:border-gray-700  hover:text-gray-700 hover:bg-gray-50"
                      : "focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`
            }
            aria-current="page"
          >
            ONLINE
          </Link>
        </li>

        <li className="w-full focus-within:z-10">
          <Link
            href={{
              pathname,
              query: {
                ...Object.fromEntries(new URLSearchParams(searchParams)),
                modeOfAttendance: "OFFLINE",
              },
            }}
            className={
              UrlsearchParams === "OFFLINE"
                ? `inline-block w-full p-4  rounded-r-lg active  focus:ring-4 focus:ring-blue-300 focus:outline-none ${
                    state.theme.theme === "LIGHT"
                      ? "text-gray-900 bg-gray-100 border-r border-gray-200"
                      : "dark:bg-gray-700 dark:text-white dark:border-gray-700 "
                  }`
                : `inline-block w-full p-4 rounded-r-lg focus:ring-4 focus:outline-none border-s-0   ${
                    state.theme.theme === "LIGHT"
                      ? "bg-white  border-gray-200 dark:border-gray-700  hover:text-gray-700 hover:bg-gray-50"
                      : "focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`
            }
          >
            OFFLINE
          </Link>
        </li>
      </ul>
    </div>
  );
}
