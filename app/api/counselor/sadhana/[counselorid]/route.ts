import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { counselorid: string } }
) {
  const {
    numberOfRounds,
    first8RoundsCompletedTime,
    next8RoundsCompletedTime,
    wakeUpTime,
    sleepTime,
    prabhupadaBookReading,
    nonPrabhupadaBookReading,
    prabhupadaClassHearing,
    guruClassHearing,
    otherClassHearing,
    speaker,
    attendedArti,
    mobileInternetUsage,
    topic,
    visibleSadhana,
  } = await req.json();
  const formData = {
    numberOfRounds,
    first8RoundsCompletedTime,
    next8RoundsCompletedTime,
    wakeUpTime,
    sleepTime,
    prabhupadaBookReading,
    nonPrabhupadaBookReading,
    prabhupadaClassHearing,
    guruClassHearing,
    otherClassHearing,
    speaker,
    attendedArti,
    mobileInternetUsage,
    topic,
    visibleSadhana,
  };
  const authcookie = cookies().get("AUTH")?.value;
  const authtoken = authcookie && JSON.parse(authcookie);
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);
  try {
    const response = await fetch(
      `${SERVER_URL}/sadhana/configure/${params.counselorid}`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Counselor Not Found" },
          { status: 404 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}
