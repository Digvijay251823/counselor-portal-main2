import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { phonenumber: string } }
) {
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee/phonenumber/${params.phonenumber}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData },
        { status: response.status }
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
