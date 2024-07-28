import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const authcontent = cookies().get("AUTH")?.value;
    const authparsed = authcontent && JSON.parse(authcontent);
    if (!authparsed) {
      return NextResponse.json(
        {
          message: "Pleas Authenticate to access the resource",
        },
        { status: 401 }
      );
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const { expirationTime } = await req.json();
    const response = await fetch(
      `${SERVER_URL}/Counselor/updatedetails/${authparsed.counselor.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ sessionExpirationTime: expirationTime }),
      }
    );
    if (response.ok) {
      return NextResponse.json(
        { message: `Updated Session Expiration To ${expirationTime}` },
        { status: 200 }
      );
    } else {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Counselor might not exist" },
          { status: 404 }
        );
      }
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 200 });
  }
}
