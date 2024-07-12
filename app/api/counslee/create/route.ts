import { SERVER_URL } from "@/Components/config/config";
import { NextRequest, NextResponse } from "next/server";

function getExistingFields(obj: any) {
  let result: any = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        // Include non-empty arrays
        if (
          obj[key].length > 0 &&
          obj[key].some((child: any) =>
            Object.values(child).some((value) => value)
          )
        ) {
          result[key] = obj[key];
        }
      } else if (
        obj[key] !== "" &&
        obj[key] !== null &&
        obj[key] !== undefined
      ) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      firstName,
      lastName,
      initiatedName,
      phoneNumber,
      gender,
      age,
      email,
      maritalStatus,
      address,
      profession,
      yourInitiatingSpiritualMaster,
      harinamInitiationDate,
      harinamInitiationPlace,
      comments,
      currentCounselor,
      connectedToCounselorSinceYear,
      spouce,
      children,
    } = await req.json();

    const formState = {
      firstName,
      lastName,
      initiatedName,
      phoneNumber,
      gender,
      age,
      email,
      maritalStatus,
      address,
      profession,
      yourInitiatingSpiritualMaster,
      harinamInitiationDate,
      harinamInitiationPlace,
      comments,
      currentCounselor,
      connectedToCounselorSinceYear,
      spouce,
      children,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const formDataFiltered = getExistingFields(formState);
    const response = await fetch(`${SERVER_URL}/counselee/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(formDataFiltered),
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
            message:
              "You Might Have Registered Already Please Contact your counselor",
          },
          { status: 409 }
        );
      }
      const responseData = await response.json();
      return NextResponse.json(
        {
          message:
            responseData.message ||
            responseData.title ||
            "Unexpected Error Occured",
        },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || error.title },
      { status: 500 }
    );
  }
}
