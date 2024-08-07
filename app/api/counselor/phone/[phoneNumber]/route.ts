import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { phoneNumber: string } }
) {
  try {
    const response = await fetch(
      `${SERVER_URL}/Counselor/phonenumber/${params.phoneNumber}`
    );

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData.content },
        { status: response.status }
      );
    } else {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ status: error.message }, { status: 500 });
  }
}
