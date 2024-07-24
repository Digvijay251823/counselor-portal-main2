"use client";
import { useGlobalState } from "@/Components/context/state";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function ExportFile() {
  const { state } = useGlobalState();
  return (
    <div>
      <div>
        <div className="flex items-center justify-between pb-5 pt-2 px-2">
          <div></div>
          <div
            className={`flex items-center border cursor-pointer ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 active:ring-2 active:ring-stone-400"
                : "border-stone-700 active:ring-2 active:ring-stone-700"
            } px-2 py-1.5 rounded-lg`}
          >
            <p>Export</p>
            <ArrowUpTrayIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
