"use server";
import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, description, startTime, modeOfAttendance, counselorId } =
    await req.json();
  const formData: any = {
    name,
    description,
    startTime,
    modeOfAttendance,
    counselorId,
  };
  const authcookie = cookies().get("AUTH")?.value;
  const authtoken = authcookie && JSON.parse(authcookie);
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "devotee already exists" },
          { status: 404 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}
