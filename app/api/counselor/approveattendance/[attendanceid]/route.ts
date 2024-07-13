import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { attendanceid: string } }
) {
  console.log(params);
  const authcookie = cookies().get("AUTH")?.value;
  const authtoken = authcookie && JSON.parse(authcookie);
  if (!authtoken) {
    return NextResponse.json(
      { message: "You Dont Have Access To Approve Attendance" },
      { status: 401 }
    );
  }
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/approve/${params.attendanceid}`,
      { method: "GET", headers: header }
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
    return NextResponse.json(
      { message: "responseData.message" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
