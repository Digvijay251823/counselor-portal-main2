import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { attendanceid: string } }
) {
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/approve/${params.attendanceid}`
    );
    if (response.ok) {
      const responseData = await response.json();

      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message },
        { status: errorData.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
