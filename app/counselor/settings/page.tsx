import { SERVER_URL } from "@/Components/config/config";
import SettingsPageAutoApproval from "@/Components/counselor/settings/SettingsPage";
import SettingSessionExpiration from "@/Components/counselor/settings/SettingsPageExpirationSession";
import ErrorComponent from "@/Components/utils/ErrorPage";
import { cookies } from "next/headers";

const counselorSettings = async (counselorid: string) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/Counselor/get/settings/${counselorid}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const responseData = await response.json();
      throw responseData.message;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default async function page() {
  const authcontent = cookies().get("AUTH")?.value;
  const authparsed = authcontent && JSON.parse(authcontent);
  if (!authparsed) {
    return (
      <ErrorComponent message="Pleas Authenticate to access the resource" />
    );
  }
  const response = await counselorSettings(authparsed.counselor.id);

  return (
    <div className="flex flex-col items-center h-screen pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SettingsPageAutoApproval
          isAutoApproveOn={response.settings.autoApprove}
        />
        <SettingSessionExpiration
          numberOfDays={response.settings.sessionExpiration}
        />
      </div>
    </div>
  );
}
