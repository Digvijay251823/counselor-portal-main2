import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      deityWorshipSeva,
      guruPuja,
      mangalAarti,
      morningJapa,
      otherSeva,
      sbClass,
      counselorId,
      location,
    } = await req.json();
    const formData = {
      deityWorshipSeva,
      guruPuja,
      mangalAarti,
      morningJapa,
      otherSeva,
      sbClass,
      counselorId,
      location,
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    const response = await fetch(`${SERVER_URL}/cbm-seva/create`, {
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
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message | error.title },
      { status: 500 }
    );
  }
}
