import ChangeCounselor from "@/Components/cct/ChangeCounselor/ChangeCounselor";
import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";

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
      <div>
        <div>
          <ChangeCounselor response={response.content} />
        </div>
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}
