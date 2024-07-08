import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { cbmmeetingId, counselorId, modeOfAttendance } = await req.json();
  const formData: any = {
    cbmmeetingId,
    counselorId,
    modeOfAttendance,
  };
  const header = new Headers();
  header.append("Content-Type", "application/json");
  try {
    const response = await fetch(`${SERVER_URL}/cbmattendance/mark`, {
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
      if (response.status === 404) {
        return NextResponse.json(
          { message: "devotee does not exist" },
          { status: response.status }
        );
      }
      if (response.status === 409) {
        return NextResponse.json(
          { message: "You Already Marked Attendance" },
          { status: response.status }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message },
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
