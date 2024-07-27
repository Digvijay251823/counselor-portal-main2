import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import Pagination from "@/Components/utils/Pagination";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
const ChangeCounselor = dynamic(
  () => import("@/Components/cct/ChangeCounselor/ChangeCounselor")
);

async function getChangeCounselor(queryString: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/counselorprovider?${queryString}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  try {
    const queryString = new URLSearchParams(searchParams).toString();
    const response = await getChangeCounselor(queryString);
    return (
      <div className="flex flex-col items-center">
        <ChangeCounselor response={response.content} />
        <Pagination totalElements={response.total} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}
