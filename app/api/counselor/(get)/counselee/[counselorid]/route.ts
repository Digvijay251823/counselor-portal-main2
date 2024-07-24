import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { counselorid: string } }
) {
  const url = new URLSearchParams(new URL(req.url).searchParams);
  console.log(url.get("page"));
  try {
    const response = await fetch(
      `${SERVER_URL}/Counselor/counselees/${params.counselorid}`
    );
    console.log(response.status);
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData.Content },
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
    return NextResponse.json({ status: error.message }, { status: 500 });
  }
}
