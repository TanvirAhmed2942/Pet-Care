import { Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongodb();
  const doctorsList = await Users.find({ role: "Vet Doctor" });
  if (doctorsList.length > 0) {
    return NextResponse.json(doctorsList);
  } else {
    return NextResponse.json(
      { message: "Doctors List is Empty" },
      { status: 404 }
    );
  }
  // console.log(usersList.length);
}
