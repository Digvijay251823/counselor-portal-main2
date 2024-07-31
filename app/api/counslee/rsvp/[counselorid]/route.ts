import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { counselorid: string } }
) {
  const scheduledSessionId = req.nextUrl.searchParams.get("scheduledSessionId");
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/counselor/rsvp?counselorid=${params.counselorid}&scheduledSessionId=${scheduledSessionId}`
    );

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData?.content },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || error.title },
      { status: 500 }
    );
  }
}
