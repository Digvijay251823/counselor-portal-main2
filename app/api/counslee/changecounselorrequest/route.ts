import { SERVER_URL } from "@/Components/config/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    counselee,
    preferedCounselor1,
    preferedCounselor2,
    preferedCounselor3,
    reasonForCounselorChange,
    alreadySpokenToExistingCounselor,
    alreadySpokenToNewCounselor,
    legalNameOfSpouce,
    yourInitiatingSpiritualMaster,
    harinamInitiationDate,
    harinamInitiationPlace,
    children,
  } = await req.json();
  const authcookie = cookies().get("AUTH")?.value;
  const authtoken = authcookie && JSON.parse(authcookie);
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);
  const formData = {
    counselee,
    preferedCounselor1,
    preferedCounselor2,
    preferedCounselor3,
    reasonForCounselorChange,
    alreadySpokenToExistingCounselor,
    alreadySpokenToNewCounselor,
  };
  const updateData = {
    legalNameOfSpouce,
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
  const filteredUpdateData = Object.entries(updateData)
    .filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
    .reduce((obj: any, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  try {
    if (!counselee) {
      return NextResponse.json(
        { message: "Please enter you phoneNumber" },
        { status: 404 }
      );
    }
    if (Object.keys(filteredUpdateData).length !== 0) {
      const response = await fetch(
        `${SERVER_URL}/counselee/update/${counselee}`,
        {
          method: "PUT",
          headers: header,
          body: JSON.stringify(filteredUpdateData),
        }
      );
    }

    const response = await fetch(`${SERVER_URL}/counselorprovider/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(filteredFormData),
    });
    console.log(response.status);
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: "Successfully applied for Change counselor" },
        { status: response.status }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "you have already submitted the change form" },
          { status: 409 }
        );
      }
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
