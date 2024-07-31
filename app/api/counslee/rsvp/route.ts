import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const formData = await req.json();
    if (!formData.counseleeId) {
      return NextResponse.json(
        { message: "Could not find counselee" },
        { status: 404 }
      );
    }
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/counselor/rsvp/mark`,
      { method: "POST", headers, body: JSON.stringify(formData) }
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: 200 }
      );
    } else {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Session Or Counselee Not Found" },
          { status: 404 }
        );
      }
      if (response.status === 400) {
        return NextResponse.json(
          { message: "You Might Have Passed Invalid Data" },
          { status: 400 }
        );
      }

      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
