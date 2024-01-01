import { Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { phone } = params;
    console.log("phone", phone.slice(3, 14));
    const number = phone.slice(3, 14);
    // const number = "01312443264";
    console.log("mm", number);

    await connectMongodb();

    // Find the user based on phone number
    const foundUser = await Users.findOne(
      { phone: number },
      { _id: 1, role: 1 }
    );

    if (!foundUser) {
      // Handle case where user with the given phone number is not found
      return NextResponse.json({ error: "User not found" }, 404);
    }
    console.log("ppp", number);
    return NextResponse.json(foundUser);
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, 500);
  }
}
