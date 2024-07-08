import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { phoneNumber, email, password } = await req.json();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const formData = {
      phoneNumber,
      email,
      password,
    };
    const response = await fetch(`${SERVER_URL}/auth/registeration`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
