import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const cookiesvalue = req.cookies.get("AUTH")?.value;
  const cookiesparsed = cookiesvalue && JSON.parse(cookiesvalue);
  if (!cookiesparsed) {
    return NextResponse.json(
      { message: "please login to access the resource" },
      { status: 401 }
    );
  }
  const counselorid = cookiesparsed?.counselor?.id;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${cookiesparsed.token}`);
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/autoapprove/toggle/${counselorid}`,
      { method: "POST", headers }
    );
    if (response.ok) {
      const responseData = await response.json();
      if (cookiesparsed.counselor.autoApprove === true) {
        cookiesparsed.counselor.autoApprove = false;
      } else {
        cookiesparsed.counselor.autoApprove = true;
      }
      return NextResponse.json(
        { message: responseData.message },
        {
          status: response.status,
          headers: {
            "Set-Cookie": `AUTH=${JSON.stringify(
              cookiesparsed
            )};SameSite=None; Secure; HttpOnly; Path=/;Max-Age=${
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
