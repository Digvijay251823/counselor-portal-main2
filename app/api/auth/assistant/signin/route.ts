import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { phoneNumber, password } = await req.json();
    const formData = {
      phoneNumber,
      password,
    };
    console.log(formData);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetch(`${SERVER_URL}/auth/authenticate`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;
      const counselor = responseData.counselor;
      const cookieresponse = JSON.stringify({ token, counselor });
      return NextResponse.json(
        {
          message: responseData.message,
          counselor: responseData.counselor,
        },
        {
          status: response.status,
          headers: {
            "Set-Cookie": `AUTH=${cookieresponse};SameSite=None; Secure; HttpOnly; Path=/;Max-Age=${
              15 * 24 * 60 * 60
            };`,
          },
        }
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
      { message: error.message || error.title || "unexpected error occured" },
      { status: 500 }
    );
  }
}
