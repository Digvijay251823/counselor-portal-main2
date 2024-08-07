import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.json();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const filteredFormData = Object.entries(formData)
      .filter(
        ([key, value]) => value !== null && value !== undefined && value !== ""
      )
      .reduce((obj: any, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    const response = await fetch(`${SERVER_URL}/Counselor/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(filteredFormData),
    });
    if (response.ok) {
      return NextResponse.json(
        { message: "SuccessFully Registered" },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
    // return NextResponse.json(
    //   { message: " responseData.message" },
    //   { status: 200 }
    // );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
