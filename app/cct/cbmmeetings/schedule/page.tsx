import ScheduleMeeting from "@/Components/cct/CBMMeetings/ScheduleMeeting";
import { SERVER_URL } from "@/Components/config/config";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

export default async function page() {
  try {
    const auth = cookies().get("AUTH")?.value;
    const parsedauth = auth && JSON.parse(auth);
    if (!parsedauth) {
      return <ErrorComponent message={"please authenticate to access"} />;
    }
    return (
      <div>
        <ScheduleMeeting counselorId={parsedauth?.counselor?.id} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}
