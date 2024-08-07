import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { firstName, lastName, age, gender, address, phoneNumber } =
    await req.json();
  const formData = {
    firstName,
    lastName,
    age,
    gender,
    address,
    phoneNumber,
  };
  const filteredFormData = Object.entries(formData)
    .filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
    .reduce((obj: any, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  const header = new Headers();
  header.append("Content-Type", "application/json");
  try {
    const response = await fetch(`${SERVER_URL}/counselee/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(filteredFormData),
    });
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: 200 }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          {
            message: "counselee already exist please try different number",
          },
          { status: 409 }
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
      {
        message: error.message || "Unexpected exception occured",
      },
      { status: 500 }
    );
  }
}
