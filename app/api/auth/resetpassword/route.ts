import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { token, newPassword } = await req.json();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetch(
      `${SERVER_URL}/auth/reset/${token}?newPassword=${encodeURIComponent(
        newPassword
      )}`,
      { method: "PUT", headers }
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
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
