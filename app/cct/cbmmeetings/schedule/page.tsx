import ErrorComponent from "@/Components/utils/ErrorPage";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const ScheduleMeeting = dynamic(
  () => import("@/Components/cct/CBMMeetings/ScheduleMeeting")
);

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
