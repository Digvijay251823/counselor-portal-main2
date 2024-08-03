"use client";
import { useGlobalState } from "@/Components/context/state";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export default function PaginationPage({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state } = useGlobalState();
  const initialRef = useRef(true);
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [TotalPages] = useState(totalPages);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [value] = useDebounce(CurrentPage, 300);
  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    page: value,
  };
  const filterQuery = Object.keys(prevQry).filter((item) => item !== "page");

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);
  return (
    <div className="flex items-center gap-2 mt-2">
      <p className="font-semibold">Page : </p>
      <div className="flex items-center gap-0 ">
        <input
          type="number"
          value={CurrentPage}
          onChange={(e) => {
            if (Number(e.target.value) > 14) {
              return;
            }
            setCurrentPage(Number(e.target.value));
          }}
          className={`border w-[100px] py-2 outline-none px-1.5 ${
            state.theme.theme === "LIGHT"
              ? "bg-white"
              : "bg-stone-950 border-stone-800"
          }`}
          placeholder="page no."
        />
        <button
          disabled
          className={`px-2 py-2 font-semibold ${
            state.theme.theme === "LIGHT"
              ? "bg-white border border-gray-300"
              : "bg-stone-900 border border-stone-800"
          }`}
        >
          out of
          {TotalPages}
        </button>
      </div>
    </div>
  );
}
