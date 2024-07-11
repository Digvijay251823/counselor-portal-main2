import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { counselorId, counseleeId, changeRequestId } = await req.json();
  const authcookie = cookies().get("AUTH")?.value;
  const authtoken = authcookie && JSON.parse(authcookie);
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);
  const formData = {
    counselorId,
    counseleeId,
  };
  try {
    const response = await fetch(`${SERVER_URL}/counselee/updatecounselor`, {
      method: "PUT",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseApprove = await fetch(
        `${SERVER_URL}/counselorprovider/approve/${changeRequestId}`,
        { method: "GET", headers: header }
      );
      if (!responseApprove.ok) {
        const responseApproveData = await responseApprove.json();
        return NextResponse.json(
          { message: responseApproveData.content },
          { status: responseApprove.status }
        );
      }
      const responseData = await response.json();

      return NextResponse.json(
        { message: "Successfully Changed Counselor" },
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
