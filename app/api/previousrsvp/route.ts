import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { counselorid, scheduledSessionId } = await req.json();
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/counselor/rsvp?counselorid=${counselorid}&scheduledSessionId=${scheduledSessionId}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData.content },
        { status: 200 }
      );
    } else {
      if (response.status === 404) {
        return NextResponse.json({ message: "no rsvp found" }, { status: 404 });
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
