import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { counselorid: string } }
) {
  try {
    const {
      firstName,
      lastName,
      initiatedName,
      phoneNumber,
      age,
      email,
      address,
      legalNameOfSpouce,
      currentCounselor,
      yourInitiatingSpiritualMaster,
      harinamInitiationDate,
      harinamInitiationPlace,
      children,
    } = await req.json();
    const formData = {
      firstName,
      lastName,
      initiatedName,
      phoneNumber,
      age,
      email,
      address,
      legalNameOfSpouce,
      currentCounselor,
      yourInitiatingSpiritualMaster,
      harinamInitiationDate,
      harinamInitiationPlace,
      children,
    };

    const filteredFormData = Object.entries(formData)
      .filter(
        ([key, value]) => value !== null && value !== undefined && value !== ""
      )
      .reduce((obj: any, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch(
      `${SERVER_URL}/Counselor/updatedetails/${params.counselorid}`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(filteredFormData),
      }
    );
    if (response.ok) {
      const responseData = await response.json();

      return NextResponse.json(
        {
          message: responseData.message,
        },
        {
          status: response.status,
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
    return NextResponse.json(
      { message: error.message || error.title || "unexpected error occured" },
      { status: 500 }
    );
  }
}
