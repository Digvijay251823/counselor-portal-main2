import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDebounce } from "use-debounce";

export default function DateFilter() {
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(fromDate, 500);
  const [value2] = useDebounce(toDate, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    startDate: value,
  };
  const queryStr2: any = {
    ...searchUrlParams,
    endDate: value2,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "startDate"
  );
  const filterQuery2 = Object.keys(prevQry).filter(
    (item) => item !== "endDate"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const prevQueryString2 = filterQuery2
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(queryStr2[key])
    )
    .join("&");
  const queryString2 = Object.keys(queryStr2)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(queryStr2[key])
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
      router.push(`${pathname}?${prevQueryString2}`);
    } else {
      router.push(`${pathname}?${queryString2}`);
    }
  }, [value2, router, pathname, queryString2, prevQueryString2]);
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

  return (
    <div>
      <div className="flex items-center gap-1 font-semibold">
        <p>From</p>
        <ReactDatePicker
          onChange={(e) => setFromDate(e?.toISOString().toString())}
          value={fromDate}
          placeholderText="Date"
          className="w-[90px] border py-1 rounded px-1"
        />
        <p>To</p>
        <ReactDatePicker
          onChange={(e) => setToDate(e?.toISOString().toString())}
          value={toDate}
          placeholderText="Date"
          className="w-[90px] border py-1 rounded px-1"
        />
      </div>
    </div>
  );
}
