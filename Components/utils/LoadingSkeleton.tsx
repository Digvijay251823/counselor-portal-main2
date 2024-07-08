// components/TableSkeleton.tsx
"use client";
import React from "react";
import { useGlobalState } from "../context/state";

const TableSkeleton: React.FC = () => {
  const rows = Array.from({ length: 5 }); // Number of skeleton rows
  const columns = Array.from({ length: 5 }); // Number of skeleton columns
  const { state } = useGlobalState();
  return (
    <div
      className={`w-[90vw] overflow-hidden rounded-lg border ${
        state.theme.theme === "LIGHT" ? "border-gray-200" : "border-stone-800"
      } shadow-md`}
    >
      <table
        className={`min-w-full divide-y ${
          state.theme.theme === "LIGHT"
            ? `divide-gray-200`
            : " divide-stone-800"
        }`}
      >
        <thead
          className={`${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <tr>
            {columns.map((_, index) => (
              <th key={index} className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            state.theme.theme === "LIGHT"
              ? "bg-white divide-gray-200"
              : "bg-stone-800 divide-stone-700"
          } animate-pulse`}
        >
          {rows.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
