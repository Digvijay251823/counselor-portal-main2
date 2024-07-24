import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${SERVER_URL}/activity`);
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
