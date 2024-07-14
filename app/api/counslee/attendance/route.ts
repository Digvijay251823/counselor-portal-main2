import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { scheduledSessionId, counseleeId, counselorId, ModeOfAttendance } =
    await req.json();
  const formData = {
    scheduledSessionId,
    counseleeId,
    counselorId,
    ModeOfAttendance,
  };
  const header = new Headers();
  header.append("Content-Type", "application/json");
  try {
    const response = await fetch(`${SERVER_URL}/counselee-attendance/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "Already Submitted Attendance" },
          { status: 409 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        {
          message:
            errorData.message ||
            errorData.title ||
            "Unexpected exception occured",
        },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
