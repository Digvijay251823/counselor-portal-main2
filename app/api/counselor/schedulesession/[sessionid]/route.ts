import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { sessionid: string } }
) {
  const authcookie = cookies().get("AUTH")?.value;
  let authtoken: { token: string } | null = null;

  if (authcookie) {
    try {
      authtoken = JSON.parse(authcookie);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid auth token" },
        { status: 400 }
      );
    }
  }

  if (!authtoken) {
    return NextResponse.json(
      { message: "Authorization required" },
      { status: 401 }
    );
  }

  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);

  try {
    const response = await fetch(
      `${SERVER_URL}/session/delete/${params.sessionid}`,
      {
        method: "DELETE",
        headers: header,
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      return NextResponse.json(
        {
          message:
            responseData.message ||
            responseData.title ||
            "Unexpected error occurred",
        },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

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
  const formData = {
    startTime,
  };
  try {
    const response = await fetch(
      `${SERVER_URL}/session/update/${params.sessionid}`,
      {
        method: "PUT",
        headers: header,
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      const responseData = await response.json();
      return NextResponse.json(
        {
          message:
            responseData.message ||
            responseData.title ||
            "unexpected error occured",
        },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Unexpected exception occured",
      },
      { status: 500 }
    );
  }
}
