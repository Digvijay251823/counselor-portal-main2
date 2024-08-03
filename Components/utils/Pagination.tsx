"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useGlobalState } from "../context/state";

function Pagination({
  totalElements,
  skipped,
  limit,
}: {
  totalElements: number;
  skipped?: number;
  limit?: number;
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state } = useGlobalState();
  const [VisibleElements, setVisibleElement] = useState<number>(
    limit ? limit : 10
  );

  const Limit = limit ? Number(limit) : 10;

  useEffect(() => {
    const searchParamsUrl = new URLSearchParams(searchParams).get("page");
    const limit = new URLSearchParams(searchParams).get("size");

    const page = searchParamsUrl ? Number(searchParamsUrl) : 0;
    const pageNumber = currentPage + 1;
    const Limit = limit ? Number(limit) : 10;
    setVisibleElement(pageNumber * Limit);
    setCurrentPage(page);
  }, [searchParams, currentPage]);

  return (
    <div className="flex items-center justify-between gap-5 p-5">
      {VisibleElements !== Limit ? (
        <Link
          href={{
            pathname,
            query: {
              ...Object.fromEntries(new URLSearchParams(searchParams)),
              page: currentPage - 1,
            },
          }}
          onClick={() => setVisibleElement((prev) => prev - Limit)}
        >
          <p
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-blue-100 rounded-full p-2 text-blue-600"
                : "bg-blue-950 rounded-full p-2 bg-opacity-40 text-blue-600"
            }`}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </p>
        </Link>
      ) : (
        <p
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-stone-100 rounded-full text-stone-400 p-2"
              : "bg-stone-900 rounded-full text-stone-600 p-2"
          }`}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </p>
      )}
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
          {skipped ? skipped + 1 : 0}
        </span>{" "}
        to{" "}
        <span
          className={`font-semibold ${
            state.theme.theme === "LIGHT" ? "text-gray-900" : "text-white"
          }`}
        >
          {VisibleElements > totalElements ? totalElements : VisibleElements}
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

      {VisibleElements > totalElements || VisibleElements === totalElements ? (
        <p
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-stone-100 rounded-full text-stone-400 p-2"
              : "bg-stone-900 rounded-full text-stone-600 p-2"
          }`}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </p>
      ) : (
        <Link
          href={{
            pathname,
            query: {
              ...Object.fromEntries(new URLSearchParams(searchParams)),
              page: currentPage + 1,
            },
          }}
          onClick={() => setVisibleElement((prev) => prev + Limit)}
        >
          <p
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-blue-100 rounded-full p-2 text-blue-600"
                : "bg-blue-950 rounded-full p-2 bg-opacity-40 text-blue-600"
            }`}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </p>
        </Link>
      )}
    </div>
  );
}

export default Pagination;
