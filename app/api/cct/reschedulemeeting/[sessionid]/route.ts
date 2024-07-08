import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { sessionid: string } }
) {
  const { startTime } = await req.json();
  const authcookie = cookies().get("AUTH")?.value;
  const authtoken = authcookie && JSON.parse(authcookie);
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);
  const formData: any = {
    startTime,
  };
  try {
    const response = await fetch(
      `${SERVER_URL}/cbm-meetings/update/${params.sessionid}`,
      {
        method: "PUT",
        headers: header,
        body: JSON.stringify(formData),
      }
    );
    console.log(response.status);
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: responseData.status }
      );
    } else {
      if (response.status === 404) {
        throw NextResponse.json(
          { message: "Session Does not Exist" },
          { status: 404 }
        );
      }
      const errorData = await response.json();
      throw NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    throw NextResponse.json(
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}
