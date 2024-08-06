import PlannningToRelocate from "@/Components/cct/planningtorelocate/PlanningToRelocate";
import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";

async function getEntires() {
  try {
    const response = await fetch(`${SERVER_URL}/planningrelocate`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const responseData = await response.json();
      throw new Error(responseData.message);
    }
  } catch (error) {
    throw error;
  }
}

export default async function page() {
  try {
    const response = await getEntires();
    return (
      <div>
        <PlannningToRelocate counselee={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.messgae} />;
  }
}
