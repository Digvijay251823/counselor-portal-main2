import UpdateDetails from "@/Components/auth/updateDetails/UpdateDetails";
import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";

async function getCounselorDetails(counselorid: string) {
  const response = await fetch(`${SERVER_URL}/Counselor/id/${counselorid}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    if (response.status === 404) {
      return null;
    }
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

export default async function page({
  params,
}: {
  params: { counselorid: string };
}) {
  try {
    const response = await getCounselorDetails(params.counselorid);
    if (!response) {
      return <NotExistsResource message="Counselee Not Found" />;
    }
    return (
      <div className="w-full">
        <UpdateDetails counselor={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}
