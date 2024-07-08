"use server";
import { cookies } from "next/headers";

export async function PROTECTED_POST(formData: FormData, url: string) {
  const authcookie = cookies().get("AUTH")?.value;
  const authtoken = authcookie && JSON.parse(authcookie);
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Bearer ${authtoken.token}`);
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return { message: responseData.message };
    } else {
      if (response.status === 409) {
        throw new Error("devotee already exists");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.title);
    }
  } catch (error: any) {
    throw new Error(error.message || "Unexpected exception occured");
  }
}

export async function LogoutCounselor() {
  cookies().delete("AUTH");
}
